import { backdrop, TONE_KEYS } from './lib/backdrop.mjs';
import { renderCard, close } from './lib/render.mjs';
import { readFileSync } from 'node:fs';
const uri = p => 'data:image/jpeg;base64,' + readFileSync(p).toString('base64');
const heads = [
  ['Google just gave all its engineers access to Claude','GOOGLE, 15 SEPT'],
  ['35% of UK firms use AI. Almost none use it twice.','ONS, UK'],
  ['Copilot shipped 11 changes. Three matter to you.','MICROSOFT 365'],
  ['Your team is not behind. It is untrained.','THE WEEK IN AI'],
];
for (const [i,k] of TONE_KEYS.entries()) {
  const [h,e]=heads[i];
  await backdrop(h, `out/bt-${k}.jpg`, 1080,1350, k);
  await renderCard({template:'news',image:uri(`out/bt-${k}.jpg`),headline:h,eyebrow:e,size:80,
    credit:'aiforcompanies.co.uk'}, `out/test/tone-${k}.png`);
}
await close(); console.log(TONE_KEYS.join(' '));
