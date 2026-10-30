const {webkit}=require('playwright');
(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:932,height:430},deviceScaleFactor:2});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
await pg.evaluate(()=>document.getElementById('tNew').click());await pg.waitForTimeout(150);await pg.evaluate(()=>document.getElementById('go').click());await pg.waitForTimeout(150);
await pg.evaluate(()=>{__msp.api.setBuild(false);__msp.S.opened=true;__msp.S.rivalOn=true;__msp.S.rival=.12;});
const tabs=['flow','metrics','insurance','claims','schedule','inventory','promo','feed','inbox'];const out={};
for(const t of tabs){await pg.evaluate(t=>{document.querySelector(`[data-tab="${t}"]`).click();},t);await pg.waitForTimeout(150);out[t]=await pg.evaluate(()=>document.getElementById('off').textContent.replace(/\s+/g,' ').slice(0,60));if(t==='promo')await pg.screenshot({path:'v208-promo.png'});}
console.log(JSON.stringify(out,null,1));
await pg.evaluate(()=>{document.querySelector('[data-tab="promo"]').click();});await pg.waitForTimeout(150);await pg.click('[data-promo="flyers"]');await pg.waitForTimeout(200);
console.log(await pg.evaluate(()=>({promo:__msp.S.promo,cash:__msp.S.cash})));console.log('errs',errs);await b.close();})();
