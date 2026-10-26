const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();});await pg.waitForTimeout(200);
const r=await pg.evaluate(()=>{const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,7);P('chair',5,7);a.hire('tech');a.hire('clerk');a.setBuild(false);a.startWeek();a.setSpeed(0);
 const log=[];const day=()=>{for(let i=0;i<108;i++){for(let f=0;f<12;f++)a.motion(.016);a.tick();}};
 for(let d=0;d<18;d++){day();if(S.week>1&&S.day===0&&!S.running){a.resumeReview();a.startWeek();a.setSpeed(0);}log.push({day:d,en:S.staff.map(w=>[w.name,w.role,Math.round(w.energy),w.dBusy,w.dHands,+(w.dDrain||0).toFixed(1)])});}
 return {log,week:S.week,chip:document.getElementById('stChipV').textContent,gl:__msp.GL.filter(e=>/tired|exhausted|at risk/.test(e.text)).map(e=>e.text)};});
console.log(JSON.stringify(r,null,0).replace(/\{"day"/g,'\n{"day"'),errs);
// staff screen + schedule render
await pg.evaluate(()=>{__msp.api.openOffice('schedule');});await pg.waitForTimeout(200);
const t=await pg.evaluate(()=>{document.querySelector('[data-stab="workers"]').click();const rows=[...document.querySelectorAll('#off .srow')].map(r=>r.textContent.replace(/\s+/g,' ').trim());document.querySelector('[data-stab="shifts"]').click();const sh=[...document.querySelectorAll('#off .sh .who')].map(e=>e.textContent.replace(/\s+/g,' ').trim());return {rows,sh};});
console.log(JSON.stringify(t,null,1));await pg.screenshot({path:'v24-staff.png'});await b.close();})();
