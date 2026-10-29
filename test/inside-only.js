const {webkit}=require('playwright');const path=require('path');const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await webkit.launch();const errs=[];const ctx=await b.newContext({viewport:{width:932,height:430},deviceScaleFactor:2});await ctx.addInitScript(()=>{localStorage.setItem('msp-view','out');});const pg=await ctx.newPage();pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate(async()=>{const out={};document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);a.hire('tech');a.setBuild(false);document.getElementById('review').hidden=true;a.startWeek();
 out.btnHidden=document.getElementById('viewBtn').hidden&&document.getElementById('xrayBtn').hidden;a.setView('out');out.viewAfterTry=document.getElementById('viewBtn').hidden;
 await new Promise(r=>setTimeout(r,2500));return out;});

const r2=await pg.evaluate(async()=>{__msp.S.major=2;__msp.api.setView('out');await new Promise(r=>setTimeout(r,800));return {btn:!document.getElementById('viewBtn').hidden};});

const ok=r.btnHidden&&r.viewAfterTry&&r2.btn&&!errs.length;console.log(JSON.stringify({...r,...r2}),errs,ok?'PASS':'FAIL');await b.close();})();
