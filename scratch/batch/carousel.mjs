import { L } from './posts.mjs';

export const carousel = {
  id: '2026-09-30-client-asks-ai-carousel', type: 'carousel', priority: 0,
  headline: 'What to say when a client asks if you used AI',
  source_publisher: 'ICO', source_date: '2026-01-08', source_url: L.ico,
  archetype: 'guide', hook_type: 'flat-claim',
  destination: '/insights/ai-usage-policy-uk-template',
  doc_title: 'What to say when a client asks if you used AI',
  alt: 'A six page document. Cover: what to say when a client asks if you used AI. Inside: what the client is really asking, four facts to have ready, the plain words to use, what not to do, and a closing page pointing at a one page policy.',
  caption: `What to say when a client asks if you used AI. Six pages, four facts, and the plain words to use.

aiforcompanies.co.uk/insights`,
  body: `What to say when a client asks if you used AI. Six pages, four facts, and the plain words to use.

aiforcompanies.co.uk/insights

#AIforBusiness #ProfessionalServices`,
  slides: [
    { template: 'cover', of: 6, eyebrow: 'For UK firms', size: 92,
      title: 'What to say when a client asks if you used AI',
      sub: 'Four facts, agreed once, so that everybody in the firm gives the same answer.',
      cue: 'Swipe. Save it for Monday.' },

    { template: 'tips', n: 2, of: 6, eyebrow: 'First', title: 'Answer the question underneath', size: 58, body: 38,
      items: [
        'Almost nobody means "did a machine write this"',
        'They mean: did our information leave your control',
        'And: is a named person accountable for what you sent',
        'Answer those two and the first stops mattering' ] },

    { template: 'tips', n: 3, of: 6, eyebrow: 'Second', title: 'Have four facts ready', size: 58, body: 38,
      items: [
        'Which tools the firm has approved',
        'Whether client information goes into them, and which',
        'Whether the supplier trains models on what you put in',
        'Who reviewed the work before it left the building' ] },

    { template: 'tips', n: 4, of: 6, eyebrow: 'Third', title: 'Then say it plainly', size: 58, body: 37,
      items: [
        '"We use assistants for drafting and research"',
        '"Your information is not pasted into consumer tools"',
        '"A named person reviews everything before it reaches you"',
        '"We can send you our policy. It is one page"' ] },

    { template: 'tips', n: 5, of: 6, eyebrow: 'And', title: 'Four ways to get it wrong', size: 58, body: 38,
      items: [
        'Saying no when the answer is yes',
        'Promising a blanket ban you cannot enforce',
        'Improvising a different answer for each client',
        'Leaving it to whoever happens to pick up the phone' ] },

    { template: 'outro', n: 6, of: 6, size: 68,
      title: 'The answer is a document, not a mood.',
      sub: 'The ICO is clear that the organisation stays responsible for what its AI does with personal information. Write the four facts down once.',
      url: 'aiforcompanies.co.uk/insights',
      foot: 'Not legal advice' },
  ],
};
