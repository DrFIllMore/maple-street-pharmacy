const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430},deviceScaleFactor:2})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();});await pg.waitForTimeout(200);
const r=await pg.evaluate(()=>{const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);a.hire('tech');a.hire('clerk');a.setBuild(false);a.startWeek();a.setSpeed(0);
 const own=S.staff.find(w=>w.isYou);const out={};out.g1=a.setShift(own,3,'O');out.g1b=a.setShift(own,3,'A');const f=a.bookFloater(3);out.g2=a.setShift(own,3,'O');out.sched=[S.sched[own.id].join(''),S.sched[f.id].join('')];out.floatWage=a.wageOf(f);out.total=a.wages();
 a.bookFloater(4);out.floatWage2=a.wageOf(f);S.staff[1].energy=18;S.staff[2].sick=2;S.staff[2].off=true;for(let i=0;i<30;i++){for(let k=0;k<12;k++)a.motion(.016);a.tick();}out.chip=document.getElementById('stChipV').textContent;return out;});
console.log(JSON.stringify(r),errs);
await pg.evaluate(()=>{__msp.S.staffTab='workers';__msp.api.openOffice('schedule');});await pg.waitForTimeout(300);await pg.screenshot({path:'v241-staff.png'});
await pg.evaluate(()=>{document.querySelector('[data-stab="shifts"]').click();});await pg.waitForTimeout(200);await pg.screenshot({path:'v241-sched.png'});await b.close();})();
