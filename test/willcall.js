const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
for(const two of [false,true]){await pg.evaluate(()=>{localStorage.clear();});await pg.reload();await pg.waitForTimeout(400);
const r=await pg.evaluate((two)=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);if(two)P('shelf',14,1);a.hire('tech');a.hire('tech');a.hire('clerk');a.setBuild(false);a.startWeek();a.setSpeed(0);
 // nobody picks up: patients never come back for bags
 const max={};let maxTotal=0;for(let i=0;i<108*3;i++){for(let f=0;f<12;f++)a.motion(.016);a.tick();for(const p of S.patients)if(p.kind==='pickup'||p.q&&S.objs.find(o=>o.id===p.q&&o.type==='register'))p.state='leaving';for(const o of S.objs.filter(o=>o.type==='shelf')){const n=S.scripts.filter(x=>x.at==='shelf:'+o.id).length;max[o.id]=Math.max(max[o.id]||0,n);}maxTotal=Math.max(maxTotal,S.scripts.filter(x=>x.stage==='shelf').length);}
 const rph=S.staff.find(w=>w.isYou);return {two,maxPerShelf:Object.values(max),maxTotal,tray:S.scripts.filter(x=>x.stage==='tray').length,full:S.wk.shelfFull||0,warn:__msp.GL.filter(e=>/Will-call is full/.test(e.text)).length};},two);
console.log(JSON.stringify(r));}
console.log(errs);await b.close();})();
