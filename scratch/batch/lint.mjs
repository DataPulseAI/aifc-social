import { posts } from './posts.mjs';
import { posts2 } from './posts2.mjs';
import { carousel } from './carousel.mjs';

const all = [...posts, ...posts2, carousel];
const banned = ['delve','leverage','utilise','robust','seamless','unlock','harness','elevate',
  'supercharge','game changer','landscape','realm','tapestry','testament','pivotal','crucial',
  'vital','dive in','bottom line','read that again','fast paced','in an era where',
  'most people are doing','genuinely','honestly','straightforward','folks'];
let bad = 0;
for (const p of all) {
  const text = [p.body, p.headline, JSON.stringify(p.card||{}), JSON.stringify(p.slides||[])].join('\n');
  const issues = [];
  if (/\u2014|\u2013/.test(text)) issues.push('EN/EM DASH');
  if (/--/.test(text)) issues.push('DOUBLE HYPHEN');
  if (/!/.test(text)) issues.push('EXCLAMATION');
  for (const b of banned) if (new RegExp('\\b'+b.replace(/ /g,'\\s')+'\\b','i').test(text)) issues.push('WORD:'+b);
  const hook = (p.body||'').split('\n')[0];
  if (hook.length > 140) issues.push('HOOK '+hook.length);
  const hash = (p.body.match(/#\w+/g)||[]);
  if (hash.length !== 2) issues.push('HASHTAGS '+hash.length);
  const bodyLen = p.body.replace(/#\w+/g,'').trim().length;
  if (issues.length) { bad++; console.log('!!', p.id, issues.join(' | ')); }
  console.log(String(bodyLen).padStart(5), p.type.padEnd(8), p.hook_type.padEnd(12), (p.destination||'').padEnd(46), p.id);
}
console.log(bad ? `\n${bad} posts with issues` : '\nlint clean');
console.log('total posts:', all.length);
const d={},h={},t={},s={};
all.forEach(p=>{d[p.destination]=(d[p.destination]||0)+1;h[p.hook_type]=(h[p.hook_type]||0)+1;t[p.type]=(t[p.type]||0)+1;s[p.source_publisher]=(s[p.source_publisher]||0)+1});
console.log('types',t);console.log('hooks',h);console.log('sources',s);console.log('dests',d);
