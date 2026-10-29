// v25.11: on a phone held upright (game turned 90°), an item's window in Build must sit on screen and its turn button must work.
const {webkit}=require('playwright');const path=require('path');const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:430,height:873},deviceScaleFactor:3,isMobile:true,hasTouch:true});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file://'+GAME);await pg.waitForTimeout(400);
await pg.evaluate(()=>{localStorage.clear();document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;a.setBuild(true);a.place('dropoff',2,10,0);a.openObj(S.objs[0]);});
await pg.waitForTimeout(300);
const box=await pg.evaluate(()=>{const sh=document.getElementById('sheet').getBoundingClientRect(),t=document.getElementById('turn').getBoundingClientRect();return {sh:[sh.left,sh.top,sh.right,sh.bottom],t:[t.left+t.width/2,t.top+t.height/2],rot0:__msp.S.objs[0].rot};});
const onScreen=box.sh[0]>=0&&box.sh[1]>=0&&box.sh[2]<=430&&box.sh[3]<=873;
await pg.touchscreen.tap(box.t[0],box.t[1]);await pg.waitForTimeout(200);
const rot1=await pg.evaluate(()=>__msp.S.objs[0].rot);
const ok=onScreen&&rot1!==box.rot0&&!errs.length;console.log(JSON.stringify({...box,onScreen,rot1}),errs,ok?'PASS':'FAIL');await b.close();})();
