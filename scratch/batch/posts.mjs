/* Weekly batch, written 16 September 2026. Every figure from a source opened this run. */

export const L = {
  ons:   'https://www.ons.gov.uk/businessindustryandtrade/business/businessservices/articles/artificialintelligenceinukbusinesses/2023to2026',
  dsit:  'https://www.gov.uk/government/publications/entry-level-hiring-in-the-uk-a-snapshot/a-snapshot-of-entry-level-hiring-in-the-uk',
  ncscAg:'https://www.ncsc.gov.uk/blogs/managing-the-cyber-risk-of-agentic-ai',
  ncscSh:'https://www.ncsc.gov.uk/blogs/the-hidden-risks-of-shadow-ai',
  ncscCa:'https://www.ncsc.gov.uk/blogs/helping-small-businesses-with-free-hands-on-cyber-consultancy',
  ico:   'https://ico.org.uk/about-the-ico/research-reports-impact-and-evaluation/research-and-reports/technology-and-innovation/tech-horizons-and-ico-tech-futures/ico-tech-futures-agentic-ai/',
  tcAiuc:'https://techcrunch.com/2026/09/15/early-anthropic-hire-former-metr-coo-have-found-a-way-to-rein-in-rogue-ai-agents/',
  fcVdh: 'https://www.fastcompany.com/91607286/ai-is-supposed-to-simplify-work-jim-vandehei-says-its-doing-the-opposite',
  oaiRn: 'https://help.openai.com/en/articles/6825453-chatgpt-release-notes',
  msRm:  'https://www.microsoft.com/releasecommunications/api/v2/m365/rss',
  gws:   'https://workspaceupdates.googleblog.com/',
  tcWa:  'https://techcrunch.com/2026/09/15/meta-now-lets-ai-agents-handle-the-boring-parts-of-whatsapp-business-setup/',
};

