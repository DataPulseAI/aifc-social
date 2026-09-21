// Viren's carousels. node viren/carousel.mjs <id>  reads viren/carousels/<id>.json
// Writes viren/out/<id>.pdf (the LinkedIn document post) and viren/out/<id>/NN.png for review.
//
// Structure, fixed: a dark cover, light numbered slides, a dark close. Bookends make the set
// read as one object in the feed. One idea a slide, a headline of three to eight words, at most
// two sentences under it (Morphica, LinkedIn carousel best practices 2026, 8 April 2026).
import { chromium } from 'playwright';
import { FONT_CSS } from '../lib/fonts.mjs';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';

const B = JSON.parse(readFileSync(new URL('./brand.json', import.meta.url)));
const T = B.tokens;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const avatar = readFileSync(new URL('./assets/viren-circle.png', import.meta.url)).toString('base64');

const DARK = '#0b0f14', PAPER = T.paper, INK = T.ink, MUTE = T.mute, RULE = T.rule;
const ACCENT = T.accent, ACCENT_ON_DARK = '#e8815a';

const css = `
${FONT_CSS}
*{box-sizing:border-box;margin:0;padding:0}
@page{size:1080px 1350px;margin:0}
html,body{font-family:'Instrument Sans';-webkit-font-smoothing:antialiased}
.s{width:1080px;height:1350px;padding:96px 88px 80px;display:flex;flex-direction:column;position:relative;overflow:hidden;page-break-after:always}
.s:last-child{page-break-after:auto}
.dark{background:${DARK};color:#fff}
.light{background:${PAPER};color:${INK}}

/* cover */
.eyebrow{font-size:26px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:${ACCENT_ON_DARK}}
.cover h1{font-size:104px;line-height:.98;font-weight:700;letter-spacing:-.035em;margin-top:40px;text-wrap:balance}
.cover .sub{font-size:36px;line-height:1.3;color:#b9c0c7;margin-top:36px;font-weight:400;max-width:840px}
.who{margin-top:auto;display:flex;align-items:center;gap:22px;padding-top:40px;border-top:1px solid #23292f}
.who img{width:92px;height:92px;border-radius:50%;object-fit:cover}
.who b{display:block;font-size:30px;font-weight:600;letter-spacing:-.01em}
.who span{display:block;font-size:24px;color:#8b949e;margin-top:4px;font-weight:400}
.swipe{position:absolute;right:88px;bottom:96px;font-size:24px;color:#8b949e;font-weight:500}

/* numbered slide */
.mid{flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:20px}
.num{font-size:30px;font-weight:700;color:${ACCENT};letter-spacing:.04em}
.light h2{font-size:82px;line-height:1.02;font-weight:700;letter-spacing:-.03em;margin-top:28px;text-wrap:balance}
.light p{font-size:38px;line-height:1.36;color:${T.ink2};margin-top:34px;font-weight:400;max-width:860px;text-wrap:pretty}
.quote{margin-top:40px;border-left:5px solid ${ACCENT};padding:6px 0 6px 34px;font-size:36px;line-height:1.34;font-weight:500;color:${INK}}
.quote + .quote{margin-top:24px}
.foot{padding-top:34px;border-top:1px solid ${RULE};display:flex;justify-content:space-between;align-items:baseline;font-size:24px;color:${MUTE};font-weight:500}

/* close */
.close h2{font-size:80px;line-height:1.04;font-weight:700;letter-spacing:-.03em;text-wrap:balance}
.close p{font-size:34px;line-height:1.4;color:#b9c0c7;margin-top:34px;max-width:840px}
.close .src{font-size:24px;line-height:1.45;color:#6f7780;padding-top:40px;border-top:1px solid #23292f}
`;

const cover = (d, c) => `<div class="s dark cover">
  <div class="eyebrow">${esc(c.eyebrow || d.eyebrow || '')}</div>
  <h1>${esc(c.headline)}</h1>
  ${c.sub ? `<div class="sub">${esc(c.sub)}</div>` : ''}
  <div class="who"><img src="data:image/png;base64,${avatar}"><div><b>${esc(d.name || 'Viren Samani')}</b><span>${esc(d.tagline || '')}</span></div></div>
  <div class="swipe">Swipe</div>
</div>`;

const step = (d, c, i, total) => `<div class="s light">
  <div class="mid">
    <div class="num">${String(i).padStart(2, '0')}</div>
    <h2>${esc(c.headline)}</h2>
    ${c.body ? `<p>${esc(c.body)}</p>` : ''}
    ${(c.quotes || []).map(q => `<div class="quote">${esc(q)}</div>`).join('')}
  </div>
  <div class="foot"><span>${esc(d.short || d.name || '')}</span><span>${i} / ${total}</span></div>
</div>`;

const close = (d, c) => `<div class="s dark close">
  <div class="mid" style="flex:1;justify-content:center">
    <div class="eyebrow">${esc(c.eyebrow || '')}</div>
    <h2 style="margin-top:36px">${esc(c.headline)}</h2>
    ${c.body ? `<p>${esc(c.body)}</p>` : ''}
  </div>
  <div class="src">${esc(c.source || '')}</div>
</div>`;

const id = process.argv[2];
if (!id) { console.error('usage: node viren/carousel.mjs <id>'); process.exit(1); }
const d = JSON.parse(readFileSync(new URL(`./carousels/${id}.json`, import.meta.url)));
const steps = d.slides.filter(s => s.type === 'step');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>` +
  d.slides.map((c, k) => c.type === 'cover' ? cover(d, c)
    : c.type === 'close' ? close(d, c)
    : step(d, c, steps.indexOf(c) + 1, steps.length)).join('') +
  `</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--font-render-hinting=none', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const dir = new URL(`./out/${id}/`, import.meta.url).pathname;
mkdirSync(dir, { recursive: true });
const els = await page.$$('.s');
for (const [k, el] of els.entries()) await el.screenshot({ path: `${dir}${String(k + 1).padStart(2, '0')}.png` });
const pdf = await page.pdf({ width: '1080px', height: '1350px', printBackground: true, pageRanges: `1-${els.length}` });
writeFileSync(new URL(`./out/${id}.pdf`, import.meta.url).pathname, pdf);
await browser.close();
console.log(`${els.length} slides, out/${id}.pdf`);
