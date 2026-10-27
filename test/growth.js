const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.addInitScript(()=>{let s=+(localStorage.getItem('seed')||7);Math.random=()=>{s=(s*16807)%2147483647;return s/2147483647;};});
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,7);P('chair',5,7);P('restroom',12,9,0);P('phone',0,2,1);a.hire('tech');a.hire('clerk');a.setBuild(false);__msp.S.autoCover=true;});
const W=+(process.argv[2]||16);
for(let wk=1;wk<=W;wk++){const r=await pg.evaluate(()=>{const S=__msp.S,a=__msp.api;a.startWeek();a.setSpeed(0);for(const w of S.staff){if((w.energy??100)<45){a.setShift(w,0,'O');}}
 while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();}
 return [S.week-1,Math.round(S.reg),+a.walkInPerDay().toFixed(1),+a.regPerDay().toFixed(1),S.hist[S.hist.length-1].served,S.hist[S.hist.length-1].lost,Math.round(S.trust),+(S.rival||0).toFixed(2),S.hist[S.hist.length-1].net,Math.round(S.cash),S.staff.map(w=>Math.round(w.energy)).join('/'),S.done||'',JSON.stringify(Object.fromEntries(Object.entries(S.wk.tw||{}).map(([k,v])=>[k,+v.toFixed(1)])))];});
 console.log(JSON.stringify(r));if(r[11])break;}
console.log(errs);await b.close();})();
