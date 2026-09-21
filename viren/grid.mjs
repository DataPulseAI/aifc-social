// The grid. node viren/grid.mjs <id>   reads viren/grids/<id>.json -> out/<id>.png
//
// One topic, covered completely, on one saveable image. Learned from the Mindstream
// "50 Claude use cases" and "20 do's and don'ts" sheets: a heavy title bar, numbered cards
// in a tight grid, a colour per family, a quiet footer. Ours keeps the AI for Companies
// greens so it reads as one house, and keeps every card to a title plus one line.
import { chromium } from 'playwright';
import { FONT_CSS } from '../lib/fonts.mjs';
import { readFileSync, mkdirSync } from 'node:fs';

const T = JSON.parse(readFileSync(new URL('./brand.json', import.meta.url))).tokens;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

const id = process.argv[2];
if (!id) { console.error('usage: node viren/grid.mjs <id>'); process.exit(1); }
const d = JSON.parse(readFileSync(new URL(`./grids/${id}.json`, import.meta.url)));
const W = d.width || 1080, H = d.height || 1350, COLS = d.cols || 5;
const fam = d.families;

const card = (c, i) => {
  const f = fam[c.family];
  return `<div class="c" style="--k:${f.colour};--t:${f.tint}">
    <div class="ch"><span class="n">${i + 1}</span><span class="fam">${esc(f.short || c.family)}</span></div>
    <div class="t">${esc(c.title)}</div>
    <div class="b">${esc(c.body)}</div>
  </div>`;
};

const html = `<!doctype html><html><head><meta charset="utf-8"><style>${FONT_CSS}
*{box-sizing:border-box;margin:0;padding:0}
body{width:${W}px;height:${H}px;background:${T.paper};font-family:'Instrument Sans';-webkit-font-smoothing:antialiased;display:flex;flex-direction:column;overflow:hidden}
.head{flex:0 0 auto;background:${T.greendeep};color:#fff;padding:34px 40px 30px}
.kick{font-size:19px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:${T.greenlight}}
h1{font-size:${d.titleSize || 62}px;line-height:.98;font-weight:700;letter-spacing:-.035em;margin-top:12px}
h1 em{font-style:normal;color:${T.greenlight}}
.sub{font-size:22px;color:#b6cfc0;margin-top:14px;font-weight:400;max-width:820px;line-height:1.35}
.legend{display:flex;flex-wrap:wrap;gap:8px 18px;margin-top:20px}
.legend span{font-size:16px;font-weight:600;color:#cfe0d6;display:flex;align-items:center;gap:7px}
.legend i{width:11px;height:11px;border-radius:3px;display:block}
.grid{flex:1;min-height:0;display:grid;grid-template-columns:repeat(${COLS},1fr);grid-auto-rows:1fr;gap:${d.gap || 11}px;padding:${d.gap || 11}px;padding-bottom:${d.footLeft || d.footRight ? 0 : d.gap || 11}px}
.c{background:#fff;border:1px solid ${T.rule};border-top:4px solid var(--k);border-radius:9px;padding:13px 14px 14px;display:flex;flex-direction:column;overflow:hidden}
.ch{display:flex;align-items:center;gap:7px;margin-bottom:7px}
.n{font-size:14px;font-weight:700;color:#fff;background:var(--k);border-radius:5px;min-width:22px;height:20px;display:flex;align-items:center;justify-content:center;padding:0 5px}
.fam{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--k);background:var(--t);padding:3px 7px;border-radius:5px}
.t{font-size:${d.titleCard || 19}px;line-height:1.14;font-weight:700;color:${T.ink};letter-spacing:-.018em;text-wrap:pretty}
.b{font-size:${d.bodyCard || 15.5}px;line-height:1.28;color:${T.ink2};margin-top:7px;font-weight:400;text-wrap:pretty}
.foot{flex:0 0 auto;background:${T.greendeep};color:#cfe0d6;padding:20px 40px;display:flex;justify-content:space-between;align-items:center;font-size:21px;font-weight:500;margin-top:${d.gap || 11}px}
.foot b{color:#fff;font-weight:700}
.foot .r{color:${T.greenlight};font-weight:700}
</style></head><body>
<div class="head">
  <div class="kick">${esc(d.kick || '')}</div>
  <h1>${d.title}</h1>
  ${d.sub ? `<div class="sub">${esc(d.sub)}</div>` : ''}
  ${d.legend === false ? '' : `<div class="legend">${Object.entries(fam).map(([k, v]) => `<span><i style="background:${v.colour}"></i>${esc(k)}</span>`).join('')}</div>`}
</div>
<div class="grid">${d.cards.map(card).join('')}</div>
${d.footLeft || d.footRight ? `<div class="foot"><span><b>${esc(d.footLeft || '')}</b></span><span class="r">${esc(d.footRight || '')}</span></div>` : ''}
</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--font-render-hinting=none', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
mkdirSync(new URL('./out/', import.meta.url), { recursive: true });
await page.screenshot({ path: new URL(`./out/${id}.png`, import.meta.url).pathname, type: 'png' });
await browser.close();
console.log(`out/${id}.png  ${W}x${H} at 2x`);
