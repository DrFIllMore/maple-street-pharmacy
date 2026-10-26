const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S,T=__msp.TYPES;S.cash=99999;S.opened=true;S.unlocked=Object.keys(T);const P=(t,x,y,r)=>{const e=a.place(t,x,y,r||0);return e?t+'@'+x+','+y+': '+e:null;};const placeErr=[];const p=(...q)=>{const e=P(...q);if(e)placeErr.push(e);};
 for(const x of [0,1,2,3,6,7,8,11,12,13,16,17,18,19])p('counter',x,4);p('dropoff',4,4);p('dropoff',14,4);p('register',9,4);
 p('bin',2,1);p('bin',3,1);p('fill',5,1);p('fill',5,3,2);p('verify',8,1);p('verify',17,3,2);p('shelf',11,1);p('shelf',11,3,2);p('phone',0,2,1);p('problem',14,1);p('fridge',17,1);p('medshelf',17,2);
 p('chair',3,7);p('chair',4,7);p('chair',5,7);p('restroom',12,9,0);p('otc',8,8);p('plant',1,12);p('room',15,7);
 a.hire('tech');a.hire('tech');a.hire('clerk');a.hire('clerk');a.hire('rph');a.setBuild(false);a.signContract('vax');a.signContract('special');
 const tr0=S.trust;a.startWeek();a.setSpeed(0);let maxShelf={};
 while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();}
 const by=t=>S.objs.filter(o=>o.type===t);const st=o=>({jobs:o.wkJobs||0,busy:o.wkTt?Math.round(100*(o.wkBt||0)/o.wkTt):0,earn:Math.round(o.earnAll||0),uses:o.usesWk||0,sold:o.soldTot||o.sold||0,stock:o.stock});
 const out={placeErr,demandMedshelf:null};for(const t of ['dropoff','register','bin','fill','verify','shelf','phone','problem','consult','chair','restroom','otc','fridge','medshelf','plant'])out[t]=by(t).map(st);
 const w=S.wk;out.wk={served:w.served,lost:w.lost,consults:w.consults,special:w.special||0,missed:w.phoneMissed,otc:w.otc,writeoff:w.writeoff,trustDelta:+(S.trust-tr0).toFixed(1),tw:w.tw};
 out.inv={specStages:S.scripts.filter(x=>x.special).map(x=>x.stage).join(','),recv:JSON.stringify(S.inv.recv),usedBrand:S.inv.used.brand,specialScripts:S.scripts.filter(x=>x.special).length,specialEver:window.__spc||0,brandOrder:S.inv.order.brand,brand:S.inv.brand,vax:S.vaxDoses,stock:S.stock,otcBack:S.inv.otcBack};
 // pathing rules
 out.path={wallBlocksPatient:!a.pathTest(10,6,10,2,false),counterLetsStaff:!!a.pathTest(10,6,10,2,true)};
 return out;});
console.log(JSON.stringify(r,null,0).replace(/\],"/g,'],\n"'),errs);await b.close();})();
