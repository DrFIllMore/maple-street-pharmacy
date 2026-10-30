// v25.24: persistent regulars (name, medication, refill rhythm, mood) and staff memories.
const {webkit}=require('playwright');const fs=require('fs');const path=require('path');const GAME=process.env.GAME||path.join(__dirname,'..','index.html');const R=fs.readFileSync(path.join(__dirname,'..','reports','2026-10-29-v25.15-drive-thru-collapse.txt'),'utf8');const OBJS=R.match(/^objs (.*) · reach/m)[1];
(async()=>{const b=await webkit.launch();const errs=[];
const ctx=await b.newContext({viewport:{width:932,height:430},deviceScaleFactor:2,hasTouch:true});await ctx.addInitScript(()=>{let x=11;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};});const pg=await ctx.newPage();pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate(async (OBJS)=>{localStorage.clear();document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.unlocked=['plant','snack','mat','problem','breakroom','otc','room','consult','fridge','medshelf','dtwin'];S.major=2;S.cash=1e6;
 for(const tok of OBJS.split(' ')){const m=tok.match(/^(\w+)@(\d+),(\d+)(?:r(\d))?/);if(!m)continue;a.place(m[1],+m[2],+m[3],+(m[4]||0));}
 for(const r of ['rph','tech','tech','clerk','clerk'])a.hire(r);a.setBuild(false);S.opened=true;S.trust=90;S.reg=400;S.cash=30000;S.loan=8000;S.stock=3000;
 const out={weeks:[]};
 for(let wk=0;wk<4;wk++){document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);S.speed=1;for(let t=0;t<2000&&S.running;t++){for(let f=0;f<6;f++)a.motion(.016);a.tick();}
  const R=a.regs();out.weeks.push({week:S.week,met:R.filter(r=>r.fills>0).length,fills:R.reduce((s,r)=>s+r.fills,0),unhappy:R.filter(r=>r.mood<0).length,lost:R.filter(r=>r.lost).length,named:S.scripts.filter(s=>s.who).length});
  S.stock=3000;}
 out.sample=a.regs().filter(r=>r.fills>0).slice(0,3).map(r=>({n:r.n,med:r.med,every:r.every,fills:r.fills,mood:r.mood,note:r.note}));
 // a walk-out by a regular makes them unhappy; three make them leave
 const reg=a.regs().find(r=>r.fills>0&&!r.lost);const sc={who:reg.n,reg:true};const m0=reg.mood;
 for(let i=0;i<3;i++)__msp.api.remember&&0;
 // use the internal through a fake patient walk-out path: call regLeft via a script object
 const p={qt:20,wait:20};__msp.S.wk=__msp.S.wk||{};
 try{a.regLeft(sc,'at pick-up');}catch(e){out.regLeftErr=e.message;}
 out.afterOne={mood:reg.mood,m0,lost:reg.lost};
 // memories
 const w=S.staff.find(x=>!x.isYou);a.remember(w,'Test memory');out.mem=(w.mem||[]).map(m=>m.t);for(const x of S.staff)x.tenure=3;for(let i=0;i<30;i++)a.staffMoment();out.moments=S.staff.filter(x=>!x.isYou).map(x=>(x.mem||[]).length);out.momentLog=__msp.GL.slice(-4).map(l=>l.text).join(' | ').slice(0,400);
 // page renders and fits
 document.getElementById('review').hidden=true; document.querySelector('[data-group="town"]').click();document.querySelector('[data-gt="patients"]').click();await new Promise(r=>setTimeout(r,300));const e=document.getElementById('off');out.page={text:e.textContent.replace(/\s+/g,' ').slice(0,140),rows:e.querySelectorAll('.reg').length,chips:e.querySelectorAll('.chip').length,over:e.scrollHeight-e.clientHeight,font:getComputedStyle(e).fontSize};
 return out;},OBJS);
console.log(JSON.stringify(r,null,1));
await pg.screenshot({path:'regulars.png'});
const last=r.weeks[r.weeks.length-1];
if(last.met<4)errs.push('too few regulars met: '+last.met);if(last.fills<8)errs.push('too few regular fills');if(r.page.over>4)errs.push('Regulars page overflows by '+r.page.over);if(!/Regulars/.test(r.page.text))errs.push('page missing');if(r.regLeftErr)errs.push(r.regLeftErr);if(!r.mem.includes('Test memory'))errs.push('memory not stored');if(!r.moments.some(n=>n>1))errs.push('no staff moments fired');
console.log(errs,errs.length?'FAIL':'PASS');await b.close();})();
