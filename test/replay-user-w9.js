const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();
for(const plan of ['as is','fixes']){const ctx=await b.newContext({viewport:{width:932,height:430}});await ctx.addInitScript(()=>{let x=4242;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(300);
const r=await pg.evaluate((plan)=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.opened=true;S.unlocked=Object.keys(__msp.TYPES);S.cash=60000;
 const L='dropoff@16,12r1 register@16,10r1L1 verify@12,9r1L1 fill@12,7r1L1 bin@12,11r1 counter@16,9r1 restroom@19,0 chair@17,4 chair@18,4 chair@16,4 chair@16,1 chair@17,1 shelf@12,5r1 wall@16,6 wall@15,6 wall@15,5 wall@15,4 wall@15,3 wall@15,2 wall@15,1 wall@15,0 chair@18,13r2 chair@19,13r2 chair@19,10r3 chair@19,11r3 phone@12,13r1 bin@12,12r1 dropoff@16,7r1 verify@12,3r1';
 for(const t of L.split(' ')){const m=/^(\w+)@(\d+),(\d+)(?:r(\d))?(?:L(\d))?$/.exec(t);if(!a.place(m[1],+m[2],+m[3],+(m[4]||0))&&m[5])S.objs[S.objs.length-1].level=+m[5];}
 a.hire('tech');a.hire('clerk');a.hire('clerk');a.hire('rph');a.hire('tech');a.setBuild(false);
 Object.assign(S,{week:9,trust:8.9,cash:3000,loan:14897,reg:269,stock:150,plans:{blue:true,silver:true,quick:true}});S.rivalOn=true;S.rival=.03;
 if(plan==='fixes'){a.setBuild(true);const e=a.place('fill',12,1,1);a.setBuild(false);S.cash-=0;const extra=S.staff.filter(w=>w.role==='clerk');a.quitStaff&&0;const fire=w=>{S.staff.splice(S.staff.indexOf(w),1);delete S.sched[w.id];};fire(S.staff.filter(w=>w.role==='rph'&&!w.isYou)[0]);fire(extra[1]);}
 const out=[];for(let k=0;k<6;k++){a.startWeek();a.setSpeed(0);while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();}document.getElementById('review').hidden=true;const h=S.hist[S.hist.length-1];out.push(`wk${h.week} served ${h.served} lost ${h.lost} later ${S.wk.later||0} trust ${Math.round(S.trust)} cash ${Math.round(S.cash)} net ${h.net} cost/Rx ${Math.round((S.wk.billPay||0)/Math.max(1,h.served))} tw ${JSON.stringify(Object.fromEntries(Object.entries(S.wk.tw||{}).map(([k,v])=>[k,+v.toFixed(1)])))} lw ${JSON.stringify(h.lw)}`);}
 return {plan,staff:S.staff.map(w=>w.role).join(','),fills:S.objs.filter(o=>o.type==='fill').length,out};},plan);
console.log('==',r.plan,r.staff,'fills',r.fills);r.out.forEach(x=>console.log('  ',x));console.log(errs);await ctx.close();}
await b.close();})();
