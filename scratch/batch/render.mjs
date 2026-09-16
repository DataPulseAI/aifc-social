import { posts } from './posts.mjs';
import { posts2 } from './posts2.mjs';
import { carousel } from './carousel.mjs';
import { newsCard } from '../../lib/card.mjs';
import { renderCard, close } from '../../lib/render.mjs';
import { slidesToPdf } from '../../lib/pdf.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';

const OUT = 'scratch/batch/out';
mkdirSync(OUT, { recursive: true });
mkdirSync(`${OUT}/slides`, { recursive: true });
const result = {};
const taken = [];

for (const p of [...posts, ...posts2]) {
  const out = `${OUT}/${p.id}.png`;
  const t0 = Date.now();
  if (p.card.kind === 'news') {
    const r = await newsCard({ headline: p.headline, subjects: [], tags: p.card.tags, size: p.card.size },
      out, { tmpDir: OUT, exclude: taken });
    if (r.photo) taken.push(r.photo);
    result[p.id] = { photo: r.photo, usedFallback: r.usedFallback, credit: r.creditLine };
    console.log(`${p.id}  photo=${r.photo}  fallback=${r.usedFallback}  ${Date.now()-t0}ms`);
  } else {
    await renderCard({ template: p.card.kind, headline: p.headline, ...p.card }, out);
    result[p.id] = { photo: null, usedFallback: false };
    console.log(`${p.id}  template=${p.card.kind}  ${Date.now()-t0}ms`);
  }
}

// carousel
for (const [i, s] of carousel.slides.entries()) {
  await renderCard(s, `${OUT}/slides/${String(i+1).padStart(2,'0')}.png`);
  console.log(`${carousel.id} slide ${i+1}/${carousel.slides.length}`);
}
const pdf = await slidesToPdf(`${OUT}/slides`, `${OUT}/${carousel.id}.pdf`);
console.log('pdf', pdf);
result[carousel.id] = { photo: null, usedFallback: false, pages: pdf.pages };

writeFileSync(`${OUT}/photos.json`, JSON.stringify(result, null, 2));
await close();
console.log('DONE');
