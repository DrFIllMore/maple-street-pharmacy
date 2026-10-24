const {webkit}=require('playwright');
(async()=>{const b=await webkit.launch();
for(const [vw,vh,tag] of [[393,852,'P15']]){const ctx=await b.newContext({viewport:{width:vw,height:vh},deviceScaleFactor:2,isMobile:true,hasTouch:true,colorScheme:'dark'});const pg=await ctx.newPage();const errs=[];
pg.on('pageerror',e=>errs.push('PAGEERROR '+e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(500);
await pg.evaluate(()=>document.getElementById('tNew').click());await pg.waitForTimeout(150);await pg.evaluate(()=>document.getElementById('go').click());await pg.waitForTimeout(150);
await pg.evaluate(()=>{const a=__msp.api;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [2,3,6,7,8,11,12,13])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,8);P('chair',5,8);P('consult',15,10);a.hire('tech');a.hire('clerk');a.setBuild(false);document.getElementById('review').hidden=true;a.startWeek();for(let i=0;i<108*6+2;i++){if(!__msp.S.running)break;for(let f=0;f<12;f++)__msp.api.motion(.016);__msp.api.tick();}});
await pg.waitForTimeout(300);
const fit=()=>pg.evaluate(()=>{const r=document.getElementById('rev');return {sh:r.scrollHeight,ch:r.clientHeight,fits:r.scrollHeight<=r.clientHeight+1};});
await pg.evaluate(()=>document.getElementById('next').click());await pg.waitForTimeout(300);console.log(tag,'feed',JSON.stringify(await fit()));await pg.screenshot({path:`v176-${tag}-feed.png`});
await pg.evaluate(()=>document.getElementById('next').click());await pg.waitForTimeout(300);console.log(tag,'inbox',JSON.stringify(await fit()));await pg.screenshot({path:`v176-${tag}-inbox.png`});
await pg.evaluate(()=>document.getElementById('next').click());await pg.waitForTimeout(300);console.log(tag,'decide',JSON.stringify(await fit()));await pg.screenshot({path:`v176-${tag}-decide.png`});
console.log('errs',errs);await ctx.close();}
await b.close();})();
