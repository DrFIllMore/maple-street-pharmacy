// Start a small store in debt (cash −$1,500, trust 35) and play 8 weeks sensibly:
// no new spending, take the insurer advance when Saturday looks red. Can it climb out?
const {webkit}=require('playwright');const path=require('path');
const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await webkit.launch();let ok=0,runs=0;const out=[];
for(const seed of [3,11,22,37]){const ctx=await b.newContext({viewport:{width:932,height:430}});await ctx.addInitScript(s=>{let x=s;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};},seed);const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file://'+GAME);await pg.waitForTimeout(250);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;const P=(t,x,y,r)=>a.place(t,x,y,r||0);S.cash=60000;for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,7);P('chair',5,7);P('chair',6,7);P('phone',0,2,1);a.hire('tech');a.hire('clerk');a.setBuild(false);
 S.cash=-1500;S.trust=35;S.reg=140;S.loan=16000;S.week=5;const adv=!!a.takeAdvance;const trail=[];
 for(let wk=0;wk<8&&!S.done;wk++){document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);S.speed=3;let t=0;
  while(S.running){for(let f=0;f<4;f++)a.motion(.0167);a.tick();t++;if(adv&&t%54===0&&S.running&&a.satCash&&a.satCash()<0&&S.ledger.reduce((s,l)=>s+l.amt,0)>=200)a.takeAdvance();}
  trail.push(`${Math.round(S.cash)}/${Math.round(S.trust)}`);}
 return {done:S.done||'',why:S.doneWhy||'',cash:Math.round(S.cash),trust:Math.round(S.trust),reg:Math.round(S.reg),trail:trail.join(' ')};});
runs++;const alive=r.done!=='lose';if(alive&&r.cash>=0)ok++;out.push(`seed ${seed}: ${r.done?r.done+' ('+r.why+')':'still open'} · cash ${r.cash} · trust ${r.trust} · regulars ${r.reg} · weekly cash/trust ${r.trail}${errs.length?' ERR '+errs[0]:''}`);await ctx.close();}
console.log(out.join('\n'));console.log(`${ok}/${runs} climbed back above $0 and stayed open`);await b.close();})();
