import { renderCard, close } from '../lib/render.mjs';
const specs = [
  { name: 'licence-audit-plainlist', template: 'plainlist', eyebrow: 'The one-hour licence audit', kicker: 'aiforcompanies.co.uk/resources', size: 46, body: 29,
    headline: 'Find out who actually uses the AI you pay for. One hour, one sheet, one number.',
    items: [
      { t: 'Pull the usage report', sub: 'Copilot: admin centre, Reports, Usage. ChatGPT: Workspace settings, Analytics. Gemini: Admin console, Gemini reports. Claude: Analytics.' },
      { t: 'One row per seat, not per person', sub: 'Name, tool, last active date, active days in the last 28.' },
      { t: 'Decide the bands before you look', sub: '0 days Never. 1 to 3 Tried. 4 or more Uses.' },
      { t: 'Sort, then band every row', sub: 'A rule applied evenly, not a judgement made person by person.' },
      { t: 'Ask the Uses band one question', sub: '"What do you use it for most?" Three answers will be the same task. That is your team library.' },
      { t: 'Never: ask, do not revoke', sub: '"Is there a task you would want it for, or should it go to someone who asked?"' },
      { t: 'Tried: pair with a Uses person', sub: 'One task, their own file, twenty minutes. Nobody comes back from a demo.' },
      { t: 'Report one number, monthly', sub: 'Seats used in 28 days over seats paid. "31 of 60", not a percentage.' },
    ] },
  { name: 'licence-audit-count', template: 'count', eyebrow: 'The one-hour licence audit', kicker: 'aiforcompanies.co.uk/resources',
    value: '60', claim: 'minutes is what it takes to find out how many of your AI seats were opened last month. Every vendor already gives an admin the report.',
    source: 'Microsoft Learn, 18 Aug 2026. OpenAI Help Centre, 6 May 2026. Google Workspace Admin Help, 18 Sep 2026. Claude Help Centre, Sep 2026.' },
];
for (const s of specs) { await renderCard(s, `out/resource-04/${s.name}.png`); console.log('ok', s.name); }
await close();
