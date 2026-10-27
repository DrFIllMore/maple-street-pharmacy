const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();
for(const withLoo of [true,false]){const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
const r=await pg.evaluate((withLoo)=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,7);P('chair',5,7);if(withLoo)P('restroom',12,9,0);a.hire('tech');a.hire('clerk');a.setBuild(false);
 const o=S.objs.find(x=>x.type==='restroom');const wk=[];let maxLoad=0,messMax=0,messTicks=0,cleaned=0;
 for(let k=0;k<2;k++){a.startWeek();a.setSpeed(0);while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();if(o)maxLoad=Math.max(maxLoad,(o.occ?1:0)+S.patients.filter(p=>p.state==='toLoo'&&p.looT===o.id).length);messMax=Math.max(messMax,(S.mess||[]).length);if((S.mess||[]).length)messTicks++;}
  const h=S.hist[S.hist.length-1];wk.push({served:h.served,lost:h.lost,used:S.wk.looUsed||0,denied:S.wk.looDenied||0,mess:S.wk.mess||0,lw:h.lw});}
 cleaned=__msp.GL.filter(e=>/cleaned up/.test(e.text)).length;return {withLoo,wk,maxLoad,messMax,messTicks,cleaned};},withLoo);
console.log(JSON.stringify(r),errs);}
await b.close();})();
