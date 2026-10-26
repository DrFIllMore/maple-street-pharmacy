const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();});await pg.waitForTimeout(200);
const r=await pg.evaluate(()=>{const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,7);a.hire('tech');a.hire('clerk');a.setBuild(false);a.startWeek();a.setSpeed(0);
 const T=(n)=>{for(let i=0;i<n;i++){for(let f=0;f<12;f++)a.motion(.016);a.tick();}};const toDayEnd=()=>{const d=S.day;while(S.day===d)T(1);};
 const out={};const own=S.staff.find(w=>w.isYou);
 T(100);own.energy=5;const R=Math.random;Math.random=()=>0.1;toDayEnd();Math.random=R;out.mon={sick:own.sick,day:S.day};
 T(1);out.tue={sheet:!document.getElementById('sheet').hidden,closedWhileDeciding:S.closedToday,patients:S.patients.length};document.getElementById('cvF').click();out.tue.after={closed:S.closedToday,floater:S.staff.filter(w=>w.floater).map(w=>[w.name,S.sched[w.id].join('')])};
 toDayEnd();out.tue.served=S.wk.served;out.tue.floaterBusy=S.staff.find(w=>w.floater).dBusy;
 T(1);out.wed={sheet:!document.getElementById('sheet').hidden,sick:own.sick};document.getElementById('cvC').click();const s0=S.wk.served;toDayEnd();out.wed.servedToday=S.wk.served-s0;out.wed.lostToday=S.wk.lost;out.wed.closed=S.wk.closed;
 T(2);out.thu={sheet:!document.getElementById('sheet').hidden,sick:own.sick,ownerOn:!own.off,day:S.day};
 // owner day-off guard
 out.guardNoCover=(()=>{const f=S.staff.find(w=>w.floater);S.sched[f.id][4]='O';return [(S.sched[own.id]||["F"])[4], (function(){try{return window.setShift?setShift(own,4,'O'):'n/a';}catch(e){return 'err '+e.message;}})()];})();
 out.wages={floaterWk:S.staff.find(w=>w.floater)&&S.staff.filter(w=>w.floater).map(w=>0)};
 return out;});
console.log(JSON.stringify(r,null,1),errs);await b.close();})();
