import { newsCard } from './lib/card.mjs';
import { close } from './lib/render.mjs';
const st = [
  { name:'a', size:70, headline:'Seven in ten employees use AI tools nobody approved',
    subjects:[], tags:['security','privacy','risk','data'] },
  { name:'b', size:66, headline:'The jobs that eat Fridays are the ones worth automating first',
    subjects:[], tags:['stress','time','friday','workload','admin'] },
  { name:'c', size:70, headline:'Anthropic is now selling Claude to twenty-person companies',
    subjects:['Dario Amodei'], tags:['anthropic','ai','sme'] },
  { name:'d', size:68, headline:'Only 21% of UK small businesses use AI regularly',
    subjects:[], tags:['sme','owner','uk','small business'] },
  { name:'e', size:66, headline:'Rachel Reeves has put AI at the centre of the growth plan',
    subjects:['Rachel Reeves'], tags:['uk','treasury','policy'] },
];
for (const s of st) { const r = await newsCard(s, `out/fin/${s.name}.png`); console.log(`${s.name}  ${r.photo}`); }
await close();
