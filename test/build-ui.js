const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:430,height:873},isMobile:true,hasTouch:true});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message+' @'+(e.stack||'').split('\n').slice(0,3).join(' | ')));pg.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
await pg.addInitScript(()=>{window.__forceSA={t:59,b:34,l:0,r:0};});
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
await pg.evaluate(()=>{document.getElementById('tNew').click();});await pg.waitForTimeout(200);await pg.evaluate(()=>document.getElementById('go').click());await pg.waitForTimeout(300);
const types=await pg.evaluate(()=>[...document.querySelectorAll('#palItems [data-t]')].map(b=>b.dataset.t));console.log('palette',types.join(','));
const out=[];
for(const t of types){if(t==='move')continue;await pg.evaluate(t=>document.querySelector(`#palItems [data-t="${t}"]`).click(),t);await pg.waitForTimeout(80);
 const r=await pg.evaluate(t=>{const a=__msp.api,S=__msp.S;const n0=S.objs.length;for(let y=0;y<14;y++)for(let x=0;x<20;x++){a.tapTile(x,y);if(S.objs.length>n0)return 'placed@'+x+','+y;a.tapTile(x,y);if(S.objs.length>n0)return 'placed2@'+x+','+y;}return 'none';},t);out.push(t+':'+r);}
console.log(out.join(' '));
const txt=await pg.evaluate(()=>document.body.innerText);const bad=(txt.match(/.{0,40}(undefined|NaN|\[object|Error).{0,40}/g)||[]);console.log('bad text',bad);
await pg.screenshot({path:'buildui.png'});
// now week 3 with unlocks: run weeks quickly then build again
await pg.evaluate(()=>{const a=__msp.api,S=__msp.S;a.hire('tech');a.hire('clerk');a.setBuild(false);for(let k=0;k<3;k++){document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();}}document.getElementById('review').hidden=true;S.cash=50000;a.setBuild(true);});await pg.waitForTimeout(300);
const t2=await pg.evaluate(()=>{const all=[];for(const c of [...document.querySelectorAll('#palTabs [data-cat]')]){c.click();all.push(...[...document.querySelectorAll('#palItems [data-t]')].map(b=>b.dataset.t));}return all;});console.log('palette2',t2.join(','));const out2=[];
for(const t of ['mat','breakroom','phone','plant','otc','room']){if(!t2.includes(t)){out2.push(t+':locked');continue;}await pg.evaluate(t=>{for(const c of [...document.querySelectorAll('#palTabs [data-cat]')]){c.click();const b=document.querySelector(`#palItems [data-t="${t}"]`);if(b){b.click();return;}}},t);await pg.waitForTimeout(80);
 const r=await pg.evaluate(t=>{const a=__msp.api,S=__msp.S;const n0=S.objs.length;for(let y=0;y<14;y++)for(let x=0;x<20;x++){a.tapTile(x,y);if(S.objs.length>n0)return 'placed@'+x+','+y;a.tapTile(x,y);if(S.objs.length>n0)return 'placed2@'+x+','+y;}return 'none';},t);out2.push(t+':'+r);}
console.log(out2.join(' '));const txt2=await pg.evaluate(()=>document.body.innerText);console.log('bad text2',(txt2.match(/.{0,40}(undefined|NaN|\[object|Error).{0,40}/g)||[]));
await pg.screenshot({path:'buildui2.png'});console.log('errs',errs);await b.close();})();
