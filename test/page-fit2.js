const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();
for(const [nm,vp,sa] of [['phone',{width:430,height:873},{t:59,b:34,l:0,r:0}],['phone-min',{width:375,height:667},{t:20,b:0,l:0,r:0}]]){const ctx=await b.newContext({viewport:vp,isMobile:true,hasTouch:true});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
 await pg.addInitScript(sa=>{window.__forceSA=sa;},sa);await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
 const M=async l=>{await pg.waitForTimeout(80);const r=await pg.evaluate(()=>{const e=document.getElementById('rev');if(document.getElementById('review').hidden)return 'hidden';return e.scrollHeight>e.clientHeight+1?'SCROLLS '+(e.scrollHeight-e.clientHeight):'fits';});console.log(nm,l,r);await pg.screenshot({path:`fit2-${nm}-${l}.png`});};
 await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();});
 await pg.evaluate(()=>{const a=__msp.api;a.place('dropoff',4,4);document.getElementById('palDone').click();});await M('checklist');
 await pg.evaluate(()=>{const a=__msp.api;let S=__msp.S;S.opened=true;for(let i=0;i<2;i++){S=__msp.S;S.cash=a.wages()+S.rent+100;S.wk.drug=0;S.day=6;a.endWeek();}});await M('bankcheck');
 await pg.evaluate(()=>{const a=__msp.api;let S=__msp.S;for(let i=0;i<2;i++){S=__msp.S;S.cash=-500;S.wk.drug=0;S.day=6;a.endWeek();}});await M('gameover');
 console.log(errs);await ctx.close();}
await b.close();})();
