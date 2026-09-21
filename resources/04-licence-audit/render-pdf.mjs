// Resource 04: the one-hour licence audit. Renders the gated PDF on the house resource style.
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

const hd = `<div class="hd"><div class="wm"><span class="g">AI</span> <span class="h">for</span> <span class="g">Companies</span></div><div class="tag">Resource 04 · Free to use and adapt</div></div>`;
const ft = (n, of) => `<div class="ft"><span>aiforcompanies.co.uk/resources</span><span>Page ${n} of ${of}</span></div>`;

const p1 = `<div class="pg">${hd}
<div class="eyebrow">Resource 04 · The one-hour licence audit</div>
<h1>Find out who actually uses<br>the AI you pay for</h1>
<p class="lede">Most companies with AI licences cannot answer one question: how many of the seats were opened in the last month. Every vendor already gives you the answer in a report an admin can pull in ten minutes. This is the hour that turns that report into a decision.</p>
<div class="panel"><b>What you will have at the end of the hour.</b> One sheet with a row per seat: who holds it, which tool, when they last used it, how many days they used it in the last 28, and which of three bands they sit in. One number for the board: seats used in the last 28 days over seats paid for. And three things to do on Monday, one per band.</div>

<h2>The hour</h2>
<div class="clock">
  <div><b>10</b><i>minutes</i><span>Pull the usage report from each tool. Page 2 says where.</span></div>
  <div><b>15</b><i>minutes</i><span>Copy names, last active date and active days into the sheet. Page 3.</span></div>
  <div><b>10</b><i>minutes</i><span>Sort by active days. Mark each row Never, Tried or Uses.</span></div>
  <div><b>15</b><i>minutes</i><span>Read the Uses band. Write down what they use it for, in their words.</span></div>
  <div><b>10</b><i>minutes</i><span>Decide the three Monday actions. Page 4. Put the next audit in the calendar.</span></div>
</div>

<h2>Before you start</h2>
<div class="rows">
  <div class="row"><div class="n">01</div><div><h3>You need admin access, or ten minutes of whoever has it</h3><p>Every report below sits behind an admin role, usually one person in IT or operations. Book them for the first ten minutes; the rest of the hour is yours.</p></div></div>
  <div class="row"><div class="n">02</div><div><h3>Count seats, not people</h3><p>One person may hold a Copilot seat and a ChatGPT seat. Each seat is a row; an unopened seat costs the same whatever its holder does elsewhere.</p></div></div>
  <div class="row"><div class="n">03</div><div><h3>The report names your staff</h3><p>Usage data about named employees is personal data. Tell people you review it and what for: who needs help and where seats should sit, not policing. The ICO's guidance on monitoring workers (16 June 2026) is the reference. Not legal advice.</p></div></div>
  <div class="row"><div class="n">04</div><div><h3>Decide the bands before you see the names</h3><p>Page 3 gives thresholds. Agree them first, so the result is a rule applied evenly, not a judgement made person by person.</p></div></div>
</div>
${ft(1, 4)}</div>`;

