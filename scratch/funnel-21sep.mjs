// Renders the funnel-and-systems graphic (21 Sep 2026) on the design system tokens.
import { chromium } from 'playwright';
import { FONT_CSS } from '../lib/fonts.mjs';
import { readFileSync, mkdirSync } from 'node:fs';

const T = JSON.parse(readFileSync(new URL('../brand.json', import.meta.url))).tokens;
const W = 1800, H = 1300;

const stages = [
  { n: '01', name: 'Reach', job: 'Be seen by people who do not follow us',
    what: ['LinkedIn page, two posts a day', 'Viren\'s profile, one a day', 'Convu, one or two a week', 'Referral partners, BNI, Chamber, Convos'],
    sys: 'Buffer, aifc-social batch', measure: 'Impressions, reposts' },
  { n: '02', name: 'Value, free', job: 'Prove we know the subject before asking for anything',
    what: ['/insights articles, sourced', '/prompts library', 'The Monday count, the correction', 'Nothing gated here'],
    sys: 'Site on Amplify, search', measure: 'Visits, time on page' },
  { n: '03', name: 'Capture', job: 'Trade a working document for a work email',
    what: ['/resources/<slug>, one gate for all', 'Substance on the page, file behind the form', 'First name and work email, then company', 'Mailing list opt-in, unticked'],
    sys: 'Site form, Resend delivery, HubSpot contact', measure: 'Downloads, opt-in rate' },
  { n: '04', name: 'Nurture', job: 'Stay useful until the timing is right',
    what: ['One note a fortnight', 'One useful thing, one resource, one line on the day', 'Written from the bank, approved by Viren', 'Unsubscribe in one click'],
    sys: 'Resend audience and broadcasts', measure: 'Opens, replies, unsubscribes' },
  { n: '05', name: 'Convert', job: 'Twenty minutes, then a scope or an honest no',
    what: ['Book twenty minutes, cal.com', 'Enquiry form as the second door', 'Referral introductions land here directly'],
    sys: 'cal.com, HubSpot deals', measure: 'Calls booked, calls held' },
  { n: '06', name: 'Deliver and refer', job: 'The day, the guarantee, the next introduction',
    what: ['One day, one team, their own work', 'No result, no invoice', 'The 30-day plan and the team library', 'Referral sheet handed to partners'],
    sys: 'Session decks, referral sheet', measure: 'Days delivered, referrals made' },
];

const streams = [
  ['Training day', 'AI for Companies', 'The flagship. One team, one day, on the tools they already pay for. Guaranteed.'],
  ['Referral partners', 'AI for Companies', 'Accountants, IT providers and consultants who see the buyer first. Terms agreed in person.'],
  ['Convu', 'Product', 'The memory layer for people you meet. Its own funnel, its own page, one profile post a week.'],
  ['Later', 'Not yet', 'Follow-on days and a partner programme, only once there is a delivery history to point at.'],
];

