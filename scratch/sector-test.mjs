import { newsCard } from './lib/card.mjs';
import { close } from './lib/render.mjs';
const st = [
  { name:'a', size:70, headline:'In construction, AI use is 13%. The paperwork has not gone anywhere.',
    subjects:[], tags:['construction','trades','site','sme'] },
  { name:'b', size:72, headline:'Your solicitor is already using AI. Nobody told the client.',
    subjects:[], tags:['legal','law','professional','contract'] },
  { name:'c', size:68, headline:'Only 21% of UK small businesses use AI regularly',
    subjects:[], tags:['sme','shop','retail','owner','uk'] },
  { name:'d', size:74, headline:'The jobs that eat Fridays are the ones worth automating first',
    subjects:[], tags:['admin','paperwork','finance','forms'] },
  { name:'e', size:70, headline:'Hiring slowed. The paperwork behind it did not.',
    subjects:[], tags:['hiring','interview','recruitment','hr'] },
  { name:'f', size:72, headline:'What a two hour AI session actually changes',
    subjects:[], tags:['training','classroom','learning','session'] },
];
for (const s of st) { const r = await newsCard(s, `out/sec/${s.name}.png`); console.log(`${s.name}  ${r.photo}`); }
await close();
