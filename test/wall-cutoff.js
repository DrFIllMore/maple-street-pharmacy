// From the wk-7 report: a wall on the drop-off's staff tile cut the window off; after that every move was refused.
const {webkit}=require('playwright');const path=require('path');
const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await webkit.launch();const pg=await (await b.newContext({viewport:{width:932,height:430}})).newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file://'+GAME);await pg.waitForTimeout(300);
const r=await pg.evaluate(()=>{document.getElementById('tNew').click();document.getElementById('go').click();const a=__msp.api,S=__msp.S;S.cash=90000;S.week=7;S.opened=true;S.unlocked=['snack','medshelf','otc','breakroom','problem','restroom'];
 const L='fill@16,0L2 bin@15,0 verify@13,0L1 shelf@11,0 phone@18,0 register@12,3L1 restroom@13,12r2 chair@9,6r1 chair@9,7r1 chair@9,8r1 chair@9,9r1 chair@9,10r1 medshelf@19,1r3 otc@19,10r3 breakroom@7,0 problem@9,0 wall@3,0r2 wall@3,1r2 wall@3,2r2 wall@3,3r2 wall@4,3r2 wall@5,3 wall@6,3 wall@7,3r2 wall@8,3 verify@5,0 register@10,3L1 wall@9,3 bin@4,0 chair@9,11r1 snack@14,12r2 wall@19,6r2 wall@18,6r2 wall@17,6r2 counter@16,6 dropoff@14,6';
 const out={};const placeErr=[];for(const t of L.split(' ')){const m=/^(\w+)@(\d+),(\d+)(?:L(\d))?(?:r(\d))?$/.exec(t);const e=a.place(m[1],+m[2],+m[3],+(m[5]||0));if(e)placeErr.push(t+': '+e);}
 out.placeErr=placeErr;
 out.newWallOnWorkTile=a.place('wall',14,5,2);
 // old saves: the wall is already there
 S.objs.push({id:'oldwall',type:'wall',x:14,y:5,rot:2,level:0});
 const ch=S.objs.find(o=>o.type==='chair');out.moveChair=a.pickUp(ch.id)||a.putDown(2,8);
 out.placePlant=a.place('plant',1,9,0);
 out.moveBlockingWallAway=a.pickUp('oldwall')||a.putDown(1,12);
 out.dropoffReachableAfter=!!a.staffReach;out.wallsLeftOnTile=S.objs.filter(o=>o.x===14&&o.y===5).length;
 return out;});
console.log(JSON.stringify(r),errs);await b.close();})();
