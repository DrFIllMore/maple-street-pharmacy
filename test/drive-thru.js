// v25 drive-thru: window on the north wall, a short lane from the lot past the window and back; pick-ups come by car.
const {webkit}=require('playwright');const path=require('path');
const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:932,height:430}});await ctx.addInitScript(()=>{let x=6;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,7);P('chair',5,7);P('phone',0,2,1);a.hire('tech');a.hire('clerk');a.hire('clerk');a.setBuild(false);S.major=2;S.cash=40000;S.reg=300;S.opened=true;S.unlocked=['dtwin'];
 const out={};out.lane0=a.laneNow().msg;out.wrongWall=P('dtwin',19,2,1);out.place=P('dtwin',15,0,2);out.lane1=a.laneNow().msg;
 /* in from the north connector, west along the store's north side past the window, back east one row up */
 for(let x=20;x>=15;x--)a.placeDrive(x,-1);out.lane2=a.laneNow().msg;a.placeDrive(15,-2);for(let x=16;x<=22;x++)a.placeDrive(x,-2);
 out.frontLot=a.placeDrive(22,3);out.lane=a.laneNow().ok?`open, ${a.laneNow().slots} slots`:a.laneNow().msg;
 let dtCars=0,maxLine=0;for(let wk=0;wk<1;wk++){document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);S.speed=1;while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();const L=a.lotLive();const n=L.cars.filter(c=>c.dt).length;maxLine=Math.max(maxLine,n);}}
 out.served=S.wk.served;out.dtServed=S.wk.dtServed||0;out.dtPast=S.wk.dtPast||0;out.lostDt=S.wk['lost_at_the_drive-thru']||0;out.maxCars=maxLine;out.lost=S.wk.lost;
 return out;});
const ok=r.wrongWall&&!r.place&&/^open/.test(r.lane)&&r.frontLot&&r.dtServed>0&&!errs.length;
console.log(JSON.stringify(r),errs,ok?'PASS':'FAIL');await b.close();})();
