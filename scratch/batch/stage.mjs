import { posts } from './posts.mjs';
import { posts2 } from './posts2.mjs';
import { carousel } from './carousel.mjs';
import { copyFileSync, writeFileSync } from 'node:fs';
const all = [...posts, ...posts2, carousel];
const out = '/mnt/user-data/outputs/aifc';
const list = [];
const take = p => { copyFileSync(p, `${out}/${p}`); list.push(p); };
for (const p of all) {
  take(`cards/${p.id}.${p.type === 'carousel' ? 'pdf' : 'png'}`);
  take(`bank/posts/${p.id}.md`);
}
take(`cards/${carousel.id}-thumb.png`);
take('bank/queue.csv');
take('photos/index.json');
take('lib/card.mjs');
take('docs/17-photo-quality-rules.md');
take('docs/21-what-works.md');
writeFileSync('/tmp/commit.json', JSON.stringify(list.map(p => ({
  stagedPath: `${out}/${p}`, devicePath: `/Users/virensamani/projects/aifc-social/${p}`,
})), null, 0));
console.log(list.length, 'files staged');
