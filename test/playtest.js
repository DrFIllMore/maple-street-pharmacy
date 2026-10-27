/* Playtest harness: robot players with different personalities play N weeks; we score pacing, difficulty and strategy spread.
   Run:  PLAYWRIGHT_BROWSERS_PATH=... node test/playtest.js [weeks=20] [seeds=2] [out=test/playtest-report]
   Produces <out>.json and <out>.html. Nothing in the game is changed. */
const {webkit}=require('playwright');const fs=require('fs');const path=require('path');
const WEEKS=+process.argv[2]||20,SEEDS=+process.argv[3]||2,OUT=process.argv[4]||path.join(__dirname,'playtest-report');
const GAME='file://'+(process.env.GAME||path.resolve(__dirname,'..','index.html'));

/* ---------- design targets (what "good" means) ---------- */
const TARGETS=[
  {id:'firstMoney',t:'First insurer money within 3 real minutes at 1x (any archetype)',test:r=>r.flow.firstInsurerMin!==null&&r.flow.firstInsurerMin<=3,scope:'all'},
  {id:'firstGoodWeek',t:'A first net-positive week by week 4 (cautious or better)',test:r=>r.firstPositiveWeek!==null&&r.firstPositiveWeek<=4,scope:['cautious','builder','reactive','optimal']},
  {id:'trough',t:'Cautious play bottoms between $4k and $9k, never overdrafts',test:r=>r.minCash>=3000&&r.minCash<=9000,scope:['cautious']},
  {id:'naiveFails',t:'Naive play does not reach the goal in 20 weeks',test:r=>r.result!=='win',scope:['naive']},
  {id:'spread',t:'At least three archetypes reach the goal within 20 weeks',test:(_,all)=>new Set(all.filter(r=>r.result==='win').map(r=>r.arch)).size>=3,scope:'global'},
  {id:'noDominant',t:'No winning archetype wins more than 6 weeks ahead of the next',test:(_,all)=>{const w=all.filter(r=>r.result==='win').map(r=>r.endWeek).sort((a,b)=>a-b);return w.length<2||w[1]-w[0]<=6;},scope:'global'},
  {id:'deadZone',t:'No stretch longer than 90 s of floor time (1x) with nothing new happening',test:r=>r.flow.maxDeadSec<=90,scope:'all'},
  {id:'warned',t:'When a run is lost, an advisor named the cause in the two weeks before',test:r=>r.result!=='lose'||r.lossWarned,scope:'all'},
  {id:'careNoSick',t:'A player who rests staff under 60% never sees a sick day (cautious, optimal)',test:r=>r.weeks.every(x=>!(x.sick>0)),scope:['cautious','optimal']},
  {id:'ignoreSick',t:'An understaffed player who never rests anyone sees the first sick day in weeks 3–7 (marketer)',test:r=>{const f=r.weeks.find(x=>x.sick>0);return !!f&&f.week>=3&&f.week<=7;},scope:['marketer']},
  {id:'noEarlyQuit',t:'Nobody quits before week 8 for a player who rests staff (cautious, optimal)',test:r=>!r.weeks.some(x=>x.quit>0&&x.week<8),scope:['cautious','optimal']},
  {id:'typical60',t:'A player who plays like a person (typical) wins at least 60% of games by week 20',test:null,scope:['typical'],agg:rs=>rs.filter(r=>r.result==='win').length>=Math.ceil(rs.length*.6)},
  {id:'cautious15',t:'Cautious play reaches the goal by week 15',test:r=>r.result==='win'&&r.endWeek<=15,scope:['cautious']},
];

/* ---------- archetypes: decide only from what the game shows (feed, advisors, floor cues, cash) ---------- */
const ARCH={
  naive:{desc:'Minimum layout, first option on everything, promises and never fixes',
    setup:'base',weekly:'naive'},
  cautious:{desc:'Keeps $6k in hand; does the one thing the District/Case Manager asks when affordable',setup:'base',weekly:'cautious'},
  builder:{desc:'Spends down to $1.5k on whatever the floor says is jammed; no ads',setup:'base',weekly:'builder'},
  marketer:{desc:'Ads and promos first, builds only when a station is overused twice',setup:'base',weekly:'marketer'},
  reactive:{desc:'Acts only on complaints: promises on the feed and then fixes them',setup:'base',weekly:'reactive'},
  typical:{desc:'Plays like a person: hires when the hire preview says it pays or after a bad week of lines, turns on Keep everyone rested, fixes some complaints, ads when the chain bites',setup:'base',weekly:'typical'},
  optimal:{desc:'Known strong line: phone, problem desk, consult room + vaccines, OTC, specialty, ads, early loan paydown',setup:'base',weekly:'optimal'},
};

