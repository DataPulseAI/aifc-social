// The numbered list card. node viren/list.mjs <id>   reads viren/lists/<id>.json -> out/<id>.png
//
// Five or six numbered items, each a bold title, a line of explanation, and the exact thing to
// do. Taken from the highest-performing single image in the reference library (482 reactions,
// 178 comments): what makes it travel is the action line, because the reader leaves with a
// step rather than a principle. Ours keeps the AI for Companies greens.
import { chromium } from 'playwright';
import { FONT_CSS } from '../lib/fonts.mjs';
import { readFileSync, mkdirSync } from 'node:fs';

const T = JSON.parse(readFileSync(new URL('./brand.json', import.meta.url))).tokens;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

const id = process.argv[2];
if (!id) { console.error('usage: node viren/list.mjs <id>'); process.exit(1); }
const d = JSON.parse(readFileSync(new URL(`./lists/${id}.json`, import.meta.url)));
const W = d.width || 1080, H = d.height || 1350;

const item = (it, i) => `<div class="it">
  <div class="n">${i + 1}</div>
  <div class="tx">
    <div class="t">${esc(it.title)}</div>
    ${it.body ? `<div class="b">${esc(it.body)}</div>` : ''}
    ${it.action ? `<div class="a"><span>Do this</span>${esc(it.action)}</div>` : ''}
  </div>
</div>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>${FONT_CSS}
*{box-sizing:border-box;margin:0;padding:0}
body{width:${W}px;height:${H}px;background:${T.paper};font-family:'Instrument Sans';-webkit-font-smoothing:antialiased;display:flex;flex-direction:column;overflow:hidden}
.head{flex:0 0 auto;background:${T.greendeep};color:#fff;padding:40px 48px 36px}
.kick{font-size:19px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:${T.greenlight}}
h1{font-size:${d.titleSize || 68}px;line-height:.99;font-weight:700;letter-spacing:-.035em;margin-top:14px;text-wrap:balance}
h1 em{font-style:normal;color:${T.greenlight}}
.sub{font-size:22px;color:#b6cfc0;margin-top:16px;font-weight:400;max-width:840px;line-height:1.36}
.body{flex:1;min-height:0;display:flex;flex-direction:column;justify-content:space-evenly;padding:8px 48px ${d.footLeft || d.footRight ? 8 : 34}px}
.it{display:flex;gap:22px;align-items:flex-start;padding:16px 0;border-bottom:1px solid ${T.rule}}
.it:last-child{border-bottom:none}
.n{flex:0 0 auto;width:42px;height:42px;border-radius:11px;background:${T.green};color:#fff;font-size:22px;font-weight:700;display:flex;align-items:center;justify-content:center;margin-top:2px}
.tx{flex:1;min-width:0}
.t{font-size:${d.itemTitle || 31}px;line-height:1.12;font-weight:700;color:${T.ink};letter-spacing:-.022em;text-wrap:pretty}
.b{font-size:${d.itemBody || 21}px;line-height:1.32;color:${T.ink2};margin-top:8px;font-weight:400;text-wrap:pretty}
.a{font-size:${d.itemBody || 21}px;line-height:1.3;color:${T.green};margin-top:10px;font-weight:600;text-wrap:pretty}
.a span{display:inline-block;font-size:14px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;background:${T.greentint};color:${T.green};padding:3px 9px;border-radius:5px;margin-right:11px;vertical-align:2px}
.foot{flex:0 0 auto;background:${T.greendeep};color:#cfe0d6;padding:22px 48px;display:flex;justify-content:space-between;align-items:center;font-size:21px;font-weight:500}
.foot b{color:#fff;font-weight:700}
.foot .r{color:${T.greenlight};font-weight:700}
</style></head><body>
<div class="head">
  <div class="kick">${esc(d.kick || '')}</div>
  <h1>${d.title}</h1>
  ${d.sub ? `<div class="sub">${esc(d.sub)}</div>` : ''}
</div>
<div class="body">${d.items.map(item).join('')}</div>
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
