import { backdrop } from './lib/backdrop.mjs';
import { renderCard, close } from './lib/render.mjs';
import { readFileSync } from 'node:fs';
const uri = p => 'data:image/jpeg;base64,' + readFileSync(p).toString('base64');
const set = [
  ['The world’s richest man says he’s living in a trailer', 84, 'forest'],
  ['A Google DeepMind researcher just quit over what AI might do to us', 78, 'ink'],
  ['Google is quietly letting all its engineers use a rival’s AI', 80, 'slate'],
];
for (const [i,[h,sz,t]] of set.entries()) {
  await backdrop(h, `out/bi-${i}.jpg`, 1080,1350, t);
  await renderCard({template:'news', image:uri(`out/bi-${i}.jpg`), headline:h, size:sz}, `out/test/bi-${i}.png`);
}
await close(); console.log('ok');
