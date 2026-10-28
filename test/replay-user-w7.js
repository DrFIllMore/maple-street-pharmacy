/* replay of the week-7 report layout: with/without fill upgrades; break room use; chair & snack use */
const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();
for(const plan of ['as is','upgraded']){const ctx=await b.newContext({viewport:{width:932,height:430}});await ctx.addInitScript(()=>{let x=777;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(300);
const r=await pg.evaluate((plan)=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.opened=true;S.unlocked=Object.keys(__msp.TYPES);S.cash=60000;
 const L='bin@0,5r1 fill@0,3r1 verify@0,1r1 shelf@0,9r1 chair@7,0 chair@8,0 chair@9,0 chair@10,0 chair@11,0 register@3,7r1L1 dropoff@3,10r1 counter@3,9r1 wall@3,12r1 wall@3,13r1 phone@0,11r1 snack@7,13r2 problem@0,7r1 register@3,5r1L1 plant@12,0 restroom@5,0 plant@6,0 fill@0,12r1 wall@4,0r1 wall@4,1r1 wall@4,2r1 breakroom@2,0 wall@4,3r1 wall@4,4';
 const fails=[];for(const t of L.split(' ')){const m=/^(\w+)@(\d+),(\d+)(?:r(\d))?(?:L(\d))?$/.exec(t);const e=a.place(m[1],+m[2],+m[3],+(m[4]||0));if(e)fails.push(t+':'+e);else if(m[5])S.objs[S.objs.length-1].level=+m[5];}
 a.hire('tech');a.hire('clerk');a.hire('clerk');a.hire('tech');a.hire('clerk');a.setBuild(false);Object.assign(S,{reg:200,trust:26,cash:5000,cashPrice:52});
 if(plan==='upgraded'){S.cash+=5000;a.openOffice('inventory');for(const btn of [...document.querySelectorAll('[data-upg]')]){const o=S.objs.find(x=>String(x.id)===btn.dataset.upg);if(o&&o.type==='fill')btn.click();}a.closeOffice&&a.closeOffice();}
 const out=[];let seated=0;for(let wk=0;wk<3;wk++){document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();seated+=S.patients.filter(p=>p.state==='waiting'&&p.seat).length;}const h=S.hist[S.hist.length-1];out.push(`served ${h.served} lost ${h.lost} later ${S.wk.later||0} snacks ${S.wk.snacks||0} breaks ${S.wk.breaks||0} bin ${S.scripts.filter(x=>x.stage==='bin').length} seatTicks ${seated}`);seated=0;}
 return {plan,fails,fillLv:S.objs.filter(o=>o.type==='fill').map(o=>o.level),out};},plan);
console.log(JSON.stringify(r,null,1),errs);await ctx.close();}
await b.close();})();