export const posts = [

/* ---------------------------------------------------------------- 1. news */
{
  id: '2026-09-22-agent-audit-40m', type: 'news', priority: 0,
  headline: "A startup just raised $40m to run 5,000 tests on other companies' AI agents",
  card: { kind: 'news', size: 72, tags: ['compute','servers','infrastructure','research','ai','safety'] },
  source_publisher: 'TechCrunch', source_date: '2026-09-15', source_url: L.tcAiuc,
  archetype: 'news', hook_type: 'named-thing', destination: 'none',
  alt: 'A single sentence over a photograph: a startup raised 40 million dollars to run 5,000 tests on other companies AI agents.',
  body: `A startup just raised $40m to run 5,000 tests on other companies' AI agents.

The company is AIUC, founded by Rune Kvist, an early Anthropic employee, and Rajiv Dattani, formerly chief operating officer at METR. Ribbit Capital led the Series A, on top of a $15m seed. They put an agent through roughly 5,000 tests covering jailbreaks, hallucinations and data leaks, then hand back a report of about 100 pages saying where it can be trusted and where it cannot.

Kvist's explanation of why anyone pays for this is the part worth reading. "Banks, hospitals, governments and militaries no longer decline to deploy AI because a model isn't smart enough. They decline because they've made commitments to their own customers about what a system will and won't do."

Nobody at a 40 person firm is buying a 100 page audit. But that is the same objection at your scale, and the question underneath it costs nothing to ask: what has this tool been told it must never do, and who would notice if it did it anyway?

Reported by TechCrunch, 15 September 2026.
${L.tcAiuc}

#AIforBusiness #AIGovernance`,
},

/* ---------------------------------------------------------------- 2. news */
{
  id: '2026-09-22-thinking-mode', type: 'news', priority: 1,
  headline: 'ChatGPT has stopped choosing its own thinking mode',
  card: { kind: 'news', size: 84, tags: ['office','team','hybrid','desk','work','people'] },
  source_publisher: 'OpenAI', source_date: '2026-09-14', source_url: L.oaiRn,
  archetype: 'release-read', hook_type: 'flat-claim', destination: '/prompts',
  alt: 'A single sentence over a photograph of someone working at a laptop: ChatGPT has stopped choosing its own thinking mode.',
  body: `ChatGPT has stopped choosing its own thinking mode.

OpenAI's release notes for 14 September record that automatic switching from Instant to Thinking has been removed for Plus and Pro. Manual selection stays. So the slower mode, the one that works through a problem before answering, is now something a person has to reach for rather than something the product reaches for on their behalf.

For most teams this will pass unnoticed, which is the problem. The people who were getting the better answers were mostly getting them by accident.

Worth settling this week, in one sentence each: which jobs get Thinking, and which do not. Our rough split is that anything with a number in it, anything being sent to a client, and anything where being wrong is expensive gets the slower mode. Rewriting an email does not.

It takes five minutes to agree and it is the kind of thing that never gets agreed.

The 25 prompts we publish are at aiforcompanies.co.uk/prompts, free and no form.

#AIforBusiness #ChatGPT`,
},

/* ---------------------------------------------------------------- 3. news */
{
  id: '2026-09-23-entry-level-hiring', type: 'news', priority: 0,
  headline: 'Entry-level accountant hiring fell 29% in a year. Retail assistant hiring rose 25%.',
  card: { kind: 'news', size: 64, tags: ['classroom','learning','adults','course','training','academic'] },
  source_publisher: 'DSIT', source_date: '2026-06-08', source_url: L.dsit,
  archetype: 'contrast', hook_type: 'number-first',
  destination: '/insights/ai-training-for-employees-what-works',
  alt: 'A single sentence over a photograph of an office: entry-level accountant hiring fell 29 per cent in a year while retail assistant hiring rose 25 per cent.',
  body: `Entry-level accountant hiring fell 29% in a year. Retail assistant hiring rose 25%.

Both numbers are from the same government snapshot of entry-level hiring in the UK, published by DSIT on 8 June 2026. It tracks 38 occupations. 30 are declining and 8 are growing, and more than 50 percentage points separate the top from the bottom.

The declines cluster where you would expect if you had already decided AI was the cause. Graphic designer down 28%, software engineer down 27%, product manager down 24%.

The report will not let you draw that conclusion, which is the reason to read it rather than the commentary on it. It says some of the biggest declines are in roles where AI capabilities have increased, then adds that this is not yet causal evidence, and notes the same occupations are hiring less at every level of seniority. Overall UK hiring was down 14% year on year.

Our read is narrower. Whatever is doing this, the firms that come out of it well will be the ones that can still train a junior, and a junior handed an assistant on day one has not been trained.

${L.dsit}

#AIforBusiness #UKBusiness`,
},

/* ---------------------------------------------------------------- 4. news */
{
  id: '2026-09-23-waste-25-percent', type: 'news', priority: 0,
  headline: '"We waste 25% of our week doing things we never should have done"',
  card: { kind: 'news', size: 76, tags: ['session','speaking','adults','discussion','workshop','presentation'] },
  source_publisher: 'Fast Company', source_date: '2026-09-16', source_url: L.fcVdh,
  archetype: 'quote', hook_type: 'quote-first', destination: 'none',
  alt: 'A quotation over a photograph of a meeting: we waste 25 per cent of our week doing things we never should have done.',
  body: `"We waste 25% of our week doing things we never should have done."

That is Jim VandeHei, chief executive of Axios, talking to Fast Company on 16 September. He is citing research from The Economist and others, and his argument is the one nobody selling AI wants made: the technology is not simplifying work, it is "mass-producing more options, more decisions, and more noise".

He has the receipts for what that feels like from the inside. Six months ago 30 to 40% of Axios traffic arrived through Google Search. It is now 5 to 10%.

His method is three words. Confront, which is asking why you do a thing at all. Delete, which is saying no to what does not survive the question. Amplify, which is putting the recovered hours into the work you are good at. He held a leadership meeting whose only purpose was naming things to stop doing.

The order matters and it is the bit teams get backwards. Adding an assistant to a process nobody has questioned makes a wasteful process faster. That is not the same as making it smaller.

${L.fcVdh}

#AIforBusiness #FutureOfWork`,
},

/* ---------------------------------------------------------------- 5. news */
{
  id: '2026-09-24-construction-13', type: 'news', priority: 0,
  headline: '13% of UK construction firms use AI. In information and communication it is 58%.',
  card: { kind: 'news', size: 64, tags: ['construction','site','trades','build','uk','work'] },
  source_publisher: 'ONS', source_date: '2026-07-20', source_url: L.ons,
  archetype: 'contrast', hook_type: 'number-first', destination: '/industries/property-construction',
  alt: 'A single sentence over a photograph of a construction site: 13 per cent of UK construction firms use AI, against 58 per cent in information and communication.',
  body: `13% of UK construction firms use AI. In information and communication it is 58%.

Both from the ONS release of 20 July 2026 on artificial intelligence in UK businesses. Around 35% of businesses with 10 or more staff now use at least one AI technology, up from around 12% in late 2023, and 49% of those with 250 staff or more.

A 45 point gap between two industries is the number worth sitting with. It is not a technology gap. The same assistants are on sale to a groundworks contractor and a software firm at the same price, and one of them has worked out what to do with them.

The barriers data says the same thing from the other side. 41% of UK businesses report no barriers to adopting AI at all. Cost is named by 7% to 14% depending on size, lack of expertise by up to 18%.

So for most firms nothing is in the way, and nothing is happening. That is not a procurement problem.

We wrote about what this looks like in property and construction specifically: aiforcompanies.co.uk/industries/property-construction

${L.ons}

#AIforBusiness #Construction`,
},

/* ---------------------------------------------------------------- 6. news */
{
  id: '2026-09-24-edge-dlp-november', type: 'news', priority: 1,
  headline: 'A control that watches what staff paste into web apps reaches Edge in November',
  card: { kind: 'news', size: 68, tags: ['office','hybrid','people','culture','team','work'] },
  source_publisher: 'Microsoft 365 Roadmap', source_date: '2026-09-16', source_url: L.msRm,
  archetype: 'release-read', hook_type: 'named-thing',
  destination: '/insights/microsoft-365-copilot-rollout-plan',
  alt: 'A single sentence over a photograph of a desk and screen: a control that watches what staff paste into web apps reaches Edge in November.',
  body: `A control that watches what staff paste into web apps reaches Edge in November.

Microsoft 365 Roadmap items 571396 and 571397, read on 16 September. Microsoft Purview is getting enhanced inline data loss protection in Edge for Business, covering unmanaged apps as well as managed ones, with expanded policy configuration and a simulation mode.

The unmanaged part is the whole story. Most of what an organisation loses to AI does not go through an approved tool. It goes through a browser tab nobody has an inventory of, on a free plan, at four in the afternoon, because the approved tool was slower.

Simulation mode is the feature to plan around rather than the blocking. Run it first and you get a picture of what people are actually doing before you make a rule about it. Write the rule first and you will write it against what you imagine they are doing, which is how policies end up being ignored by everyone including the person who wrote them.

If you are mid-rollout, this is worth putting in the November column now rather than discovering it later: aiforcompanies.co.uk/insights/microsoft-365-copilot-rollout-plan

#AIforBusiness #DataProtection`,
},

/* ---------------------------------------------------------------- 7. news */
{
  id: '2026-09-25-ico-eight-risks', type: 'news', priority: 0,
  headline: 'The ICO has named eight ways an AI agent can put you on the wrong side of data law',
  card: { kind: 'news', size: 64, tags: ['planning','writing','focus','admin','office','uk'] },
  source_publisher: 'ICO', source_date: '2026-01-08', source_url: L.ico,
  archetype: 'policy-note', hook_type: 'number-first', destination: '/industries/professional-services',
  alt: 'A single sentence over a photograph of an office: the ICO has named eight ways an AI agent can put you on the wrong side of data law.',
  body: `The ICO has named eight ways an AI agent can put you on the wrong side of data law.

The report is ICO tech futures: agentic AI, published 8 January 2026. It lists eight categories of risk that are new or sharpened when a system acts on its own rather than answering a question. Among them: purposes written so broadly they cover anything, processing more personal information than the job needs, inferring special category data without meaning to, and one assistant ending up holding everything about a person.

One sentence in it does more work than the rest. Organisations remain responsible for data protection compliance of the agentic AI they develop, deploy or integrate.

Buying it does not move the responsibility. Neither does the vendor's security page.

For a professional services firm this is the whole question, because the data is somebody else's and the duty was owed before any of this existed. Our sector page is at aiforcompanies.co.uk/industries/professional-services

This is not legal advice.

${L.ico}

#AIforBusiness #DataProtection`,
},

];
