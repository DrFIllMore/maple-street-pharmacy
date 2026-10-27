const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();
const VPS=[['phone',{width:430,height:873},{t:59,b:34,l:0,r:0}],['phone-min',{width:375,height:667},{t:20,b:0,l:0,r:0}],['desk',{width:932,height:430},null]];
for(const [nm,vp,sa] of VPS){const ctx=await b.newContext({viewport:vp,isMobile:nm!=='desk',hasTouch:nm!=='desk'});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message+' @'+(e.stack||'').split('\n')[1]));
 await pg.addInitScript(sa=>{if(sa)window.__forceSA=sa;},sa);
 await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
 const M=async(label)=>{await pg.waitForTimeout(60);const r=await pg.evaluate(()=>{const e=document.getElementById('rev');if(!e||document.getElementById('review').hidden)return null;return [e.scrollHeight,e.clientHeight,e.scrollWidth,e.clientWidth,e.style.fontSize];});if(r)console.log(nm.padEnd(9),label.padEnd(10),r[0]>r[1]+1?'SCROLLS '+(r[0]-r[1])+'px':'fits',r[2]>r[3]+1?'HSCROLL':'',r[4]||'' );await pg.screenshot({path:`fit-${nm}-${label}.png`});};
 await pg.evaluate(()=>document.getElementById('tNew').click());await pg.waitForTimeout(200);await M('intro');
 // build: place everything incl new items via the real UI path for errors
 await pg.evaluate(()=>{document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,7);a.hire('tech');a.hire('clerk');});
 await pg.waitForTimeout(200);await pg.screenshot({path:`fit-${nm}-build.png`});
 await pg.evaluate(()=>{const a=__msp.api;a.setBuild(false);});await pg.waitForTimeout(200);await M('checklist');
 for(let wk=0;wk<3;wk++){await pg.evaluate(()=>{const a=__msp.api,S=__msp.S;document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();}});await pg.waitForTimeout(250);
  for(let k=0;k<6;k++){const st=await pg.evaluate(()=>__msp.S.stage);await M('w'+wk+'-'+st);const n=await pg.$('#next');if(!n)break;await n.click();await pg.waitForTimeout(150);}}
 console.log(nm,'errs',errs);await ctx.close();}
await b.close();})();
