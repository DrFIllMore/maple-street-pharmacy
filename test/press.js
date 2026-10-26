const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430},deviceScaleFactor:2})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();});await pg.waitForTimeout(200);
const r=await pg.evaluate(()=>{try{const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);a.hire('tech');a.hire('clerk');a.setBuild(false);a.startWeek();a.setSpeed(0);
 const T=(n)=>{for(let i=0;i<n;i++){for(let f=0;f<12;f++)a.motion(.016);a.tick();}};const toDayEnd=()=>{const d=S.day;while(S.day===d)T(1);};const out={};
 const d0=a.demandPerDay();toDayEnd();out.open={press:S.press&&S.press.head,active:a.pressActive(),demand:[+d0.toFixed(1),+a.demandPerDay().toFixed(1)],chip:document.getElementById('prChip').hidden,chipV:document.getElementById('prChipV').textContent,gl:__msp.GL.filter(e=>/Gazette/.test(e.text)).map(e=>e.text)};
 toDayEnd();toDayEnd();toDayEnd();out.after3={active:a.pressActive(),demand:+a.demandPerDay().toFixed(1)};
 // force a bad story: 9 walkouts in a day
 S.wk._pl=S.wk.lost;S.wk.lost+=9;const m0=S.staff[1].morale,t0=S.trust;toDayEnd();out.bad={press:S.press&&S.press.head,bad:S.press&&S.press.bad,demand:+a.demandPerDay().toFixed(1),trust:+(S.trust-t0).toFixed(1),morale:S.staff[1].morale-m0,chipV:document.getElementById('prChipV').textContent};
 // week end → feed has press post
 toDayEnd();a.makeFeed();const f=S.feed;out.feed=f.posts.filter(p=>p.kind==='press').map(p=>p.head);
 return out;}catch(e){return {err:String(e.message)+" | "+String(e.stack)};}});
console.log(JSON.stringify(r,null,1),errs);
await pg.evaluate(()=>{document.getElementById('prChip').click();});await pg.waitForTimeout(300);await pg.screenshot({path:'v243-press.png'});await b.close();})();
