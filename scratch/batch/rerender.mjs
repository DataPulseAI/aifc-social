import { posts } from './posts.mjs';
import { posts2 } from './posts2.mjs';
import { newsCard } from '../../lib/card.mjs';
import { renderCard, close } from '../../lib/render.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
const OUT = 'scratch/batch/out';
const REJECT = JSON.parse(readFileSync('scratch/batch/rejects.json','utf8'));   // {id:[badfiles]}
const state = JSON.parse(readFileSync(`${OUT}/photos.json`,'utf8'));
const all = [...posts, ...posts2];
// everything still held by a card we are NOT re-rendering, plus every file already rejected anywhere
const keep = all.filter(p => !REJECT[p.id]).map(p => state[p.id]?.photo).filter(Boolean);
const banned = Object.values(REJECT).flat();
const taken = [...keep, ...banned];
for (const id of Object.keys(REJECT)) {
  const p = all.find(x => x.id === id);
  if (p.card.kind === 'news') {
    const r = await newsCard({ headline: p.headline, subjects: [], tags: p.card.tags, size: p.card.size },
      `${OUT}/${id}.png`, { tmpDir: OUT, exclude: taken });
    if (r.photo) taken.push(r.photo);
    state[id] = { photo: r.photo, usedFallback: r.usedFallback, credit: r.creditLine };
    console.log(`${id}  photo=${r.photo}  fallback=${r.usedFallback}`);
  } else {
    await renderCard({ template: p.card.kind, headline: p.headline, ...p.card }, `${OUT}/${id}.png`);
    console.log(`${id}  template=${p.card.kind}`);
  }
}
writeFileSync(`${OUT}/photos.json`, JSON.stringify(state, null, 2));
await close();
console.log('DONE');
