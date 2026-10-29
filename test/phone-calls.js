// v25.17: with one phone desk busy, free drop-off windows and registers take calls too (2026-10-29 store: avg 8 calls waiting, 80 voicemails before).
const {webkit}=require('playwright');const fs=require('fs');const path=require('path');const R=fs.readFileSync(path.join(__dirname,'..','reports','2026-10-29-v25.15-drive-thru-collapse.txt'),'utf8');
const OBJS=R.match(/^objs (.*) · reach/m)[1],DRV=R.match(/^drive (.*)$/m)[1];const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await webkit.launch();const errs=[];const ctx=await b.newContext({viewport:{width:932,height:430}});await ctx.addInitScript(()=>{let x=7;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};});const pg=await ctx.newPage();pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate(([OBJS,DRV])=>{localStorage.clear();document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.cash=1e6;S.unlocked=['plant','snack','mat','problem','breakroom','otc','room','consult','fridge','medshelf','dtwin'];S.major=2;
 for(const tok of OBJS.split(' ')){const m=tok.match(/^(\w+)@(\d+),(\d+)(?:r(\d))?/);if(!m)continue;a.place(m[1],+m[2],+m[3],+(m[4]||0));}
 for(const t of DRV.split(' ')){const [x,y]=t.split(',').map(Number);a.placeDrive(x,y);}
 for(const r of ['rph','tech','clerk','clerk','tech','tech','clerk','clerk','clerk','clerk','tech','tech'])a.hire(r);
 a.setBuild(false);S.opened=true;S.trust=100;S.reg=900;S.contracts.vax=true;S.vaxDoses=60;S.stock=3000;S.inv.otcBack=300;for(const o of S.objs)if(o.type==='otc')o.stock=40;
 const ph=S.objs.find(o=>o.type==='phone');const st=a.staffTile(ph);
 document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);S.speed=1;let maxRing=0,ringT=0,phoneBusy=0,n=0,idleWhenRing=0,samples=[];
 while(S.running){for(let f=0;f<10;f++)a.motion(.016);a.tick();n++;const ring=S.scripts.filter(x=>x.stage==='ringing').length;maxRing=Math.max(maxRing,ring);ringT+=ring;if(__msp.busy()[ph.id])phoneBusy++;const idle=S.staff.filter(w=>!w.off&&!w.plan).length;if(ring>=3)idleWhenRing+=idle;if(ring>=3&&samples.length<4&&idle)samples.push(S.staff.filter(w=>!w.off&&!w.plan).map(w=>w.role+'@'+Math.floor(w.x)+','+Math.floor(w.y)+' why='+a.idleWhy(w)+' job='+a.findJob(w)+' busy='+JSON.stringify(Object.keys(__msp.busy()).map(id=>S.objs.find(o=>o.id===id)).filter(Boolean).map(o=>o.type))).join(' | '));}
 return {phoneAt:[ph.x,ph.y,ph.rot],staffTile:st,served:S.wk.served,phoneIn:S.scripts.filter(x=>x.src==='phone').length,vm:S.wk.voicemail||0,missed:S.wk.phoneMissed,maxRing,avgRing:+(ringT/n).toFixed(1),phoneBusyPct:Math.round(phoneBusy/n*100),idleWhenRing,samples};},[OBJS,DRV]);
const ok=r.avgRing<3.5&&r.vm<45&&r.served>250&&!errs.length;delete r.samples;console.log(JSON.stringify(r),errs.slice(0,3),ok?'PASS':'FAIL');await b.close();})();
