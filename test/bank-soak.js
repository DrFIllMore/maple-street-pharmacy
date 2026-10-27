const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:932,height:430}});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await pg.addInitScript(()=>{let s=11;Math.random=()=>{s=(s*16807)%2147483647;return s/2147483647;};});
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,7);P('chair',5,7);P('restroom',12,9,0);P('phone',0,2,1);a.hire('tech');a.hire('clerk');a.setBuild(false);__msp.S.autoCover=true;});
const W=+(process.argv[2]||10);
for(let wk=1;wk<=W;wk++){
 const r=await pg.evaluate((wk)=>{const S=__msp.S,a=__msp.api;const bad=[];const chk=(c,m)=>{if(!c&&bad.length<25)bad.push(`w${S.week}d${S.day}t${S.tick}: ${m}`);};
  a.startWeek();a.setSpeed(0);const cash0=S.cash;let tickMs=0,ticks=0,maxPat=0;
  // chaos: this week's actions
  const hired=S.staff.filter(w=>!w.isYou);
  if(wk===2){S.cashPrice=120;}if(wk===3){S.cashPrice=48;chk(a.borrow(5000)==='','borrow failed: '+a.borrow(0));}if(wk===4){S.cashPrice=30;}if(wk===5){S.cashPrice=56;}
  if(wk===6){S.cash=-6000;}if(wk===7){S.cash=Math.max(S.cash,4000);}
  if(wk===2){a.floaterGet();a.bookFloater(2);a.setShift(S.staff.find(w=>w.isYou),2,'O');}
  if(wk===3&&hired[0]){hired[0].energy=6;}
  if(wk===4&&hired[1]){hired[1].morale=12;}
  if(wk===6){S.staff.find(w=>w.isYou).energy=4;}
  if(wk===7&&hired[0]){a.giveBonus(hired[0]);a.giveRaise(hired[0]);chk(!!a.giveRaise(hired[0]),'second raise same week allowed');}
  if(wk===8){for(let i=0;i<108*2;i++){for(let f=0;f<12;f++)a.motion(.016);a.tick();}document.querySelector('[data-h="clerk"]')||a.openOffice('schedule');const n0=S.staff.length;const btn=document.querySelector('[data-h="clerk"]');if(btn)btn.click();chk(S.staff.length===n0+1,'mid-week hire');}
  if(wk===9&&hired[0]&&S.staff.includes(hired[0])){for(let i=0;i<108*3;i++){for(let f=0;f<12;f++)a.motion(.016);a.tick();}a.quitStaff(hired[0]);chk(!S.scripts.some(sc=>sc.claimed===hired[0].id),'claimed scripts stranded after quit');}
  while(S.running){for(let f=0;f<12;f++)a.motion(.016);const t0=performance.now();a.tick();tickMs+=performance.now()-t0;ticks++;maxPat=Math.max(maxPat,S.patients.length);
   if(S.tick===54){ // mid-day checks
    for(const w of S.staff){chk(w.energy>=0&&w.energy<=100&&!isNaN(w.energy),`${w.name} energy ${w.energy}`);if(!w.isYou&&!w.floater)chk(w.morale>=0&&w.morale<=100,`${w.name} morale ${w.morale}`);if(w.sick>0)chk(w.off&&!w.plan,`${w.name} sick but working (off=${w.off} plan=${w.plan&&w.plan.name})`);
     const act=Object.values(w.wkAct||{}).reduce((t,v)=>t+v,0);chk(act===(w.wkTicks||0),`${w.name} wkAct ${act} != wkTicks ${w.wkTicks}`);}
    chk(S.staff.filter(w=>w.sick>0).length<=1,'more than one sick');
    const ids=new Set(S.staff.map(w=>w.id));const BS=__msp.busy();for(const k in BS)chk(ids.has(BS[k]),`busyS ${k} -> missing staff`);
    chk(!isNaN(S.cash)&&isFinite(S.cash),'cash NaN');chk(S.trust>=0&&S.trust<=100,`trust ${S.trust}`);
    for(const o of S.objs){if(o.wkTt)chk((o.wkBt||0)<=o.wkTt+1e-6,`${o.type} wkBt>${o.wkTt}`);}
    chk(S.ledger.every(l=>isFinite(l.amt)&&isFinite(l.dueDay)),'ledger NaN');
    chk(__msp.GL.length<=400,'GL '+__msp.GL.length);chk(S.days.length<=60,'days');chk(S.scripts.length<400,'scripts '+S.scripts.length);
   }}
  const w=S.wk;const expect=w.cashIn+(w.paid||0)-w.costs;
  const resid=Math.round((S.cash-cash0)-expect);
  // after endWeek invariants
  chk(Math.abs(resid)<2,`cash residual ${resid} (delta ${Math.round(S.cash-cash0)} vs expected ${Math.round(expect)})`);
  const save=JSON.stringify({S});
  return {week:S.week-1,served:w.served,lost:w.lost,sick:w.sick||0,quit:w.quit||0,closed:w.closed||0,press:(w.press||[]).length,cash:Math.round(S.cash),resid,tickMs:+(tickMs/ticks).toFixed(3),maxPat,save:save.length,photoKind:S.feed&&S.feed.photo.kind,floatOnce:w.floatOnce||0,exitPay:w.exitPay||0,fees:(w.hireFees||0)+(w.bonus||0),bad,staff:S.staff.map(x=>`${x.name[0]}${x.role[0]}:${Math.round(x.energy)}/${Math.round(x.morale??0)}${x.sick?'S':''}`).join(' ')};},wk);
 console.log(JSON.stringify(r),JSON.stringify(await pg.evaluate(()=>({price:__msp.S.cashPrice,trust:Math.round(__msp.S.trust),loan:__msp.S.loan,bank:__msp.S.bank,done:__msp.S.done||"",demand:+__msp.api.demandPerDay().toFixed(1)}))));
 if(r.done)break;
 await pg.evaluate(()=>{for(let k=0;k<6;k++){const n=document.getElementById('next');if(n)n.click();}const c=document.querySelector('.contract.req .csign button');if(c)c.click();});
 if(wk===5){await pg.evaluate(()=>{window.dispatchEvent(new Event('pagehide'));});await pg.reload();await pg.waitForTimeout(500);await pg.evaluate(()=>{document.getElementById('tCont').click();});await pg.waitForTimeout(300);await pg.evaluate(()=>{for(let k=0;k<6;k++){const n=document.getElementById('next');if(n)n.click();}const c=document.querySelector('.contract.req .csign button');if(c)c.click();__msp.S.autoCover=true;});}
}
// perf: draw cost
const perf=await pg.evaluate(()=>{const a=__msp.api,S=__msp.S;a.startWeek();a.setSpeed(0);for(let i=0;i<60;i++){for(let f=0;f<12;f++)a.motion(.016);a.tick();}let t0=performance.now();for(let i=0;i<60;i++)__msp.draw();const draw=(performance.now()-t0)/60;t0=performance.now();for(let i=0;i<60;i++)__msp.api.renderHudT&&0;return {drawMs:+draw.toFixed(2),patients:S.patients.length,objs:S.objs.length,saveKB:Math.round((localStorage.getItem('msp-save')||'').length/1024)};});
console.log('PERF',JSON.stringify(perf),'errs',errs);await b.close();})();
