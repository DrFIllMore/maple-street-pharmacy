// From the wk-8 report: the Gazette said "Week net +$6,827" while cash fell to −$2,205 (fill upgrades bought mid-week weren't in the books).
// Buys equipment mid-week and between weeks, then checks the Gazette's cash change equals the real change in cash.
const {webkit}=require('playwright');const path=require('path');
const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);a.hire('tech');a.hire('clerk');a.setBuild(false);S.cash=20000;
 const run=()=>{while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();}};const out=[];
 for(let wk=0;wk<3;wk++){document.getElementById('review').hidden=true;const c0=S.cash;if(wk===2)a.place('chair',4,8,0);a.startWeek();a.setSpeed(0);for(let i=0;i<200;i++){for(let f=0;f<12;f++)a.motion(.016);a.tick();}
  if(wk>=1){a.place('chair',5,8,0);a.place('fill',14,1,0);}run();const w=S.wk;out.push({wk:S.week-1,cashNet:w.cashNet,real:Math.round(S.cash-(S.cashCloseBefore??c0)),net:Math.round(w.net),equip:w.equip||0,other:w.other});S.cashCloseBefore=S.cash;}
 const gz=document.getElementById('rev')?document.getElementById('rev').innerText:'';return {out,gz:(gz.match(/Equipment[^\n]*\n?[^\n]*|Cash change[^\n]*\n?[^\n]*/g)||[]).join(' | ')};});
console.log(JSON.stringify(r,null,1),errs);await b.close();})();
