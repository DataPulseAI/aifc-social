// The LinkedIn profile banner. node viren/banner.mjs -> out/banner.png
//
// 1584x396 at 2x, built to viren/design-philosophy.md ("Working Notes").
// A ruled page rather than a brand panel: this is a personal profile, so the ground is paper,
// the voice is first person, and the only motif is the ruling you would write a list on.
// Four entries are marked, because four is how many things anyone actually uses.
// The left 432px carries nothing but ruling: the profile photograph sits there.
import { chromium } from 'playwright';
import { FONT_CSS } from '../lib/fonts.mjs';
import { readFileSync, mkdirSync } from 'node:fs';

const T = JSON.parse(readFileSync(new URL('./brand.json', import.meta.url))).tokens;
const W = 1584, H = 396;
const GUTTER = 432;        // the avatar's territory
const PITCH = 36;          // the ruling
const TOP = 30;
const RULES = Math.floor((H - TOP) / PITCH);

// The four marked entries, and where along the rule each one sits.
const ENTRY = { 2: [1292, 158], 4: [1292, 112], 7: [1292, 182], 9: [1292, 134] };

const ruling = Array.from({ length: RULES }, (_, i) => {
  const y = TOP + i * PITCH;
  const e = ENTRY[i];
  return `<div class="r" style="top:${y}px"></div>` +
    (e ? `<div class="e" style="top:${y - 7}px;left:${e[0]}px;width:${e[1]}px"></div>` : '');
}).join('');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>${FONT_CSS}
*{box-sizing:border-box;margin:0;padding:0}
body{width:${W}px;height:${H}px;background:${T.paper};font-family:'Instrument Sans';-webkit-font-smoothing:antialiased;overflow:hidden;position:relative}

.r{position:absolute;left:0;right:0;height:1px;background:${T.rule};opacity:.75}
.e{position:absolute;height:5px;background:${T.greenlight};opacity:.55;border-radius:3px}
.margin{position:absolute;left:${GUTTER}px;top:0;bottom:0;width:1px;background:#c9b9b4;opacity:.8}

.text{position:absolute;left:${GUTTER + 48}px;top:0;bottom:0;width:760px;display:flex;flex-direction:column;justify-content:center}
h1{font-size:43px;line-height:1.2;font-weight:700;letter-spacing:-.03em;color:${T.ink}}
h1 span{display:block;color:${T.green};font-weight:600}
.sub{font-family:'JetBrains Mono',monospace;font-size:15px;letter-spacing:.07em;color:${T.mute};margin-top:22px}
.sub b{color:${T.green};font-weight:500}
</style></head><body>
${ruling}
<div class="margin"></div>
<div class="text">
  <h1>I write down the prompts<br>that actually work.<span>Then I give them away.</span></h1>
  <div class="sub">contracts &nbsp;·&nbsp; spreadsheets &nbsp;·&nbsp; meetings &nbsp;·&nbsp; the Friday update</div>
</div>
</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--font-render-hinting=none', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
mkdirSync(new URL('./out/', import.meta.url), { recursive: true });
await page.screenshot({ path: new URL('./out/banner.png', import.meta.url).pathname, type: 'png' });
await browser.close();
console.log(`out/banner.png  ${W}x${H} at 2x`);
