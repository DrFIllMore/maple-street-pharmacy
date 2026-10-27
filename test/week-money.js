const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();for(const [vp,sa,tag] of [[{width:430,height:873},{t:59,b:34,l:0,r:0},'phone'],[{width:932,height:430},null,'desk']]){const pg=await (await b.newContext({viewport:vp,deviceScaleFactor:2,isMobile:true,hasTouch:true})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));await pg.addInitScript(s=>{if(s)window.__forceSA=s;},sa);
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);a.hire('tech');a.hire('clerk');a.setBuild(false);a.startWeek();a.setSpeed(0);for(let i=0;i<108*3+40;i++){for(let f=0;f<12;f++)a.motion(.016);a.tick();}
 const pred=document.getElementById('sat').textContent;let c0=S.cash;while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();}return {predicted:pred,actualSat:Math.round(S.cash)};});
console.log(tag,JSON.stringify(r),errs);
// screenshot the sheet mid-week on a fresh run
await pg.evaluate(()=>{const a=__msp.api,S=__msp.S;document.querySelectorAll('#next').forEach(n=>n.click());});
await pg.reload();await pg.waitForTimeout(400);await pg.evaluate(()=>{localStorage.clear();});await pg.reload();await pg.waitForTimeout(400);
await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);a.hire('tech');a.hire('clerk');a.setBuild(false);a.startWeek();a.setSpeed(0);for(let i=0;i<108*2+50;i++){for(let f=0;f<12;f++)a.motion(.016);a.tick();}document.getElementById('satSt').click();});
await pg.waitForTimeout(300);await pg.screenshot({path:'wkmoney-'+tag+'.png'});}
await b.close();})();
