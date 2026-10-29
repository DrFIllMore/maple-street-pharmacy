const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430},deviceScaleFactor:2})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();});await pg.waitForTimeout(200);
const r=await pg.evaluate(()=>{const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);a.hire('tech');a.hire('clerk');a.setBuild(false);a.startWeek();a.setSpeed(0);
 const T=(n)=>{for(let i=0;i<n;i++){for(let f=0;f<12;f++)a.motion(.016);a.tick();}};const toDayEnd=()=>{const d=S.day;while(S.day===d)T(1);};
 const out={};const tech=S.staff.find(w=>w.role==='tech'),clerk=S.staff.find(w=>w.role==='clerk');
 // hire fee + next-day start
 const c0=S.cash;const n0=S.staff.length;document.body.innerHTML+='';a.openOffice('schedule');S.staffTab='workers';a.openOffice('schedule');a.hireCand(a.market().cands.find(x=>x.role==='tech').id);const nh=S.staff[S.staff.length-1];out.hire={fee:c0-S.cash,n:S.staff.length-n0,start:[nh.startWk,nh.startDay],offToday:nh.off||!nh.plan};
 // morale: run tech into the ground
 tech.energy=5;tech.morale=40;toDayEnd();out.day1={techMorale:tech.morale,sick:tech.sick,notice:tech.notice};
 tech.morale=12;tech.sick=0;toDayEnd();out.day2={notice:tech.notice,gl:__msp.GL.slice(-4).map(e=>e.text)};
 const e1=a.giveBonus(tech);out.bonus={err:e1,morale:tech.morale,cash:S.cash};a.giveRaise(tech);out.raise={morale:tech.morale,wage:a.wageOf(tech),raise:tech.raise};
 toDayEnd();out.day3={notice:tech.notice,gl:__msp.GL.slice(-2).map(e=>e.text)};
 // clerk quits
 clerk.morale=5;toDayEnd();toDayEnd();toDayEnd();toDayEnd();out.clerk={still:S.staff.includes(clerk),quit:S.wk.quit,gl:__msp.GL.filter(e=>/quit/.test(e.text)).map(e=>e.text)};
 out.chip=document.getElementById('stChipV').textContent;return out;});
console.log(JSON.stringify(r,null,1),errs);
await pg.evaluate(()=>{__msp.S.staffTab='workers';__msp.api.openOffice('schedule');});await pg.waitForTimeout(300);await pg.screenshot({path:'v242-staff.png'});
await pg.evaluate(()=>{__msp.api.openWorker(__msp.S.staff.find(w=>w.role==='tech'));});await pg.waitForTimeout(300);await pg.screenshot({path:'v242-card.png'});await b.close();})();