const p2 = `<div class="pg">${hd}
<h2 style="margin-top:0">Where the report is, tool by tool</h2>
<p class="sub">Paths as documented by each vendor on the date shown. Menus move; if a path has changed, search the vendor's help centre for the report name in bold.</p>

<div class="tool"><h3>Microsoft 365 Copilot</h3>
<div class="path">Microsoft 365 admin centre › Reports › Usage › Microsoft Copilot › Copilot › Usage tab</div>
<p>Read the per-user table: <b>Last activity date</b> and <b>Active days</b>, with a breakdown by app (Teams, Word, Excel, Outlook and others). Range: 7, 28, 90 or 180 days; use 28. Names are hidden by default: an admin turns on "show user details" in the usage reports settings first, or the table shows anonymised identifiers.</p>
<div class="src">Source: Microsoft Learn, "Microsoft 365 reports in the admin center, Microsoft 365 Copilot usage", updated 18 August 2026.</div></div>

<div class="tool"><h3>ChatGPT Business and Enterprise</h3>
<div class="path">Workspace settings › Analytics (chatgpt.com/admin/usage)</div>
<p>Read the <b>Users</b> drilldown: per-user activity with last activity day, and export it as CSV. Business gained the consolidated analytics view with user drilldowns on 6 May 2026; Enterprise and Edu have had per-user analytics longer. Admins see activity counts, not conversation content. Custom ranges up to 12 months; use 28 days.</p>
<div class="src">Sources: OpenAI Help Centre, "Workspace analytics for ChatGPT Enterprise and Edu" and "ChatGPT Business release notes" (entries 16 April and 6 May 2026), both read 21 September 2026.</div></div>

<div class="tool"><h3>Gemini in Google Workspace</h3>
<div class="path">Admin console › Menu › Generative AI › Gemini reports › User-level usage</div>
<p>Read <b>Active days</b> (past 28 days) and <b>Overall usage level</b> (High, Medium, Low, Zero), with usage by app. "Download table" gives you the sheet. The org-level report beside it gives active users as a share of eligible licences, which is your board number ready made.</p>
<div class="src">Source: Google Workspace Admin Help, "Review Gemini usage in your organization", updated 18 September 2026.</div></div>

<div class="tool" style="border-bottom:0"><h3>Claude Team and Enterprise</h3>
<div class="path">Your initials, lower left › Analytics</div>
<p>Read <b>Active members and assigned seats</b> in the "Who's using Claude?" section, then the members list. Owners and Primary Owners see it on Team; Admins also see it on Enterprise. Exports cover month to date, last month, last 90 days or a custom range up to 90 days back.</p>
<div class="src">Source: Claude Help Centre, "View usage analytics for Team and Enterprise plans", read 21 September 2026.</div></div>

<div class="panel" style="margin-top:6mm"><b>If a tool is not here.</b> Every business tier of a serious assistant has an admin usage view, because vendors sell renewals on it. Search "[tool] admin usage report". If there is no report at all, that is a finding: you are paying for something nobody can measure, and consumer accounts should not be holding company work in any case.</div>
${ft(2, 4)}</div>`;

const p3 = `<div class="pg">${hd}
<h2 style="margin-top:0">The sheet</h2>
<p class="sub">One row per seat. The spreadsheet version is beside this PDF in the email; the bands fill in from active days.</p>
<table>
<tr><th>Name</th><th>Team</th><th>Tool</th><th>Seat since</th><th>Last active</th><th>Active days, 28</th><th>Band</th><th>What they use it for</th></tr>
<tr><td>[Name]</td><td>Finance</td><td>Copilot</td><td>Jan 2026</td><td>19 Sep 2026</td><td>17</td><td class="k">Uses</td><td>Variance commentary from the Excel pack</td></tr>
<tr><td>[Name]</td><td>Finance</td><td>Copilot</td><td>Jan 2026</td><td>3 Sep 2026</td><td>2</td><td class="k">Tried</td><td></td></tr>
<tr><td>[Name]</td><td>Client team</td><td>ChatGPT</td><td>Mar 2026</td><td>never</td><td>0</td><td class="k">Never</td><td></td></tr>
<tr><td>[Name]</td><td>Operations</td><td>Gemini</td><td>Feb 2026</td><td>21 Sep 2026</td><td>22</td><td class="k">Uses</td><td>Meeting notes to owners and dates</td></tr>
<tr><td>[Name]</td><td>Partners</td><td>Claude</td><td>Jun 2026</td><td>28 Aug 2026</td><td>0</td><td class="k">Never</td><td></td></tr>
</table>
<p class="small">The example rows are illustrative, not from a client. Replace them with your own.</p>

<h2>Three bands, decided before you look</h2>
<div class="bands">
  <div class="band"><b>Never</b><i>0 active days in 28</i><p>The seat was not opened this month. Whether it was ever opened matters less than you think; a seat that sat idle for four weeks is idle.</p></div>
  <div class="band"><b>Tried</b><i>1 to 3 active days in 28</i><p>Opened it, did not come back. This is the largest band in most firms and the one where an hour of the right help moves people.</p></div>
  <div class="band"><b>Uses</b><i>4 or more active days in 28</i><p>Roughly weekly or better. These people have found a task it does well. Their tasks are the most valuable thing the audit produces.</p></div>
</div>
<p class="small">The thresholds are ours, chosen so a weekly habit clears the top band. Vendors report active days; they do not define what counts as adoption. Move the lines if your work is monthly, but move them for everyone.</p>

<h2>The one number</h2>
<div class="panel"><b>Seats used in the last 28 days ÷ seats paid for.</b> Count Tried and Uses as used. Report it as a fraction, "31 of 60", not a percentage, because the people in the room will want to know who the 29 are, and that is the right conversation. Report it monthly. The first number is not good or bad; it is the baseline. The second is the one that tells you whether anything you did in between worked.</div>

<h2>Repeat it monthly</h2>
<p>First working day of each month, twenty minutes after the first time: pull, paste, sort, compare. Watch two movements. Tried to Uses says your help worked. Never to Tried says people know the seat exists. If neither moves for two months, the problem is not the people; nobody has shown them a task that matters to them.</p>

${ft(3, 4)}</div>`;

