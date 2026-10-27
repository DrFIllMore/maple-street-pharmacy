const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.cash=40000;const P=(t,x,y,r)=>a.place(t,x,y,r||0);
 for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);a.hire('tech');a.hire('clerk');a.setBuild(false);a.startWeek();a.setSpeed(0);S.autoRest=true;const out=[];
 while(S.running){for(let f2=0;f2<12;f2++)a.motion(.016);if(S.tick===100)S.staff.forEach(w=>{if(!w.floater)w.energy=30;});const d=S.day;a.tick();if(S.day!==d)out.push(d+': '+S.staff.map(w=>w.name+(w.floater?'(t)':'')+'='+(S.sched[w.id]||['-']).join('')+'/'+Math.round(w.energy)).join(' '));}
 out.push(...__msp.GL.filter(e=>/Resting|cover|floater/i.test(e.text)).map(e=>e.text));out.push('floatOnce '+S.hist[0].net);return out;});
console.log(r.join('\n'),errs);await b.close();})();