const seedScript=seed=>`(()=>{let s=${seed>>>0}||1;Math.random=function(){s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};})();`;

/* in-page agent: everything the robot does happens here */
const AGENT=`(()=>{
const A=__msp.api,S=()=>__msp.S;
const P=(t,x,y,r)=>A.place(t,x,y,r||0);
const cash=()=>S().cash;
const objs=t=>S().objs.filter(o=>o.type===t);
const staff=r=>S().staff.filter(w=>w.role===r).length;const hire=r=>{S().cash-=300;A.hire(r);};/* agency fee, as the player pays */
const log=[];const note=(w,what)=>log.push({week:w,what});
function upgrade(type){const T=__msp.TYPES[type];const o=objs(type).find(q=>T.levels&&T.levels[(q.level||0)+1]);if(!o)return false;const nx=T.levels[o.level+1];if(cash()<nx.cost)return false;S().cash-=nx.cost;o.level++;return true;}
function freeSpot(w,d){for(let y=5;y<13;y++)for(let x=0;x<19;x++){if(!A.canPlace||!A.canPlace(w,x,y))continue;return [x,y];}return null;}
function tryPlace(type,rot){const err0=null;for(let y=0;y<14;y++)for(let x=0;x<20;x++){const e=P(type,x,y,rot||0);if(!e)return [x,y];}return null;}
function baseSetup(){S().autoCover=true;for(const x of [0,1,2,3,6,7,8,11,12,13,14,15,16,17,18,19])P('counter',x,4);P('dropoff',4,4);P('register',9,4);P('bin',2,1);P('fill',5,1);P('verify',8,1);P('shelf',11,1);P('chair',4,8);P('chair',5,8);if(__msp.TYPES.restroom)P('restroom',12,9,0);A.hire('tech');A.hire('clerk');}
/* what the game is telling the player this week */
function signals(){const s=S();const f=s.feed||{posts:[]};const ib=s.inbox||{mails:[]};const acts=(ib.mails||[]).map(m=>(m.act||'')+' '+(m.subject||'')).join(' | ').toLowerCase();const posts=(f.posts||[]);
  const over=s.objs.filter(o=>o.util!==undefined&&o.util>=.85).map(o=>o.type);
  return {acts,posts,over,lost:s.wk.lost,theft:s.wk.theft||0,intrude:s.wk.intrude||0,writeoff:s.wk.writeoff||0,missed:s.wk.phoneMissed||0,rival:s.rivalOn};}
const FIX={dropoff:()=>staff('clerk')<3?(hire('clerk'),true):objs('dropoff').length<2?tryPlace('dropoff'):false,pickup:()=>upgrade('register')||tryPlace('register'),fill:()=>upgrade('fill')||(staff('tech')<2?(hire('tech'),true):tryPlace('fill')),chairs:()=>{let n=0;for(let i=0;i<2;i++)if(tryPlace('chair'))n++;return n>0;},phone:()=>objs('phone').length?false:tryPlace('phone',1),stock:()=>{S().inv.order.gen+=60;return true;},security:()=>{let n=0;for(const x of [4,5,9,10])if(!S().objs.some(o=>o.x===x&&o.y===4)&&P('counter',x,4)===null)n++;return n>0;},privacy:()=>objs('consult').length&&!objs('sdoor').length?tryPlace('room'):false,restroom:()=>tryPlace('restroom'),rest:()=>{const t=S().staff.filter(w=>!w.isYou&&!w.floater&&w.energy<50).sort((a,b)=>a.energy-b.energy)[0];if(!t)return false;return !A.setShift(t,0,'O');},verify:()=>upgrade('verify')};
function spend(kind,floor,w){if(cash()<floor)return false;const ok=FIX[kind]&&FIX[kind]();if(ok)note(w,'fix:'+kind);return !!ok;}
/* staff care, run weekly by players who look at the Staff screen: anyone under 45% gets Monday off; the owner books the floater first if affordable */
function careStaff(w,floor){const s=S();let n=0;for(const x of s.staff){if(x.floater||x.sick>0)continue;const e=x.energy??100;if(e>=60){/* fresh: clear last week's rest days */const sc=s.sched[x.id];if(sc)for(let d=0;d<6;d++)if(sc[d]==='O'){sc[d]='F';if(x.isYou){const f=s.staff.find(y=>y.floater);if(f)s.sched[f.id][d]='O';}}continue;}const days=e<30?[0,3]:[0];for(const d of days){if(x.isYou){if(cash()<floor+400)continue;A.bookFloater(d);}if(!A.setShift(x,d,'O')){n++;note(w,'rest:'+(x.isYou?'owner':x.role)+':'+d);}}}
  for(const x of s.staff){if(x.isYou||x.floater)continue;if((x.morale??80)<30&&cash()>floor+150){if(!A.giveBonus(x))note(w,'bonus:'+x.role);}}return n;}
/* weekly policies run at the Proposals page (before Run week) */
const payLoanIf=(w,buffer)=>{const s=S();if(s.loan>0&&cash()-buffer>500){A.payLoan(Math.min(s.loan,cash()-buffer));note(w,'loan');}};
const POLICY={
  naive(w){payLoanIf(w,25000);},
  cautious(w){payLoanIf(w,9000);careStaff(w,6000);const sg=signals();const a=sg.acts;const floor=6000;const want=a.includes('window')||a.includes('clerk')?'dropoff':a.includes('register')?'pickup':a.includes('tech')||a.includes('fill')?'fill':a.includes('chair')?'chairs':a.includes('phone')?'phone':a.includes('problem desk')?'problem':a.includes('counter')||a.includes('wall')?'security':null;
    if(want==='problem'){if(cash()>floor+800&&!objs('problem').length&&tryPlace('problem',1))note(w,'fix:problem');}else if(want)spend(want,floor,w);
    if(S().loan>0&&cash()>floor+2000){A.payLoan(1000);note(w,'loan');}},
  builder(w){payLoanIf(w,7000);careStaff(w,1500);const sg=signals();const floor=1500;const order=[];if(sg.over.includes('dropoff'))order.push('dropoff');if(sg.over.includes('register'))order.push('pickup');if(sg.over.includes('fill'))order.push('fill');if(sg.over.includes('verify'))order.push('verify');if(sg.missed>=2)order.push('phone');if(sg.intrude>=2)order.push('security');if(sg.lost>=5)order.push('chairs');
    if(!order.length){if(!objs('phone').length)order.push('phone');else if(!objs('problem').length&&sg.writeoff>=2){if(cash()>floor+800&&tryPlace('problem',1))note(w,'fix:problem');}else if(!objs('otc').length&&cash()>floor+900){if(tryPlace('otc'))note(w,'build:otc');}else if(!objs('consult').length&&cash()>floor+2500){if(tryPlace('room'))note(w,'build:room');}else order.push('fill');}
    for(const k of order.slice(0,2))spend(k,floor,w);},
  marketer(w){payLoanIf(w,7000);const s=S();const floor=3000;const promos=['paper','flyers','social','loyalty','pricematch'];for(const k of promos){if(cash()<floor)break;if(k==='pricematch'&&!s.rivalOn)continue;if(!A.buyPromo(k))note(w,'promo:'+k);}
    const sg=signals();for(const t of ['dropoff','register','fill']){s._overN=s._overN||{};if(sg.over.includes(t))s._overN[t]=(s._overN[t]||0)+1;if(s._overN[t]>=2){spend(t==='register'?'pickup':t,floor,w);s._overN[t]=0;}}},
  reactive(w){payLoanIf(w,7000);const s=S();const sg=signals();const floor=1200;const kinds=[...new Set(sg.posts.filter(p=>p.bad&&p.promise).map(p=>p.promise))];for(const k of kinds)spend(k,floor,w);if(sg.writeoff>=3&&!objs('problem').length&&cash()>floor+800&&tryPlace('problem',1))note(w,'fix:problem');},
  typical(w){const s=S();const sg=signals();const floor=2500;payLoanIf(w,8000);if(w>=2)s.autoRest=true;
    if(sg.missed>=2&&!objs('phone').length&&cash()>floor+700&&tryPlace('phone',1))note(w,'build:phone');if(sg.writeoff>=2&&!objs('problem').length&&cash()>floor+800&&tryPlace('problem',1))note(w,'build:problem');
    const W={tech:800,clerk:650,rph:1800};s._lh=s._lh||0;
    for(const r of ['clerk','tech']){const a=A.hireAdvice(r);if(/nowhere to work/.test(a.t)&&sg.lost>=6&&cash()>floor+1200){if(tryPlace(r==='tech'?'fill':'dropoff'))note(w,'build:'+(r==='tech'?'fill':'dropoff'));continue;}
      if(w-s._lh>=2&&cash()>W[r]*2+floor&&(a.v==='good'||sg.lost>=10)&&s.staff.filter(x=>!x.floater).length<6){hire(r);s._lh=w;note(w,'hire:'+r);break;}}
    const kinds=[...new Set(sg.posts.filter(p=>p.bad&&p.promise).map(p=>p.promise))];s._fx=s._fx||{};for(const k of kinds){if(w-(s._fx[k]||-9)<4)continue;if(spend(k,floor,w)){s._fx[k]=w;break;}}
    if(s.rivalOn&&s.rival>.15&&!(s.promo.paper>0)&&w%2===0&&cash()>floor+900){if(!A.buyPromo('paper'))note(w,'promo:paper');}
    if(w>=6&&!objs('otc').length&&cash()>floor+900&&tryPlace('otc'))note(w,'build:otc');},
  optimal(w){const s=S();const floor=1500;careStaff(w,floor);if(!objs('phone').length&&cash()>floor+700&&tryPlace('phone',1))note(w,'build:phone');if(!objs('problem').length&&cash()>floor+800&&tryPlace('problem',1))note(w,'build:problem');if(staff('clerk')<2&&cash()>floor+1500){hire('clerk');note(w,'hire:clerk');}
    if(!objs('consult').length&&cash()>floor+2500&&tryPlace('room'))note(w,'build:room');if(!objs('otc').length&&cash()>floor+900&&tryPlace('otc'))note(w,'build:otc');if(objs('consult').length&&!s.contracts.vax&&cash()>floor+900){if(!A.signContract('vax'))note(w,'contract:vax');}
    if(s.contracts.vax&&s.vaxDoses<10)s.inv.order.vax=Math.max(s.inv.order.vax||0,50);
    if(w>=4&&staff('tech')<2&&cash()>floor+1600){hire('tech');note(w,'hire:tech');}if(w>=5&&cash()>floor+2500&&upgrade('fill'))note(w,'upgrade:fill');if(w>=6&&cash()>floor+800&&upgrade('register'))note(w,'upgrade:register');
    if(!objs('fridge').length&&w>=7&&cash()>floor+1200&&tryPlace('fridge'))note(w,'build:fridge');if(objs('fridge').length&&!s.contracts.special&&cash()>floor+2000){if(!A.signContract('special'))note(w,'contract:special');}
    if(w>=3&&!(s.promo.paper>0)&&cash()>floor+900){if(!A.buyPromo('paper'))note(w,'promo:paper');}if(!s.loyalty&&cash()>floor+400){if(!A.buyPromo('loyalty'))note(w,'promo:loyalty');}
    payLoanIf(w,6000);}
};
/* choices on slips: required card option, proposals, feed reply */
function cardChoice(arch){const btns=[...document.querySelectorAll('.contract.req .csign button')];if(!btns.length)return;const labels=btns.map(b=>b.textContent.trim());let i=0;
  if(arch==='naive')i=0;else{const prefer=arch==='marketer'?['Sign','Take it','Run a $1,500 promo','Pay it','Give it','Start delivering','Take the advance','Noted','Agree','Accept']:arch==='cautious'?['Pass','Decline','Agree','Accept','Noted','Wait','Not now','Sorry, no','Ride it out']:['Take it','Noted','Push back','Sign','Start delivering','Give it','Take the advance','Pass','Decline'];
    i=Math.max(0,labels.findIndex(l=>prefer.some(p=>l.startsWith(p))));}
  btns[i].click();return labels[i];}
function proposals(arch){const cards=[...document.querySelectorAll('.contract:not(.req)')];const taken=[];for(const c of cards){const b=[...c.querySelectorAll('.csign button')];if(!b.length||b.some(x=>x.classList.contains('on')))continue;const yes=b[b.length-1],no=b[0];const re=(c.querySelector('.cre')||{}).textContent||'';
    let pick=no;if(arch==='naive')pick=no;else if(arch==='marketer')pick=/ad|loyalty|network|discount/i.test(re)&&cash()>2500?yes:no;else if(arch==='optimal')pick=/vaccine|specialty|loyalty|half-page/i.test(re)&&cash()>3000?yes:/day off|half days/i.test(re)?yes:no;else if(arch==='cautious')pick=/day off/i.test(re)?yes:no;else if(arch==='builder')pick=/relieve|day off/i.test(re)?yes:no;else pick=/day off|relieve/i.test(re)?yes:no;
    if(pick===yes)taken.push(re.trim());pick.click();}return taken;}
function feedReply(arch){const b=[...document.querySelectorAll('[data-reply]')];if(!b.length)return null;const f=S().feed;const bad=b.find(x=>/Promise/.test(x.textContent));const thank=b.find(x=>/Thank/.test(x.textContent));
  if(arch==='naive'||arch==='reactive'||arch==='optimal'||arch==='typical'){(bad||b[0]).click();return (bad||b[0]).textContent;}if(arch==='marketer'&&thank){thank.click();return 'Thank';}return null;}
return {baseSetup,POLICY,cardChoice,proposals,feedReply,log};})()`;

