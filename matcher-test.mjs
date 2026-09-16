import { newsCard } from './lib/card.mjs';
import { close } from './lib/render.mjs';

const stories = [
  { name:'a', size:76, headline:'Keir Starmer wants UK firms to be the most AI confident in the G7',
    subjects:['Keir Starmer'], tags:['uk','government','policy'] },
  { name:'b', size:72, headline:'Only 21% of UK small businesses use AI regularly',
    subjects:[], tags:['sme','uk','shop','retail','small business'] },
  { name:'c', size:74, headline:'Seven in ten employees use AI tools nobody approved',
    subjects:[], tags:['office','work','team','security'] },
  { name:'d', size:78, headline:'Geoffrey Hinton left Google to talk about the risks',
    subjects:['Geoffrey Hinton'], tags:['ai','safety','research'] },
  { name:'e', size:70, headline:'In construction, AI use is 13%. The paperwork has not gone anywhere.',
    subjects:[], tags:['construction','trades','site','sme'] },
  { name:'f', size:74, headline:'Microsoft shipped 19 Copilot changes in a single fortnight',
    subjects:[], tags:['microsoft','office','work','laptop'] },
];
for (const s of stories) {
  const r = await newsCard(s, `out/match/${s.name}.png`);
  console.log(`${s.name}  ${String(r.photo).padEnd(34)} fallback=${r.usedFallback}`);
}
await close();
