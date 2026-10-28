const {webkit}=require('playwright');const path=require('path');const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await webkit.launch();const errs=[];
const ctx=await b.newContext({viewport:{width:932,height:430}});await ctx.addInitScript(()=>{window.__cineTest=1;});
const pg=await ctx.newPage();pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await pg.goto('file://'+GAME);await pg.waitForTimeout(400);
const out=await pg.evaluate(async()=>{const log=[];localStorage.clear();document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);a.hire('tech');a.setBuild(false);document.getElementById('review').hidden=true;
 a.startWeek();log.push('start:'+JSON.stringify(a.cine())+' sp='+S.speed);const t0=S.tick;await new Promise(r=>setTimeout(r,600));log.push('paused ticks='+(S.tick-t0));
 document.getElementById('cineSkip').click();log.push('after skip:'+a.cine()+' sp='+S.speed+' run='+S.running);
 // play out the week fast
 a.setSpeed(0);S.speed=1;S.trust=99;S.netTot=40000;while(S.running){for(let f=0;f<6;f++)a.motion(.016);a.tick();S.trust=99;}
 await new Promise(r=>setTimeout(r,300));log.push('weekend: cine='+JSON.stringify(a.cine())+' review='+!document.getElementById('review').hidden+' major='+S.major);
 a.endCine();await new Promise(r=>setTimeout(r,200));const go=document.getElementById('majGo');log.push('after lvl1: majGo='+!!go+' review='+!document.getElementById('review').hidden+' txt='+document.getElementById('rev').innerText.slice(0,40));
 if(go){go.click();log.push('lvl2: '+JSON.stringify(a.cine())+' review='+!document.getElementById('review').hidden);a.endCine();await new Promise(r=>setTimeout(r,200));log.push('after lvl2 review='+!document.getElementById('review').hidden+' txt='+document.getElementById('rev').innerText.slice(0,60).replace(/\n/g,' '));}
 document.querySelector('[data-tab="career"]').click();log.push('replay buttons='+document.querySelectorAll('#off [data-cine]').length);
 return log;});
const j=out.join('\n');const ok=/start:{"kind":"open"/.test(j)&&/paused ticks=0/.test(j)&&/after skip:null sp=3 run=true/.test(j)&&/cine={"kind":"lvl1"/.test(j)&&/majGo=true/.test(j)&&/lvl2: {"kind":"lvl2"/.test(j)&&/after lvl2 review=true/.test(j)&&/replay buttons=3/.test(j)&&!errs.length;console.log(j);console.log(errs,ok?'PASS':'FAIL');await b.close();})();
