import { newsCard } from './lib/card.mjs';
import { close } from './lib/render.mjs';

const stories = [
  { headline:'Anthropic is now selling Claude to twenty-person companies',
    subjects:['Dario Amodei'], tags:['anthropic','ai','sme'], size:80, name:'a' },
  { headline:'Satya Nadella’s entire AI rule is four words: keep humans in control',
    subjects:['Satya Nadella'], tags:['microsoft','ai','leadership'], size:74, name:'b' },
  // no human subject: must NOT pick a portrait
  { headline:'Only 18% of UK businesses use a large language model',
    subjects:[], tags:['uk','office','work','data'], size:82, name:'c' },
  // surname in headline only: should still match
  { headline:'Jensen Huang says the chip shortage is over', subjects:[],
    tags:['nvidia','chips'], size:84, name:'d' },
];
for (const s of stories) {
  const r = await newsCard(s, `out/real/${s.name}.png`);
  console.log(`${s.name}: photo=${r.photo}  fallback=${r.usedFallback}`);
  console.log(`   credit: ${r.creditLine}`);
}
await close();
