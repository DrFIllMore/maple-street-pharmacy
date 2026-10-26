const {webkit}=require('playwright');const fs=require('fs');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430},deviceScaleFactor:2})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,7);P('chair',5,7);P('restroom',12,9,0);a.hire('tech');a.setBuild(false);
 a.startWeek();a.setSpeed(0);while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();}
 const f=S.feed;const out={kind:f.photo.kind,author:f.photo.author,caption:f.photo.caption,main:f.photo.img};
 const sh=__msp.SHOTS||{};out.have=Object.keys(sh);
 const C=__msp.composePhoto;const imgs={};
 if(sh.line)imgs.line=C('line',sh.line);if(sh.busy){imgs.good=C('good',{c:sh.busy.c});imgs.viral=C('viral',{c:sh.busy.c,shares:212});}
 if(sh.newItem)imgs.new=C('new',sh.newItem);
 imgs.clipBad=C('clip',{head:'Long lines at Maple Street — 14 walk out in a day',bad:true,img:sh.busy?sh.busy.c:null});imgs.clipGood=C('clip',{head:'Maple Street keeps its word on shorter pick-up line',bad:false,img:null});
 imgs.staff=C('text',{text:'Another week of being run into the ground. Management doesn\'t listen.',by:'— a Maple Street employee',c1:'#2b3440',c2:'#4a3b52'});
 imgs.quiet=C('text',{text:'Quiet one on Maple Street this week. Come say hi.',by:'— the Maple Street team',c1:'#efe3c8',c2:'#cfe3d6',fg:'#2a2620'});
 out.imgs=imgs;return out;});
console.log(r.kind,JSON.stringify(r.author),r.caption,r.have,errs);
const html='<body style="margin:0;background:#ddd;display:grid;grid-template-columns:repeat(3,300px);gap:6px;padding:6px;font:12px sans-serif">'+Object.entries({main:r.main,...r.imgs}).map(([k,v])=>`<div><div>${k}</div><img src="${v}" style="width:300px"></div>`).join('')+'</body>';
fs.writeFileSync('photos.html',html);const p2=await b.newPage({viewport:{width:930,height:760}});await p2.goto('file://'+process.cwd()+'/photos.html');await p2.waitForTimeout(300);await p2.screenshot({path:'photos.png',fullPage:true});await b.close();})();
