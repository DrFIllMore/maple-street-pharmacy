// v25.15: from inside Build, an Outside tab switches to the parking lot and driveway items, and Inside comes back.
const {webkit}=require('playwright');const path=require('path');const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await webkit.launch();const errs=[];
for(const vp of [{width:667,height:375},{width:430,height:873,m:1}]){
const ctx=await b.newContext({viewport:{width:vp.width,height:vp.height},deviceScaleFactor:2,isMobile:!!vp.m,hasTouch:true});const pg=await ctx.newPage();pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate(()=>{localStorage.clear();document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.unlocked=['plant','snack','mat','problem','breakroom','otc','room','consult','fridge','medshelf','dtwin'];S.newItems=[];S.major=2;S.opened=true;a.setBuild(false);a.setBuild(true);
 const t=document.getElementById('palTabs');const over=t.scrollWidth>t.clientWidth+1;document.querySelector('[data-go="out"]').click();const items=[...document.querySelectorAll('#palItems [data-t]')].map(b=>b.dataset.t);const view=document.querySelector('[data-go="in"]')?'out':'?';return {over,items,view};});
await pg.waitForTimeout(400);
const r2=await pg.evaluate(()=>{document.querySelector('[data-go="in"]').click();return [...document.querySelectorAll('#palItems [data-t]')].map(b=>b.dataset.t).join(',');});
const ok=!r.over&&r.items.join()==='stall,drive,grass'&&r2.startsWith('dropoff');if(!ok)errs.push('bad '+vp.width);console.log(vp.width,JSON.stringify(r),r2);await ctx.close();}
console.log(errs,errs.length?'FAIL':'PASS');await b.close();})();
