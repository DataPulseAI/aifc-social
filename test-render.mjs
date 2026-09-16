import { renderAll, close } from './lib/render.mjs';

const specs = [
  { template: 'stat', name: 'stat',
    eyebrow: 'ONS, UK businesses, July 2026',
    value: '1.6',
    claim: 'The average number of AI technologies in use at a UK business that has adopted any at all.',
    source: 'Office for National Statistics, Artificial intelligence in UK businesses, 20 July 2026. Up from roughly 1.4 in late 2023.' },

  { template: 'list', name: 'list',
    eyebrow: 'Before you buy seats',
    headline: 'Six questions to settle before you roll out an AI assistant',
    items: [
      'Which three tasks does it have to improve, named?',
      'Where does our data go, and who can export it?',
      'Who owns the prompt library after week one?',
      'What does a good output look like here?',
      'Who do people ask when it gets something wrong?',
      'What are we measuring at week four?' ],
    foot: 'aiforcompanies.co.uk/insights' },

  { template: 'quote', name: 'quote',
    text: 'Adoption is widening, not deepening. More UK firms use AI every quarter, and almost none use it for more than one job.',
    attribution: 'Reading the ONS AI adoption data, September 2026',
    foot: 'aiforcompanies.co.uk' },

  { template: 'slide', name: 'slide-cover', kind: 'cover', n: 1, of: 7,
    eyebrow: 'A ninety day plan',
    title: 'Most Copilot rollouts stall in week three',
    text: 'Here is what the ones that do not have in common.' },

  { template: 'slide', name: 'slide-body', kind: 'body', n: 4, of: 7,
    eyebrow: 'Week three',
    title: 'Name an owner for the prompt library',
    text: 'A shared library with no owner is a folder of dead links by week six. One person, named, who adds what worked and deletes what did not.',
    foot: 'aiforcompanies.co.uk' },
];

await renderAll(specs, './out/test');
await close();
console.log('rendered', specs.length);
