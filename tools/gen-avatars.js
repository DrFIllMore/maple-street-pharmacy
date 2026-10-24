/* Generates ../avatars.js from DiceBear "lorelei" (CC0 1.0, by Lisa Wischofsky) — run: cd tools && npm i && node gen-avatars.js */
const {createAvatar}=require('@dicebear/core');const {lorelei}=require('@dicebear/collection');const fs=require('fs');
const NAMES=['Dana','Luis','Priya','Theo','Amara','Kenji','Rosa','Owen','Ines','Bo','Grace','Omar','Nia','Felix','You','New hire'];
const SKINS=['f3d3b6','e0b08a','c78f63','9c6a43','6b4630'];const HAIR=['2b1d14','4a2f1b','7a4a26','a8622e','1a1a1a','6e6a66','b9b2a8','8a2f1f'];
const happy=['happy01','happy02','happy03','happy04','happy05','happy06','happy08','happy09','happy13','happy14','happy17','happy15'];
const base={size:128,backgroundColor:['transparent'],frecklesProbability:10,hairAccessoriesProbability:0,earringsColor:['d8b25a'],glassesColor:['2a2a2a']};
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
const out={adv:{},staff:{}};
const A=(seed,o)=>createAvatar(lorelei,{...base,seed,glassesProbability:0,beardProbability:0,earringsProbability:0,...o}).toString();
/* Financial Advisor: Penny Pillsworth · Bill Co-Payne · Ira Deductible · Cassandra Flowers */
out.adv.fin1=A('Penny Pillsworth',{hair:['variant15'],hairColor:['8a3b1e'],skinColor:['f0cfae'],glasses:['variant03'],glassesProbability:100,mouth:['happy02'],eyes:['variant13'],eyebrows:['variant02'],earrings:['variant01'],earringsProbability:100,nose:['variant02']});
out.adv.fin2=A('Bill Co-Payne',{hair:['variant08'],hairColor:['4a2f1b'],skinColor:['e0b08a'],glasses:['variant04'],glassesProbability:100,mouth:['happy14'],eyes:['variant04'],eyebrows:['variant08'],nose:['variant05']});
out.adv.fin3=A('Ira Deductible',{hair:['variant25'],hairColor:['b9b2a8'],skinColor:['c78f63'],mouth:['happy13'],eyes:['variant20'],eyebrows:['variant06'],beard:['variant02'],beardProbability:100,nose:['variant06']});
out.adv.fin4=A('Cassandra Flowers',{hair:['variant24'],hairColor:['1a1a1a'],skinColor:['6b4630'],mouth:['happy05'],eyes:['variant09'],eyebrows:['variant03'],earrings:['variant03'],earringsProbability:100,nose:['variant01']});
/* District Manager: Phil Script · Doug Sage · Max Dose · Rex Scriptor */
out.adv.dm1=A('Phil Script',{hair:['variant03'],hairColor:['7a7570'],skinColor:['8a5a3c'],beard:['variant02'],beardProbability:100,mouth:['happy14'],eyes:['variant20'],eyebrows:['variant06'],nose:['variant04']});
out.adv.dm2=A('Doug Sage',{hair:['variant47'],hairColor:['2b1d14'],skinColor:['f3d3b6'],mouth:['happy01'],eyes:['variant01'],eyebrows:['variant07'],nose:['variant03']});
out.adv.dm3=A('Max Dose',{hair:['variant39'],hairColor:['1a1a1a'],skinColor:['9c6a43'],mouth:['happy16'],eyes:['variant12'],eyebrows:['variant09'],glasses:['variant05'],glassesProbability:100,nose:['variant02']});
out.adv.dm4=A('Rex Scriptor',{hair:['variant09'],hairColor:['a8622e'],skinColor:['e0b08a'],mouth:['happy06'],eyes:['variant18'],eyebrows:['variant01'],nose:['variant05']});
/* Benefit Manager: Claire Denied · Rhea Jected · Wanda Formulary · Pryor Authorization */
out.adv.pbm1=A('Claire Denied',{hair:['variant41'],hairColor:['1a1a1a'],skinColor:['c48a5f'],mouth:['happy05'],eyes:['variant09'],eyebrows:['variant03'],earrings:['variant02'],earringsProbability:100,nose:['variant01']});
out.adv.pbm2=A('Rhea Jected',{hair:['variant13'],hairColor:['8a2f1f'],skinColor:['f0cfae'],mouth:['happy13'],eyes:['variant22'],eyebrows:['variant04'],glasses:['variant01'],glassesProbability:100,nose:['variant02']});
out.adv.pbm3=A('Wanda Formulary',{hair:['variant45'],hairColor:['6e6a66'],skinColor:['e0b08a'],mouth:['happy03'],eyes:['variant15'],eyebrows:['variant02'],earrings:['variant01'],earringsProbability:100,nose:['variant06']});
out.adv.pbm4=A('Pryor Authorization',{hair:['variant28'],hairColor:['2b1d14'],skinColor:['6b4630'],mouth:['happy14'],eyes:['variant03'],eyebrows:['variant11'],glasses:['variant03'],glassesProbability:100,nose:['variant04']});
/* Case Manager: Anita Refill · Patience Waits · Carrie Moore · Gladys Hepps */
out.adv.cm1=A('Anita Refill',{hair:['variant39'],hairColor:['1a1a1a'],skinColor:['6b4630'],glasses:['variant01'],glassesProbability:100,mouth:['happy04'],eyes:['variant16'],eyebrows:['variant05'],nose:['variant03']});
out.adv.cm2=A('Patience Waits',{hair:['variant35'],hairColor:['4a2f1b'],skinColor:['c78f63'],mouth:['happy02'],eyes:['variant10'],eyebrows:['variant03'],earrings:['variant02'],earringsProbability:100,nose:['variant01']});
out.adv.cm3=A('Carrie Moore',{hair:['variant19'],hairColor:['a8622e'],skinColor:['f3d3b6'],mouth:['happy08'],eyes:['variant13'],eyebrows:['variant02'],nose:['variant02']});
out.adv.cm4=A('Gladys Hepps',{hair:['variant14'],hairColor:['b9b2a8'],skinColor:['e0b08a'],glasses:['variant04'],glassesProbability:100,mouth:['happy01'],eyes:['variant19'],eyebrows:['variant12'],earrings:['variant01'],earringsProbability:100,nose:['variant06']});
for(const n of NAMES){const h=hash(n);const skin=SKINS[h%SKINS.length];const fem=['Dana','Priya','Amara','Rosa','Ines','Grace','Nia'].includes(n);
  const opts={...base,seed:n,skinColor:[skin],hairColor:[HAIR[(h>>4)%HAIR.length]],mouth:[happy[(h>>8)%happy.length]],glassesProbability:(h>>12)%4===0?100:0,beardProbability:(!fem&&(h>>14)%4===0)?100:0,earringsProbability:fem?60:0};
  if(n==='You'){opts.hair=['variant47'];opts.hairColor=['1a1a1a'];opts.skinColor=['e0b08a'];opts.mouth=['happy01'];opts.glassesProbability=0;opts.beardProbability=0;}
  out.staff[n]={skin:'#'+(opts.skinColor[0]),svg:createAvatar(lorelei,opts).toString()};}
fs.writeFileSync(__dirname+'/../avatars.js','/* Portraits: DiceBear "lorelei" by Lisa Wischofsky, CC0 1.0 — generated by tools/gen-avatars.js */\nwindow.AVATARS='+JSON.stringify(out)+';\n');
const kb=Math.round(fs.statSync(__dirname+'/../avatars.js').size/1024);console.log('avatars.js',kb,'KB',Object.keys(out.staff).length,'staff');
