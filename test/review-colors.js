const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:430,height:873},deviceScaleFactor:2,isMobile:true,hasTouch:true,colorScheme:process.argv[2]||'dark'});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.addInitScript(()=>{window.__forceSA={t:59,b:34,l:0,r:0};});
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,7);a.hire('tech');a.hire('clerk');a.setBuild(false);a.startWeek();a.setSpeed(0);for(let i=0;i<300;i++){for(let f=0;f<12;f++)a.motion(.016);a.tick();}});
await pg.screenshot({path:'hud-'+(process.argv[2]||'dark')+'.png'});
await pg.evaluate(()=>{const a=__msp.api,S=__msp.S;while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();}});await pg.waitForTimeout(400);
await pg.screenshot({path:'rev-'+(process.argv[2]||'dark')+'.png'});console.log(errs);await b.close();})();
