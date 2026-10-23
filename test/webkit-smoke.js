const { webkit } = require('playwright');
(async()=>{const b=await webkit.launch();
 for(const [w,h,name] of [[799,430,'land'],[430,932,'port']]){
  const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2,isMobile:true,hasTouch:true});const pg=await ctx.newPage();const errs=[];
  pg.on('pageerror',e=>errs.push('PAGEERROR '+e.message));pg.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE '+m.text());});
  await pg.goto('file://'+require('path').resolve(__dirname,'../index.html')+'');await pg.waitForTimeout(1200);
  const vis=await pg.evaluate(()=>Object.fromEntries(['menu','dbg','sheet','chat','review'].map(id=>[id,getComputedStyle(document.getElementById(id)).display])));
  await pg.click('#go');await pg.waitForTimeout(200);await pg.click('#run');await pg.waitForTimeout(3000);
  const st=await pg.evaluate(()=>({running:__msp.S.running,people:__msp.S.patients.length,served:__msp.S.wk.served,chat:document.getElementById('chatTxt').textContent.slice(0,60)}));
  await pg.click('#menuBtn');await pg.click('#mDbg');await pg.waitForTimeout(200);const env=await pg.evaluate(()=>document.getElementById('dbgEnv').textContent.slice(0,60));await pg.click('#dbgClose2');const closed=await pg.evaluate(()=>getComputedStyle(document.getElementById('dbg')).display);
  await pg.screenshot({path:`test/shot-${name}.png`});console.log(name,JSON.stringify(vis),JSON.stringify(st),'dbg:',JSON.stringify(env),'closed:',closed,errs.join('|')||'no errors');await ctx.close();}
 await b.close();})();
