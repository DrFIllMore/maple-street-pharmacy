const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();
for(const vp of [{width:430,height:932},{width:932,height:430}]){const ctx=await b.newContext({viewport:vp,isMobile:true,hasTouch:true});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.addInitScript(()=>{window.__forceSA={t:59,b:34,l:0,r:0};});
const G='file:///home/claude/maple-street-pharmacy/index.html';await pg.goto(G);await pg.waitForTimeout(400);
await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();__msp.api.setBuild(false);});await pg.waitForTimeout(200);
await pg.evaluate(()=>{document.getElementById('mWin').onclick();});await pg.waitForTimeout(200);
const h=await pg.evaluate(()=>{const r=document.querySelector('#winAdj .wh[data-e="t"]').getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2];});
await pg.mouse.move(h[0],h[1]);await pg.mouse.down();await pg.mouse.move(h[0],h[1]+40,{steps:5});await pg.mouse.move(h[0],h[1]+80,{steps:5});await pg.mouse.up();await pg.waitForTimeout(200);
const hl=await pg.evaluate(()=>{const r=document.querySelector('#winAdj .wh[data-e="l"]').getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2];});
await pg.mouse.move(hl[0],hl[1]);await pg.mouse.down();await pg.mouse.move(hl[0]+30,hl[1],{steps:5});await pg.mouse.up();await pg.waitForTimeout(200);
const m=await pg.evaluate(()=>{const r=document.getElementById('app').getBoundingClientRect();return {WIN:JSON.parse(localStorage.getItem('msp-window')),app:[r.left,r.top,r.right,r.bottom].map(Math.round),txt:document.getElementById('winTxt').textContent,VW:__msp.api.cam&&[innerWidth,innerHeight]};});
await pg.screenshot({path:'win-'+vp.width+'.png'});
await pg.reload();await pg.waitForTimeout(500);await pg.evaluate(()=>document.getElementById('tCont').click());await pg.waitForTimeout(300);
const m2=await pg.evaluate(()=>{const r=document.getElementById('app').getBoundingClientRect();return [r.left,r.top,r.right,r.bottom].map(Math.round);});
console.log(JSON.stringify(vp),JSON.stringify(m),'after reload',JSON.stringify(m2),errs);await ctx.close();}
await b.close();})();
