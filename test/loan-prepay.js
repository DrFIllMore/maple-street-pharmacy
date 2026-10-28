const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(300);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);a.hire('tech');a.hire('clerk');a.setBuild(false);const out={};
 const run=(mid)=>{const c0=S.cash;a.startWeek();a.setSpeed(0);let did=false;while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();if(mid&&!did&&S.day===2){did=true;out.mid=mid();}}document.getElementById('review').hidden=true;const h=S.hist[S.hist.length-1];return {cashDelta:Math.round(S.cash-c0),net:h.net,loanPay:S.wk.loanPay,loan:S.loan,miss:S.bank.miss};};
 out.w1=run();
 // week 2: pay the bill mid-week while paused via the Money tab button
 out.w2=run(()=>{a.setSpeed(0);a.openOffice('metrics');const btn=document.querySelector('[data-pay="bill"]');const t=btn.textContent;btn.click();const after=document.querySelector('[data-pay="bill"]').textContent;return {t,after,cash:Math.round(S.cash),loan:S.loan};});
 // between weeks: prepay then run week 3
 a.openOffice('metrics');document.querySelector('[data-pay="bill"]').click();out.between={loan:S.loan,pre:S.preWk};out.w3=run();
 // low cash: buttons disabled message
 S.cash=200;a.openOffice('metrics');out.low=document.querySelector('.tile .foot.neg')?.textContent||'';
 return out;});
console.log(JSON.stringify(r,null,1),errs);await b.close();})();
