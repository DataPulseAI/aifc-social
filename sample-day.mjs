import { backdrop } from './lib/backdrop.mjs';
import { renderCard, close } from './lib/render.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
const uri = p => 'data:image/jpeg;base64,' + readFileSync(p).toString('base64');

const DAY = [
{
  slot:'07:45', pillar:'What changed', archetype:'A. Release read', template:'news',
  hook:'Anthropic is now selling Claude to small businesses. That tells you something.',
  copy:`Anthropic is now selling Claude directly to small businesses, with a starter pack aimed at firms that have no AI team and no intention of building one.

Business Insider reported the push yesterday, alongside something more interesting: the small businesses buying it say they are balancing sales pitches from the labs against pushback from their own customers about using AI at all.

Both halves matter if you run a company this size.

The labs have worked out that the enterprise market is nearly sold and the next hundred thousand customers are firms with twenty staff. Expect the pitches to get better and more frequent.

The second half is the part nobody is helping with. Your customers' view of AI is now part of your operating reality, and no starter pack addresses it. If you are using AI on client work, the useful exercise this month is writing down the sentence you would say if a client asked. One sentence, agreed across the team.

That sentence is worth more than the tooling decision it sits underneath.

Source: Business Insider, 15 September 2026.`,
  card:{ eyebrow:'THE LABS COME DOWNMARKET', size:78, tone:'ink',
         headline:'Anthropic is now selling Claude to small businesses',
         credit:'Business Insider, 15 September 2026' },
  dest:null
},
{
  slot:'12:15', pillar:'How to run it', archetype:'C. Checklist', template:'list',
  hook:'Six questions to settle before you roll out an AI assistant.',
  copy:`Six questions to settle before you roll out an AI assistant.

Most rollouts fail on the third one.

A team gets seats, a launch session, and a shared folder of prompts that nobody owns. By week six the folder is a graveyard, the enthusiastic two have built their own habits, and everyone else has quietly gone back to how they worked before.

None of that is a tooling problem. Every one of these questions is answerable in an afternoon, and answering them is most of the work.

The one that catches people out is measurement. If you have not decided what you are counting before you start, you will be left with a satisfaction survey at week four, and a satisfaction survey will tell you that everyone enjoyed the session and nothing about whether the work changed.

The full ninety day version is at aiforcompanies.co.uk/insights

Which of the six is currently unowned at your place?`,
  card:{ eyebrow:'BEFORE YOU BUY SEATS', size:74,
    headline:'Six questions to settle before you roll out an AI assistant',
    items:['Which three tasks does it have to improve, named?',
           'Where does our data go, and who can export it?',
           'Who owns the prompt library after week one?',
           'What does a good output look like here?',
           'Who do people ask when it gets something wrong?',
           'What are we measuring at week four?'],
    foot:'aiforcompanies.co.uk/insights' },
  dest:'https://aiforcompanies.co.uk/insights'
},
{
  slot:'17:15', pillar:'The evidence', archetype:'B. Statistic', template:'stat',
  hook:'35% of UK firms now use AI. The average one uses it for 1.6 things.',
  copy:`35% of UK firms now use AI. The average one uses it for 1.6 things.

That second number is from the same ONS release as the first, and it is the one worth sitting with. When the ONS started measuring in late 2023, the average adopting business used about 1.4 AI technologies. Nearly three years later it is roughly 1.6.

Adoption has almost tripled. Depth has barely moved.

So the picture is not a country racing ahead with AI. It is a very large number of companies that have bought one thing, use it for one job, and stopped. Usually that job is writing, because writing is the one use everybody arrives already understanding.

Which is worth knowing if you are feeling behind. You are probably not behind on adoption. Almost nobody is ahead on depth, and depth is the part that shows up in the accounts.

The gap between 1.6 and the number your business could reach is not a budget line. It is whether anyone has ever sat with your team and worked through their actual tasks.

Source: ONS, Artificial intelligence in UK businesses, 20 July 2026.`,
  card:{ eyebrow:'ONS, UK BUSINESSES, JULY 2026', value:'1.6', size:290,
    claim:'AI technologies in use at the average UK business that has adopted any at all.',
    source:'Office for National Statistics, Artificial intelligence in UK businesses, 20 July 2026. Up from roughly 1.4 in late 2023, while the share of firms using AI nearly tripled.' },
  dest:null
}];

for (const [i,p] of DAY.entries()) {
  const spec = { template:p.template, ...p.card };
  if (p.template === 'news') {
    await backdrop(p.card.headline, `out/day-${i}.jpg`, 1080, 1350, p.card.tone);
    spec.image = uri(`out/day-${i}.jpg`);
  }
  await renderCard(spec, `out/day/${i+1}-${p.slot.replace(':','')}.png`);
}
await close();
writeFileSync('out/day/copy.json', JSON.stringify(DAY.map(({card,...r})=>r), null, 2));
console.log(DAY.map(p=>`${p.slot}  ${p.pillar.padEnd(14)} ${p.archetype}  |  ${p.copy.length} chars`).join('\n'));
