// v25.19: a raise can improve speed; promotion needs 4 weeks and gives a title, +15% wage, +0.10 speed. The worker sheet has the button.
const {webkit}=require('playwright');const path=require('path');const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await webkit.launch();const errs=[];const ctx=await b.newContext({viewport:{width:932,height:430},deviceScaleFactor:2});await ctx.addInitScript(()=>{let x=3;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};});const pg=await ctx.newPage();pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate(()=>{localStorage.clear();document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;a.hire('tech');a.hire('clerk');a.hire('rph');a.setBuild(false);S.cash=50000;S.opened=true;const out={};
 const t=S.staff.find(w=>w.role==='tech'),c=S.staff.find(w=>w.role==='clerk'),r=S.staff.find(w=>w.role==='rph'&&!w.isYou);
 out.early=a.promoteStaff(t);t.tenure=4;c.tenure=4;r.tenure=4;const w0=a.wageOf(t);out.p=a.promoteStaff(t);out.after={title:t.senior,skill:t.skill,wage:a.wageOf(t),w0};out.again=a.promoteStaff(t);
 const m0=S.staff.filter(w=>!w.isYou&&w!==r).map(w=>w.morale);a.promoteStaff(r);out.mgr={skill:r.skill,teamMorale:S.staff.filter(w=>!w.isYou&&w!==r).map((w,i)=>w.morale-m0[i])};
 let gains=0;for(let i=0;i<20;i++){c.raiseWk=0;const s0=c.skill||1;a.giveRaise(c);if((c.skill||1)>s0)gains++;}out.raiseGains=gains;out.clerkSkill=c.skill;
 a.openWorker(c);out.btn=!!document.getElementById('promo');out.text=document.getElementById('sheet').innerText.replace(/\s+/g,' ').slice(0,400);return out;});
const ok=/week/.test(r.early)&&r.p===null&&r.after.title===true&&Math.abs(r.after.skill-1.1)<.001&&r.after.wage>r.after.w0&&/already/.test(r.again)&&r.mgr.teamMorale.some(d=>d===5)&&r.raiseGains>=1&&r.raiseGains<=5&&r.btn&&!errs.length;
console.log(JSON.stringify(r),errs,ok?'PASS':'FAIL');await b.close();})();
