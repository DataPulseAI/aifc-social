import { L } from './posts.mjs';

export const posts2 = [

/* ---------------------------------------------------------------- 8. grid, actionable */
{
  id: '2026-09-25-stop-pasting-grid', type: 'grid', priority: 0,
  headline: 'Eight things to stop pasting into AI at work',
  card: { kind: 'grid', kicker: 'AI at work', size: 62,
    lines: [{t:'Eight things'},{t:'to stop pasting',accent:true},{t:'into AI at work'}],
    items: [
      { title: 'Whole client contracts', body: 'The parties, the rates and the termination clause, in one paste.' },
      { title: 'Staff records', body: 'Names attached to pay, reviews or absence. Strip the names first.' },
      { title: 'Card and bank details', body: 'No tool, no plan tier, no exception worth arguing about.' },
      { title: 'Unredacted CVs', body: 'Home addresses and dates of birth travel with the document.' },
      { title: 'Code with keys in it', body: 'The key is the part that matters, not the function around it.' },
      { title: 'Patient or pupil data', body: 'Special category information. Get the right person in the room.' },
      { title: 'Anything under an NDA', body: 'The NDA does not mention AI. That is the problem, not the defence.' },
      { title: 'Screenshots of dashboards', body: 'People redact the text and forget the image underneath it.' },
    ] },
  source_publisher: 'NCSC', source_date: '2026-09-07', source_url: L.ncscSh,
  archetype: 'actionable-list', hook_type: 'imperative', destination: 'none',
  alt: 'A numbered list of eight kinds of information to stop pasting into AI tools at work, from client contracts to screenshots of dashboards.',
  body: `Eight things to stop pasting into AI at work.

The NCSC published a post on 7 September 2026 on the hidden risks of shadow AI, and its framing is the useful one: staff reach for unapproved tools because the approved route is slower, not because they are careless. Banning your way out of that has a poor record.

So the practical version is not a ban list, it is a short list of things that never go in, whatever the tool, so that everything else can be relaxed. The eight above are ours. They are the categories where a paste cannot be undone, either because the information identifies someone or because it belongs to a client who did not agree to any of this.

Two notes on using it. Write it on one page and put it where people work, not in a policy folder. And say what the approved tool is in the same sentence, because a prohibition without an alternative is just a slower route to the same paste.

The ICO's position is that the organisation stays responsible for what its AI does with personal information. That does not change when the tool was free.

This is not legal advice.

${L.ncscSh}

#AIforBusiness #DataProtection`,
},

/* ---------------------------------------------------------------- 9. grid, factual */
{
  id: '2026-09-30-what-firms-use-grid', type: 'grid', priority: 0,
  headline: 'What UK firms actually use AI for',
  card: { kind: 'grid', kicker: 'UK business', size: 76,
    lines: [{t:'What UK firms'},{t:'actually use',accent:true},{t:'AI for'}],
    items: [
      { title: 'Language models, 18%', body: 'Chat assistants. The one everybody means when they say AI.' },
      { title: 'Making pictures, 16%', body: 'Almost as common as chat, and almost never discussed.' },
      { title: 'Data processing, 12%', body: 'Machine learning on your own numbers. Sorting, forecasting, cleaning.' },
      { title: 'Reading images, 6%', body: 'Pulling information out of documents and photographs.' },
      { title: 'Robotics, 2%', body: 'Physical automation. Manufacturing and warehousing, mostly.' },
      { title: 'Everything else, 2%', body: 'The whole of the rest of the field, combined.' },
    ] },
  source_publisher: 'ONS', source_date: '2026-07-20', source_url: L.ons,
  archetype: 'stat-in-context', hook_type: 'number-first', destination: 'none',
  alt: 'A numbered list of the six AI technologies UK businesses use, with the percentage using each, from language models at 18 per cent to other technologies at 2 per cent.',
  body: `What UK firms actually use AI for, in order, with the percentage of businesses using each.

From the ONS release of 20 July 2026, measuring businesses with 10 or more employees in June 2026.

The second line is the one nobody quotes. Visual content creation sits at 16%, within touching distance of language models at 18%. Every conversation about AI at work is about the chat window, and roughly as many firms are using it to make images as to write things. Design, marketing and whoever does the newsletter have been quietly getting on with it.

Underneath that, the numbers fall away fast. Machine learning on a company's own data, which is where most of the durable value sits, is at 12%.

One more figure from the same release puts the rest in context. Only 10% of the businesses that use AI at all describe their use as extensive. Adoption is a wide, thin layer. That is a training gap rather than a purchasing one, which is the whole of what we argue here.

${L.ons}

#AIforBusiness #UKBusiness`,
},

/* ---------------------------------------------------------------- 10. roundup */
{
  id: '2026-09-28-tools-roundup', type: 'roundup', priority: 1,
  headline: 'Four changes to the tools you already pay for',
  card: { kind: 'roundup', kicker: 'Worth knowing', size: 62,
    items: [
      { source: 'OpenAI', date: '10 Sep', title: 'A Data plugin that reads your connected business systems',
        why: 'Dashboards and reports built from your own numbers, inside the chat.' },
      { source: 'OpenAI', date: '9 Sep', title: 'Library files can now be shared with named people',
        why: 'Viewer and editor permissions. Somebody should own who gets editor.' },
      { source: 'Google', date: '15 Sep', title: 'Gmail search answers the question instead of listing emails',
        why: 'Now global on paid Workspace plans, in English.' },
      { source: 'Meta', date: '15 Sep', title: 'WhatsApp Business setup can be handed to an AI agent',
        why: 'Accounts, templates and webhook testing, through an MCP server.' },
    ] },
  source_publisher: 'various', source_date: '2026-09-15', source_url: L.oaiRn,
  archetype: 'roundup', hook_type: 'flat-claim', destination: 'none',
  alt: 'A card listing four recent changes to business AI tools, from OpenAI, Google and Meta, each with the publisher, the date and one line on why it matters.',
  body: `Four changes to the tools you already pay for, all from the first half of September, none of which will be announced to you.

OpenAI, 10 September. A Data plugin that analyses connected business data in Work and Codex and builds dashboards and reports from it. This is the one with the largest gap between what it can do and how many people know it exists.

OpenAI, 9 September. Files and folders in Library can now be shared with specific people or the whole workspace, with viewer or editor permissions. Worth five minutes: decide who can grant editor before somebody decides it for you.

Google, 15 September. AI Overviews in Gmail search have gone from the United States to everywhere, for paid Workspace plans set to English. You ask a question in the search bar and get an answer rather than a list of threads.

Meta, 15 September. A WhatsApp Business Tools MCP server lets an AI agent do the setup: creating accounts, verifying numbers, building message templates, testing webhooks. If your customer service runs through WhatsApp, this removes an afternoon of console work.

Sources, in order: ${L.oaiRn} , ${L.gws} , ${L.tcWa}

#AIforBusiness #ProductUpdates`,
},

/* ---------------------------------------------------------------- 11. roundup */
{
  id: '2026-10-01-uk-guidance-roundup', type: 'roundup', priority: 0,
  headline: 'Four UK documents that would cost you money anywhere else',
  card: { kind: 'roundup', kicker: 'Worth reading', size: 58,
    items: [
      { source: 'NCSC', date: '20 Aug', title: 'Managing the cyber risk of agentic AI',
        why: 'Sandboxing, oversight models, and always being able to pull the plug.' },
      { source: 'ICO', date: '8 Jan', title: 'Tech futures: agentic AI',
        why: 'Eight data protection risks, and who stays responsible for them.' },
      { source: 'ONS', date: '20 Jul', title: 'Artificial intelligence in UK businesses',
        why: 'Adoption by size and by industry, with the barriers named.' },
      { source: 'DSIT', date: '8 Jun', title: 'A snapshot of entry-level hiring in the UK',
        why: '38 occupations tracked, and an honest line about what causes what.' },
    ] },
  source_publisher: 'various', source_date: '2026-08-20', source_url: L.ncscAg,
  archetype: 'roundup', hook_type: 'flat-claim', destination: 'none',
  alt: 'A card listing four free UK government and regulator publications on AI, each with the publisher, the date and one line on why it is worth reading.',
  body: `Four UK documents that would cost you money anywhere else. All free, all published by people with no product to sell you.

NCSC, 20 August 2026. Managing the cyber risk of agentic AI. The most practical thing on this list: threat model before deployment, write down the red lines, choose whether a human is in the loop, on the loop or out of it, sandbox the agent, and keep the ability to stop it immediately.
${L.ncscAg}

ICO, 8 January 2026. Tech futures: agentic AI. Eight data protection risks, and the sentence that matters, which is that the organisation stays responsible for the agentic AI it develops, deploys or integrates.
${L.ico}

ONS, 20 July 2026. Artificial intelligence in UK businesses. Adoption by size and industry, which technologies are actually in use, and what firms say is stopping them.
${L.ons}

DSIT, 8 June 2026. A snapshot of entry-level hiring. 38 occupations, and a refusal to claim AI caused the decline, which is why it is worth more than the commentary on it.
${L.dsit}

Between them that is about two hours of reading and it will make you better informed than most of the people selling to you.

#AIforBusiness #UKBusiness`,
},

/* ---------------------------------------------------------------- 12. guide, actionable */
{
  id: '2026-09-29-ncsc-agent-guide', type: 'guide', priority: 0,
  headline: 'Before you let an agent near your systems',
  card: { kind: 'grid', kicker: 'Agentic AI', size: 70,
    lines: [{t:'Before you let'},{t:'an agent',accent:true},{t:'near your systems'}],
    items: [
      { title: 'Decide how much autonomy', body: 'Not every deployment needs the same amount. Choose it deliberately.' },
      { title: 'Read the safeguards', body: 'And their limits. The gap is what you have to cover yourself.' },
      { title: 'Threat model the failures', body: 'List what going wrong looks like before it has gone wrong.' },
      { title: 'Write the red lines down', body: 'What is in scope, what is out, somewhere people can find it.' },
      { title: 'Say what it must not do', body: 'Prompts carry prohibitions too, repeated on long tasks.' },
      { title: 'Pick the oversight model', body: 'Human in the loop, on the loop, or out of it. Name which.' },
      { title: 'Sandbox it', body: 'Control what it can reach. The NCSC sets out four levels of this.' },
      { title: 'Keep a way to stop it', body: 'You should always be able to pull the plug immediately.' },
    ] },
  source_publisher: 'NCSC', source_date: '2026-08-20', source_url: L.ncscAg,
  archetype: 'actionable-list', hook_type: 'imperative',
  destination: 'none',
  alt: 'A numbered list of eight things to do before deploying an AI agent, condensed from NCSC guidance, from deciding the level of autonomy to keeping the ability to stop it.',
  body: `Before you let an agent near your systems, eight things worth doing first.

This is our condensation of NCSC guidance published on 20 August 2026, on managing the cyber risk of agentic AI. The original is better than this summary and takes about twenty minutes.

Two of the eight are doing most of the work.

The oversight model is a choice you make once and then live with. In the loop means the agent waits for approval before it acts. On the loop means it acts and you watch. Out of the loop means it acts. Firms drift from the first to the third without ever deciding to, usually because approving things got annoying.

The other is sandboxing. The NCSC sets out four levels of network access, from unrestricted, through an allowlist of approved domains, to the model API only, to no external network at all. Most small deployments sit at level one because nobody asked. Level two is often enough and costs one conversation with whoever runs your IT.

Whatever you decide, the version that counts is the written one. An agent nobody has bounded is bounded by whoever wrote the prompt that morning.

${L.ncscAg}

This is not legal advice.

#AIforBusiness #AgenticAI`,
},

/* ---------------------------------------------------------------- 14. share */
{
  id: '2026-10-02-ncsc-free-advice', type: 'share', priority: 0,
  headline: 'The NCSC will give a small UK business 30 minutes of cyber advice for nothing',
  card: { kind: 'news', size: 68, tags: ['owner','trades','van','manufacturing','factory','production'] },
  source_publisher: 'NCSC', source_date: '2026-07-15', source_url: L.ncscCa,
  archetype: 'share', hook_type: 'named-thing', destination: 'none',
  alt: 'A single sentence over a photograph of a small business: the NCSC will give a small UK business 30 minutes of cyber advice for nothing.',
  body: `The NCSC will give a small UK business 30 minutes of cyber advice for nothing.

This is not ours and we make no money from saying it. Under the Cyber Advisor scheme, many advisors offer a free 30 minute consultation to small and medium organisations, described by the NCSC as no strings attached. The session covers how the five steps of Cyber Essentials apply to your organisation, where the quick wins are, and the mistakes people make first.

The NCSC's post of 15 July 2026 says more than 760 small organisations have taken one, and over 150 of them went on to get certified.

We are posting somebody else's offer because of what usually happens next in our own conversations. The first objection to any AI rollout at a small firm is security, and it is a reasonable one. The cheapest answer to it is not an AI security policy written from scratch. It is a baseline somebody credible has already defined, that a client or an insurer will recognise the name of.

Bookings go through the Cyber Advisor scheme at iasme.co.uk/cyber-advisor/free-advice/

${L.ncscCa}

#AIforBusiness #CyberEssentials`,
},

/* ---------------------------------------------------------------- 15. promo, magnet */
{
  id: '2026-09-26-five-prompts-promo', type: 'promo', priority: 0,
  headline: 'Six prompts worth keeping on your desk',
  card: { kind: 'grid', kicker: 'Prompts', size: 72,
    lines: [{t:'Six prompts'},{t:'worth keeping',accent:true},{t:'on your desk'}],
    items: [
      { title: 'Before a client call', body: 'List what we promised this client and have not yet delivered.' },
      { title: 'After a long meeting', body: 'Turn these notes into decisions, owners and dates. Flag what is unowned.' },
      { title: 'A policy nobody reads', body: 'Rewrite this for someone with eight minutes and no legal training.' },
      { title: 'A tender response', body: 'Show me every question in this document we have not answered.' },
      { title: 'A job advert', body: 'Rewrite this to describe the work rather than the company.' },
      { title: 'Monday morning', body: 'What is waiting on me, and what is waiting on somebody else?' },
    ] },
  source_publisher: 'AIFC', source_date: '2026-09-16', source_url: '',
  archetype: 'actionable-list', hook_type: 'imperative', destination: '/resources/prompt-library',
  alt: 'A numbered list of six prompts to keep on your desk, each with the moment it is for and the prompt to use.',
  body: `Six prompts worth keeping on your desk. The card has all six, so nothing here needs downloading.

Two of them work much better with a little more said, so here they are in full.

The tender one: "Here is the tender document and here is our draft. List every question in the document we have not answered, and every answer that is shorter than the question deserves." Attach both files. The second half is what finds the paragraph that technically responds and says nothing.

The meeting one: "Turn these notes into decisions, owners and dates. Flag anything that was discussed and never resolved." Attach the transcript or your own notes. The flag is the point. The thing that kills a project is rarely a decision made badly, it is one everyone assumed somebody else had made.

The reason most prompt lists do not survive contact with a real week is that they are written as demonstrations rather than for a moment. If a prompt does not have a moment attached to it, nobody remembers it exists.

The full 25, with what to attach to each and what good output looks like, are free as a printable PDF at aiforcompanies.co.uk/resources/prompt-library

#AIforBusiness #Prompts`,
},

/* ---------------------------------------------------------------- 16. promo, insights */
{
  id: '2026-10-01-week-four-promo', type: 'promo', priority: 0,
  headline: 'Three numbers to count four weeks after any AI training',
  card: { kind: 'news', size: 72, tags: ['training','session','learning','adults','team','workshop'] },
  source_publisher: 'AIFC', source_date: '2026-09-16', source_url: '',
  archetype: 'actionable-list', hook_type: 'number-first',
  destination: '/insights/measure-ai-adoption-three-numbers',
  alt: 'A single sentence over a photograph of a training session: three numbers to count four weeks after any AI training.',
  body: `Three numbers to count four weeks after any AI training. All three here in full, because the point of this is that you can do it without us.

One. How many people opened the tool in the last seven days. Not since launch, which every vendor dashboard will happily show you and which only ever goes up. The last seven days.

Two. How many of the tasks you named at the start are now being done with it. You did name some tasks at the start. If you did not, that is the finding.

Three. How much time the team says it got back, asked as a question about one specific task rather than as a satisfaction score. "How long did the monthly report take you this time" beats any five point scale ever printed.

The combinations are what tell you something. High on one and zero on two means the training taught the tool rather than the job, which is the most common failure and the most fixable. Low on one and high on three means a few people have quietly found it useful and nobody has asked them how.

Week four is early enough that a bad answer is still cheap.

The worked version, with a sheet you can print, is at aiforcompanies.co.uk/insights/measure-ai-adoption-three-numbers

#AIforBusiness #AITraining`,
},

];