async function runOne(browser,arch,seed){
  const ctx=await browser.newContext({viewport:{width:932,height:430}});await ctx.addInitScript(seedScript(seed*7919+13));const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
  await pg.goto(GAME);await pg.waitForTimeout(300);
  await pg.evaluate(()=>document.getElementById('tNew').click());await pg.waitForTimeout(100);await pg.evaluate(()=>document.getElementById('go').click());await pg.waitForTimeout(100);
  await pg.evaluate(a=>{window.__agent=eval(a);__agent.baseSetup();__msp.api.setBuild(false);},AGENT);
  await pg.evaluate(()=>{__msp.api.startWeek();__msp.api.setSpeed(0);});
  const weeks=[];let result='ongoing',endWeek=null;const notable=[];const decisions=[];
  for(let w=1;w<=WEEKS;w++){
    const r=await pg.evaluate(()=>{const S=__msp.S;const GL=__msp.GL;let seenN=(GL[GL.length-1]||{}).n||0;const events=[];const t0=(S.week-1)*648;const demand=[];const src={walk:0,phone:0,e:0,consult:0};const sids=new Set();
      for(let i=0;i<648+2;i++){if(!S.running)break;for(let f=0;f<12;f++)__msp.api.motion(.016);__msp.api.tick();if(S.tick===1)demand.push(+__msp.api.demandPerDay().toFixed(1));
        for(const sc of S.scripts){if(!sids.has(sc.id)){sids.add(sc.id);if(src[sc.src]!==undefined)src[sc.src]++;}}
        for(const e of GL){if(e.n>seenN){seenN=e.n;if(/^Hour:/.test(e.text))continue;events.push({t:t0+i,type:e.type,text:e.text.slice(0,90)});}}}
      const w=S.wk;const stages={};for(const sc of S.scripts)stages[sc.stage]=(stages[sc.stage]||0)+1;
      return {week:S.week-1,cash:Math.round(S.cash),worth:Math.round(S.cash+S.objs.reduce((t,o)=>{const T=__msp.TYPES[o.type];let c=T.cost||0;if(T.levels)for(let i=1;i<=(o.level||0);i++)c+=T.levels[i].cost||0;return t+c/2;},0)),trust:+S.trust.toFixed(1),served:w.served,lost:w.lost,net:Math.round(w.net||0),paid:Math.round(w.paid||0),loan:Math.round(S.loan),done:S.done||null,events,tw:w.tw||{},demand,src,missed:w.phoneMissed,backorder:w.backorder,writeoff:w.writeoff,intrude:w.intrude,theft:w.theft,consults:w.consults,stock:S.stock,firstRemitDay:S.firstRemitDay,staff:S.staff.map(x=>x.role).join(','),stages,advisors:(S.inbox&&S.inbox.mails||[]).map(m=>({k:m.k,st:m.st,subject:m.subject,act:(m.act||'').slice(0,120)})),promiseResults:(w.promiseResults||[]).map(p=>({k:p.k,kept:p.kept})),sick:w.sick||0,quit:w.quit||0,closed:w.closed||0,press:(w.press||[]).map(p=>(p.bad?'−':'+')+p.head),minEn:Math.round(Math.min(...S.staff.map(x=>x.energy??100))),minMo:Math.round(Math.min(...S.staff.filter(x=>!x.isYou&&!x.floater).map(x=>x.morale??80),100)),floaterDays:(S.sched[(S.staff.find(x=>x.floater)||{}).id]||[]).filter(v=>v!=='O').length};});
    weeks.push(r);notable.push(...r.events);
    if(r.done){result=r.done;endWeek=r.week;break;}
    /* review: results → feed(reply) → call → stock → proposals(decide) → run */
    await pg.waitForTimeout(80);
    for(let k=0;k<5;k++){const n=await pg.$('#next');if(!n)break;const stage=await pg.evaluate(()=>__msp.S.stage);if(stage==='feed'){const rep=await pg.evaluate(a=>__agent.feedReply(a),arch);if(rep)decisions.push({week:r.week,what:'reply:'+rep});}await pg.click('#next');await pg.waitForTimeout(60);}
    const card=await pg.evaluate(a=>__agent.cardChoice(a),arch);if(card)decisions.push({week:r.week,what:'card:'+card});
    const taken=await pg.evaluate(a=>__agent.proposals(a),arch);for(const t of taken)decisions.push({week:r.week,what:'proposal:'+t});
    const acts=await pg.evaluate(a=>{__agent.POLICY[a](__msp.S.week);const l=__agent.log.splice(0);return l;},arch);for(const a of acts)decisions.push(a);
    await pg.waitForTimeout(40);const run=await pg.$('#run');if(!run){result='stuck';endWeek=r.week;break;}await pg.evaluate(()=>{document.getElementById('run').click();__msp.api.setSpeed(0);/* no real-time ticks between measured weeks */});await pg.waitForTimeout(60);
  }
  if(result==='ongoing')endWeek=weeks[weeks.length-1].week;
  /* flow metrics in real seconds at 1x: 1 tick = 0.2 s */
  const frd=weeks.map(x=>x.firstRemitDay).find(x=>x!==undefined&&x!==null);const firstInsurerMin=frd!==undefined?+(((frd+1)*108*0.2)/60).toFixed(1):null;
  let maxDead=0,last=0;for(const e of notable){if(e.t-last>maxDead)maxDead=e.t-last;last=e.t;}const endT=endWeek*648;if(endT-last>maxDead)maxDead=endT-last;
  const firstPositiveWeek=(weeks.find(x=>x.net>0)||{}).week??null;const minCash=Math.min(...weeks.map(x=>x.cash));
  let lossWarned=false;if(result==='lose'){const prior=weeks.slice(-3,-1);lossWarned=prior.some(x=>x.advisors.some(m=>m.st==='dis'&&/loan|cash|overdraft|payroll|runway|bank|afford|spend|trust|slipping/i.test(m.subject+' '+m.act)));}
  await ctx.close();
  return {arch,seed,result,endWeek,weeks,decisions,minCash,firstPositiveWeek,flow:{firstInsurerMin,maxDeadSec:+(maxDead*0.2).toFixed(0),minutesPerWeek1x:+((648*0.2)/60).toFixed(1),minutesPerWeek3x:+((648*0.2/3)/60).toFixed(1)},lossWarned,errs};
}

