const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();
const variants=['none','clerk','tech','rph','tech+fill'];
for(const v of variants){const ctx=await b.newContext({viewport:{width:932,height:430}});await ctx.addInitScript(()=>{let s=4242;Math.random=()=>{s=(s*16807)%2147483647;return s/2147483647;};});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
const r=await pg.evaluate((v)=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,7);P('chair',5,7);P('restroom',12,9,0);a.hire('tech');a.hire('clerk');a.setBuild(false);S.reg=300;
 const days=[];const run=()=>{a.startWeek();a.setSpeed(0);let d=S.day,s0=S.wk.served,l0=S.wk.lost;while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();if(S.day!==d||!S.running){days.push([S.week-(S.running?0:1),d,S.wk.served-s0,S.wk.lost-l0]);d=S.day;s0=S.wk.served;l0=S.wk.lost;}}};
 run();
 if(v==='clerk')a.hire('clerk');if(v==='tech')a.hire('tech');if(v==='rph')a.hire('rph');if(v==='tech+fill'){a.hire('tech');a.setBuild(true);P('fill',2,2);a.setBuild(false);}
 run();run();
 const wk=w=>days.filter(x=>x[0]===w);const sum=(w,i)=>wk(w).reduce((t,x)=>t+x[i],0);
 return {v,demand:+a.demandPerDay().toFixed(1),w1:[sum(1,2),sum(1,3)],w2:[sum(2,2),sum(2,3)],w3:[sum(3,2),sum(3,3)],staff:S.staff.map(w=>w.role).join(','),fills:S.objs.filter(o=>o.type==='fill').length};},v);
console.log(JSON.stringify(r),errs);await ctx.close();}
await b.close();})();
