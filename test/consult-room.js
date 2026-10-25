const {webkit}=require('playwright');
(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:932,height:430},deviceScaleFactor:2});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
await pg.evaluate(()=>document.getElementById('tNew').click());await pg.waitForTimeout(150);await pg.evaluate(()=>document.getElementById('go').click());await pg.waitForTimeout(150);
const r=await pg.evaluate(()=>{const a=__msp.api;const out=[];const pos=[[1,1,0],[7,1,1],[1,8,2],[8,8,3]];for(const [x,y,rot] of pos){const err=a.place('room',x,y,rot);const c=__msp.S.objs.filter(o=>o.type==='consult').pop();out.push({rot,err,priv:c?a.enclosedTest(c):null,st:c&&a.staffTile(c),pt:c&&a.patientTile(c),door:(()=>{const d=__msp.S.objs.filter(o=>o.type==='door').pop();return d&&[d.x,d.y,d.rot];})()});}return {out,cash:__msp.S.cash,objs:__msp.S.objs.length};});
console.log(JSON.stringify(r));
await pg.evaluate(()=>{__msp.api.setBuild(false);__msp.api.cam.z=.9;});await pg.waitForTimeout(800);await pg.screenshot({path:'v212-rooms.png'});
await pg.evaluate(()=>{__msp.S.opened=true;__msp.api.setBuild(true);const el=document.getElementById('palItems');if(el)el.scrollLeft=700;});await pg.waitForTimeout(400);await pg.screenshot({path:'v212-pal.png',clip:{x:0,y:300,width:932,height:130}});
console.log('errs',errs);await b.close();})();
