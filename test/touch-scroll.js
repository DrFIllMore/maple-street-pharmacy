const {chromium:webkit}=require('playwright');(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:430,height:873},isMobile:true,hasTouch:true});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.addInitScript(()=>{window.__forceSA={t:59,b:34,l:0,r:0};});
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;a.place('fill',5,1);a.hire('tech');a.setBuild(false);a.startWeek();a.setSpeed(0);a.openWorker(S.staff[1],'schedule');
 const sh=document.getElementById('sheet');const tgt=sh.querySelector('.kv b')||sh;const T=(type,x,y)=>{const t=new Touch({identifier:1,target:tgt,clientX:x,clientY:y});tgt.dispatchEvent(new TouchEvent(type,{touches:type==='touchend'?[]:[t],changedTouches:[t],bubbles:true,cancelable:true}));};
 const out={};T('touchstart',200,300);for(let i=1;i<=10;i++)T('touchmove',200+i*6,300+i*6);T('touchend',260,360);out.sheet=[sh.scrollLeft,sh.scrollTop,sh.scrollWidth,sh.clientWidth];
 // office drawer still scrolls vertically (local Y)
 a.openOffice('schedule');const ob=document.getElementById('off');const tg=ob.firstElementChild||ob;const T2=(type,x,y)=>{const t=new Touch({identifier:2,target:tg,clientX:x,clientY:y});tg.dispatchEvent(new TouchEvent(type,{touches:type==='touchend'?[]:[t],changedTouches:[t],bubbles:true,cancelable:true}));};
 const before=ob.scrollTop;T2('touchstart',200,300);for(let i=1;i<=10;i++)T2("touchmove",200+i*8,300);T2("touchend",280,300);out.office=[before,ob.scrollTop,ob.scrollHeight,ob.clientHeight];return out;});
console.log(JSON.stringify(r),errs);await b.close();})();
