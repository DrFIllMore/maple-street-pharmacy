const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
console.log(JSON.stringify(await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);P('register',9,4);P('fill',5,1);P('verify',8,1);S.cash=50000;const out={};
 for(const t of ['register','fill','verify']){const o=S.objs.find(x=>x.type===t);a.openObj(o);const u=document.getElementById('upg');out[t]={btn:u?u.outerHTML.slice(0,120):null,sheet:document.getElementById('sheet').hidden?'hidden':'shown'};if(u){u.click();out[t].level=o.level;}}
 // during the week (running) and via tapTile
 a.setBuild(false);a.startWeek();a.setSpeed(0);const f=S.objs.find(x=>x.type==='fill');a.tapTile&&a.tapTile(f.x,f.y);out.tap={sheet:document.getElementById('sheet').hidden?'hidden':'shown',upg:!!document.getElementById('upg'),txt:document.getElementById('sheet').textContent.slice(0,120)};
 return out;})),errs);await b.close();})();
