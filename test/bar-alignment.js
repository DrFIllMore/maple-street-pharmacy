const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();
for(const [vp,sa,chatX] of [[{width:430,height:873},{t:59,b:34,l:0,r:0},null],[{width:430,height:873},{t:59,b:34,l:0,r:0},0],[{width:932,height:430},null,null]]){const ctx=await b.newContext({viewport:vp,isMobile:true,hasTouch:true});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
 await pg.addInitScript(({sa,chatX})=>{if(sa)window.__forceSA=sa;if(chatX!==null)localStorage.setItem('msp-layout2',JSON.stringify({chatX}));},{sa,chatX});
 await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
 await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();__msp.api.setBuild(false);__msp.api.startWeek();__msp.api.setSpeed(0);});await pg.waitForTimeout(300);
 const m=await pg.evaluate(()=>{const R=s=>{const r=document.querySelector(s).getBoundingClientRect();return [r.left,r.top,r.right,r.bottom].map(Math.round);};return {rot:__msp.api.cam?document.getElementById('app').classList.contains('rot'):0,bar:R('#bar'),chat:R('#chat'),strip:R('#strip'),app:R('#app')};});
 const rot=m.rot;const start=e=>rot?e[1]:e[0];const end=e=>rot?e[3]:e[2];
 console.log(JSON.stringify(vp),'chatX',chatX,'start bar/chat',start(m.bar),start(m.chat),'end bar/strip',end(m.bar),end(m.strip),errs);
 await pg.screenshot({path:'align-'+vp.width+'-'+chatX+'.png'});await ctx.close();}
await b.close();})();
