import { newsCard } from './lib/card.mjs';
import { close } from './lib/render.mjs';
import { writeFileSync } from 'node:fs';

const POST = {
  slot: '07:45', band: 'Wide', archetype: 'B. The statistic, read honestly',
  headline: 'Only 18% of UK businesses use a large language model',
  size: 82, tone: 'ink',
  subjects: [], tags: ['office','uk','work'],

  body: `Only 18% of UK businesses use a large language model.

That is the actual number, published by the Office for National Statistics on 20 July. Not 18% of small businesses, or 18% of some laggard sector. Eighteen per cent of all of them.

The wider figure gets quoted more often and sounds better. Self-reported AI use in businesses with 10 or more employees has gone from around 12% to around 35% since late 2023. Nearly tripled in under three years, which is genuinely fast.

But the ONS also tracked how many AI technologies each adopting business actually uses, and that number went from around 1.4 to around 1.6 over the same period.

Adoption tripled. Depth moved by two tenths.

The sector spread says the same thing more bluntly. 58% of businesses in information and communication report using AI. In construction it is 13%.

And the breakdown of what people use is short. Large language models 18%, visual content creation 16%, data processing with machine learning 12%, image processing 6%, robotics 2%.

Three things follow from this if you run a company.

You are probably not behind. If you have bought some seats and your team uses them for writing, you are doing what the median UK business is doing.

The gap that matters is not between you and the firms that have adopted AI. It is between one use and several. Almost nobody has crossed that gap yet, which is the part nobody selling you software will mention.

And the second use is always harder than the first, because the first one arrives on its own. People work out that it writes. Nobody works out on their own that it can reconcile two spreadsheets, or draft the first pass of a tender response, or sit in a meeting and produce the actions. Someone has to show them, on their own work.

Source: ONS, Artificial intelligence in UK businesses, 2023 to 2026, published 20 July 2026.

Which one thing is your team using it for?`,

  sources: [{
    url: 'https://www.ons.gov.uk/businessindustryandtrade/business/businessservices/articles/artificialintelligenceinukbusinesses/2023to2026',
    publisher: 'Office for National Statistics',
    date: '2026-07-20'
  }],

  claims: [
    ['18% use large language models',            'ONS, technology breakdown June 2026'],
    ['12% to 35% since late 2023, 10+ employees','ONS, exact wording "around 12% to around 35%"'],
    ['1.4 to 1.6 technologies per adopter',      'ONS, exact wording "around 1.4 to around 1.6"'],
    ['58% info and comms vs 13% construction',   'ONS, sectoral variation'],
    ['16% visual, 12% data ML, 6% image, 2% robotics', 'ONS, technology breakdown'],
    ['the rest is our own reading, marked as such', 'opinion, not presented as fact'],
  ],
};

const r = await newsCard(POST, 'out/worked/1-0745.png');
await close();
writeFileSync('out/worked/post.json', JSON.stringify({ ...POST, card: r }, null, 2));
console.log('body:', POST.body.length, 'chars');
console.log('hook:', POST.body.split('\n')[0].length, 'chars');
console.log('claims checked:', POST.claims.length);
console.log('fallback image used:', r.usedFallback);
