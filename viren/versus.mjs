// The comparison sheet. node viren/versus.mjs <id>   reads viren/versus/<id>.json -> out/<id>.png
//
// One pair, held side by side, six times. Learned from the "comfortable culture vs good culture"
// sheet: two columns, paired rows, a mark on each side and a vs badge on the rule between them.
// Ours drops the icon set and carries the meaning in the marks and the greens, so the reader's
// eye goes to the words. Every right-hand cell has to be something they can use the same day.
import { chromium } from 'playwright';
import { FONT_CSS } from '../lib/fonts.mjs';
import { readFileSync, mkdirSync } from 'node:fs';

const T = JSON.parse(readFileSync(new URL('./brand.json', import.meta.url))).tokens;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

const id = process.argv[2];
if (!id) { console.error('usage: node viren/versus.mjs <id>'); process.exit(1); }
const d = JSON.parse(readFileSync(new URL(`./versus/${id}.json`, import.meta.url)));
const W = d.width || 1080, H = d.height || 1350;

const CROSS = c => `<svg viewBox="0 0 20 20" width="19" height="19"><path d="M5 5l10 10M15 5L5 15" stroke="${c}" stroke-width="2.6" stroke-linecap="round" fill="none"/></svg>`;
const TICK = c => `<svg viewBox="0 0 20 20" width="19" height="19"><path d="M4 10.5l4 4 8-9" stroke="${c}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;

const row = r => `<div class="r">
  <div class="lead">${esc(r.lead)}</div>
  <div class="pair">
    <div class="side a"><span class="m">${CROSS(T.mute)}</span><p>${esc(r.left)}</p></div>
    <div class="rule"><span class="vs">vs</span></div>
    <div class="side b"><span class="m">${TICK(T.green)}</span><p>${esc(r.right)}</p></div>
  </div>
</div>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>${FONT_CSS}
*{box-sizing:border-box;margin:0;padding:0}
body{width:${W}px;height:${H}px;background:${T.paper};font-family:'Instrument Sans';-webkit-font-smoothing:antialiased;display:flex;flex-direction:column;overflow:hidden}
.head{flex:0 0 auto;background:${T.greendeep};color:#fff;padding:38px 46px 34px}
.kick{font-size:19px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:${T.greenlight}}
h1{font-size:${d.titleSize || 66}px;line-height:.99;font-weight:700;letter-spacing:-.035em;margin-top:13px}
h1 em{font-style:normal;color:${T.greenlight}}
.sub{font-size:21px;color:#b6cfc0;margin-top:15px;font-weight:400;max-width:840px;line-height:1.36}
.cols{flex:0 0 auto;display:grid;grid-template-columns:.84fr ${d.railW || 66}px 1.16fr;padding:22px 46px 0;gap:0}
.cols div{font-size:17px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
.cols .ca{color:${T.mute}}
.cols .cb{color:${T.green}}
.body{flex:1;min-height:0;display:flex;flex-direction:column;gap:${d.gap || 12}px;padding:12px 46px 0}
.r{flex:1;min-height:0;background:${T.surface};border:1px solid ${T.rule};border-radius:11px;padding:14px 20px 15px;display:flex;flex-direction:column;overflow:hidden}
.lead{font-size:15px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${T.green};background:${T.greentint};align-self:flex-start;padding:4px 10px;border-radius:5px}
.pair{flex:1;min-height:0;display:grid;grid-template-columns:.84fr ${d.railW || 66}px 1.16fr;align-items:center;margin-top:9px}
.side{display:flex;gap:11px;align-items:flex-start}
.side .m{flex:0 0 auto;margin-top:2px}
.side p{font-size:${d.cell || 19.5}px;line-height:1.28;text-wrap:pretty;letter-spacing:-.008em}
.a p{color:${T.mute};font-weight:400}
.b p{color:${T.ink};font-weight:600}
.rule{height:100%;display:flex;align-items:center;justify-content:center;position:relative}
.rule:before{content:"";position:absolute;top:2px;bottom:2px;width:1px;background:${T.rule}}
.vs{position:relative;font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${T.mute};background:${T.paper};border:1px solid ${T.rule};border-radius:20px;padding:4px 11px}
.foot{flex:0 0 auto;background:${T.greendeep};color:#cfe0d6;padding:22px 46px;display:flex;justify-content:space-between;align-items:center;font-size:21px;font-weight:500;margin-top:${d.gap || 12}px}
.foot b{color:#fff;font-weight:700}
.foot .r2{color:${T.greenlight};font-weight:700}
</style></head><body>
<div class="head">
  <div class="kick">${esc(d.kick || '')}</div>
  <h1>${d.title}</h1>
  ${d.sub ? `<div class="sub">${esc(d.sub)}</div>` : ''}
</div>
<div class="cols"><div class="ca">${esc(d.leftHead)}</div><div></div><div class="cb">${esc(d.rightHead)}</div></div>
<div class="body">${d.rows.map(row).join('')}</div>
<div class="foot"><span><b>${esc(d.footLeft || '')}</b></span><span class="r2">${esc(d.footRight || '')}</span></div>
</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--font-render-hinting=none', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
mkdirSync(new URL('./out/', import.meta.url), { recursive: true });
await page.screenshot({ path: new URL(`./out/${id}.png`, import.meta.url).pathname, type: 'png' });
await browser.close();
console.log(`out/${id}.png  ${W}x${H} at 2x`);
