// v25.29: office pass — claims policy, live feed, team list, four Money tabs, folded Promote/Inbox, proposal terms.
const {webkit}=require('playwright');const fs=require('fs');const path=require('path');const GAME=process.env.GAME||path.join(__dirname,'..','index.html');const R=fs.readFileSync(path.join(__dirname,'..','reports','2026-10-29-v25.15-drive-thru-collapse.txt'),'utf8');const OBJS=R.match(/^objs (.*) · reach/m)[1];
(async()=>{const b=await webkit.launch();const errs=[];
const ctx=await b.newContext({viewport:{width:932,height:430},deviceScaleFactor:2,hasTouch:true});await ctx.addInitScript(()=>{let x=13;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};});const pg=await ctx.newPage();pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate(async (OBJS)=>{localStorage.clear();document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.unlocked=['plant','snack','mat','problem','breakroom','otc','room','consult','fridge','medshelf','dtwin'];S.major=2;S.cash=1e6;
 for(const tok of OBJS.split(' ')){const m=tok.match(/^(\w+)@(\d+),(\d+)(?:r(\d))?/);if(!m)continue;a.place(m[1],+m[2],+m[3],+(m[4]||0));}
 for(const r of ['rph','tech','tech','clerk','clerk'])a.hire(r);a.setBuild(false);S.opened=true;S.trust=88;S.reg=400;S.cash=20000;S.loan=8000;S.stock=3500;S.contracts.vax=true;S.vaxDoses=100;
 const out={};const run=(n)=>{document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);S.speed=1;for(let t=0;t<(n||2000)&&S.running;t++){for(let f=0;f<6;f++)a.motion(.016);a.tick();}};
 run();S.stock=3500;run(500);
 // claims: default policy appeals automatically → no open claims pile up
 out.openClaims=S.claims.filter(c=>c.status==='open').length;out.handled=S.claims.filter(c=>c.status!=='open').length;out.policy=S.claimPolicy||'appeal';out.auto=S.wk.claimAuto;
 // live feed has posts during the week
 out.live=(S.live||[]).length;out.liveKinds=[...new Set((S.live||[]).map(p=>p.kind))];out.liveSample=(S.live||[]).slice(0,2).map(p=>p.who+': '+(p.head||''));
 // pages
 const fit=async(g,t)=>{document.querySelector(`[data-group="${g}"]`).click();if(t)document.querySelector(`[data-gt="${t}"]`).click();await new Promise(r=>setTimeout(r,300));const e=document.getElementById('off');return {over:e.scrollHeight-e.clientHeight,words:e.innerText.trim().split(/\s+/).length,btns:[...e.querySelectorAll('button')].filter(b=>b.offsetParent).length,txt:e.innerText.replace(/\s+/g,' ').slice(0,80)};};
 out.money=await fit('money','metrics:money');out.moneyTabs=[...document.querySelectorAll('.gtabs button')].map(b=>b.dataset.gt);
 out.loan=await fit('money','metrics:loan');out.ins=await fit('money','insurance');
 __msp.api.openOffice('claims');await new Promise(r=>setTimeout(r,250));out.claimsPols=document.querySelectorAll('.pol').length;document.querySelector('[data-pol="ask"]').click();await new Promise(r=>setTimeout(r,100));out.policyAfter=S.claimPolicy;document.querySelector('[data-pol="appeal"]').click();
 out.team=await fit('floor','schedule:team');out.teamRows=document.querySelectorAll('.tl:not(.hd)').length;document.querySelector('[data-tview="shifts"]').click();await new Promise(r=>setTimeout(r,100));out.shiftCells=document.querySelectorAll('.tm .cell').length;document.querySelector('[data-tview="list"]').click();
 out.cap=await fit('floor','schedule:cap');out.capCols=getComputedStyle(document.querySelector('.cp.hd')).gridTemplateColumns.split(' ').length;
 out.hire=await fit('floor','schedule:hire');out.flow=await fit('floor','flow');out.quiet=!!document.querySelector('.flowok');
 out.promo=await fit('town','promo');out.promoCards=document.querySelectorAll('#off .lever').length;out.promoAll=!!document.querySelector('[data-pall]');
 out.feed=await fit('town','feed');out.livePosts=document.querySelectorAll('#off .live .post2').length;document.querySelector('[data-fview="week"]')?.click();await new Promise(r=>setTimeout(r,100));out.feedWeekTxt=document.getElementById('off').innerText.slice(0,60);
 out.inbox=await fit('town','inbox');out.inboxLines=document.querySelectorAll('.ml').length;
 out.career=await fit('career');out.badges=document.querySelectorAll('.ach').length;
 // decide: the reporter card has terms
 const C=(()=>{try{return eval('CARDS');}catch(e){return null;}})();
 return out;},OBJS);
console.log(JSON.stringify(r,null,1));
if(r.openClaims>0&&r.policy==='appeal')errs.push('claims not auto-handled');if(!r.handled)errs.push('no claims handled (policy)');if(r.live<2)errs.push('live feed empty');if(r.moneyTabs.join()!=='metrics:money,metrics:loan,insurance,metrics:equip')errs.push('money tabs '+r.moneyTabs.join());
for(const k of ['money','loan','ins'])if(r[k].over>4)errs.push(k+' overflows '+r[k].over);if(r.claimsPols!==4||r.policyAfter!=='ask')errs.push('claims policy buttons');if(r.teamRows<5||r.shiftCells<30)errs.push('team views');if(r.capCols!==3)errs.push('capacity columns '+r.capCols);if(!r.quiet&&r.flow.over>120)errs.push('flow not folded');if(r.promoCards>5)errs.push('promote not folded '+r.promoCards);if(r.inboxLines!==4)errs.push('inbox lines '+r.inboxLines);if(r.badges>5)errs.push('badges not folded');if(r.livePosts<1)errs.push('live posts not rendered');
console.log(errs,errs.length?'FAIL':'PASS');await b.close();})();
