const {webkit}=require('playwright');
(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:932,height:430}});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
await pg.evaluate(()=>document.getElementById('tNew').click());await pg.waitForTimeout(150);await pg.evaluate(()=>document.getElementById('go').click());await pg.waitForTimeout(150);
// simulate a v21.1 room: 4x5 with a wall behind the pharmacist (no staff door), then save, reload, continue
await pg.evaluate(()=>{const a=__msp.api;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,8);P('chair',5,8);
 P('consult',13,8,0);for(let x=12;x<=15;x++)for(let y=6;y<=10;y++){const edge=x===12||x===15||y===6||y===10;if(!edge)continue;if(x===13&&y===10)P('door',x,y,0);else P('wall',x,y,0);}a.hire('tech');a.hire('clerk');a.setBuild(false);});
const before=await pg.evaluate(()=>{const c=__msp.S.objs.find(o=>o.type==='consult');return {reach:__msp.api.staffReach(c),card:(__msp.api.openObj(c),document.getElementById('sheet').textContent.replace(/\s+/g,' ').slice(0,200))};});console.log('before',JSON.stringify(before));
await pg.evaluate(()=>{window.dispatchEvent(new Event('pagehide'));});await pg.reload();await pg.waitForTimeout(500);await pg.evaluate(()=>document.getElementById('tCont').click());await pg.waitForTimeout(300);
const after=await pg.evaluate(()=>{const c=__msp.S.objs.find(o=>o.type==='consult');return {reach:__msp.api.staffReach(c),sdoors:__msp.S.objs.filter(o=>o.type==='sdoor').map(o=>[o.x,o.y,o.rot]),log:__msp.GL.slice(-1)[0].text};});console.log('after',JSON.stringify(after));console.log('errs',errs);await b.close();})();
