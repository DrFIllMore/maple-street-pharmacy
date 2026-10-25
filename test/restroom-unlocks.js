const {webkit}=require('playwright');
(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:932,height:430},deviceScaleFactor:2});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
await pg.evaluate(()=>document.getElementById('tNew').click());await pg.waitForTimeout(150);await pg.evaluate(()=>document.getElementById('go').click());await pg.waitForTimeout(150);
const r0=await pg.evaluate(()=>{const a=__msp.api;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,8);P('chair',5,8);const e1=P('restroom',12,9,0);const e2=P('phone',0,2,1);a.hire('tech');a.hire('clerk');a.setBuild(false);return {owner:__msp.S.staff[0].name,restroom:e1,phoneBeforeUnlock:e2,palette:__msp.S.opened};});
console.log(JSON.stringify(r0));
await pg.evaluate(()=>{__msp.api.startWeek();__msp.api.setSpeed(0);});
const weeks=[];
for(let wk=1;wk<=4;wk++){const r=await pg.evaluate(()=>{let loo=0,inLoo=0;for(let i=0;i<108*6+2;i++){if(!__msp.S.running)break;for(let f=0;f<12;f++)__msp.api.motion(.016);__msp.api.tick();for(const p of __msp.S.patients){if(p.state==='toLoo')loo++;if(p.state==='inLoo')inLoo++;}}const S=__msp.S;const o=S.objs.find(x=>x.type==='restroom');return {week:S.week-1,looTicks:loo,inLooTicks:inLoo,uses:o&&(o.uses||0),denied:S.wk.looDenied,lostLoo:S.wk.lost_needing_the_restroom||0,served:S.wk.served,unlocked:S.unlocked,newItems:S.newItems,unlocksThisWeek:(S.wk.unlocks||[]).map(u=>u.items.join('+'))};});weeks.push(r);console.log(JSON.stringify(r));
 await pg.waitForTimeout(100);if(wk===1)await pg.screenshot({path:'v23-gazette.png'});
 for(let k=0;k<5;k++){const n=await pg.$('#next');if(!n)break;await pg.click('#next');await pg.waitForTimeout(100);}
 const opts=await pg.$$('.contract.req .csign button');if(opts.length){await opts[0].click();await pg.waitForTimeout(80);}
 if(wk===2){await pg.$eval('#floorX',e=>e.click());await pg.waitForTimeout(150);await pg.evaluate(()=>__msp.api.setBuild(true));await pg.waitForTimeout(400);await pg.screenshot({path:'v23-palette.png',clip:{x:0,y:300,width:932,height:130}});await pg.evaluate(()=>__msp.api.setBuild(false));await pg.$eval('#resume',e=>e.click());await pg.waitForTimeout(150);}
 await pg.click('#run');await pg.evaluate(()=>__msp.api.setSpeed(0));await pg.waitForTimeout(60);}
// restroom removed: does the need produce walk-outs?
await pg.evaluate(()=>{const o=__msp.S.objs.find(x=>x.type==='restroom');__msp.api.removeObj(o.id);});
const r2=await pg.evaluate(()=>{for(let i=0;i<108*6+2;i++){if(!__msp.S.running)break;for(let f=0;f<12;f++)__msp.api.motion(.016);__msp.api.tick();}const S=__msp.S;return {denied:S.wk.looDenied,lostLoo:S.wk.lost_needing_the_restroom||0,feedHeads:(S.feed&&S.feed.posts||[]).map(p=>p.head)};});
console.log('no restroom week',JSON.stringify(r2));
await pg.evaluate(()=>{__msp.api.cam.z=1.3;});await pg.waitForTimeout(400);await pg.screenshot({path:'v23-floor.png'});console.log('errs',errs);await b.close();})();
