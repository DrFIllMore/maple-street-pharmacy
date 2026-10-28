// v25 career: XP from serving and good weeks, levels open Build items early, badges, and the level carries over to a new store.
const {webkit}=require('playwright');const path=require('path');
const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:932,height:430}});await ctx.addInitScript(()=>{let x=5;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate(()=>{localStorage.removeItem('msp-career');document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,7);P('chair',5,7);a.hire('tech');a.hire('clerk');a.setBuild(false);S.reg=250;
 const out={lv0:document.getElementById('lvN').textContent};const lvLog=[];
 for(let wk=0;wk<4;wk++){document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);S.speed=1;while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();}lvLog.push(document.getElementById('lvN').textContent);}
 out.levels=lvLog.join(',');out.unlocked=(S.unlocked||[]).join(',');out.runXp=S.runXp;
 document.querySelector('[data-tab="career"]').click();const body=document.getElementById('off').innerText;out.careerTab=/career/i.test(body)&&/badges/i.test(body);
 const badge=document.querySelector('[data-ach]');badge.click();out.badgeDetail=document.getElementById('achD').innerText.slice(0,60);
 out.saved=!!localStorage.getItem('msp-career');return out;});
// a new store keeps the level
await pg.reload();await pg.waitForTimeout(300);
const r2=await pg.evaluate(()=>{const lv=document.getElementById('lvN').textContent;return {lvAfterReload:lv,cheerHidden:document.getElementById('cheer').hidden};});
const ok=+r.levels.split(',').pop()>=3&&!r.unlocked.includes('dtwin')&&r.careerTab&&r.saved&&r2.lvAfterReload===r.levels.split(',').pop()&&!errs.length;
console.log(JSON.stringify({...r,...r2}),errs,ok?'PASS':'FAIL');await b.close();})();
