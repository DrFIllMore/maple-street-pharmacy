const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const scheme=process.argv[3]||'light';
const vp=process.argv[2]==='desk'?{width:932,height:430}:{width:430,height:873};const ctx=await b.newContext({viewport:vp,deviceScaleFactor:2,isMobile:true,hasTouch:true,colorScheme:scheme});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.addInitScript(()=>{window.__forceSA={t:59,b:34,l:0,r:0};});
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
await pg.evaluate((weeks)=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,7);P('chair',5,7);P('restroom',12,9,0);a.hire('tech');a.setBuild(false);
 for(let wk=0;wk<weeks;wk++){a.startWeek();a.setSpeed(0);while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();}}},+(process.argv[4]||1));
await pg.waitForTimeout(300);await pg.evaluate(()=>{const n=document.getElementById('next');if(n)n.click();});await pg.waitForTimeout(500);
await pg.screenshot({path:`feed-${process.argv[2]||'phone'}-${scheme}.png`});console.log(errs,await pg.evaluate(()=>__msp.S.feed&&__msp.S.feed.posts.map(p=>p.kind+':'+p.who+':'+p.head)));await b.close();})();