const p4 = `<div class="pg">${hd}
<h2 style="margin-top:0">First, ask the Uses band one question</h2>
<p>"What do you use it for most?" In person or in a two-line message; write the answer in their words in the last column. In a firm of 60 you will get six to ten answers, and three will be the same task described differently. Those three are your team library: proven on your work, in your tools, by your people, and what the Tried band should be shown first.</p>
<h2>Monday: one action per band</h2>
<div class="rows">
  <div class="row"><div class="n">Never</div><div><h3>Ask one question. Do not revoke yet.</h3><p>One line each: "You have a [tool] seat. Is there a task you would want it for, or should it go to someone who has asked?" The replies split the band into people who never knew they had it and people who do not want it. Reallocate the second group's seats next month. Keep the first; they are next quarter's Tried band.</p></div></div>
  <div class="row"><div class="n">Tried</div><div><h3>Pair each one with a Uses person on one task.</h3><p>Not training in general. One task from the Uses list, shown by the colleague who does it, on the Tried person's own file, for twenty minutes. The first time it reconciles their two lists or drafts their weekly report, they come back. Nobody comes back from a demo.</p></div></div>
  <div class="row"><div class="n">Uses</div><div><h3>Write their tasks down and give them the room.</h3><p>Their three tasks become a one-page team library: the task, what to attach, what to type, what good looks like. Ask two of them to show it at the next team meeting. It is the cheapest AI training you will run, and the only kind already proven on your work.</p></div></div>
</div>

<h2>At ninety days</h2>
<div class="panel">
<ul style="margin:0 0 0 4mm">
<li><b>Has the one number moved?</b> If seats used over seats paid has not risen, stop buying seats until it does.</li>
<li><b>How many tasks are in the library?</b> Fewer than five after ninety days means the Uses band was never asked, or never given the room.</li>
<li><b>Did anyone move from Never to Uses?</b> One person is proof the route works. Find out what changed for them and do that for the next one.</li>
</ul></div>

<div class="two">
<div><h2>Where to read further</h2>
<p class="small">The vendor pages cited on page 2 are the ones to check before you rely on a column name, because they move. The ICO's "Employment practices and data protection: monitoring workers" (16 June 2026, under review after the Data (Use and Access) Act) covers telling staff what you look at and why. Current links sit with the write-up at <b>aiforcompanies.co.uk/insights</b>.</p>
<p class="small"><b>This is not legal advice.</b> Usage data about named staff is personal data; your obligations depend on your sector, contracts and what you tell your people. If you are regulated, have the wording checked by someone qualified.</p></div>
<div><h2>Want the hour run with you?</h2>
<p class="small">We spend a day with a team, on their own work, with the tools they already pay for. The audit is where a day with us starts, and the Uses band's tasks are what the day is built around. If they do not leave using it, we do not invoice. Twenty minutes is enough to tell: <a href="https://cal.com/convu/aiforcompanies?overlayCalendar=true">book a call</a>, or email <a href="mailto:hello@aiforcompanies.co.uk">hello@aiforcompanies.co.uk</a>.</p></div>
</div>
${ft(4, 4)}</div>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><title>The one-hour licence audit</title><style>${css}</style></head><body>${p1}${p2}${p3}${p4}</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
mkdirSync('out/resource-04', { recursive: true });
await page.pdf({ path: 'out/resource-04/AI-licence-audit.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log('out/resource-04/AI-licence-audit.pdf');
