const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();});await pg.waitForTimeout(200);
const r=await pg.evaluate(()=>{const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('fill',5,1);
 // chairs right in front of the drop-off window, like the player's layout
 P('chair',4,6);P('chair',5,6);P('chair',3,6);a.setBuild(false);a.startWeek();a.setSpeed(0);
 const d=S.objs.find(o=>o.type==='dropoff');const line=a.queueLine?a.queueLine(d):null;let maxStack=0,maxQ=0;const seen={};
 for(let i=0;i<200;i++){for(let f=0;f<12;f++)a.motion(.016);a.tick();const q=S.patients.filter(p=>p.q===d.id&&p.state==='queued'&&p.arrived);maxQ=Math.max(maxQ,q.length);const c={};for(const p of q){const k=Math.round(p.x-.5)+','+Math.round(p.y-.5);c[k]=(c[k]||0)+1;seen[k]=1;}maxStack=Math.max(maxStack,...Object.values(c),0);}
 return {line:d._ql,maxQ,maxStack,tilesUsed:Object.keys(seen),lost:S.wk.lost};});
console.log(JSON.stringify(r),errs);await b.close();})();
