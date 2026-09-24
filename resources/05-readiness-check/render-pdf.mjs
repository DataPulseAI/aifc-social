// Resource 05: the team AI readiness check. Renders the gated PDF on the house resource style.
import { chromium } from 'playwright';
import { FONT_CSS } from '../../lib/fonts.mjs';
import { readFileSync, mkdirSync } from 'node:fs';

const T = JSON.parse(readFileSync(new URL('../../brand.json', import.meta.url))).tokens;

const css = `
${FONT_CSS}
@page { size: A4; margin: 0; }
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#fff;color:${T.body};font-family:'Instrument Sans';font-size:10pt;line-height:1.45;-webkit-font-smoothing:antialiased}
.pg{width:210mm;height:297mm;padding:14mm 18mm 12mm;position:relative;overflow:hidden;page-break-after:always;display:flex;flex-direction:column}
.pg:last-child{page-break-after:auto}
.hd{display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid ${T.line};padding-bottom:5mm;margin-bottom:8mm}
.wm{font-family:'Newsreader';font-weight:500;font-size:16pt;letter-spacing:-.01em}
.wm .g{color:${T.grow}}.wm .h{color:${T.heading}}
.tag{font-size:7.5pt;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:${T.muted}}
.ft{margin-top:auto;border-top:1px solid ${T.line};padding-top:3mm;display:flex;justify-content:space-between;font-size:8pt;color:${T.muted}}
.eyebrow{font-size:7.5pt;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:${T.grow};margin-bottom:3mm}
h1{font-family:'Newsreader';font-weight:500;font-size:25pt;line-height:1.1;letter-spacing:-.015em;color:${T.heading};margin-bottom:5mm}
h2{font-family:'Newsreader';font-weight:500;font-size:16pt;letter-spacing:-.01em;color:${T.heading};margin:5.5mm 0 1.5mm}
h3{font-size:10.6pt;font-weight:600;color:${T.heading};margin:4mm 0 1mm}
p{margin-bottom:3mm}
.lede{font-size:11.5pt;color:${T.body}}
.sub{font-size:9pt;color:${T.muted};margin-bottom:3mm}
.panel{background:${T.growtint};border-left:3px solid ${T.grow};padding:3.5mm 5mm;margin:4mm 0;font-size:9.6pt}
.panel b{color:${T.heading}}
.rows{border-top:1px solid ${T.line}}
.row{display:grid;grid-template-columns:11mm 1fr;gap:0 3mm;padding:2.4mm 0;border-bottom:1px solid ${T.line}}
.row .n{font-family:'Newsreader';font-weight:500;font-size:13pt;color:${T.grow};line-height:1.2}
.row h3{margin:0 0 .8mm}
.row p{margin:0;font-size:9.4pt}
table{width:100%;border-collapse:collapse;font-size:9pt;margin:2mm 0 3mm}
th{font-size:7.5pt;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${T.muted};text-align:left;padding:2mm 2mm 2mm 0;border-bottom:1px solid ${T.heading}}
td{padding:2.2mm 2mm 2.2mm 0;border-bottom:1px solid ${T.line};vertical-align:top;color:${T.body}}
td.k{color:${T.heading};font-weight:600;white-space:nowrap}
.bands{display:grid;grid-template-columns:1fr 1fr 1fr;gap:5mm;margin:3mm 0 4mm}
.band{border-top:2px solid ${T.grow};padding-top:2.5mm}
.band b{display:block;font-family:'Newsreader';font-weight:500;font-size:13pt;color:${T.heading}}
.band i{font-style:normal;display:block;font-size:8pt;color:${T.muted};letter-spacing:.1em;text-transform:uppercase;margin:.5mm 0 1.5mm}
.band p{font-size:9.4pt;margin:0}
.src{font-size:8.4pt;color:${T.muted};margin-top:1mm}
.tool{padding:3mm 0;border-bottom:1px solid ${T.line}}
.tool h3{margin:0 0 1mm}
.tool .path{font-family:'Instrument Sans';font-weight:500;color:${T.heading};font-size:9.6pt}
.tool p{margin:1mm 0 0;font-size:9.6pt}
.small{font-size:9pt;color:${T.muted}}
ul{margin:1mm 0 3mm 4.5mm}li{margin-bottom:1.2mm}
a{color:${T.grow};text-decoration:none}
.two{display:grid;grid-template-columns:1fr 1fr;gap:8mm}
.clock{display:grid;grid-template-columns:repeat(5,1fr);gap:3mm;margin:3mm 0 5mm}
.clock div{border-top:1px solid ${T.line};padding-top:2mm}
.clock b{display:block;font-family:'Newsreader';font-weight:500;font-size:15pt;color:${T.grow};line-height:1.1}
.clock span{display:block;font-size:9pt;color:${T.body};margin-top:1mm}
.clock i{font-style:normal;display:block;font-size:7.5pt;color:${T.muted};letter-spacing:.12em;text-transform:uppercase;margin-top:.5mm}
`;

