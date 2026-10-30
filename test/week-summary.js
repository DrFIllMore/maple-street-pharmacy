// v25.21: the week opens on a one-card summary with the takeaway; pages with nothing new are skipped; the takeaway is pinned under the bar and logged on Monday.
const {webkit}=require('playwright');const fs=require('fs');const path=require('path');const GAME=process.env.GAME||path.join(__dirname,'..','index.html');const R=fs.readFileSync(path.join(__dirname,'..','reports','2026-10-29-v25.15-drive-thru-collapse.txt'),'utf8');
const OBJS=R.match(/^objs (.*) · reach/m)[1];
(async()=>{const b=await webkit.launch();const errs=[];
for(const vp of [{width:932,height:430},{width:430,height:873,m:1}]){
const ctx=await b.newContext({viewport:{width:vp.width,height:vp.height},deviceScaleFactor:2,isMobile:!!vp.m,hasTouch:true});await ctx.addInitScript(()=>{let x=7;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};});const pg=await ctx.newPage();pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate((OBJS)=>{localStorage.clear();document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.unlocked=['plant','snack','mat','problem','breakroom','otc','room','consult','fridge','medshelf','dtwin'];S.major=2;S.cash=1e6;
 for(const tok of OBJS.split(' ')){const m=tok.match(/^(\w+)@(\d+),(\d+)(?:r(\d))?/);if(!m)continue;a.place(m[1],+m[2],+m[3],+(m[4]||0));}
 for(const r of ['rph','rph','rph','rph','tech','tech','clerk','clerk','clerk','clerk','clerk'])a.hire(r);a.setBuild(false);S.opened=true;S.trust=90;S.reg=600;S.contracts.vax=true;S.vaxDoses=5;S.cash=12000;S.loan=8000;S.stock=800;S.inv.otcBack=60;for(const o of S.objs)if(o.type==='otc')o.stock=30;
 const out={};document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);S.speed=1;while(S.running){for(let f=0;f<10;f++)a.motion(.016);a.tick();}
 out.stage=S.stage;out.take=S.wk.takeaway;out.pin=S.pin;out.txt=document.getElementById('rev').innerText.replace(/\s+/g,' ').slice(0,300);out.fit=document.getElementById('rev').scrollHeight<=document.getElementById('rev').clientHeight+1;return out;},OBJS);
await pg.waitForTimeout(300);
const r2=await pg.evaluate(()=>{document.getElementById('next').click();const o={stage:__msp.S.stage,fit:document.getElementById('rev').scrollHeight<=document.getElementById('rev').clientHeight+1,next:document.getElementById('next').textContent};return o;});await pg.waitForTimeout(300);
const r3=await pg.evaluate(()=>{document.getElementById('next').click();return {stage:__msp.S.stage,fit:document.getElementById('rev').scrollHeight<=document.getElementById('rev').clientHeight+1,txt:document.getElementById('rev').innerText.replace(/\s+/g,' ').slice(0,200)};});await pg.waitForTimeout(300);
const r4=await pg.evaluate(()=>{document.getElementById('next').click();document.getElementById('cheer').hidden=true;return {stage:__msp.S.stage,letters:document.querySelectorAll('.cmsg').length,txt:document.querySelector('.chatp').innerText.replace(/\s+/g,' ').slice(0,300)};});await pg.waitForTimeout(200);
const r5=await pg.evaluate(()=>{const S=__msp.S;document.getElementById('review').hidden=true;__msp.api.startWeek();__msp.api.setSpeed(0);document.getElementById('cheer').hidden=true;const p=document.getElementById('pin');return {pinShown:!p.hidden,pinText:p.innerText.slice(0,80),log:__msp.GL.some(e=>/Still open/.test(e.text))};});
await pg.waitForTimeout(200);
const ok=r.stage==='summary'&&r.fit&&r.take&&r.pin&&r2.stage==='review'&&r3.stage==='feed'&&r4.stage==='call'&&r4.letters>=2&&r5.pinShown&&r5.log;if(!ok)errs.push('bad '+vp.width+' '+JSON.stringify([r.stage,r.fit,r2.stage,r3.stage,r4.stage,r5]));console.log(vp.width,r.take.t,'|',r5.pinText.split('\n')[0]);await ctx.close();}
console.log(errs,errs.length?'FAIL':'PASS');await b.close();})();
