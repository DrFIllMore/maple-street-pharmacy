const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();
for(const [vp,sa] of [[{width:430,height:873},{t:59,b:34,l:0,r:0}],[{width:932,height:430},null]]){
const ctx=await b.newContext({viewport:vp,isMobile:true,hasTouch:true});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.addInitScript(sa=>{if(sa)window.__forceSA=sa;},sa);
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.cash=90000;let x=2;const bad=[];
 for(const t of Object.keys(__msp.TYPES)){try{a.place(t,x,2);}catch(e){}x+=2;if(x>12)x=2;}
 a.hire('tech');a.hire('rph');
 const M=(n)=>{const s=document.getElementById('sheet');if(s.hidden)return;if(s.scrollHeight>s.clientHeight+1||s.scrollWidth>s.clientWidth+1)bad.push([n,s.scrollHeight,s.clientHeight,s.scrollWidth,s.clientWidth]);};
 for(const o of S.objs){a.openObj(o);M(o.type);}
 for(const w of S.staff){a.openWorker(w,'schedule');M('worker:'+w.role);}
 return bad;});
console.log(vp.width,JSON.stringify(r),errs);await ctx.close();}
await b.close();})();
