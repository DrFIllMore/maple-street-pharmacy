const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);a.hire('tech');a.hire('clerk');a.setBuild(false);a.startWeek();a.setSpeed(0);for(let i=0;i<200;i++){for(let f=0;f<12;f++)a.motion(.016);a.tick();}S.staffTab='cap';a.openOffice('schedule');});
console.log(await pg.evaluate(()=>[...document.querySelectorAll('.cnotes div')].map(e=>e.textContent)));
await b.close();})();
