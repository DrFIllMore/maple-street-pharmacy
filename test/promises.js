const {webkit}=require('playwright');
async function run(keep){const b=await webkit.launch();const ctx=await b.newContext({viewport:{width:932,height:430},deviceScaleFactor:2});const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.goto('file:///home/claude/maple-street-pharmacy/index.html');await pg.waitForTimeout(400);
await pg.evaluate(()=>document.getElementById('tNew').click());await pg.waitForTimeout(150);await pg.evaluate(()=>document.getElementById('go').click());await pg.waitForTimeout(150);
// understaffed: one clerk, one tech -> walk-outs at drop-off
await pg.evaluate(()=>{const a=__msp.api;const P=(t,x,y,r)=>a.place(t,x,y,r||0);for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,8);P('chair',5,8);a.hire('tech');a.hire('clerk');a.setBuild(false);__msp.api.startWeek();});
const week=async()=>pg.evaluate(()=>{for(let i=0;i<108*6+2;i++){if(!__msp.S.running)break;for(let f=0;f<12;f++)__msp.api.motion(.016);__msp.api.tick();}const S=__msp.S;return {week:S.week-1,lost:S.wk.lost,trust:+S.trust.toFixed(1),tw:Object.fromEntries(Object.entries(S.wk.tw||{}).map(([k,v])=>[k,+v.toFixed(2)])),cred:S.cred,promises:S.promises,posts:(S.feed&&S.feed.posts||[]).map(p=>p.head+(p.promise?' ['+p.promise+']':''))};});
const r1=await week();console.log('W1',JSON.stringify(r1));
await pg.waitForTimeout(200);await pg.click('#next');await pg.waitForTimeout(200);/* v25.21: summary card first, then the Gazette */await pg.evaluate(()=>{const a=__msp.api;a.openObj&&0;});if(await pg.$('#next'))await pg.click('#next');await pg.waitForTimeout(200);// feed
const btns=await pg.$$eval('[data-reply]',els=>els.map(e=>e.textContent));console.log('reply buttons',btns);
const idx=await pg.evaluate(()=>{const f=__msp.S.feed;return f.posts.findIndex(p=>p.bad&&p.promise);});
if(idx>=0){await pg.click(`[data-reply="${idx}"]`);await pg.waitForTimeout(200);console.log('after reply',await pg.evaluate(()=>({promises:__msp.S.promises,replied:document.querySelector('.replied')?.textContent,trust:+__msp.S.trust.toFixed(2)})));}
for(let k=0;k<5;k++){const n=await pg.$('#next');if(!n)break;await pg.click('#next');await pg.waitForTimeout(150);}
const opts=await pg.$$('.contract.req .csign button');if(opts.length){await opts[0].click();await pg.waitForTimeout(100);}
await pg.$eval('#floorX',e=>e.click());await pg.waitForTimeout(150);
if(keep){await pg.evaluate(()=>{const a=__msp.api;const k=__msp.S.promises[0].k;if(k==='dropoff'){a.hire('clerk');a.place('dropoff',16,4,0);}else if(k==='pickup'){a.hire('clerk');a.place('register',16,4,0);}else if(k==='fill'){a.hire('tech');}else if(k==='chairs'){a.place('chair',6,8,0);a.place('chair',7,8,0);}else if(k==='phone'){a.place('phone',0,2,1);}});}
await pg.$eval('#resume',e=>e.click());await pg.waitForTimeout(150);await pg.click('#run');await pg.waitForTimeout(200);
const r2=await week();console.log('W2',JSON.stringify(r2));
await pg.waitForTimeout(200);await pg.screenshot({path:keep?'v21-gazette-kept.png':'v21-gazette-broken.png'});await pg.click('#next');await pg.waitForTimeout(300);await pg.screenshot({path:keep?'v21-feed-kept.png':'v21-feed-broken.png'});
await pg.click('#next');await pg.waitForTimeout(300);console.log('CM',await pg.evaluate(()=>{const m=__msp.S.inbox.mails.find(x=>x.k==='cm');return m&&{st:m.st,body:m.body,act:m.act};}));
console.log('errs',errs);await b.close();}
(async()=>{await run(true);console.log('=====');await run(false);})();
