const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.addInitScript(()=>{let s=5;Math.random=()=>{s=(s*16807)%2147483647;return s/2147483647;};});
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
const variant=process.argv[2]||'base';
const r=await pg.evaluate((variant)=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.opened=true;S.unlocked=Object.keys(__msp.TYPES);const P=(t,x,y,r)=>a.place(t,x,y,r||0);
 for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,7);P('chair',5,7);
 if(variant.includes('phone'))P('phone',0,2,1);a.hire('tech');a.hire('clerk');if(variant.includes('2clerk'))a.hire('clerk');a.setBuild(false);S.opened=false;a.startWeek();a.setSpeed(0);
 const st={ringTicks:0,ringAnswered:0,ringDead:0,binTicks:0,techIdleWithBin:0,techWhy:{},rphDoing:{},clerkDoingWhenRing:{},binWait:[],answerWait:[],fillOwner:{}};const seenRing=new Map(),binSince=new Map();
 const tech=S.staff.find(w=>w.role==='tech'),clerks=S.staff.filter(w=>w.role==='clerk'),own=S.staff.find(w=>w.isYou);
 while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();
  const ring=S.scripts.filter(x=>x.stage==='ringing'&&!x.claimed);const bin=S.scripts.filter(x=>x.stage==='bin'&&!x.claimed);
  for(const x of S.scripts){if(x.stage==='ringing'&&!seenRing.has(x.id))seenRing.set(x.id,S.day*108+S.tick);if(x.stage!=='ringing'&&seenRing.has(x.id)&&!x._a){x._a=1;if(x.stage==='dead')st.ringDead++;else{st.ringAnswered++;st.answerWait.push(S.day*108+S.tick-seenRing.get(x.id));}}
   if(x.stage==='bin'&&!binSince.has(x.id))binSince.set(x.id,S.day*108+S.tick);if(x.stage!=='bin'&&binSince.has(x.id)&&!x._b){x._b=1;st.binWait.push(S.day*108+S.tick-binSince.get(x.id));}}
  if(ring.length){st.ringTicks++;for(const c of clerks){const k=c.off?'off':c.plan?c.plan.name:'idle';st.clerkDoingWhenRing[k]=(st.clerkDoingWhenRing[k]||0)+1;}const k=own.plan?own.plan.name:'idle';st.rphDoing['ring:'+k]=(st.rphDoing['ring:'+k]||0)+1;}
  if(bin.length){st.binTicks++;if(tech&&!tech.off&&!tech.plan){st.techIdleWithBin++;}const k=tech.off?'off':tech.plan?tech.plan.name:'idle';st.techWhy[k]=(st.techWhy[k]||0)+1;}
 }
 const avg=a=>a.length?+(a.reduce((t,v)=>t+v,0)/a.length*5).toFixed(0):null;const p90=a=>a.length?[...a].sort((x,y)=>x-y)[Math.floor(a.length*.9)]*5:null;
 return {variant,voicemail:S.wk.voicemail||0,tray:S.scripts.filter(x=>x.stage==="tray").length,served:S.wk.served,lost:S.wk.lost,missed:S.wk.phoneMissed,calls:seenRing.size,answered:st.ringAnswered,dead:st.ringDead,answerMin:avg(st.answerWait),answerP90:p90(st.answerWait),ringTicks:st.ringTicks,clerkWhenRing:st.clerkDoingWhenRing,rphWhenRing:st.rphDoing,binTicks:st.binTicks,techWhenBin:st.techWhy,binWaitMin:avg(st.binWait),binWaitP90:p90(st.binWait),techIdleWithBin:st.techIdleWithBin,fillJobs:S.objs.find(o=>o.type==='fill').wkJobs,cap:Object.fromEntries(S.staff.map(w=>[w.name+'/'+w.role,w.wkAct]))};},variant);
console.log(JSON.stringify(r,null,1),errs);await b.close();})();
