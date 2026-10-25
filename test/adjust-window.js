const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:430,height:932},isMobile:true,hasTouch:true});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();__msp.api.setBuild(false);document.getElementById('mWin').onclick();});await pg.waitForTimeout(200);
const tap=async(sel)=>{const r=await pg.evaluate(s=>{const e=document.querySelector(s).getBoundingClientRect();return [e.left+e.width/2,e.top+e.height/2];},sel);await pg.touchscreen.tap(r[0],r[1]);};
for(let i=0;i<5;i++)await tap('button.pm[data-k="t"][data-d="1"]');for(let i=0;i<3;i++)await tap('button.pm[data-k="l"][data-d="1"]');await tap('button.pm[data-k="l"][data-d="-1"]');
// hold +bottom
const r=await pg.evaluate(()=>{const e=document.querySelector('button.pm[data-k="b"][data-d="1"]').getBoundingClientRect();return [e.left+e.width/2,e.top+e.height/2];});
await pg.mouse.move(r[0],r[1]);await pg.mouse.down();await pg.waitForTimeout(900);await pg.mouse.up();await pg.waitForTimeout(100);
const m=await pg.evaluate(()=>{const a=document.getElementById('app').getBoundingClientRect();return {WIN:JSON.parse(localStorage.getItem('msp-window')),app:[a.left,a.top,a.right,a.bottom].map(Math.round),shown:[...document.querySelectorAll('#winRows span')].map(e=>e.textContent)};});
await pg.screenshot({path:'win-btn.png'});console.log(JSON.stringify(m),errs);await b.close();})();
