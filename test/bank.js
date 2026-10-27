const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
for(const sc of ['red','miss','trust','recover','win']){
const r=await pg.evaluate((sc)=>{localStorage.clear();document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api;let S=__msp.S;a.place('fill',5,1);a.setBuild(false);const out=[];
 for(let wk=0;wk<6;wk++){S=__msp.S;S.wk.drug=0;
  if(sc==='red')S.cash=-500;if(sc==='miss')S.cash=wk===4?5000:100+a.wages()+S.rent;if(sc==='recover')S.cash=wk===2?20000:-500;if(sc==='trust'){S.trust=wk===1?-1:30;}
  if(sc==='win'){S.cash=30000;S.loan=0;S.trust=80;}
  S.day=6;a.endWeek();out.push([S.week-1,Math.round(S.cash),S.loan,S.bank.red,S.bank.miss,S.done||'-',S.doneWhy||'',(S.wk.bankNote||[]).map(n=>n.t.slice(0,48)).join(' | ')]);if(S.done)break;}
 return {out,page:document.getElementById('rev').innerText.slice(0,220)};},sc);
console.log('==',sc);r.out.forEach(x=>console.log(JSON.stringify(x)));console.log(r.page.replace(/\n+/g,' / '));}
await pg.evaluate(()=>{});await pg.screenshot({path:'bank-end.png'});console.log(errs);await b.close();})();