(async()=>{const browser=await webkit.launch();const jobs=[];const only=(process.env.ARCHS||'').split(',').filter(Boolean);for(const arch of Object.keys(ARCH)){if(only.length&&!only.includes(arch))continue;for(let s=1;s<=SEEDS;s++)jobs.push([arch,s]);}
  const results=[];const lanes=4;let i=0;await Promise.all(Array.from({length:lanes},async()=>{while(i<jobs.length){const [a,s]=jobs[i++];const t0=Date.now();try{const r=await runOne(browser,a,s);r.secs=((Date.now()-t0)/1000)|0;results.push(r);console.error(`${a}#${s}: ${r.result} wk${r.endWeek} cash ${r.weeks[r.weeks.length-1].cash} (${r.secs}s)`);}catch(e){console.error(a,s,'FAILED',e.message);results.push({arch:a,seed:s,result:'crash',endWeek:0,weeks:[],decisions:[],flow:{},errs:[e.message]});}}}));
  await browser.close();
  /* score */
  const ok=results.filter(r=>r.weeks.length);const score=TARGETS.map(T=>{const scope=T.scope==='global'?null:T.scope==='all'?ok:ok.filter(r=>T.scope.includes(r.arch));let pass,detail;
    if(T.scope==='global'){pass=T.test(null,ok);detail=ok.filter(r=>r.result==='win').map(r=>r.arch+'#'+r.seed+' wk'+r.endWeek).join(', ')||'no wins';}
    else if(T.agg){pass=scope.length>0&&T.agg(scope);detail=scope.map(r=>`${r.arch}#${r.seed}:${r.result==='win'?'wk'+r.endWeek:r.result}`).join(' ');}
    else{const res=scope.map(r=>({r,p:T.test(r,ok)}));pass=res.length>0&&res.every(x=>x.p);detail=res.map(x=>`${x.r.arch}#${x.r.seed}:${x.p?'✓':'✗'}`).join(' ');}
    return {id:T.id,t:T.t,pass,detail};});
  const summary={weeks:WEEKS,seeds:SEEDS,generated:new Date().toISOString(),score,runs:results.map(r=>({arch:r.arch,seed:r.seed,result:r.result,endWeek:r.endWeek,minCash:r.minCash,firstPositiveWeek:r.firstPositiveWeek,flow:r.flow,lossWarned:r.lossWarned,decisions:r.decisions.length,errs:r.errs,staff:{sick:r.weeks.reduce((t,x)=>t+(x.sick||0),0),quit:r.weeks.reduce((t,x)=>t+(x.quit||0),0),closed:r.weeks.reduce((t,x)=>t+(x.closed||0),0),minEn:Math.min(...r.weeks.map(x=>x.minEn??100)),minMo:Math.min(...r.weeks.map(x=>x.minMo??100)),pressBad:r.weeks.reduce((t,x)=>t+(x.press||[]).filter(p=>p[0]==='−').length,0),pressGood:r.weeks.reduce((t,x)=>t+(x.press||[]).filter(p=>p[0]==='+').length,0)}}))};
  fs.writeFileSync(OUT+'.json',JSON.stringify({summary,results},null,1));
  fs.writeFileSync(OUT+'.html',report(summary,results));
  console.log(JSON.stringify(summary.score.map(s=>(s.pass?'PASS ':'FAIL ')+s.t),null,1));console.log('wrote',OUT+'.html');
})();

