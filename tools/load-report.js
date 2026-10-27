/* Load a player's problem report into the game and explain what's going on.
   Usage (from the repo):  PLAYWRIGHT_BROWSERS_PATH=... node tools/load-report.js reports/<file>.json [weeksToSimulate=0]
   Prints: device/perf, state, last weeks, where customers wait (bottleneck), why trust moved, money, staff cost per Rx,
   hire preview, then (optionally) simulates N more weeks "as is" from the exact saved game. */
const {webkit}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const file=process.argv[2];if(!file){console.log('usage: node tools/load-report.js <report.json> [weeks]');process.exit(1);}
const rep=JSON.parse(fs.readFileSync(file,'utf8'));const weeks=+(process.argv[3]||0);
console.log(`== report ${path.basename(file)} · ${rep.build} · ${rep.at}`);console.log('note:',rep.note||'(none)');console.log('perf:',JSON.stringify(rep.perf));
console.log(rep.env.split('\n').slice(1,4).join('\n'));
const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:932,height:430}});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await ctx.addInitScript(save=>{try{localStorage.setItem('msp-save',save);}catch(e){}},JSON.stringify(rep.save));
await pg.goto('file://'+(process.env.GAME||path.resolve(__dirname,'..','index.html')));await pg.waitForTimeout(600);
const a=await pg.evaluate(()=>{const S=__msp.S,api=__msp.api;const h=(S.hist||[]).slice(-6);const last=h[h.length-1]||{};
  const tw=S.wk&&S.wk.tw?Object.fromEntries(Object.entries(S.wk.tw).map(([k,v])=>[k,+v.toFixed(1)])):{};
  return {week:S.week,day:S.day,cash:Math.round(S.cash),loan:S.loan,trust:+S.trust.toFixed(1),regulars:Math.round(S.reg||0),stock:S.stock,
   staff:S.staff.map(w=>`${w.name}/${w.role}${w.floater?'(temp)':''} en${Math.round(w.energy??100)} mo${Math.round(w.morale??80)}`),
   stations:['dropoff','register','fill','verify','shelf','bin','phone','problem','consult','restroom','chair'].map(t=>t+':'+S.objs.filter(o=>o.type===t).length).join(' '),
   weeks:h.map(x=>`wk${x.week} served ${x.served} lost ${x.lost} net ${x.net} cash ${x.cash} lostWhere ${JSON.stringify(x.lw||{})} waitTicks ${JSON.stringify(x.qw||{})}`),
   trustReasonsLastWeek:tw,expectedPerDay:+api.demandPerDay().toFixed(1),
   costPerRx:last.served?Math.round(api.wages()/last.served):null,hire:['tech','clerk','rph'].map(r=>r+': '+api.hireAdvice(r).t)};});
console.log(JSON.stringify(a,null,1));
if(weeks>0){const out=await pg.evaluate(n=>{const a=__msp.api,S=__msp.S;const r=[];document.getElementById('review').hidden=true;for(let k=0;k<n;k++){a.startWeek();a.setSpeed(0);while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();}document.getElementById('review').hidden=true;const h=S.hist[S.hist.length-1];r.push(`sim wk${h.week}: served ${h.served} lost ${h.lost} later ${S.wk.later||0} trust ${S.trust.toFixed(1)} cash ${Math.round(S.cash)} net ${h.net} done=${S.done||''} trustWhy ${JSON.stringify(Object.fromEntries(Object.entries(S.wk.tw||{}).map(([k,v])=>[k,+v.toFixed(1)])))} lostWhere ${JSON.stringify(h.lw||{})}`);if(S.done)break;}return r;},weeks);out.forEach(x=>console.log(x));}
console.log('page errors:',errs.length?errs:'none');await b.close();})();
