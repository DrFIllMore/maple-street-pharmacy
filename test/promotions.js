// v25.3 promotions: open by level, one per channel, effects, and a result line when a campaign ends.
const {webkit}=require('playwright');const path=require('path');
const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:932,height:430}});await ctx.addInitScript(()=>{let x=3;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
await pg.evaluate(()=>{localStorage.setItem('msp-career',JSON.stringify({xp:400,ach:{},tot:{},stores:0}));});await pg.reload();await pg.waitForTimeout(300);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);a.hire('tech');a.hire('clerk');a.setBuild(false);S.cash=30000;S.reg=200;
 const out={lv:document.getElementById('lvN').textContent};out.radioLocked=a.buyPromo('radio');out.paper=a.buyPromo('paper');out.flyersSameChannel=a.buyPromo('flyers');
 const t0=Math.round(S.trust),r0=Math.round(S.reg);S.major=2;out.fair=a.buyPromo('fair');out.fairEffect=`trust ${t0}→${Math.round(S.trust)} regulars ${r0}→${Math.round(S.reg)}`;
 for(let wk=0;wk<3;wk++){document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);S.speed=1;while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();}}
 out.log=(S.promoLog||[]).map(x=>`${x.n}: ${x.boost?x.extra+' customers, $'+x.val:'regulars '+x.reg}`);a.openOffice('promo');out.page=/Recent campaigns/i.test(document.getElementById('off').innerText);return out;});
const ok=/Level 2/.test(r.radioLocked)&&!r.paper&&/channel/.test(r.flyersSameChannel||'')&&!r.fair&&r.log.length>=2&&r.page&&!errs.length;
console.log(JSON.stringify(r),errs,ok?'PASS':'FAIL');await b.close();})();