const hd = `<div class="hd"><div class="wm"><span class="g">AI</span><span class="h">for</span><span class="g">Companies</span></div><div class="tag">Resource 05 · Free to use and adapt</div></div>`;
const ft = (n, of) => `<div class="ft"><span>aiforcompanies.co.uk/resources</span><span>Page ${n} of ${of}</span></div>`;

const p1 = `<div class="pg">${hd}
<div class="eyebrow">Resource 05 · The team AI readiness check</div>
<h1>Find out whether your team is ready<br>to use the AI it already pays for</h1>
<p class="lede">Ten questions a manager can answer about their own team in ten minutes. Each scores 0, 1 or 2. The total puts the team in one of three bands, and each band has one first move for this week. It is a self-check, not a benchmark against other firms: it tells you where your own team stands and what to do next, nothing more.</p>
<div class="panel"><b>How to score it.</b> Answer for the team as it is today, not as it is meant to be. Where two answers both seem true, take the lower one. The sheet that comes with this PDF does the adding and names the band for you.</div>
<h2>The ten questions</h2>
<div class="rows"><div class="row"><div class="n">01</div><div><h3>Can anyone name the tools the team is licensed for?</h3><table><tr><td class="k">0</td><td>Nobody could say without looking</td><td class="k">1</td><td>One or two people could</td><td class="k">2</td><td>It is written down and current</td></tr></table></div></div><div class="row"><div class="n">02</div><div><h3>Do you know how many of those seats were opened last month?</h3><table><tr><td class="k">0</td><td>No idea</td><td class="k">1</td><td>A rough sense</td><td class="k">2</td><td>We pull the report monthly</td></tr></table></div></div><div class="row"><div class="n">03</div><div><h3>Has each person named three weekly tasks they would use the assistant for?</h3><table><tr><td class="k">0</td><td>Nobody has</td><td class="k">1</td><td>Some people have, informally</td><td class="k">2</td><td>Everyone has, and they are written down</td></tr></table></div></div><div class="row"><div class="n">04</div><div><h3>Are the prompts that work kept anywhere the team can find them?</h3><table><tr><td class="k">0</td><td>In people's heads</td><td class="k">1</td><td>In personal notes</td><td class="k">2</td><td>In one shared place, titled by the job</td></tr></table></div></div><div class="row"><div class="n">05</div><div><h3>Is there a one-page rule on what may and may not be attached?</h3><table><tr><td class="k">0</td><td>No</td><td class="k">1</td><td>A long policy nobody has read</td><td class="k">2</td><td>One page everyone has seen</td></tr></table></div></div></div>
${ft(1, 4)}</div>`;

const p2 = `<div class="pg">${hd}
<h2 style="margin-top:0">The ten questions, continued</h2>
<div class="rows"><div class="row"><div class="n">06</div><div><h3>Does someone own AI use for the team, by name?</h3><table><tr><td class="k">0</td><td>Nobody</td><td class="k">1</td><td>It is assumed to be IT</td><td class="k">2</td><td>One named person, and the team knows who</td></tr></table></div></div><div class="row"><div class="n">07</div><div><h3>Has the team done one real task together with the assistant?</h3><table><tr><td class="k">0</td><td>Only demos</td><td class="k">1</td><td>One or two people have tried</td><td class="k">2</td><td>Yes, on our own files, together</td></tr></table></div></div><div class="row"><div class="n">08</div><div><h3>Do people know what to do when the output is wrong?</h3><table><tr><td class="k">0</td><td>They stop using it</td><td class="k">1</td><td>They start again from scratch</td><td class="k">2</td><td>They say one sentence back and check the source</td></tr></table></div></div><div class="row"><div class="n">09</div><div><h3>Is there a review point in the calendar?</h3><table><tr><td class="k">0</td><td>No</td><td class="k">1</td><td>We meant to</td><td class="k">2</td><td>A date is set and someone owns it</td></tr></table></div></div><div class="row"><div class="n">10</div><div><h3>Do the tools people actually use match the ones you pay for?</h3><table><tr><td class="k">0</td><td>We do not know</td><td class="k">1</td><td>Partly</td><td class="k">2</td><td>Yes, and the unused seats are being dealt with</td></tr></table></div></div></div>
<div class="panel"><b>Total your score.</b> 0 to 20. Write it at the top of the sheet with today's date, because the second time you run this the movement is the finding.</div>
${ft(2, 4)}</div>`;

