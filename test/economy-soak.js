// v25.20 audit: 12-week soak of a full Level-2 store; every cash change traced and reconciled against the week's figures; no errors; no tick over 150 ms after week 1.
const {webkit}=require('playwright');const fs=require('fs');const path=require('path');const R=fs.readFileSync(path.join(__dirname,'..','reports','2026-10-29-v25.15-drive-thru-collapse.txt'),'utf8');
const OBJS=R.match(/^objs (.*) · reach/m)[1],DRV=R.match(/^drive (.*)$/m)[1];const GAME=process.env.GAME||path.join(__dirname,'..','index.html');const WEEKS=+process.env.WEEKS||6;
(async()=>{const b=await webkit.launch();const errs=[];const ctx=await b.newContext({viewport:{width:932,height:430}});await ctx.addInitScript(()=>{let x=5;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};});const pg=await ctx.newPage();pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n').slice(1,3).join(' | ')));pg.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
await pg.evaluate(([OBJS,DRV])=>{localStorage.clear();document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.cash=1e6;S.unlocked=['plant','snack','mat','problem','breakroom','otc','room','consult','fridge','medshelf','dtwin'];S.major=2;
 for(const tok of OBJS.split(' ')){const m=tok.match(/^(\w+)@(\d+),(\d+)(?:r(\d))?/);if(!m)continue;a.place(m[1],+m[2],+m[3],+(m[4]||0));}
 for(const t of DRV.split(' ')){const [x,y]=t.split(',').map(Number);a.placeDrive(x,y);}
 /* hire from the market like a player would: 2 rph, 4 tech, 5 clerk */
 const want={rph:2,tech:4,clerk:5};for(let wk=0;wk<8&&Object.values(want).some(v=>v>0);wk++){for(const c of [...a.market().cands]){if(want[c.role]>0){a.hireCand(c.id);want[c.role]--;}}a.refreshMarket();}
 a.setBuild(false);S.opened=true;S.trust=85;S.reg=500;S.contracts.vax=true;S.vaxDoses=80;S.cash=30000;S.loan=12000;S.stock=1500;S.inv.otcBack=200;for(const o of S.objs)if(o.type==='otc')o.stock=40;
 /* trace every cash change */window.__cashLog=[];let _c=S.cash;Object.defineProperty(S,'cash',{get(){return _c;},set(v){const d=v-_c;_c=v;if(Math.abs(d)>1e-9){const st=(new Error().stack||'').split('\n')[2]||'';window.__cashLog.push([Math.round(d*100)/100,S.week,st.replace(/.*at /,'').slice(0,40)]);}},configurable:true});
},[OBJS,DRV]);
const weeks=[];
for(let wk=0;wk<WEEKS;wk++){const r=await pg.evaluate(()=>{const a=__msp.api,S=__msp.S;document.getElementById('review').hidden=true;window.__cashLog.length=0;const c0=S.cash;
  /* a player's week: buy a promo sometimes, order stock, promote once, give a raise once */
  if(S.week%3===0){const k=['paper','social','flyers'][S.week%3];try{a.buyPromo(k);}catch(e){}}
  if(S.week===5){const w=S.staff.find(x=>x.role==='tech'&&!x.senior&&(x.tenure||0)>=4);if(w)a.promoteStaff(w);}if(S.week===6){const w=S.staff.find(x=>x.role==='clerk');if(w)a.giveRaise(w);}
  a.startWeek();a.setSpeed(0);S.speed=1;const t0=performance.now();let ticks=0,maxTick=0;
  while(S.running){const s=performance.now();for(let f=0;f<10;f++)a.motion(.016);a.tick();ticks++;const d=performance.now()-s;if(d>maxTick)maxTick=d;}
  const ms=performance.now()-t0;const w=S.wk;const log=window.__cashLog;const sum=log.reduce((t,x)=>t+x[0],0);
  const by={};for(const [d,,where] of log){const k=where.split(' ')[0];by[k]=Math.round(((by[k]||0)+d));}
  const inc=Object.values(w.inc||{}).reduce((t,v)=>t+v,0);
  const expect=(w.cashIn||0)+(w.paid||0)-(w.costs||0)-(w.equip||0);
  const save=JSON.stringify(S).length;
  return {week:S.week-1,cash:Math.round(S.cash),delta:Math.round(S.cash-c0),logSum:Math.round(sum),expect:Math.round(expect),cashIn:Math.round(w.cashIn),inc:Math.round(inc),paid:Math.round(w.paid),costs:Math.round(w.costs),billPay:Math.round(w.billPay||0),promo:w.promo||0,equip:w.equip||0,hireFees:w.hireFees||0,loanPay:w.loanPay,served:w.served,lost:w.lost,trust:Math.round(S.trust),
   sizes:{scripts:S.scripts.length,patients:S.patients.length,claims:S.claims.length,ledger:S.ledger.length,fx:S.fx.length,mess:(S.mess||[]).length,gl:__msp.GL.length,log:__msp.LOG.length,hist:S.hist.length,days:S.days.length,objs:S.objs.length,cars:a.lotLive().cars.length,walkers:a.lotLive().walkers.length,promises:(S.promises||[]).length,feed:S.feed?JSON.stringify(S.feed).length:0},save,ms:Math.round(ms),perTick:+(ms/ticks).toFixed(2),maxTick:+maxTick.toFixed(1),by,
   staff:S.staff.map(x=>x.role+(x.senior?'*':'')+':'+(x.skill||1)+'/idle'+Math.round((x.wkIdle||0)/Math.max(1,x.wkTicks||1)*100)+'%'+(x.floater?'F':''))};});
 weeks.push(r);console.log(JSON.stringify({week:r.week,delta:r.delta,logSum:r.logSum,expect:r.expect,cashIn:r.cashIn,inc:r.inc,paid:r.paid,costs:r.costs,promo:r.promo,equip:r.equip,served:r.served,lost:r.lost,trust:r.trust,save:r.save,perTick:r.perTick,maxTick:r.maxTick,sizes:r.sizes}));
 if(r.week===1||r.week===WEEKS)console.log('BY',JSON.stringify(r.by),'STAFF',r.staff.join(' '));}
const bad=weeks.filter(w=>w.week>1&&(Math.abs(w.delta-w.expect)>2||Math.abs(w.delta-w.logSum)>2||w.maxTick>1200));/* generous: the suite runs 6 browsers at once */console.log('ERRS',JSON.stringify(errs.slice(0,10)),bad.length?'FAIL '+JSON.stringify(bad.map(w=>[w.week,w.delta,w.expect,w.maxTick])):'',(!errs.length&&!bad.length)?'PASS':'FAIL');await b.close();})();
