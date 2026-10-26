const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);a.hire('tech');a.hire('clerk');a.setBuild(false);a.startWeek();a.setSpeed(0);
 const T=n=>{for(let i=0;i<n;i++){for(let f=0;f<12;f++)a.motion(.016);a.tick();}};const toDayEnd=()=>{const d=S.day;while(S.day===d&&S.running)T(1);};const out={};
 // press: story at Monday close lasts Tue-Thu
 toDayEnd();out.pressOpen=[a.pressActive()];toDayEnd();out.pressOpen.push(a.pressActive());toDayEnd();out.pressOpen.push(a.pressActive());toDayEnd();out.pressOpen.push(a.pressActive());
 // cover dismiss with x = closed day
 const own=S.staff.find(w=>w.isYou);own.sick=1;own.off=true;T(1);out.pending=S.coverPending;document.querySelector('#sheet .x').click();out.afterX={pending:S.coverPending,closed:S.wk.closed,closedToday:S.closedToday};
 // half-day cover: owner AM only, floater PM → covered; floater none → not
 own.sick=0;const f=a.floaterGet();out.halfNoCover=a.setShift(own,4,'A');S.sched[f.id][4]='P';out.halfCovered=a.setShift(own,4,'A');
 // raise twice
 const t=S.staff.find(w=>w.role==='tech');out.raise=[a.giveRaise(t),a.giveRaise(t)];
 return out;});
console.log(JSON.stringify(r,null,1),errs);await b.close();})();
