// The LinkedIn profile banner. node viren/banner.mjs -> out/banner.png
//
// 1584x396 at 2x, built to viren/design-philosophy.md ("Quiet Inventory").
// The left 400px is the profile photograph's territory and carries nothing but ground.
// The field on the right is the argument: two hundred identical marks, twenty-one of them lit.
// Everything someone has bought, and the fraction of it anyone opens.
import { chromium } from 'playwright';
import { FONT_CSS } from '../lib/fonts.mjs';
import { readFileSync, mkdirSync } from 'node:fs';

const T = JSON.parse(readFileSync(new URL('./brand.json', import.meta.url))).tokens;
const W = 1584, H = 396;
const GUTTER = 432;          // the avatar's territory, kept clear
const COLS = 22, ROWS = 8;   // 176 marks

// Which marks are lit. Scattered by hand rather than at random, so the eye finds no pattern
// and no clump. Twenty-one of two hundred.
const LIT = new Set([3, 17, 29, 41, 52, 63, 78, 86, 94, 107, 118, 126, 139, 144, 158, 163, 171, 180, 185, 192, 197]);

const marks = Array.from({ length: COLS * ROWS }, (_, i) =>
  `<i class="${LIT.has(i) ? 'on' : ''}"></i>`).join('');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>${FONT_CSS}
*{box-sizing:border-box;margin:0;padding:0}
body{width:${W}px;height:${H}px;background:${T.greendeep};font-family:'Instrument Sans';-webkit-font-smoothing:antialiased;overflow:hidden;position:relative}

/* one axis only */
.rule{position:absolute;left:${GUTTER}px;top:0;bottom:0;width:1px;background:rgba(128,190,156,.26)}

.text{position:absolute;left:${GUTTER + 46}px;top:0;bottom:0;width:544px;display:flex;flex-direction:column;justify-content:center}
.mark{font-family:'JetBrains Mono',monospace;font-size:15px;font-weight:500;letter-spacing:.3em;text-transform:uppercase;color:${T.greenlight};opacity:.9}
h1{font-size:42px;line-height:1.16;font-weight:700;letter-spacing:-.028em;color:#fff;margin-top:20px}
h1 span{display:block;color:${T.greenlight};font-weight:600}
.url{font-family:'JetBrains Mono',monospace;font-size:15px;font-weight:400;letter-spacing:.12em;color:#7fa18d;margin-top:26px}

.field{position:absolute;right:66px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;align-items:flex-start}
.grid{display:grid;grid-template-columns:repeat(${COLS},10px);grid-auto-rows:14px;column-gap:9px;row-gap:11px}
.grid i{display:block;width:2px;height:14px;background:${T.greenlight};opacity:.14;justify-self:center;border-radius:1px}
.grid i.on{opacity:1;box-shadow:0 0 9px rgba(128,190,156,.6)}
.legend{font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#6b8f7c;margin-top:24px;display:flex;gap:26px;align-items:center}
.legend b{font-weight:400;color:${T.greenlight};display:flex;gap:9px;align-items:center}
.legend s{text-decoration:none;display:flex;gap:9px;align-items:center}
.k{display:inline-block;width:2px;height:13px;background:${T.greenlight}}
.k.dim{opacity:.13}
</style></head><body>
<div class="rule"></div>
<div class="text">
  <div class="mark">AI for Companies</div>
  <h1>Most companies have already bought the AI.<span>Almost none of them use it.</span></h1>
  <div class="url">aiforcompanies.co.uk</div>
</div>
<div class="field">
  <div class="grid">${marks}</div>
  <div class="legend"><b><i class="k"></i>in use</b><s><i class="k dim"></i>paid for, never opened</s></div>
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
