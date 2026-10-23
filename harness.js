// Headless harness: stub DOM/canvas/audio, run the game logic, report flow.
const fs=require('fs');
const raw=fs.readFileSync(process.argv[2],"utf8");const m=raw.match(/<script>([\s\S]*)<\/script>/);const src=m?m[1]:raw;
const els={};
const mkEl=(id)=>({id,hidden:false,innerHTML:'',textContent:'',className:'',style:{},classList:{toggle(){},add(){},remove(){},contains(){return false}},
  querySelector(){return mkEl('q');},querySelectorAll(){return [];},addEventListener(){},setPointerCapture(){},getBoundingClientRect(){return {left:0,top:0,right:900,bottom:450,width:900,height:450};},
  setAttribute(){},focus(){},select(){},clientWidth:900,clientHeight:450,set onclick(f){this._oc=f;},get onclick(){return this._oc;}});
const noop=()=>{};
const ctx=new Proxy({},{get:(t,k)=>k==='canvas'?null:(['fillStyle','strokeStyle','lineWidth','font','textAlign','globalAlpha'].includes(k)?undefined:noop),set:()=>true});
global.window=global;global.document={getElementById:id=>els[id]||(els[id]=mkEl(id)),createElement:()=>mkEl('x'),documentElement:{clientWidth:900,clientHeight:450},body:{appendChild(){}},fonts:{ready:Promise.resolve()}};
els.cv=mkEl('cv');global.document.documentElement.style={setProperty(){}};global.document.documentElement.dataset={};els.cv.getContext=()=>ctx;els.cv.width=0;els.cv.height=0;
global.innerWidth=900;global.innerHeight=450;global.devicePixelRatio=1;global.screen={width:900,height:450,orientation:{type:'landscape-primary',addEventListener(){}}};
global.navigator={userAgent:'harness',clipboard:null};global.localStorage={getItem:()=>null,setItem(){}};
global.performance={now:()=>Date.now()};
let rafCb=null;global.requestAnimationFrame=cb=>{rafCb=cb;};
global.addEventListener=noop;global.setInterval=(fn,ms)=>{intervals.push({fn,ms});return intervals.length;};global.clearInterval=noop;global.setTimeout=(fn)=>0;global.clearTimeout=noop;
const intervals=[];global.AudioContext=undefined;global.webkitAudioContext=undefined;
global.CanvasRenderingContext2D=function(){};
// capture internal S via hot hook
let game={};global.claude={hot:{snapshot:(f)=>{game.snap=f;},ready:null,data:{}}};
eval(src);
const S=()=>game.snap().S;
// start week 1 via intro -> review -> run
els.review._oc; // not needed
// Simulate user: click go, then run
const click=(id)=>{const el=els[id];if(el&&el._oc)el._oc();else{ // find in review innerHTML; emulate by re-binding: our sheet/review used $('go') etc.
  }};
// The review builds buttons via innerHTML then $('go') -> our mkEl returns same object per id, and onclick set on it.
click('go');
if(process.env.BIG){const s=S();s.plan='all';s.build.b1={type:'phone',level:0};s.build.b4={type:'problem',level:0};s.build.r0={type:'room',level:0};s.build.f1={type:'otc',level:0};s.build.c1={type:'register',level:0};s.build.b0.level=1;
  const mk=(n,r)=>({id:n,name:n,role:r,isYou:false,x:16,y:7,skin:'#000',plan:null,step:0,work:0,workMax:0,carry:[],bob:0,idle:{x:6,y:3}});s.staff.push(mk('T2','tech'),mk('C2','clerk'));}
click('run');
console.log('running?',S().running,'speed',S().speed);
// run ticks: find tick interval
const tickFn=intervals.find(i=>i.ms<=200)?.fn;
if(!tickFn){console.log('no tick interval');process.exit(1);}
let t=0,now=0;
const WEEKS=+(process.env.WEEKS||1);
for(let wk=0;wk<WEEKS;wk++){
 if(wk>0){click('next');click('run');}
 for(let i=0;i<108*6;i++){
  for(let f=0;f<12;f++){now+=16;if(rafCb){const cb=rafCb;rafCb=null;cb(now);}}
  tickFn();
  if(S().done||!S().running)break;
 }
 const s=S();console.log('W'+(s.week-1),'cash',Math.round(s.cash),'owed',s.ledger.reduce((a,l)=>a+l.amt,0),'trust',s.trust.toFixed(1),JSON.stringify(s.wk));
 if(s.done){console.log('DONE',s.done);break;}
}
const s=S();
console.log('week',s.week,'day',s.day,'running',s.running,'cash',Math.round(s.cash),'owed',s.ledger.reduce((a,l)=>a+l.amt,0),'trust',s.trust.toFixed(1));
console.log('wk',JSON.stringify(s.wk));
const c=st=>s.scripts.filter(x=>x.stage===st).length;
console.log('scripts: new',c('new'),'ring',c('ringing'),'with',c('withPatient'),'bin',c('bin'),'carried',c('carried'),'tray',c('tray'),'prob',c('problem'),'shelf',c('shelf'),'done',c('done'),'dead',c('dead'));
console.log('staff',s.staff.map(w=>w.name+':'+(w.plan?w.plan.name+'@'+w.step:'idle')).join(', '));
console.log('patients',s.patients.length);
console.log('--- activity sample ---');
for(const e of global.__msp.GL.slice(0,22))console.log(`w${e.wk} d${e.day} t${e.tick} [${e.type}] ${e.text}`);
console.log('errors:',global.__msp.LOG.filter(l=>l.type==='err').map(l=>l.msg));
