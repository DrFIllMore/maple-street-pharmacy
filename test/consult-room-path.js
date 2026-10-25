const {webkit}=require('playwright');
(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:932,height:430},deviceScaleFactor:2});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
await pg.evaluate(()=>document.getElementById('tNew').click());await pg.waitForTimeout(150);await pg.evaluate(()=>document.getElementById('go').click());await pg.waitForTimeout(150);
// shop + a room in each rotation; check the pharmacist can path to each desk's staff tile from the entrance
const r=await pg.evaluate(()=>{const a=__msp.api;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,8);P('chair',5,8);
 const out=[];const pos=[[0,6,0],[6,8,1],[12,6,2],[14,0,3]];for(const [x,y,rot] of pos){const err=P('room',x,y,rot);if(err){out.push({rot,err});continue;}const c=__msp.S.objs.filter(o=>o.type==='consult').pop();const st=a.staffTile(c),pt=a.patientTile(c);out.push({rot,err,priv:a.enclosedTest(c),staffPath:!!a.pathTest(19,8,st[0],st[1],true),patientPath:!!a.pathTest(19,8,pt[0],pt[1],false),patientToStaff:!!a.pathTest(19,8,st[0],st[1],false),exposed:a.exposedN()});}
 a.hire('tech');a.hire('clerk');a.setBuild(false);return out;});
console.log(JSON.stringify(r));
// run a day and count consults served
await pg.evaluate(()=>{__msp.api.startWeek();});
const w=await pg.evaluate(()=>{for(let i=0;i<108*2;i++){if(!__msp.S.running)break;for(let f=0;f<12;f++)__msp.api.motion(.016);__msp.api.tick();}return {consults:__msp.S.wk.consults,trustWhy:__msp.S.wk.tw.consults};});
console.log(JSON.stringify(w));await pg.evaluate(()=>{__msp.api.cam.z=.9;});await pg.waitForTimeout(300);await pg.screenshot({path:'v212-rooms2.png'});
console.log('errs',errs);await b.close();})();
