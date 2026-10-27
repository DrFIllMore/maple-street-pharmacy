const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:932,height:430}});const pg=await ctx.newPage();
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,7);P('chair',5,7);P('restroom',12,9,0);a.hire('tech');a.hire('clerk');a.setBuild(false);S.reg=500;
 const seen=new Map();const left=[];const served=[];a.startWeek();a.setSpeed(0);let t=0;
 while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();t++;for(const p of S.patients){if(!seen.has(p.id))seen.set(p.id,{t0:t,kind:p.kind});const s=seen.get(p.id);if(p.state==='leaving'&&!s.done){s.done=1;const rec={life:t-s.t0,qt:p.qt,wait:p.wait,mood:p.exitMood,kind:p.kind,state:p.prevState};(p.exitMood==='content'?served:left).push(rec);}}}
 const med=a=>{const v=a.map(x=>x.life).sort((x,y)=>x-y);return v[Math.floor(v.length/2)];};
 return {demand:+a.demandPerDay().toFixed(1),served:served.length,left:left.length,medServedTicks:med(served),medLeftTicks:med(left),leftMoods:left.reduce((o,x)=>(o[x.mood]=(o[x.mood]||0)+1,o),{}),lw:S.hist[0].lw,examples:left.slice(0,8)};});
console.log(JSON.stringify(r,null,0));await b.close();})();
