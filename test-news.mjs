import { backdrop } from './lib/backdrop.mjs';
import { renderCard, close } from './lib/render.mjs';
import { readFileSync } from 'node:fs';
const dataUri = p => 'data:image/jpeg;base64,' + readFileSync(p).toString('base64');

const stories = [
  { f:'a', eyebrow:'Google, 15 September', size:78,
    headline:'Google just gave all its engineers access to Claude',
    credit:'Reported by Business Insider, 15 September 2026' },
  { f:'b', eyebrow:'ONS, UK', size:82,
    headline:'35% of UK firms now use AI. Almost none use it twice.',
    credit:'Office for National Statistics, 20 July 2026' },
  { f:'c', eyebrow:'Microsoft 365', size:80,
    headline:'Copilot shipped 11 changes this fortnight. Three matter to you.',
    credit:'Microsoft 365 Copilot release notes, 25 August 2026' },
];

const specs = [];
for (const s of stories) {
  await backdrop(s.headline, `out/bd-${s.f}.jpg`);
  specs.push({ ...s, template:'news', name:`news-${s.f}`, image: dataUri(`out/bd-${s.f}.jpg`) });
}
for (const s of specs) await renderCard(s, `out/test/${s.name}.png`);
await close();
console.log('ok');
