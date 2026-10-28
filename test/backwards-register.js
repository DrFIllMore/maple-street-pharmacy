const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:932,height:430}});await ctx.addInitScript(()=>{let x=555;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(300);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.opened=true;S.unlocked=Object.keys(__msp.TYPES);S.cash=60000;
 const L='counter@4,5r1 verify@0,8r1 bin@0,7r1 fill@0,5r1 register@4,3r1 dropoff@4,6r1 shelf@0,3r1 wall@4,10r1 wall@4,11r1 wall@4,13r1 wall@4,12r1 wall@4,2r1 wall@4,1r1 wall@4,0r1 chair@6,0 chair@7,0 chair@8,0 chair@9,0 chair@10,0 chair@11,0 restroom@12,0 snack@6,13r2 mat@0,13r2 mat@1,13r2 register@4,8r3 phone@0,2r1 bin@0,10r1';
 for(const t of L.split(' ')){const m=/^(\w+)@(\d+),(\d+)(?:r(\d))?$/.exec(t);a.place(m[1],+m[2],+m[3],+(m[4]||0));}
 a.hire('tech');a.hire('clerk');a.hire('clerk');a.hire('tech');a.hire('clerk');a.setBuild(false);S.reg=350;S.trust=31;const regs=S.objs.filter(o=>o.type==='register');
 const out=[];for(let wk=0;wk<2;wk++){document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);while(S.running){for(let f=0;f<12;f++)a.motion(.016);a.tick();}const h=S.hist[S.hist.length-1];out.push({served:h.served,lost:h.lw,uses:regs.map(r=>r.usesAll||0),snacks:S.wk.snacks||0});}
 return {rots:regs.map(o=>o.x+','+o.y+' r'+o.rot),log:__msp.GL.filter(e=>/Turned|front/.test(e.text)).map(e=>e.text),out};});
console.log(JSON.stringify(r,null,1),errs);await b.close();})();
