// v25.25: seasons (13-week cycle), challenges (1–2 week contracts with a target and reward), designed setbacks (audit, recall, inspection).
const {webkit}=require('playwright');const fs=require('fs');const path=require('path');const GAME=process.env.GAME||path.join(__dirname,'..','index.html');const R=fs.readFileSync(path.join(__dirname,'..','reports','2026-10-29-v25.15-drive-thru-collapse.txt'),'utf8');const OBJS=R.match(/^objs (.*) · reach/m)[1];
(async()=>{const b=await webkit.launch();const errs=[];
const ctx=await b.newContext({viewport:{width:932,height:430},deviceScaleFactor:2,hasTouch:true});await ctx.addInitScript(()=>{let x=5;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};});const pg=await ctx.newPage();pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate(async (OBJS)=>{localStorage.clear();document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.unlocked=['plant','snack','mat','problem','breakroom','otc','room','consult','fridge','medshelf','dtwin'];S.major=2;S.cash=1e6;
 for(const tok of OBJS.split(' ')){const m=tok.match(/^(\w+)@(\d+),(\d+)(?:r(\d))?/);if(!m)continue;a.place(m[1],+m[2],+m[3],+(m[4]||0));}
 for(const r of ['rph','rph','tech','tech','tech','clerk','clerk','clerk'])a.hire(r);a.setBuild(false);S.opened=true;S.trust=90;S.reg=400;S.cash=30000;S.loan=8000;S.stock=4000;S.contracts.vax=true;S.vaxDoses=200;
 const out={seasons:[1,3,4,7,8,10,11,13,14].map(w=>w+':'+a.seasonOf(w).k+(a.seasonOf(w).first?'*':''))};
 const runWeek=()=>{document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);S.speed=1;for(let t=0;t<2000&&S.running;t++){for(let f=0;f<6;f++)a.motion(.016);a.tick();}};
 runWeek();S.stock=4000;
 // week 2 proposals: a challenge card should be offered
 const dec=()=>{document.getElementById('review').hidden=false;const fn=new Function('return typeof reviewDecide==="function"');};
 S.wk.served=S.wk.served||100;const offer=a.chalOffer(S.wk);out.offer=offer&&{k:offer.k,title:offer.title,weeks:offer.weeks,N:offer.N,endWk:offer.endWk};
 // accept a one-week Rx challenge we can measure
 S.chal={k:'rx',from:'Oakridge Family Clinic',icon:'🏥',title:'Fill 10 prescriptions this week',weeks:1,N:10,metric:'served',kind:'min',reward:{cash:1234},unit:'Rx',startWk:S.week,endWk:S.week,acc:null};
 const cash0=S.cash;runWeek();
 // after the week: chalWeek ran inside endWeek → resolved
 out.res=S.wk.chalRes;out.cashGain=Math.round(S.cash-cash0);out.chalCleared=!S.chal;out.chalCash=S.wk.chalCash;
 // summary card shows it
 S.wk.sumSeen=false;const sfn=document.getElementById('review');out.summaryHas=!!document.querySelector('.chal');out.summaryTxt=(document.querySelector('.chal')||{}).textContent;
 // two-week walk-out challenge: progress text mid-week
 S.chal={k:'lost',from:'District office',icon:'🏢',title:'Fewer than 5 walk-outs a week, two weeks running',weeks:2,N:10,metric:'lost',kind:'max',reward:{trust:3},unit:'walk-outs',startWk:S.week,endWk:S.week+1,acc:null};
 document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);S.speed=1;for(let t=0;t<300;t++){for(let f=0;f<6;f++)a.motion(.016);a.tick();}
 a.openOffice('flow');await new Promise(r=>setTimeout(r,100));out.whyInfo=(document.querySelector('.why.info')||{}).textContent;a.closeOffice&&a.closeOffice();
 for(let t=0;t<2000&&S.running;t++){for(let f=0;f<6;f++)a.motion(.016);a.tick();}
 out.midAcc=S.chal&&S.chal.acc;out.stillOn=!!S.chal;
 // setbacks: inspection fail closes the consult room
 S.mods.consultClosed=1;const n0=S.patients.length;const sp=()=>a.spawnConsult();
 out.consultBlocked=(()=>{try{const before=S.patients.length;sp();return S.patients.length===before;}catch(e){return 'err '+e.message;}})();
 delete S.mods.consultClosed;
 // audit slows clerks
 const clerk=S.staff.find(w=>w.role==='clerk');const effFn=w=>a.eff(w);const e0=effFn(clerk);S.mods.audit=1;const e1=effFn(clerk);delete S.mods.audit;out.auditEff=+(e1/e0).toFixed(2);
 // season multipliers
 out.k={w5:a.seasonOf(5).k,shots:(()=>{S.week=5;return a.seasonK('shots');})(),otc:(()=>{S.week=9;return a.seasonK('otc');})()};
 return out;},OBJS);
console.log(JSON.stringify(r,null,1));
if(r.seasons.join()!=='1:autumn*,3:autumn,4:winter*,7:winter,8:spring*,10:spring,11:summer*,13:summer,14:autumn*')errs.push('season cycle '+r.seasons.join());
if(!r.offer)errs.push('no challenge offered');if(!r.res||!r.res.ok)errs.push('rx challenge not met: '+JSON.stringify(r.res));if(r.chalCash!==1234)errs.push('reward not paid');if(!r.chalCleared)errs.push('challenge not cleared');
if(!/walk-outs/.test(r.whyInfo||''))errs.push('no progress line: '+r.whyInfo);if(!r.stillOn||typeof r.midAcc!=='number')errs.push('two-week challenge did not carry over');
if(r.consultBlocked!==true)errs.push('consult room not closed: '+r.consultBlocked);if(r.auditEff!==0.8)errs.push('audit eff '+r.auditEff);if(r.k.shots!==1.5||r.k.otc!==1.4)errs.push('season k '+JSON.stringify(r.k));
console.log(errs,errs.length?'FAIL':'PASS');await b.close();})();
