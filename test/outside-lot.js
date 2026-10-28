// v25 outside lot: customers arrive by car (park, get out, walk in) or on foot from the sidewalk; parking spaces can be built; views rotate.
const {webkit}=require('playwright');const path=require('path');
const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:932,height:430}});await ctx.addInitScript(()=>{let x=4;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);a.hire('tech');a.hire('clerk');a.setBuild(false);S.major=2;S.cash=20000;S.reg=200;
 const out={stalls0:a.lotState().stalls.length,k0:+a.parkK().toFixed(3)};
 out.badSpot=a.placeStall(5,5);out.dup=a.placeStall(21,5);
 for(const y of [0,1,2,3,12,13])out['add'+y]=a.placeStall(24,y);out.stalls1=a.lotState().stalls.length;out.k1=+a.parkK().toFixed(3);
 out.remove=a.removeStall(24,13);out.stalls2=a.lotState().stalls.length;
 document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);S.speed=1;let maxParked=0,sawWalkIn=false,sawCarPerson=false,gotOut=0;
 for(let t=0;t<108*2;t++){for(let f=0;f<12;f++)a.motion(.016);a.tick();const L=a.lotLive();maxParked=Math.max(maxParked,L.cars.filter(c=>c.state==='parked').length);for(const p of S.patients){if(p.arr&&p.arr.mode==='walk')sawWalkIn=true;if(p.arr&&p.arr.mode==='car'&&!p.arrWait&&p.x>=20)sawCarPerson=true;}gotOut=Math.max(gotOut,L.walkers.filter(w=>w.car).length);}
 out.maxParked=maxParked;out.walkIns=sawWalkIn;out.carPeopleWalking=sawCarPerson;out.returnedToCars=gotOut;out.served=S.wk.served;
 a.setView('out');out.viewOut=document.getElementById('viewBtn').classList.contains('on');for(let k=0;k<4;k++)document.getElementById('camBtn').click();a.setView('in');
 return out;});
const ok=r.stalls0===6&&r.badSpot&&r.dup&&r.stalls1===12&&r.k1>r.k0&&!r.remove&&r.stalls2===11&&r.maxParked>0&&r.walkIns&&r.carPeopleWalking&&r.returnedToCars>0&&r.served>0&&!errs.length;
console.log(JSON.stringify(r),errs,ok?'PASS':'FAIL');await b.close();})();
