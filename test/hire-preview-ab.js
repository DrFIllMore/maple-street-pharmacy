const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();
const scen=[{name:'busy 1 fill',reg:500,fills:1},{name:'busy 2 fills',reg:500,fills:2},{name:'quiet',reg:120,fills:1},{name:'1 fill 2 techs',reg:500,fills:1,techs:2,clerks:2,win:2}];
for(const sc of scen){const res={};for(const role of ['none','tech','clerk','rph']){res[role]=[];for(const seed of [99,123,555]){const ctx=await b.newContext({viewport:{width:932,height:430}});await ctx.addInitScript(s=>{let x=s;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};},seed);const pg=await ctx.newPage();
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(250);
const r=await pg.evaluate(([sc,role])=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);if(sc.win>1)P('dropoff',2,4);P('bin',2,1);P('fill',5,1);if(sc.fills>1)P('fill',6,2,0);P('verify',8,1);P('shelf',11,1);P('shelf',14,1);P('chair',4,7);P('chair',5,7);P('restroom',12,9,0);a.hire('tech');a.hire('clerk');for(let i=1;i<(sc.clerks||1);i++)a.hire('clerk');for(let i=1;i<(sc.techs||1);i++)a.hire('tech');a.setBuild(false);S.reg=sc.reg;
 const run=()=>{a.startWeek();a.setSpeed(0);while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();}document.getElementById('review').hidden=true;return S.hist[S.hist.length-1];};
 run();const advs=['tech','clerk','rph'].map(x=>a.hireAdvice(x));if(role!=='none'){S.cash+=5000;a.hire(role);}
 const w2=run(),w3=run();return {advs,served:w2.served+w3.served,margin:a.scriptMargin?a.scriptMargin():53};},[sc,role]);
res[role].push(r);await ctx.close();}}
 const avg=(k,f)=>res[k].reduce((t,x)=>t+f(x),0)/res[k].length;
 console.log('==',sc.name,'base served/2wk',avg('none',x=>x.served).toFixed(0));
 ['tech','clerk','rph'].forEach((role,i)=>{const dS=(avg(role,x=>x.served)-avg('none',x=>x.served))/2;const W={tech:800,clerk:650,rph:1800}[role];const verd=res.none.map(x=>x.advs[i].v||'neutral');console.log(' ',role.padEnd(6),'Δserved/wk',dS.toFixed(0).padStart(4),'≈$',(dS*53-W).toFixed(0).padStart(6),'after wage | preview:',verd.join('/'),'|',res.none[0].advs[i].t.slice(0,160));});}
await b.close();})();
