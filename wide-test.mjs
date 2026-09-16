import { newsCard } from './lib/card.mjs';
import { close } from './lib/render.mjs';
const st = [
  { name:'a', size:70, headline:'Your solicitor is already using AI. Nobody told the client.',
    subjects:[], tags:['legal','law','professional','contract'] },
  { name:'b', size:68, headline:'The jobs that eat Fridays are the ones worth automating first',
    subjects:[], tags:['admin','paperwork','forms','accounts'] },
  { name:'c', size:72, headline:'Seven in ten employees use AI nobody approved',
    subjects:[], tags:['office','work','team','hybrid'] },
  { name:'d', size:66, headline:'In construction, AI use is 13%. The paperwork has not gone anywhere.',
    subjects:[], tags:['construction','trades','site','sme'] },
  { name:'e', size:70, headline:'What a two hour AI session actually changes',
    subjects:[], tags:['training','classroom','learning','session'] },
  { name:'f', size:68, headline:'Only 21% of UK small businesses use AI regularly',
    subjects:[], tags:['sme','retail','shop','owner','uk'] },
];
for (const s of st) { const r = await newsCard(s, `out/wt/${s.name}.png`); console.log(`${s.name}  ${r.photo}`); }
await close();
