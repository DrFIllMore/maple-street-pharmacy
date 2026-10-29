// v25.18: a weekly job market. Candidates differ in speed, stamina and wage; hiring removes one; the list changes on Monday; the Hire tab fits.
const {webkit}=require('playwright');const path=require('path');const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await webkit.launch();const errs=[];
for(const vp of [{width:932,height:430},{width:430,height:873,m:1}]){
const ctx=await b.newContext({viewport:{width:vp.width,height:vp.height},deviceScaleFactor:2,isMobile:!!vp.m,hasTouch:true});await ctx.addInitScript(()=>{let x=9;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};});const pg=await ctx.newPage();pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate(()=>{localStorage.clear();document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);a.setBuild(false);S.cash=20000;S.opened=true;
 const out={};const m1=a.market().cands.map(c=>c.role+':'+c.name+':'+c.skill+':'+c.stam+':'+c.wage+(c.pt?':pt':''));out.week1=m1;const distinct=new Set(a.market().cands.map(c=>c.skill+'/'+c.wage)).size;out.distinct=distinct;
 const c=a.market().cands.find(x=>x.role==='tech');a.hireCand(c.id);const w=S.staff.find(x=>x.name===c.name);out.hired={skill:w.skill,stam:w.stam,wage:a.wageOf(w),left:a.market().cands.length,cash:S.cash};
 S.staffTab='hire';a.openOffice('schedule');out.cards=document.querySelectorAll('.cand').length;out.fit=document.getElementById('off').scrollHeight<=document.getElementById('off').clientHeight+4;
 document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);S.speed=1;while(S.running){for(let f=0;f<10;f++)a.motion(.016);a.tick();}
 document.getElementById('review').hidden=true;const m2=a.market().cands.map(c=>c.name+':'+c.skill);out.week2=m2;out.changed=JSON.stringify(m1)!==JSON.stringify(m2);out.wagesWk=S.wk.billPay;return out;});
const ok=r.distinct>=4&&r.hired.left===5&&r.hired.skill!==1&&r.changed&&r.fit&&r.cards===5;if(!ok)errs.push('bad '+vp.width+' '+JSON.stringify(r));
console.log(vp.width,JSON.stringify(r));await ctx.close();}
console.log(errs,errs.length?'FAIL':'PASS');await b.close();})();
