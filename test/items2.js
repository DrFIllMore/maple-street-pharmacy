const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S,T=__msp.TYPES;S.cash=99999;S.opened=true;S.unlocked=Object.keys(T);const P=(t,x,y,r)=>a.place(t,x,y,r||0);const out={};
 for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('shelf',11,3,2);a.hire('tech');a.hire('clerk');
 // demand effect of stock shelf
 const d0=a.demandPerDay();out.medshelfPlace=P('medshelf',15,1);out.demandUp=+(a.demandPerDay()/d0).toFixed(3);
 // rotate + move + remove every item type
 const res={};for(const t of Object.keys(T)){if(['room'].includes(t))continue;let placed=null;for(let y=6;y<13&&!placed;y++)for(let x=1;x<18&&!placed;x++){if(!P(t,x,y,0))placed=S.objs[S.objs.length-1];}
  if(!placed){res[t]='could not place';continue;}const turn=a.turnObj(placed.id);const c0=S.cash;const rm=a.removeObj(placed.id);res[t]=`turn:${turn||'ok'} rm:${rm||'ok'} refund:${Math.round(S.cash-c0)}/${T[t].cost}`;}
 out.items=res;
 // upgrades speed: register till vs card reader time
 out.levels={register:T.register.levels.map(l=>l.t),fill:T.fill.levels.map(l=>l.t),verify:(T.verify.levels||[]).map(l=>l.t)};
 // remove a will-call shelf mid-week with bags on it
 a.setBuild(false);a.startWeek();a.setSpeed(0);for(let i=0;i<200;i++){for(let f=0;f<12;f++)a.motion(.016);a.tick();}
 const sh=S.objs.filter(o=>o.type==='shelf');const onA=S.scripts.filter(x=>x.at==='shelf:'+sh[0].id).length;const busy=__msp.busy()[sh[0].id];const rm=a.removeObj(sh[0].id);
 out.removeShelf={bagsOnIt:onA,result:rm||'removed',nowOnOther:S.scripts.filter(x=>x.at==='shelf:'+sh[1].id).length,orphan:S.scripts.filter(x=>x.stage==='shelf'&&x.at&&!S.objs.some(o=>'shelf:'+o.id===x.at)).length};
 while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();}out.trustPerks=S.wk.tw&&S.wk.tw.perks;
 return out;});
console.log(JSON.stringify(r,null,1),errs);await b.close();})();
