// v25.17: every Money and Supplies sub-page fits its window without scrolling (phone held upright and a 932-wide landscape phone).
const {webkit}=require('playwright');const fs=require('fs');const path=require('path');const R=fs.readFileSync(path.join(__dirname,'..','reports','2026-10-29-v25.15-drive-thru-collapse.txt'),'utf8');
const OBJS=R.match(/^objs (.*) · reach/m)[1];const GAME=process.env.GAME||path.join(__dirname,'..','index.html');const TAG=process.env.TAG||'a';
(async()=>{const b=await webkit.launch();const errs=[];
for(const vp of [{width:430,height:873,m:1},{width:932,height:430}]){
const ctx=await b.newContext({viewport:{width:vp.width,height:vp.height},deviceScaleFactor:2,isMobile:!!vp.m,hasTouch:true});await ctx.addInitScript(()=>{let x=7;Math.random=()=>{x=(x*16807)%2147483647;return x/2147483647;};});const pg=await ctx.newPage();pg.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
await pg.evaluate((OBJS)=>{localStorage.clear();document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.unlocked=['plant','snack','mat','problem','breakroom','otc','room','consult','fridge','medshelf','dtwin'];S.major=2;S.cash=1e6;
 for(const tok of OBJS.split(' ')){const m=tok.match(/^(\w+)@(\d+),(\d+)(?:r(\d))?/);if(!m)continue;a.place(m[1],+m[2],+m[3],+(m[4]||0));}
 for(const r of ['rph','tech','clerk','clerk','tech','clerk','clerk'])a.hire(r);a.setBuild(false);S.opened=true;S.trust=90;S.reg=600;S.contracts.vax=true;S.vaxDoses=40;S.loan=8000;S.cash=12000;S.stock=800;S.inv.otcBack=60;for(const o of S.objs)if(o.type==='otc')o.stock=30;
 document.getElementById('review').hidden=true;a.startWeek();a.setSpeed(0);S.speed=1;for(let t=0;t<330;t++){for(let f=0;f<6;f++)a.motion(.016);a.tick();}},OBJS);
for(const [t,sub] of [['metrics','money'],['metrics','loan'],['metrics','earn'],['metrics','equip'],['metrics','equip2'],['inventory','stock'],['inventory','deals'],['inventory','upg']]){await pg.evaluate(([t,sub])=>{document.getElementById('sheet').hidden=true;document.getElementById('cheer').hidden=true;if(t==='metrics'){__msp.S.moneyTab=sub==='equip2'?'equip':sub;__msp.S.eqView=sub==='equip2'?'work':'earn';}else __msp.S.supTab=sub;document.getElementById("office").hidden=true;__msp.api.openOffice(t);},[t,sub]);await pg.waitForTimeout(300);
 {const m=await pg.evaluate(()=>{const e=document.getElementById('off');return {sh:e.scrollHeight,ch:e.clientHeight};});if(m.sh>m.ch+4)errs.push(vp.width+' '+sub+' '+m.sh+'>'+m.ch);}}
await ctx.close();}
console.log(errs,errs.length?'FAIL':'PASS');await b.close();})();
