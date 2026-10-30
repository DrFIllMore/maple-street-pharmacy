// v25.27: Level 3 — The Three Letter Store opens across the street; block share, weekly rival moves, van and loyalty tiers, win/lose, TV cutscenes.
const {webkit}=require('playwright');const fs=require('fs');const path=require('path');const GAME=process.env.GAME||path.join(__dirname,'..','index.html');const R=fs.readFileSync(path.join(__dirname,'..','reports','2026-10-29-v25.15-drive-thru-collapse.txt'),'utf8');const OBJS=R.match(/^objs (.*) · reach/m)[1];const DRV=R.match(/^drive (.*)$/m)[1].trim();
(async()=>{const b=await webkit.launch();const errs=[];
const ctx=await b.newContext({viewport:{width:932,height:430},deviceScaleFactor:2,hasTouch:true});await ctx.addInitScript(()=>{window.__cineTest=true;let x=9;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};});const pg=await ctx.newPage();pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate(async ([OBJS,DRV])=>{localStorage.clear();document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.unlocked=['plant','snack','mat','problem','breakroom','otc','room','consult','fridge','medshelf','dtwin'];S.major=2;S.cash=1e6;
 for(const tok of OBJS.split(' ')){const m=tok.match(/^(\w+)@(\d+),(\d+)(?:r(\d))?/);if(!m)continue;a.place(m[1],+m[2],+m[3],+(m[4]||0));}for(const t of DRV.split(' ')){const [x,y]=t.split(',').map(Number);a.placeDrive(x,y);}
 for(const r of ['rph','rph','tech','tech','tech','clerk','clerk','clerk'])a.hire(r);a.setBuild(false);S.opened=true;S.trust=92;S.reg=400;S.cash=40000;S.loan=0;S.stock=4000;S.netTot=120000;S.contracts.vax=true;S.vaxDoses=200;
 const out={};const runWeek=(n)=>{document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);S.speed=1;for(let t=0;t<(n||2000)&&S.running;t++){for(let f=0;f<6;f++)a.motion(.016);a.tick();}S.stock=4000;};
 out.dt=!!(S.objs.some(o=>o.type==='dtwin'));
 runWeek(1900);S.trust=92;for(let t=0;t<200&&S.running;t++){for(let f=0;f<6;f++)a.motion(.016);a.tick();}
 out.after1={major:S.major,majorUp:S.wk.majorUp,tls:!!S.tls,done:S.done,trust:S.trust,net:S.netTot,dt:a.dtOpen?a.dtOpen():'?',running:S.running};
 if(!S.tls){return out;}
 // review flow: Level 2 complete page → On to Level 3 → cutscene
 document.getElementById('review').hidden=false;S.wk.sumSeen=true;const sr=new Function('return showReview()');try{a.resumeReview?a.resumeReview():sr();}catch(e){out.reviewErr=e.message;}
 await new Promise(r=>setTimeout(r,100));out.lvlPage=(document.querySelector('#rev h2')||{}).textContent;const go=document.getElementById('majGo');out.hasGo=!!go;if(go)go.click();await new Promise(r=>setTimeout(r,200));
 out.cine=a.cine&&a.cine();
 // sample three frames of the opening scene
 const shots=[];for(const ms of [1500,4800,8600]){a.cineAt(ms);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));shots.push(a.cine()&&a.cine().kind);}out.cineFrames=shots;a.endCine();await new Promise(r=>setTimeout(r,100));
 // five weeks of Level 3
 const wk=[];for(let i=0;i<5;i++){runWeek();S.trust=Math.max(S.trust,88);wk.push({w:S.week-1,share:S.wk.tls&&S.wk.tls.share,move:S.wk.tlsMove&&S.wk.tlsMove.k,w60:S.tls.weeks60,rival:+S.rival.toFixed(2)});}
 out.weeks=wk;out.moves=S.tls.moves.map(m=>m.k);
 // levers: van and loyalty tiers
 const c0=S.cash;const e1=a.buyPromo('van');out.van={err:e1,on:S.van,cost:c0-S.cash};const p0=a.tlsPull();const e2=a.buyPromo('silver');out.silver={err:e2,tier:S.loyTier};
 a.buyPromo('loyalty');const e3=a.buyPromo('silver');const e4=a.buyPromo('gold');out.tiers={e3,e4,tier:S.loyTier,pullDrop:+(p0-a.tlsPull()).toFixed(3)};
 // pages render
 a.openOffice('promo');await new Promise(r=>setTimeout(r,150));out.promoTxt=document.getElementById('off').textContent.replace(/\s+/g,' ').match(/The Three Letter Store holds[^%]*%/)?.[0];
 // win: force four weeks at 60%
 S.tls.weeks60=3;S.trust=95;S.bank.miss=0;S.bank.red=0;S.promo.pricematch=2;S.van=true;S.loyTier=3;S.cashPrice=40;runWeek();out.win={share:S.wk.tls&&S.wk.tls.share,w60:S.tls.weeks60,done:S.done};
 // the win review shows the finale scene then the Level 3 page
 document.getElementById('review').hidden=false;S.wk.sumSeen=true;try{a.resumeReview?a.resumeReview():sr();}catch(e){out.reviewErr2=e.message;}await new Promise(r=>setTimeout(r,100));out.cineWin=a.cine()&&a.cine().kind;a.cineAt(5000);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));a.endCine();await new Promise(r=>setTimeout(r,150));out.winPage=(document.querySelector('#rev h2')||{}).textContent;
 return out;},[OBJS,DRV]);
console.log(JSON.stringify(r,null,1));
if(r.after1.major!==3||!r.after1.tls||r.after1.done)errs.push('level 3 did not start: '+JSON.stringify(r.after1));if(!/Level 2 complete/.test(r.lvlPage||'')||!r.hasGo)errs.push('no Level 2 complete page');if(!r.cine||r.cine.kind!=='lvl3')errs.push('no lvl3 cutscene');
if(!r.weeks.every(w=>typeof w.share==='number'))errs.push('no weekly share');if(!r.moves.length)errs.push('no rival moves in 5 weeks');if(!r.van.on||r.van.cost!==4000)errs.push('van '+JSON.stringify(r.van));if(r.silver.err!=='Start Loyalty cards first.')errs.push('silver gating '+r.silver.err);if(r.tiers.tier!==3||r.tiers.pullDrop<.07)errs.push('tiers '+JSON.stringify(r.tiers));
if(!r.promoTxt)errs.push('promo page missing TLS line');if(r.win.done!=='win')errs.push('win not reached '+JSON.stringify(r.win));if(r.cineWin!=='lvl3win')errs.push('no finale scene');if(!/Level 3 complete/.test(r.winPage||''))errs.push('win page '+r.winPage);
console.log(errs,errs.length?'FAIL':'PASS');await b.close();})();
