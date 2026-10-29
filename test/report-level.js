const {webkit}=require('playwright');const path=require('path');const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await webkit.launch();const errs=[];const ctx=await b.newContext({viewport:{width:932,height:430},acceptDownloads:true});const pg=await ctx.newPage();pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate(()=>{localStorage.clear();document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;a.setBuild(false);
 const out=[];document.getElementById('mDbg').click();out.push(document.getElementById('dbgEnv').textContent.split('\n').find(l=>/Level/.test(l)));
 S.major=2;S.netTot=45210;S.trust=93;document.getElementById('mDbg').click();out.push(document.getElementById('dbgEnv').textContent.split('\n').find(l=>/Level/.test(l)));return out;});
const ok=/^Level 1: trust 50\/90/.test(r[0])&&/^Level 2: trust 93\/90 · net 45210\/100000 · drive-thru/.test(r[1])&&!errs.length;console.log(r.join('\n'),errs,ok?'PASS':'FAIL');await b.close();})();
