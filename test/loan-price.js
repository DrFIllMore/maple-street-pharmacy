const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();
for(const cs of ['light','dark']){const pg=await (await b.newContext({viewport:{width:873,height:430},colorScheme:cs})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api;let S=__msp.S;a.place('fill',5,1);a.setBuild(false);S.opened=true;const out={};
 out.due0=a.loanDue();out.borrow=[a.borrow(5000),S.loan,Math.round(S.cash),a.loanDue()];
 // price curve
 const T=S.trust;out.fair=a.fairPrice();out.curve=[30,40,48,52,56,60,64,72,84,100,120].map(p=>{S.cashPrice=p;return [p,+a.priceMult().toFixed(2),Math.round(p*a.priceMult()),+a.demandPerDay().toFixed(1)]});S.cashPrice=48;
 // pay normally
 S.cash=5000;S.wk.drug=0;S.day=6;const c0=S.cash,l0=S.loan;a.endWeek();out.paid=[c0-Math.round(S.cash),l0-S.loan,S.wk.loanPay,S.wk.interest];
 // miss twice
 for(let i=0;i<2;i++){S=__msp.S;S.cash=a.wages()+S.rent+100;S.wk.drug=0;S.day=6;a.endWeek();}
 out.miss=[S.bank.miss,S.loan,a.borrow(2000)];out.page=document.getElementById('rev').innerText.slice(0,400);return out;});
console.log(cs,JSON.stringify(r,null,0));await pg.screenshot({path:'check-'+cs+'.png'});console.log(errs);}
await b.close();})();
