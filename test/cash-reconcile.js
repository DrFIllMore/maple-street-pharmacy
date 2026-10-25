const {webkit}=require('playwright');
(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:932,height:430}});const pg=await ctx.newPage();
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
await pg.evaluate(()=>document.getElementById('tNew').click());await pg.waitForTimeout(150);await pg.evaluate(()=>document.getElementById('go').click());await pg.waitForTimeout(150);
await pg.evaluate(()=>{const a=__msp.api;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,8);P('chair',5,8);a.hire('tech');a.hire('clerk');a.setBuild(false);__msp.api.startWeek();});
for(let wk=1;wk<=4;wk++){const r=await pg.evaluate(()=>{const S=__msp.S;const cash0=S.cash;const owed0=S.ledger.reduce((t,l)=>t+l.amt,0);for(let i=0;i<108*6+2;i++){if(!S.running)break;for(let f=0;f<12;f++)__msp.api.motion(.016);__msp.api.tick();}const w=S.wk;const expect=w.cashIn+w.paid-(w.costs)-0;/* costs includes drug; drug charged Monday; cashIn includes copays+cash+otc+consult */return {week:S.week-1,cash0:Math.round(cash0),cash1:Math.round(S.cash),delta:Math.round(S.cash-cash0),cashIn:Math.round(w.cashIn),paid:Math.round(w.paid),fee:Math.round(w.fee),drug:w.drug,costs:Math.round(w.costs),theft:w.theftVal||0,expected:Math.round(expect),served:w.served,owed0:Math.round(owed0),owed1:Math.round(S.ledger.reduce((t,l)=>t+l.amt,0)),newOwed:Math.round(S.ledger.filter(l=>l.due>S.week-1).reduce((t,l)=>t+l.amt,0))};});
 console.log(JSON.stringify(r));
 for(let k=0;k<5;k++){const n=await pg.$('#next');if(!n)break;await pg.click('#next');await pg.waitForTimeout(120);}
 const opts=await pg.$$('.contract.req .csign button');if(opts.length){await opts[opts.length-1].click();await pg.waitForTimeout(100);}
 await pg.click('#run');await pg.waitForTimeout(150);}
await b.close();})();
