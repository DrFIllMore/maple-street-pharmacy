/* truth audit: what the game says vs what happens */
const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();
const seeds=[11,22,33];const R=[];
for(const seed of seeds){const ctx=await b.newContext({viewport:{width:932,height:430}});await ctx.addInitScript(s=>{let x=s;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};},seed);const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S,GL=__msp.GL;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,7);P('chair',5,7);P('restroom',12,9,0);a.hire('tech');a.hire('clerk');a.setBuild(false);S.reg=380;
 const out={forecast:[],demand:[],hourly:[],labels:{ok:0,bad:[]},idle:{ok:0,bad:[]},gaz:[]};
 for(let wk=0;wk<3;wk++){a.startWeek();a.setSpeed(0);let fc=null;let arrivals=0;const sids=new Set(S.scripts.map(x=>x.id));let dayArr=[],dPred=[];let hSnap=null;
  const glN0=GL.length;
  while(S.running){
   if(S.day===2&&S.tick===54&&fc===null)fc=a.satCash?a.satCash():null;
   if(S.tick===1)dPred.push(a.demandPerDay());
   const before=new Map(S.patients.map(p=>[p.id,p.state]));
   for(let f=0;f<12;f++)a.motion(.016);const d0=S.day;a.tick();
   for(const sc of S.scripts)if(!sids.has(sc.id)){sids.add(sc.id);if(sc.src!=='consult')arrivals++;}
   if(S.day!==d0||!S.running){dayArr.push(arrivals);arrivals=0;}
   // walk-out label check: newest 'gave up' events vs the state the person was in just before
   for(const p of S.patients){if(p.state==='leaving'&&before.has(p.id)&&before.get(p.id)!=='leaving'&&p.exitMood&&p.exitMood!=='content'){const ev=(S.wk.ev||[]).filter(e=>e.k==='gaveup'&&e.name===p.name).pop();if(!ev)continue;const st=before.get(p.id);const exp=['waiting','toSeat'].includes(st)?'waiting for the fill':['queued','toQueue'].includes(st)?null:null;if(exp&&ev.where!==exp)out.labels.bad.push(st+'->'+ev.where);else out.labels.ok++;}}
   // idle reason sanity: "nothing in the bin" while bin has unclaimed scripts, etc
   if(S.tick%9===0)for(const w of S.staff){if(w.plan||w.off||w.floater||w.x>=99)continue;const why=a.idleWhy?a.idleWhy(w):null;if(!why)continue;const binN=S.scripts.filter(x=>x.stage==='bin'&&!x.claimed).length,trayN=S.scripts.filter(x=>x.stage==='tray'&&!x.claimed).length;
     if(/nothing in the bin/.test(why)&&binN>0)out.idle.bad.push(w.role+': '+why+' (bin '+binN+')');else if(/nothing to check/.test(why)&&trayN>0)out.idle.bad.push(w.role+': '+why+' (tray '+trayN+')');else out.idle.ok++;}
  }
  const actualSat=Math.round(S.cash);out.forecast.push({predWed:fc!=null?Math.round(fc):null,actualSat});
  out.demand.push({pred:dPred.map(x=>+x.toFixed(1)),actual:dayArr});
  // hourly chat lines vs counters
  const hours=GL.slice(glN0).filter(e=>/^Hour:/.test(e.text)).map(e=>{const m=/Hour: (\d+) served, (\d+) gave up/.exec(e.text);return m?[+m[1],+m[2]]:[0,0];});const h=S.hist[S.hist.length-1];
  out.hourly.push({chatServed:hours.reduce((t,x)=>t+x[0],0),chatLost:hours.reduce((t,x)=>t+x[1],0),served:h.served,lost:h.lost});
  const rv=document.getElementById('rev');out.gaz.push((rv&&!document.getElementById('review').hidden)?rv.innerText.replace(/\s+/g,' ').slice(0,60):'');
  document.getElementById('review').hidden=true;}
 return out;});
R.push({seed,...r,errs});await ctx.close();}
for(const r of R){console.log('seed',r.seed,'errs',r.errs);console.log(' forecast',JSON.stringify(r.forecast));console.log(' demand',JSON.stringify(r.demand.map(d=>({pred:+(d.pred.reduce((t,x)=>t+x,0)).toFixed(0),act:d.actual.reduce((t,x)=>t+x,0)}))));console.log(' hourly',JSON.stringify(r.hourly));console.log(' labels',r.labels.ok,JSON.stringify(r.labels.bad.slice(0,5)));console.log(' idle',r.idle.ok,JSON.stringify(r.idle.bad.slice(0,6)));}
await b.close();})();
