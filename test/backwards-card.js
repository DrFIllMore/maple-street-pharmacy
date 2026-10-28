const {webkit}=require('playwright');(async()=>{const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:430,height:873},isMobile:true,hasTouch:true});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.addInitScript(()=>{window.__forceSA={t:59,b:34,l:0,r:0};});
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.opened=true;S.unlocked=Object.keys(__msp.TYPES);S.cash=60000;
 const L='counter@4,5r1 verify@0,8r1 bin@0,7r1 fill@0,5r1 register@4,3r1 dropoff@4,6r1 shelf@0,3r1 wall@4,10r1 wall@4,11r1 wall@4,13r1 wall@4,12r1 wall@4,2r1 wall@4,1r1 wall@4,0r1 chair@6,0 snack@6,13r2 phone@0,2r1 bin@0,10r1';
 for(const t of L.split(' ')){const m=/^(\w+)@(\d+),(\d+)(?:r(\d))?$/.exec(t);a.place(m[1],+m[2],+m[3],+(m[4]||0));}
 // force a backwards register, bypassing auto-turn, as an old save would have it
 S.objs.push({id:'oldreg',type:'register',x:4,y:8,rot:3,level:0,t0:0,born:0,bornWk:1,earnAll:0});a.place('plant',10,12);a.hire('tech');a.hire('clerk');a.setBuild(false);S.cash=500;
 window.dispatchEvent(new Event('pagehide'));return S.objs.find(o=>o.id==='oldreg').rot;});
console.log('before reload rot',r);
await pg.evaluate(()=>{__msp.api.openObj(__msp.S.objs.find(o=>o.id==='oldreg'));});await pg.waitForTimeout(200);await pg.screenshot({path:'card-backwards.png'});
const m=await pg.evaluate(()=>{const s=document.getElementById('sheet');return [s.scrollHeight,s.clientHeight];});console.log('sheet',m);
await pg.reload();await pg.waitForTimeout(800);console.log('after reload rot',await pg.evaluate(()=>__msp.S.objs.find(o=>o.id==='oldreg').rot),await pg.evaluate(()=>__msp.GL.filter(e=>/Turned/.test(e.text)).map(e=>e.text)));console.log(errs);await b.close();})();
