// review fix: a dead-end "spur" lane (in and out on the same tiles) must not count as open; drive-thru cars get no in-store events.
const {webkit}=require('playwright');const path=require('path');
const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:932,height:430}});await ctx.addInitScript(()=>{let x=6;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};localStorage.setItem('msp-career',JSON.stringify({xp:900,ach:{},tot:{},stores:1}));});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);a.setBuild(true);a.setBuild(false);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);a.hire('tech');a.hire('clerk');a.hire('clerk');a.setBuild(false);S.cash=40000;S.reg=300;
 const out={};out.win=P('dtwin',15,0,2);for(let x=15;x<=20;x++)a.placeDrive(x,-1);a.placeDrive(20,-2);a.placeDrive(21,-2);const L=a.laneNow();out.spur=L.ok?'open (bad)':L.msg;
 a.placeDrive(15,-2);for(let x=16;x<=19;x++)a.placeDrive(x,-2);const L2=a.laneNow();out.loop=L2.ok?'open':L2.msg;
 document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);S.speed=1;let mess=0;while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();mess=Math.max(mess,(S.mess||[]).filter(m=>m.y<0).length);}
 out.dtServed=S.wk.dtServed||0;out.lostDt=S.wk['lost_at_the_drive-thru']||0;out.outdoorMess=mess;return out;});
const ok=/separate/.test(r.spur)&&r.loop==='open'&&r.dtServed>10&&r.outdoorMess===0&&!errs.length;
console.log(JSON.stringify(r),errs,ok?'PASS':'FAIL');await b.close();})();
