const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();
for(const extraFill of [false,true]){const ctx=await b.newContext({viewport:{width:932,height:430}});await ctx.addInitScript(()=>{let s=777;Math.random=()=>{s=(s*16807)%2147483647;return s/2147483647;};});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
const r=await pg.evaluate((extraFill)=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.opened=true;S.unlocked=Object.keys(__msp.TYPES);S.cash=60000;
 const L='dropoff@16,12r1 register@16,10r1L1 verify@12,9r1L1 fill@12,7r1L1 bin@12,11r1 counter@16,9r1 restroom@19,0 chair@17,4 chair@18,4 chair@16,4 chair@16,1 chair@17,1 shelf@12,5r1 wall@16,6 wall@15,6 wall@15,5 wall@15,4 wall@15,3 wall@15,2 wall@15,1 wall@15,0 chair@18,13r2 chair@19,13r2 chair@19,10r3 chair@19,11r3 phone@12,13r1 bin@12,12r1 dropoff@16,7r1 verify@12,3r1';
 const fails=[];for(const t of L.split(' ')){const m=/^(\w+)@(\d+),(\d+)(?:r(\d))?(?:L(\d))?$/.exec(t);const e=a.place(m[1],+m[2],+m[3],+(m[4]||0));if(e)fails.push(t+':'+e);else if(m[5]){const o=S.objs[S.objs.length-1];o.level=+m[5];}}
 if(extraFill){const e=a.place('fill',12,1,1);if(e)fails.push('extrafill:'+e);else S.objs[S.objs.length-1].level=1;}
 a.hire('tech');a.hire('clerk');a.hire('clerk');a.hire('rph');a.hire('tech');a.setBuild(false);S.reg=262;S.trust=40;S.cash=10000;
 const out=[];for(let k=0;k<2;k++){a.startWeek();a.setSpeed(0);while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();}const h=S.hist[S.hist.length-1];out.push({served:h.served,lost:h.lost,lw:h.lw,trust:Math.round(S.trust)});}
 return {extraFill,fails,out,fills:S.objs.filter(o=>o.type==='fill').length,adv:['tech','clerk','rph'].map(r=>r+': '+a.hireAdvice(r).t)};},extraFill);
console.log(JSON.stringify(r,null,1),errs);await ctx.close();}
await b.close();})();
