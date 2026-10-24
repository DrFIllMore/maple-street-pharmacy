const { webkit } = require('playwright');
const WEEKS=+(process.env.WEEKS||12), MODE=process.env.MODE||'base';
(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:932,height:430}});const pg=await ctx.newPage();const errs=[];
 pg.on('pageerror',e=>errs.push('PAGEERROR '+e.message));
 await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(500);await pg.evaluate(()=>document.getElementById('tNew').click());await pg.waitForTimeout(150);await pg.evaluate(()=>document.getElementById('go').click());await pg.waitForTimeout(150);
 await pg.evaluate((MODE)=>{const a=__msp.api;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,8);P('chair',5,8);P('chair',6,8);P('chair',7,8);
   a.hire('tech');a.hire('clerk');if(MODE!=='lean'){a.hire('clerk');P('phone',0,2,1);P('problem',16,1);}
   if(MODE==='full'){P('otc',12,9);P('consult',15,10);P('plant',1,12);P('medshelf',14,1);}
   document.getElementById('review').hidden=true;a.startWeek();},MODE);
 const rows=[];
 for(let wk=0;wk<WEEKS;wk++){const r=await pg.evaluate(()=>{for(let i=0;i<108*6+2;i++){if(!__msp.S.running)break;for(let f=0;f<12;f++)__msp.api.motion(.016);__msp.api.tick();}const S=__msp.S;const h=S.hist[S.hist.length-1]||{};return {wk:S.week-1,cash:Math.round(S.cash),owed:Math.round(S.ledger.reduce((t,l)=>t+l.amt,0)),loan:S.loan,trust:+S.trust.toFixed(0),served:S.wk.served,lost:S.wk.lost,net:h.net,paid:Math.round(S.wk.paid),cashIn:Math.round(S.wk.cashIn),costs:Math.round(S.wk.costs),staff:S.staff.length,done:S.done||''};});
   rows.push(r);console.log(JSON.stringify(r));if(r.done)break;
   await pg.evaluate(()=>{const S=__msp.S;if(S.card){S.choice=0;}});
   await pg.waitForTimeout(100);for(let k=0;k<3;k++){const hasNext=await pg.$('#next');if(!hasNext)break;await pg.evaluate(()=>document.getElementById('next').click());await pg.waitForTimeout(100);}
   await pg.evaluate(()=>{const S=__msp.S;const opts=document.querySelectorAll('.contract.req .csign button');if(opts.length)opts[0].click();});
   if(MODE!=='lean'&&process.env.PAY)await pg.evaluate((MODE)=>{const S=__msp.S;const a=__msp.api;process={env:{MODE}};if(S.week>=3&&!(S.promo.paper>0)&&S.cash>3500)a.buyPromo('paper');if(!S.loyalty&&S.cash>3000)a.buyPromo('loyalty');if(!S.contracts.vax&&S.cash>3000&&S.objs.some(o=>o.type==='consult'))a.signContract('vax');if(S.contracts.vax&&S.vaxDoses<10&&S.cash>2500)a.signContract('doses');if(process.env.MODE==='full'&&S.week>=5&&!S.contracts.special&&S.cash>5000){if(!S.objs.some(o=>o.type==='fridge'))a.place('fridge',17,1,0);a.signContract('special');}if(process.env.MODE==='full'&&S.week>=7&&S.cash>5000){const v=S.objs.find(o=>o.type==='verify'&&!o.level);if(v){S.cash-=1500;v.level=1;}}if(S.cash>6000&&S.loan>0)a.payLoan(Math.min(S.loan,S.cash-5000));},MODE);
   // mid-game upgrade for 'full' mode at week 4
   if(MODE==='full'&&wk===3)await pg.evaluate(()=>{const f=__msp.S.objs.find(o=>o.type==='fill');if(f&&__msp.S.cash>4000){__msp.S.cash-=2500;f.level=1;}});
   await pg.evaluate(()=>document.getElementById('run').click());await pg.waitForTimeout(150);}
 console.log(errs.join('\n')||'no errors');await b.close();})();