const css = `
${FONT_CSS}
*{box-sizing:border-box;margin:0;padding:0}
body{width:${W}px;height:${H}px;background:${T.ink};color:${T.body};font-family:'Instrument Sans';-webkit-font-smoothing:antialiased}
.page{padding:64px 72px 52px;height:100%;display:flex;flex-direction:column}
.eyebrow{font-size:16px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:${T.muted};display:flex;align-items:center;gap:12px}
.eyebrow::before{content:'';width:8px;height:8px;border-radius:50%;background:${T.growsolid}}
h1{font-family:'Newsreader';font-weight:500;font-size:54px;line-height:1.05;letter-spacing:-.015em;color:${T.heading};margin-top:16px}
.sub{font-size:20px;color:${T.muted};margin-top:12px;max-width:1100px;line-height:1.4}
.front{margin-top:38px;display:grid;grid-template-columns:1fr 1fr 1fr;border-top:1px solid ${T.line};border-bottom:1px solid ${T.line}}
.front div{padding:18px 22px 18px 0;border-right:1px solid ${T.line}}
.front div:last-child{border-right:0;padding-left:22px}
.front div:nth-child(2){padding-left:22px}
.front b{display:block;font-family:'Newsreader';font-weight:500;font-size:26px;color:${T.heading};letter-spacing:-.01em}
.front span{display:block;font-size:17px;line-height:1.4;margin-top:4px;color:${T.body}}
.front i{font-style:normal;color:${T.grow};font-weight:600;font-size:13px;letter-spacing:.18em;text-transform:uppercase;display:block;margin-bottom:6px}
.stages{margin-top:40px;display:grid;grid-template-columns:repeat(6,1fr);gap:0 26px;flex:1}
.st{border-top:1px solid ${T.line};padding-top:18px;position:relative;display:flex;flex-direction:column}
.st .n{font-family:'Newsreader';font-weight:500;font-size:40px;color:${T.grow};letter-spacing:-.02em;line-height:1}
.st h2{font-family:'Newsreader';font-weight:500;font-size:28px;color:${T.heading};margin-top:10px;letter-spacing:-.01em;line-height:1.1}
.st .job{font-size:16px;color:${T.muted};line-height:1.4;margin-top:8px;min-height:44px}
.st ul{list-style:none;margin-top:16px;border-top:1px solid ${T.line}}
.st li{font-size:16.5px;line-height:1.35;padding:9px 0;border-bottom:1px solid ${T.line};color:${T.body}}
.st .meta{margin-top:auto;padding-top:14px}
.st .meta small{display:block;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${T.muted};margin-bottom:4px}
.st .meta p{font-size:15.5px;color:${T.heading};line-height:1.35}
.st .meta p+small{margin-top:10px}
.st::after{content:'';position:absolute;top:-1px;right:-26px;width:26px;height:1px;background:${T.line}}
.st:last-child::after{display:none}
.arrow{position:absolute;top:-6px;right:-20px;width:11px;height:11px;border-top:1px solid ${T.grow};border-right:1px solid ${T.grow};transform:rotate(45deg)}
.loop{margin-top:22px;font-size:16px;color:${T.muted};display:flex;align-items:center;gap:14px}
.loop::before{content:'';flex:0 0 120px;height:1px;background:${T.grow}}
.streams{margin-top:34px;border-top:1px solid ${T.line};padding-top:22px}
.streams .eyebrow{margin-bottom:14px}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0 26px}
.grid div{border-left:1px solid ${T.line};padding-left:18px}
.grid b{display:block;font-family:'Newsreader';font-weight:500;font-size:24px;color:${T.heading};letter-spacing:-.01em}
.grid i{font-style:normal;display:block;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${T.grow};margin:4px 0 6px}
.grid span{font-size:15.5px;line-height:1.4;color:${T.body}}
.foot{margin-top:34px;border-top:1px solid ${T.line};padding-top:16px;display:flex;justify-content:space-between;align-items:baseline}
.wm{font-family:'Newsreader';font-weight:500;font-size:26px;letter-spacing:-.01em}
.wm .g{color:${T.grow}} .wm .h{color:${T.heading}}
.kicker{font-size:13px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:${T.muted}}
`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="page">
<div class="eyebrow">The funnel and the systems behind it</div>
<h1>How AI for Companies grows</h1>
<div class="sub">One person at the front, two doors behind him. Every post, page and email can name the stage it pushes toward. Nothing sells until stage five.</div>

<div class="front">
  <div><i>The front</i><b>Viren Samani</b><span>Founder, ex JP Morgan. One profile, one voice, five posts a week. Reshares the page, replies in the first hour.</span></div>
  <div><i>Door one, the service</i><b>AI for Companies</b><span>A day with a team, on their own work, with the tools they already pay for. They leave using it or we do not invoice.</span></div>
  <div><i>Door two, the product</i><b>Convu</b><span>The memory layer for the people you meet. Free on iOS and Android. Posted less, never dropped.</span></div>
</div>

<div class="stages">
${stages.map((s, i) => `<div class="st">${i < stages.length - 1 ? '<span class="arrow"></span>' : ''}
  <div class="n">${s.n}</div><h2>${s.name}</h2><div class="job">${s.job}</div>
  <ul>${s.what.map(w => `<li>${w}</li>`).join('')}</ul>
  <div class="meta"><small>System</small><p>${s.sys}</p><small>Measured by</small><p>${s.measure}</p></div>
</div>`).join('')}
</div>
<div class="loop">Stage six feeds stage one: a delivered day becomes a referral, a resource and a story. That loop is the only growth engine that does not need an audience first.</div>

<div class="streams">
  <div class="eyebrow">Value streams</div>
  <div class="grid">${streams.map(([b, i, s]) => `<div><b>${b}</b><i>${i}</i><span>${s}</span></div>`).join('')}</div>
</div>

<div class="foot"><div class="wm"><span class="g">AI</span> <span class="h">for</span> <span class="g">Companies</span></div><div class="kicker">21 September 2026</div></div>
</div></body></html>`;

const browser = await chromium.launch({ executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--font-render-hinting=none', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
mkdirSync('out', { recursive: true });
await page.screenshot({ path: 'out/funnel-21sep.png', type: 'png' });
await browser.close();
console.log('out/funnel-21sep.png');
