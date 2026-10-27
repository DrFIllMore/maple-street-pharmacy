const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.cash=40000;const P=(t,x,y,r)=>a.place(t,x,y,r||0);const out={};
 for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,7);a.hire('tech');a.hire('clerk');a.setBuild(false);S.opened=true;S.unlocked=Object.keys(__msp.TYPES);a.setBuild(true);
 const f=S.objs.find(o=>o.type==='fill');out.staffTile=a.staffTile?a.staffTile(f):null;out.mat=P('mat',...(a.staffTile(f)));out.br=P('breakroom',14,1);out.objs=S.objs.filter(o=>['mat','breakroom'].includes(o.type)).map(o=>o.type+'@'+o.x+','+o.y);a.setBuild(false);
 a.startWeek();a.setSpeed(0);
 for(let i=0;i<108*2;i++){for(let f2=0;f2<12;f2++)a.motion(.016);a.tick();}
 a.openOffice('schedule');out.hadv=[...document.querySelectorAll('.hadv>div')].map(d=>d.textContent);
 document.querySelector('[data-h="pt-tech"]').click();document.querySelector('[data-h="float-tech"]').click();document.getElementById('autoRest').click();
 out.staff=S.staff.map(w=>[w.name,w.role,w.floater?'temp':w.pt?'pt':'',S.sched[w.id].join(''),Math.round(a.wageOf(w))]);
 S.staff.filter(w=>!w.floater).forEach(w=>w.energy=30);
 while(S.running){for(let f2=0;f2<12;f2++)a.motion(.016);a.tick();}
 out.log=__msp.GL.filter(e=>/Resting|cover|temp/i.test(e.text)).slice(-8).map(e=>e.text);out.after=S.staff.map(w=>[w.name,S.sched[w.id].join(''),Math.round(w.energy)]);out.hist=S.hist[S.hist.length-1];
 return out;});
console.log(JSON.stringify(r,null,1).slice(0,3500),errs);await pg.evaluate(()=>__msp.api.openOffice('schedule'));await pg.waitForTimeout(200);await pg.screenshot({path:'staff-tab.png'});await b.close();})();