const p3 = `<div class="pg">${hd}
<div class="eyebrow">What the score means</div>
<h1>Three bands, one first move each</h1>
<p class="lede">The bands describe where the team is, not how good it is. Most teams that have bought licences and had no training sit in the first two. That is the normal starting point, not a failing.</p>
<div class="bands">
  <div class="band"><b>Licensed</b><i>0 to 7</i><p>The seats exist. Almost everything else lives in individual heads or nowhere. People try the assistant once, get a generic answer, and go back to how they worked before. Nobody is at fault; nobody has been shown.</p></div>
  <div class="band"><b>Started</b><i>8 to 14</i><p>A few people use it well and everyone else knows who they are. Some prompts are written down somewhere. The rule on what can be attached is either too long to read or not written at all. Usage is uneven and nobody measures it.</p></div>
  <div class="band"><b>In use</b><i>15 to 20</i><p>Most people run a short list of tasks every week. Prompts live in one shared place. There is a one-page rule, a named owner and a review date. The remaining work is keeping it that way and dealing with the seats nobody opened.</p></div>
</div>
<h2>The first move, by band</h2>
<div class="rows">
  <div class="row"><div class="n">L</div><div><h3>Licensed: pick one task, one person, one hour</h3><p>Choose the weekly task the team complains about most. Sit one person beside someone who has done it with the assistant, on the real file, for an hour. Write down the prompt that worked, in their words, in a shared note. That note is the start of the library, and it changes question 4 next month.</p></div></div>
  <div class="row"><div class="n">S</div><div><h3>Started: write the one page and name the owner</h3><p>Take the longest policy you have and cut it to one page: what may be attached, what may not, and who to ask. Name one person who owns AI use for the team and tell the team it is them. Those two moves change questions 5 and 6, and they are the two that stop a team going backwards.</p></div></div>
  <div class="row"><div class="n">U</div><div><h3>In use: measure, then keep going</h3><p>Pull the usage report for every tool and count the seats opened in the last 28 days over the seats paid for. Report that fraction monthly. Put the next run of this check in the calendar for one month from today, and compare the two scores rather than reading either on its own.</p></div></div>
</div>
${ft(3, 4)}</div>`;

const p4 = `<div class="pg">${hd}
<div class="eyebrow">Running it with the team</div>
<h1>Ten minutes, then three people, then compare</h1>
<div class="rows">
  <div class="row"><div class="n">01</div><div><h3>One person answers first</h3><p>The manager, or whoever is closest to the work. Ten minutes, alone, honestly. Write the score and the date.</p></div></div>
  <div class="row"><div class="n">02</div><div><h3>Three people answer independently</h3><p>Pick three people from different parts of the team. Do not show them the first answers. Use the Compare sheet, one column each.</p></div></div>
  <div class="row"><div class="n">03</div><div><h3>Look at the spread, not the average</h3><p>The Compare sheet shows, for each question, the gap between the highest and lowest answer. A gap of 2 on one question is the finding: it means the team does not agree on whether the thing exists. That disagreement is usually worth more than the total.</p></div></div>
  <div class="row"><div class="n">04</div><div><h3>Make the first move for your band</h3><p>One move, this week, from page 3. Not the whole list. The check is designed so that the first move for each band changes the answers to specific questions next month.</p></div></div>
  <div class="row"><div class="n">05</div><div><h3>Run it again in a month</h3><p>A self-check reflects the person answering it as much as the team. Two scores a month apart, from the same people, are worth more than one. The number that matters is the movement.</p></div></div>
</div>
<div class="panel"><b>On question 5 and attaching data.</b> The one-page rule on what may be attached is a practical guardrail, not a legal document. Anything touching personal data, client confidentiality or monitoring staff should be checked against your own obligations under UK GDPR and your contracts. This resource is not legal advice.</div>
<p class="small">The team AI readiness check is free to use and adapt inside your organisation. It is a self-check: it does not compare your team with any other and makes no claim about where other firms stand. Written by AIforCompanies, aiforcompanies.co.uk. This version dated 24 September 2026.</p>
${ft(4, 4)}</div>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${p1}${p2}${p3}${p4}</body></html>`;
const browser = await chromium.launch({ executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--font-render-hinting=none', '--no-sandbox'] });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'load' });
mkdirSync('resources/05-readiness-check', { recursive: true });
await page.pdf({ path: 'resources/05-readiness-check/AI-team-readiness-check.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log('resources/05-readiness-check/AI-team-readiness-check.pdf');