function report(summary,results){const archs=[...new Set(results.map(r=>r.arch))];const col={naive:'#e24b4a',cautious:'#378add',builder:'#1d9e75',marketer:'#ef9f27',reactive:'#7f77dd',optimal:'#2a2f2a'};
  const W=640,H=220;const maxW=summary.weeks;const allCash=results.flatMap(r=>r.weeks.map(w=>w.cash));const lo=Math.min(-3000,...allCash),hi=Math.max(25000,...allCash);const X=w=>20+(w/maxW)*(W-30),Y=c=>H-20-((c-lo)/(hi-lo))*(H-30);
  const lines=results.filter(r=>r.weeks.length).map(r=>`<polyline fill="none" stroke="${col[r.arch]||'#888'}" stroke-width="${r.seed===1?2.2:1.2}" stroke-opacity="${r.seed===1?1:.5}" points="${r.weeks.map(w=>X(w.week)+','+Y(w.cash)).join(' ')}"/>`).join('');
  const guides=[0,25000].map(v=>`<line x1="20" y1="${Y(v)}" x2="${W-10}" y2="${Y(v)}" stroke="#bbb" stroke-dasharray="3 3"/><text x="${W-8}" y="${Y(v)-3}" font-size="10" text-anchor="end" fill="#666">${v===0?'$0':'goal $25k'}</text>`).join('');
  const legend=archs.map(a=>`<span style="display:inline-flex;align-items:center;gap:6px;margin-right:12px"><i style="width:14px;height:3px;background:${col[a]}"></i>${a}</span>`).join('');
  const rows=summary.runs.map(r=>`<tr><td>${r.arch}</td><td>${r.seed}</td><td class="${r.result}">${r.result}</td><td>${r.endWeek}</td><td>${fmt(r.minCash)}</td><td>${r.firstPositiveWeek??'—'}</td><td>${r.flow.firstInsurerMin??'—'}</td><td>${r.flow.maxDeadSec??'—'}</td><td>${r.decisions}</td><td>${r.staff.sick} / ${r.staff.quit} / ${r.staff.closed}</td><td>${r.staff.minEn} / ${r.staff.minMo}</td><td>${r.staff.pressBad} / ${r.staff.pressGood}</td></tr>`).join('');
  const targets=summary.score.map(s=>`<tr><td class="${s.pass?'win':'lose'}">${s.pass?'PASS':'FAIL'}</td><td>${s.t}</td><td class="d">${s.detail}</td></tr>`).join('');
  const decis=results.filter(r=>r.seed===1&&r.weeks.length).map(r=>`<details><summary>${r.arch} — ${r.result} wk ${r.endWeek}</summary><div class="d">${r.decisions.map(d=>'wk'+d.week+' '+d.what).join(' · ')||'no decisions'}</div><div class="d">Advisors before end: ${(r.weeks.slice(-2)).map(w=>'wk'+w.week+': '+w.advisors.map(m=>m.k+'/'+m.st+' "'+m.subject+'"').join('; ')).join(' | ')}</div></details>`).join('');
  return `<!doctype html><meta charset="utf-8"><title>Playtest report</title><style>body{font:14px/1.4 -apple-system,Segoe UI,sans-serif;margin:20px;color:#222;max-width:900px}table{border-collapse:collapse;width:100%;margin:8px 0 18px}td,th{border-bottom:1px solid #ddd;padding:4px 6px;text-align:left;font-size:13px}.win{color:#1d9e75;font-weight:700}.lose{color:#e24b4a;font-weight:700}.ongoing{color:#666}.d{color:#555;font-size:12px}h2{margin:18px 0 4px}</style>
<h1>Maple Street Pharmacy — playtest report</h1><div class="d">${summary.generated} · ${summary.weeks} weeks · ${summary.seeds} seed(s) per archetype · 1x = ${(648*0.2/60).toFixed(1)} min of floor time per week, 3x = ${(648*0.2/3/60).toFixed(1)} min</div>
<h2>Targets</h2><table><tr><th></th><th>Target</th><th>Detail</th></tr>${targets}</table>
<h2>Cash curves</h2><div>${legend}</div><svg viewBox="0 0 ${W} ${H}" width="100%" style="max-width:900px;background:#fafaf7;border:1px solid #eee">${guides}${lines}</svg>
<h2>Runs</h2><table><tr><th>Archetype</th><th>Seed</th><th>Result</th><th>End wk</th><th>Min cash</th><th>1st +week</th><th>1st insurer $ (min)</th><th>Longest dead stretch (s)</th><th>Decisions</th><th>Sick / quit / closed</th><th>Min energy / morale</th><th>Press −/+</th></tr>${rows}</table>
<h2>What each robot did (seed 1)</h2>${decis}`;}
function fmt(n){return n===undefined||n===null||!isFinite(n)?'—':(n<0?'−':'')+'$'+Math.abs(Math.round(n)).toLocaleString();}
