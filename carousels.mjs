import { renderCard, close } from './lib/render.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';

/* ---------------- Carousel 1: 20 prompts to try at work ---------------- */
const C1 = {
  slug: 'prompts-20',
  caption: `20 prompts worth trying at work this week. Grouped by when you would actually use them.

Full library of 25 at aiforcompanies.co.uk/prompts`,
  slides: [
    { template:'cover', eyebrow:'No setup required', size:98,
      title:'20 prompts to try at work this week',
      sub:'Four moments in an ordinary week. Five prompts each. Nothing to install.',
      cue:'Swipe. Save it for Monday.' },

    { template:'tips', eyebrow:'Monday, 9am', title:'Before you open the inbox', size:60,
      items:[
        'Summarise this thread and tell me what I am being asked to decide',
        'Here is my week. What is likely to slip, and why?',
        'Turn these notes into three things I can finish today',
        'What did I agree to in this email that I have not done?',
        'Draft a reply that buys me until Thursday without sounding vague' ] },

    { template:'tips', eyebrow:'In and after meetings', title:'Turn talking into actions', size:60,
      items:[
        'From this transcript, list decisions, owners and dates. Flag anything unowned',
        'What was raised and never resolved?',
        'Write the follow up email in my voice. Short, no pleasantries',
        'Give me five questions to ask that nobody asked',
        'Prep me for this call using the last three emails from them' ] },

    { template:'tips', eyebrow:'Writing anything', title:'Get past the blank page', size:60,
      items:[
        'Here is the messy version. Cut it by half, keep the argument',
        'Rewrite this for someone who has not read the previous email',
        'What will they push back on, and what is my answer?',
        'Give me three openings: direct, warm, and one that leads with the number',
        'Read this as the client. What is unclear?' ] },

    { template:'tips', eyebrow:'The admin nobody enjoys', title:'The jobs that eat Fridays', size:60,
      items:[
        'Check this document against the brief and list what is missing',
        'Turn this spreadsheet into five sentences I can put in an update',
        'Compare these two quotes. Where do they actually differ?',
        'Draft the process I just described as a one page checklist',
        'Find every date in this document and put them in order' ] },

    { template:'outro', title:'Pick one. Try it Monday.', size:72,
      sub:'The prompts that stick are the ones tried on real work, not saved for later. Twenty five more, with what to attach and what good output looks like:',
      url:'aiforcompanies.co.uk/prompts',
      foot:'AI training, crafted for your team' },
  ]
};

/* ---------------- Carousel 2: the week four question ---------------- */
const C2 = {
  slug: 'week-four',
  caption: `Three numbers, week four. Nothing here needs a dashboard.

More at aiforcompanies.co.uk/insights`,
  slides: [
    { template:'cover', eyebrow:'After the training ends', size:96,
      title:'How to tell if AI training actually worked',
      sub:'Three numbers at week four. None of them is a satisfaction score.',
      cue:'Swipe. Four slides.' },

    { template:'tips', eyebrow:'Number one', title:'How many people used it last week', size:60, gap:40,
      items:[
        'Not how many have a licence. How many opened it in the last seven days',
        'Most admin consoles show this in under a minute',
        'If it is under half the room at week four, the problem is confidence, not tooling' ] },

    { template:'tips', eyebrow:'Number two', title:'How many tasks, not how many people', size:60, gap:40,
      items:[
        'Ask each person which tasks they now use it for. Count distinct tasks',
        'The UK average is around 1.6 AI technologies per adopting business, per the ONS',
        'Two real tasks per person beats ten people using it for one' ] },

    { template:'tips', eyebrow:'Number three', title:'What got reused', size:60, gap:40,
      items:[
        'Count the prompts in your shared library that someone other than the author has run',
        'Reuse is the only proof a prompt was worth writing down',
        'Zero reuse at week four means the library has no owner' ] },

    { template:'outro', title:'Ask at week four. Not week one.', size:70,
      sub:'Week one measures enthusiasm. Week four measures habit, and habit is the thing you paid for.',
      url:'aiforcompanies.co.uk/insights',
      foot:'Source: ONS, AI in UK businesses, 20 July 2026' },
  ]
};

/* ---------------- Carousel 3: the one page AI policy ---------------- */
const C3 = {
  slug: 'policy-one-page',
  caption: `The four questions a usable AI policy answers. One page, read at induction.

Template at aiforcompanies.co.uk/resources/ai-policy`,
  slides: [
    { template:'cover', eyebrow:'Four questions, one page', size:100,
      title:'Your AI policy is too long to be read',
      sub:'Seven in ten employees already use AI tools nobody approved. A twelve page document does not change that.',
      cue:'Swipe. Save it before someone writes a twelve pager.' },

    { template:'tips', eyebrow:'Question one', title:'Which tools are approved', size:62, gap:38,
      items:[
        'Name them. Not "approved enterprise tools"',
        'Say what to do if someone wants a different one, and who decides',
        'An unnamed list is the same as no list' ] },

    { template:'tips', eyebrow:'Question two', title:'What never goes in', size:62, gap:38,
      items:[
        'Client data, personal data, anything under NDA',
        'The test people remember: would you email this to the wrong address?',
        'Three examples beats a paragraph of principle' ] },

    { template:'tips', eyebrow:'Question three', title:'Who checks the output', size:62, gap:38,
      items:[
        'Always a named person, never the tool',
        'Say which work needs a second pair of eyes before it leaves the building',
        'This is the line that keeps you out of trouble' ] },

    { template:'tips', eyebrow:'Question four', title:'Who to ask', size:62, gap:38,
      items:[
        'One name. Not a mailbox, not a committee',
        'People ask a person. They do not email a policy inbox',
        'If nobody owns it, the answer becomes whatever the internet said' ] },

    { template:'outro', title:'One page gets read. Twelve gets acknowledged.', size:66,
      sub:'Acknowledged and unread is the same as having no policy, while feeling like you have one.',
      url:'aiforcompanies.co.uk/resources',
      foot:'Source: NCSC, 7 September 2026. Not legal advice' },
  ]
};

const ALL = [C1, C2, C3];
for (const c of ALL) {
  const dir = `out/carousel/${c.slug}`;
  mkdirSync(dir, { recursive: true });
  const of = c.slides.length;
  for (const [i, s] of c.slides.entries()) {
    await renderCard({ ...s, n: i + 1, of }, `${dir}/${String(i + 1).padStart(2,'0')}.png`);
  }
  writeFileSync(`${dir}/caption.txt`, c.caption);
  console.log(`${c.slug}: ${of} slides, caption ${c.caption.length} chars`);
}
await close();
