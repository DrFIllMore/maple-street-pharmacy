const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();
await pg.addInitScript(()=>{let s=5;Math.random=()=>{s=(s*16807)%2147483647;return s/2147483647;};});
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(300);
console.log(JSON.stringify(await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);
 for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);a.hire('rph');a.hire('tech');a.hire('clerk');a.setBuild(false);a.startWeek();a.setSpeed(0);
 const tech=S.staff.find(w=>w.role==='tech');const fill=S.objs.find(o=>o.type==='fill');const out={};let samples=[];
 while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();const bin=S.scripts.filter(x=>x.stage==='bin'&&!x.claimed).length;if(!tech.off&&!tech.plan){const occ=__msp.busy()[fill.id];const who=occ?S.staff.find(w=>w.id===occ):null;const k=(bin?'bin>0':'bin=0')+' station:'+(who?who.role:'free');out[k]=(out[k]||0)+1;if(bin&&!who&&samples.length<5)samples.push({bin,binAt:S.scripts.filter(x=>x.stage==='bin'&&!x.claimed).map(x=>x.at).slice(0,3),techPos:[+tech.x.toFixed(1),+tech.y.toFixed(1)],why:''});}}
 return {out,samples};})));await b.close();})();
