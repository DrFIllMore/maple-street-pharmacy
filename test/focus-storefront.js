// v25.26: store focus (specialization card at Level 2 with four options and real trade-offs) and the storefront that grows with rank.
const {webkit}=require('playwright');const fs=require('fs');const path=require('path');const GAME=process.env.GAME||path.join(__dirname,'..','index.html');const R=fs.readFileSync(path.join(__dirname,'..','reports','2026-10-29-v25.15-drive-thru-collapse.txt'),'utf8');const OBJS=R.match(/^objs (.*) · reach/m)[1];
(async()=>{const b=await webkit.launch();const errs=[];
for(const vp of [{width:932,height:430},{width:430,height:932,m:1}]){const ctx=await b.newContext({viewport:{width:vp.width,height:vp.height},deviceScaleFactor:2,isMobile:!!vp.m,hasTouch:true});const pg=await ctx.newPage();pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate(async (OBJS)=>{localStorage.clear();document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.unlocked=['plant','snack','mat','problem','breakroom','otc','room','consult','fridge','medshelf','dtwin'];S.major=2;S.cash=1e6;
 for(const tok of OBJS.split(' ')){const m=tok.match(/^(\w+)@(\d+),(\d+)(?:r(\d))?/);if(!m)continue;a.place(m[1],+m[2],+m[3],+(m[4]||0));}
 for(const r of ['rph','tech','clerk'])a.hire(r);a.setBuild(false);S.opened=true;S.trust=90;S.cash=30000;S.stock=4000;S.week=3;
 const out={};const tech=S.staff.find(w=>w.role==='tech');const e0=a.eff(tech);a.setSpec('fast');out.techK=+(a.eff(tech)/e0).toFixed(2);out.otcK=a.specK('otc');a.setSpec('clinic');out.shotsK=a.specK('shots');out.walkK=a.specK('walk');S.spec=null;
 out.stage0=a.frontStage();
 // the focus card on the desk, four options
 S.card='focus';S.choice=null;document.getElementById('review').hidden=false;S.wk.sumSeen=true;a.reviewDecide();await new Promise(r=>setTimeout(r,250));
 const e=document.getElementById('rev');const req=document.querySelector('.contract.req');out.btns=[...req.querySelectorAll('.csign button')].map(b=>b.textContent);out.clipped=[...req.querySelectorAll('.csign button')].some(b=>b.scrollWidth>b.clientWidth+1);out.terms=req.querySelectorAll('.cterms li').length;out.over=e.scrollHeight-e.clientHeight;out.reqOver=req.scrollWidth-req.clientWidth;
 req.querySelectorAll('.csign button')[2].click();await new Promise(r=>setTimeout(r,100));document.getElementById('run').click();out.spec=S.spec;out.logged=__msp.GL.slice(-3).some(l=>/Store focus: Front store/.test(l.text));
 // draw both views in the evening without errors
 a.setSpeed(0);S.speed=1;for(let t=0;t<85;t++){for(let f=0;f<6;f++)a.motion(.016);a.tick();}__msp.draw();a.setView('out');__msp.draw();a.setView('in');out.stage=a.frontStage();
 return out;},OBJS);
console.log(vp.width,JSON.stringify(r));
if(r.techK!==1.15||r.otcK!==.8||r.shotsK!==1.4||r.walkK!==.95)errs.push('spec multipliers '+JSON.stringify(r));if(r.btns.length!==4||r.clipped)errs.push('focus card buttons '+r.btns.join()+' clipped='+r.clipped);if(r.terms!==4)errs.push('focus terms '+r.terms);if(r.over>4)errs.push('desk overflows '+r.over);if(r.reqOver>2)errs.push('card overflows sideways '+r.reqOver);if(r.spec!=='front'||!r.logged)errs.push('choice not applied');if(r.stage<3)errs.push('stage '+r.stage);
if(vp.width===932)await pg.screenshot({path:'focus-card.png'});await ctx.close();}
console.log(errs,errs.length?'FAIL':'PASS');await b.close();})();
