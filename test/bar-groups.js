const {webkit}=require('playwright');const fs=require('fs');const path=require('path');const GAME=process.env.GAME||path.join(__dirname,'..','index.html');/* six-button bar: Build, Floor, Money, Supplies, Town, Rank; group tabs inside the drawer; why-line on every page */const R=fs.readFileSync(path.join(__dirname,'..','reports','2026-10-29-v25.15-drive-thru-collapse.txt'),'utf8');const OBJS=R.match(/^objs (.*) · reach/m)[1];
(async()=>{const b=await webkit.launch();const errs=[];
for(const vp of [{width:932,height:430},{width:430,height:873,m:1},{width:667,height:375}]){
const ctx=await b.newContext({viewport:{width:vp.width,height:vp.height},deviceScaleFactor:2,isMobile:!!vp.m,hasTouch:true});await ctx.addInitScript(()=>{let x=7;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};});const pg=await ctx.newPage();pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate(async (OBJS)=>{localStorage.clear();document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.unlocked=['plant','snack','mat','problem','breakroom','otc','room','consult','fridge','medshelf','dtwin'];S.major=2;S.cash=1e6;
 for(const tok of OBJS.split(' ')){const m=tok.match(/^(\w+)@(\d+),(\d+)(?:r(\d))?/);if(!m)continue;a.place(m[1],+m[2],+m[3],+(m[4]||0));}
 for(const r of ['rph','tech','tech','clerk','clerk'])a.hire(r);a.setBuild(false);S.opened=true;S.trust=90;S.reg=600;S.contracts.vax=true;S.vaxDoses=0;S.cash=9000;S.loan=8000;S.stock=800;
 document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);S.speed=1;for(let t=0;t<200;t++){for(let f=0;f<6;f++)a.motion(.016);a.tick();}
 const out={bar:[...document.querySelectorAll('#strip .sb')].map(b=>b.textContent.replace(/\d/g,'').trim())};const res={};
 for(const g of ['floor','money','supplies','town','career']){const btn=document.querySelector(`[data-group="${g}"]`);btn.click();const tabs=[...document.querySelectorAll('.gtabs button')].map(b=>b.dataset.gt);const why=document.querySelector('.why')?.textContent||'';res[g]={tabs,why:why.slice(0,60),fits:[]};
  for(const k of tabs.length?tabs:['-']){if(k!=='-')document.querySelector(`[data-gt="${k}"]`).click();await new Promise(r=>setTimeout(r,250));const e=document.getElementById("off");res[g].fits.push([k,e.scrollHeight<=e.clientHeight+4,e.scrollHeight-e.clientHeight,getComputedStyle(e).fontSize]);}
  btn.click();/* toggles closed */}
 out.res=res;out.closedAfterToggle=document.getElementById('office').hidden;return out;},OBJS);
await pg.evaluate(()=>{document.querySelector('[data-group="money"]').click();document.querySelector('[data-gt="claims"]').click();});await pg.waitForTimeout(300);
const bad=[];if(r.bar.join()!=='⚒Build,🔀Floor,💵Money,📦Supplies,📣Town,⭐Rank')bad.push('bar '+r.bar.join());
if(r.res.floor.tabs.join()!=='flow,schedule:team,schedule:hire,schedule:cap')bad.push('floor tabs');if(r.res.money.tabs.length!==6)bad.push('money tabs');if(r.res.town.tabs.join()!=='promo,feed,inbox')bad.push('town tabs');
if(!/vaccine/.test(r.res.floor.why))bad.push('why line missing: '+r.res.floor.why);if(!r.closedAfterToggle)bad.push('toggle did not close');
if(vp.width===932){for(const [k,ok,ov] of r.res.money.fits)if(['metrics:money','metrics:loan','metrics:earn','claims'].includes(k)&&!ok)bad.push(k+' overflows '+ov);for(const [k,ok,ov] of r.res.supplies.fits)if(!ok)bad.push(k+' overflows '+ov);}
console.log(vp.width,bad.length?bad:'ok');errs.push(...bad);await ctx.close();}
console.log(errs,errs.length?'FAIL':'PASS');await b.close();})();
