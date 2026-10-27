const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();
for(const v of ['2rph+tech','2rph+notech','2rph+tech+2fill','floater+notech']){const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.addInitScript(()=>{let s=5;Math.random=()=>{s=(s*16807)%2147483647;return s/2147483647;};});
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(300);
const r=await pg.evaluate((v)=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);
 for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);if(v.includes('2fill'))P('fill',5,3,2);
 if(v.includes('floater')){const f=a.floaterGet();S.sched[f.id]=['F','F','F','F','F','F'];}else a.hire('rph');if(!v.includes('notech'))a.hire('tech');a.hire('clerk');a.setBuild(false);a.startWeek();a.setSpeed(0);
 const st={binTicks:0,idle:{},doing:{}};const rphs=S.staff.filter(w=>w.role==='rph');
 while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();const bin=S.scripts.filter(x=>x.stage==='bin'&&!x.claimed).length;if(bin){st.binTicks++;for(const w of rphs){const k=w.off?'off':w.plan?w.plan.name:'IDLE';st.doing[k]=(st.doing[k]||0)+1;}}}
 return {v,served:S.wk.served,lost:S.wk.lost,binTicks:st.binTicks,rphWhileBasketsWait:st.doing,cap:Object.fromEntries(S.staff.map(w=>[w.name+'/'+w.role,w.wkAct]))};},v);
console.log(JSON.stringify(r),errs);}
await b.close();})();
