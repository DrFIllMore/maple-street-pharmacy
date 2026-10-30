// v25.6 major levels: Level 1 = trust 90 + $30k net earned → opens parking, drive-thru, land, expansion, new marketing; Level 2 = trust 90 + $100k + drive-thru → win.
const {webkit}=require('playwright');const path=require('path');
const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:932,height:430}});await ctx.addInitScript(()=>{let x=9;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};localStorage.removeItem('msp-career');});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);a.hire('tech');a.hire('clerk');a.hire('clerk');a.setBuild(false);S.cash=40000;S.reg=250;
 const run=()=>{document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);S.speed=1;while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();}};
 const out={};out.goalL1=document.getElementById('goalL').textContent;out.stallL1=a.placeStall(24,2);out.radioL1=a.buyPromo('radio');out.landL1=a.buyLand('N');
 run();out.majorAfterWk1=S.major||1;
 /* meet Level 1 */S.trust=99;S.netTot=33000;run();out.trustEnd=Math.round(S.trust);out.major=S.major;out.done=S.done||'';const rev=document.getElementById('rev').innerText;out.levelPage=/Level 1 complete/i.test(rev);
 document.getElementById('majGo')&&document.getElementById('majGo').click();
 out.stallL2=a.placeStall(24,2);out.radioL2=a.buyPromo('radio');a.setBuild(true);a.setBuild(false);out.dtUnlocked=(S.unlocked||[]).includes('dtwin');
 /* Level 2 needs a working drive-thru too */S.trust=95;S.netTot=120000;run();out.doneNoDt=S.done||'';
 a.place('dtwin',15,0,2);for(let x=20;x>=15;x--)a.placeDrive(x,-1);a.placeDrive(15,-2);for(let x=16;x<=22;x++)a.placeDrive(x,-2);out.dtOpen=a.dtOpen();S.trust=95;run();out.final=S.done||'';out.major3=S.major;out.tls=!!S.tls;/* v25.27: Level 2 complete opens Level 3 (The Three Letter Store) instead of ending the game */
 return out;});
const ok=r.goalL1==='Level 1'&&r.stallL1&&/Level 2/.test(r.radioL1)&&r.landL1&&r.majorAfterWk1===1&&r.major===2&&!r.done&&r.levelPage&&!r.stallL2&&!r.radioL2&&r.dtUnlocked&&!r.doneNoDt&&r.dtOpen&&r.final===''&&r.major3===3&&r.tls&&!errs.length;
console.log(JSON.stringify(r),errs,ok?'PASS':'FAIL');await b.close();})();
