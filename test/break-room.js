const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(300);
console.log(JSON.stringify(await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.opened=true;S.unlocked=Object.keys(__msp.TYPES);S.cash=60000;
 const L='bin@0,5r1 fill@0,3r1 verify@0,1r1 shelf@0,9r1 chair@7,0 register@3,7r1L1 dropoff@3,10r1 counter@3,9r1 wall@3,12r1 wall@3,13r1 phone@0,11r1 register@3,5r1L1 fill@0,12r1 wall@4,0r1 wall@4,1r1 wall@4,2r1 breakroom@2,0 wall@4,3r1 wall@4,4';
 for(const t of L.split(' ')){const m=/^(\w+)@(\d+),(\d+)(?:r(\d))?(?:L(\d))?$/.exec(t);a.place(m[1],+m[2],+m[3],+(m[4]||0));}
 a.hire('tech');a.hire('clerk');a.setBuild(false);const br=S.objs.find(o=>o.type==='breakroom');const info={st:a.staffTile(br),reach:a.staffReach(br)};
 a.startWeek();a.setSpeed(0);for(let i=0;i<20;i++){for(let f=0;f<12;f++)a.motion(.016);a.tick();}S.staff.forEach(w=>w.energy=30);const seen=[];
 for(let i=0;i<108;i++){for(let f=0;f<12;f++)a.motion(.016);a.tick();for(const w of S.staff)if(w.plan&&w.plan.name==='break')seen.push(w.name+'@'+S.tick+':'+Math.round(w.energy));}
 return {info,breaks:S.wk.breaks||0,seen:[...new Set(seen)].slice(0,12),energy:S.staff.map(w=>w.name+':'+Math.round(w.energy))};})),errs);await b.close();})();
