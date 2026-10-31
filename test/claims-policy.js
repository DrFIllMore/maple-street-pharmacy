// v25.30: auto-appealed claims go to the problem queue, not a dead 'claim' stage (debug report 2026-10-31: 75 scripts stuck in 'claim').
const {webkit}=require('playwright');const path=require('path');const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await webkit.launch();const errs=[];const pg=await b.newPage({viewport:{width:932,height:430}});pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate(()=>{localStorage.clear();document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);
 for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('register',10,4);P('bin',2,1);P('fill',5,1);P('fill',6,1);P('verify',8,1);P('shelf',11,1);P('phone',14,1);for(let i=0;i<6;i++)P('chair',4+i,8);
 for(const r of ['rph','tech','tech','clerk','clerk'])a.hire(r);a.setBuild(false);S.opened=true;S.trust=70;S.reg=300;S.cash=20000;S.stock=3000;S.plans.quick=true;
 const out={};const run=(pol)=>{S.claimPolicy=pol;document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);S.speed=1;for(let t=0;t<2000&&S.running;t++){for(let f=0;f<6;f++)a.motion(.016);a.tick();}const c=st=>S.scripts.filter(x=>x.stage===st).length;return {rej:S.claims.filter(x=>x.auto).length,open:S.claims.filter(x=>x.status==='open').length,claimStage:c('claim'),problem:c('problem'),appealing:S.claims.filter(x=>x.status==='appealing').length,paidBack:S.claims.filter(x=>x.status==='paid'||x.status==='appeal paid').length,writeoff:S.wk.writeoff,auto:S.wk.claimAuto};};
 out.appeal=run('appeal');S.stock=3000;out.ask=run('ask');S.stock=3000;
 // repair: fake the old bug and make sure startWeek fixes it
 const sc=S.scripts.find(x=>x.stage==='shelf');if(sc){sc.stage='claim';}S.claimPolicy='appeal';out.repaired=(()=>{const before=S.scripts.filter(x=>x.stage==='claim'&&!S.claims.some(c=>c.id===x.id&&c.status==='open')).length;document.getElementById('review').hidden=true;a.startWeek();return {before,after:S.scripts.filter(x=>x.stage==='claim'&&!S.claims.some(c=>c.id===x.id&&c.status==='open')).length};})();
 return out;});
console.log(JSON.stringify(r));
if(r.appeal.claimStage>0)errs.push('appealed scripts stuck in claim stage: '+r.appeal.claimStage);if(r.appeal.open>0)errs.push('open claims under appeal policy');if(!(r.appeal.auto&&r.appeal.auto.appeal>0))errs.push('nothing auto-appealed');if(r.ask.open===0&&r.ask.claimStage===0&&r.ask.rej>r.appeal.rej)errs.push('ask policy did not leave claims open');if(r.repaired.after>0)errs.push('repair failed');
console.log(errs,errs.length?'FAIL':'PASS');await b.close();})();
