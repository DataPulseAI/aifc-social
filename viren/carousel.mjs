// Viren's carousels. node viren/carousel.mjs <id>   reads viren/carousels/<id>.json
// Writes viren/out/<id>.pdf (the LinkedIn document post) and viren/out/<id>/NN.png for review.
//
// Deep green bookends, stone body slides, one green accent. Slide types:
//   cover   eyebrow, headline, sub
//   prompts eyebrow (the moment), headline, items [{label, prompt}]
//   note    eyebrow, headline, body, optional list []
//   close   eyebrow, headline, body, foot
//   photo   img (a file in viren/assets/photos), n, text, optional note. Full bleed, scrim,
//           a lowercase line over the picture. Learned from the nine-page photo carousels that
//           travel furthest: the photograph carries the slide, the words stay out of its way.
//   photocover  img, eyebrow, headline, sub. The same treatment on slide one.
import { chromium } from 'playwright';
import { FONT_CSS } from '../lib/fonts.mjs';
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';

const T = JSON.parse(readFileSync(new URL('./brand.json', import.meta.url))).tokens;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const avatar = readFileSync(new URL('./assets/viren-circle.png', import.meta.url)).toString('base64');

// A photograph, or an honest placeholder saying one is missing. Nothing stock, ever.
const photo = name => {
  const f = name && new URL(`./assets/photos/${name}`, import.meta.url);
  if (f && existsSync(f)) {
    const ext = name.split('.').pop().toLowerCase();
    const mime = ext === 'png' ? 'png' : ext === 'webp' ? 'webp' : 'jpeg';
    return `background-image:url(data:image/${mime};base64,${readFileSync(f).toString('base64')})`;
  }
  return 'background-image:none';
};
const missing = name => !(name && existsSync(new URL(`./assets/photos/${name}`, import.meta.url)));

const css = `
${FONT_CSS}
*{box-sizing:border-box;margin:0;padding:0}
@page{size:1080px 1350px;margin:0}
html,body{font-family:'Instrument Sans';-webkit-font-smoothing:antialiased}
.s{width:1080px;height:1350px;padding:88px 84px 72px;display:flex;flex-direction:column;position:relative;overflow:hidden;page-break-after:always}
.s:last-child{page-break-after:auto}
.dark{background:${T.greendeep};color:#fff}
.light{background:${T.paper};color:${T.ink}}
.mid{flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:16px}

.eyebrow{font-size:25px;font-weight:600;letter-spacing:.17em;text-transform:uppercase}
.dark .eyebrow{color:${T.greenlight}}
.light .eyebrow{color:${T.green}}

.cover h1{font-size:106px;line-height:.96;font-weight:700;letter-spacing:-.038em;margin-top:38px;text-wrap:balance}
.cover .sub{font-size:35px;line-height:1.32;color:#c2d3c9;margin-top:34px;font-weight:400;max-width:820px;text-wrap:pretty}
.who{margin-top:auto;display:flex;align-items:center;gap:22px;padding-top:38px;border-top:1px solid #2b5442}
.who img{width:92px;height:92px;border-radius:50%;object-fit:cover}
.who b{display:block;font-size:30px;font-weight:600;letter-spacing:-.01em}
.who span{display:block;font-size:23px;color:#9dbdab;margin-top:4px;font-weight:400}
.swipe{position:absolute;right:84px;bottom:88px;font-size:23px;color:#9dbdab;font-weight:500}

.light h2{font-size:74px;line-height:1.02;font-weight:700;letter-spacing:-.032em;margin-top:24px;text-wrap:balance}
.light .lede{font-size:36px;line-height:1.36;color:${T.ink2};margin-top:30px;font-weight:400;max-width:850px;text-wrap:pretty}
.item{margin-top:42px;border-left:5px solid ${T.green};padding-left:32px}
.item .label{font-size:27px;font-weight:600;color:${T.green};letter-spacing:-.005em}
.item .prompt{font-size:35px;line-height:1.31;font-weight:400;color:${T.ink};margin-top:12px;text-wrap:pretty}
ol.list{list-style:none;margin-top:36px}
ol.list li{font-size:35px;line-height:1.32;color:${T.ink};padding:22px 0;border-bottom:1px solid ${T.rule};display:flex;gap:26px;text-wrap:pretty}
ol.list li:first-child{border-top:1px solid ${T.rule}}
ol.list li b{color:${T.green};font-weight:700;flex:0 0 auto}
.foot{padding-top:30px;border-top:1px solid ${T.rule};display:flex;justify-content:space-between;align-items:baseline;font-size:23px;color:${T.mute};font-weight:500}

.close h2{font-size:82px;line-height:1.03;font-weight:700;letter-spacing:-.032em;margin-top:34px;text-wrap:balance}
.close p{font-size:34px;line-height:1.4;color:#c2d3c9;margin-top:32px;max-width:830px;text-wrap:pretty}
.close .cta{font-size:38px;font-weight:600;color:${T.greenlight};margin-top:38px}
.close .foot2{margin-top:auto;padding-top:34px;border-top:1px solid #2b5442;font-size:23px;line-height:1.45;color:#8fae9d}

.ph{padding:0;background:${T.greendeep};background-size:cover;background-position:center;color:#fff}
.ph .scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,20,14,.62) 0%,rgba(8,20,14,.18) 34%,rgba(8,20,14,.52) 68%,rgba(8,20,14,.88) 100%)}
.ph .inner{position:relative;height:100%;padding:88px 84px 72px;display:flex;flex-direction:column}
.ph .n{font-size:30px;font-weight:700;color:${T.greenlight};letter-spacing:.02em;font-family:'JetBrains Mono',monospace}
.ph .line{margin-top:auto;font-size:62px;line-height:1.08;font-weight:600;letter-spacing:-.03em;text-transform:lowercase;text-wrap:balance;max-width:880px}
.ph .note{font-size:29px;line-height:1.36;color:#cfe0d6;margin-top:26px;font-weight:400;max-width:840px;text-wrap:pretty}
.ph .pfoot{margin-top:38px;padding-top:26px;border-top:1px solid rgba(255,255,255,.22);display:flex;justify-content:space-between;align-items:baseline;font-size:23px;color:#cfe0d6;font-weight:500}
.ph.cover h1{margin-top:auto;font-size:98px;line-height:.98;font-weight:700;letter-spacing:-.038em;text-wrap:balance}
.ph.cover .sub{font-size:33px;line-height:1.34;color:#d5e3db;margin-top:30px;max-width:820px;font-weight:400;text-wrap:pretty}
.gap{position:absolute;inset:44px;border:3px dashed rgba(128,190,156,.5);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:rgba(128,190,156,.7)}
`;

const cover = (d, c) => `<div class="s dark cover">
  <div class="eyebrow">${esc(c.eyebrow || '')}</div>
  <h1>${esc(c.headline)}</h1>
  ${c.sub ? `<div class="sub">${esc(c.sub)}</div>` : ''}
  <div class="who"><img src="data:image/png;base64,${avatar}"><div><b>${esc(d.name)}</b><span>${esc(d.tagline || '')}</span></div></div>
  <div class="swipe">Swipe</div>
</div>`;

const body = (d, c, i, total) => `<div class="s light">
  <div class="mid">
    ${c.eyebrow ? `<div class="eyebrow">${esc(c.eyebrow)}</div>` : ''}
    <h2>${esc(c.headline)}</h2>
    ${c.lede ? `<div class="lede">${esc(c.lede)}</div>` : ''}
    ${(c.items || []).map(it => `<div class="item"><div class="label">${esc(it.label)}</div><div class="prompt">${esc(it.prompt)}</div></div>`).join('')}
    ${c.list ? `<ol class="list">${c.list.map((l, k) => `<li><b>${k + 1}</b><span>${esc(l)}</span></li>`).join('')}</ol>` : ''}
  </div>
  <div class="foot"><span>${esc(d.short || d.name)}</span><span>${i} / ${total}</span></div>
</div>`;

const close = (d, c) => `<div class="s dark close">
  <div class="mid">
    <div class="eyebrow">${esc(c.eyebrow || '')}</div>
    <h2>${esc(c.headline)}</h2>
    ${c.body ? `<p>${esc(c.body)}</p>` : ''}
    ${c.cta ? `<div class="cta">${esc(c.cta)}</div>` : ''}
  </div>
  <div class="foot2">${esc(c.foot || '')}</div>
</div>`;

const pslide = (d, c, i, total) => `<div class="s ph${c.type === 'photocover' ? ' cover' : ''}" style="${photo(c.img)}">
  ${missing(c.img) ? `<div class="gap">Photograph: ${esc(c.img || 'not set')}</div>` : ''}
  <div class="scrim"></div>
  <div class="inner">
    ${c.type === 'photocover'
      ? `<div class="eyebrow" style="color:${T.greenlight}">${esc(c.eyebrow || '')}</div><h1>${esc(c.headline)}</h1>${c.sub ? `<div class="sub">${esc(c.sub)}</div>` : ''}<div class="pfoot"><span>${esc(d.name)}</span><span>Swipe</span></div>`
      : `<div class="n">(${String(c.n || i).padStart(2, '0')})</div><div class="line">${esc(c.text)}</div>${c.note ? `<div class="note">${esc(c.note)}</div>` : ''}<div class="pfoot"><span>${esc(d.short || d.name)}</span><span>${i} / ${total}</span></div>`}
  </div>
</div>`;

const id = process.argv[2];
if (!id) { console.error('usage: node viren/carousel.mjs <id>'); process.exit(1); }
const d = JSON.parse(readFileSync(new URL(`./carousels/${id}.json`, import.meta.url)));
const mids = d.slides.filter(s => s.type !== 'cover' && s.type !== 'photocover' && s.type !== 'close');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>` +
  d.slides.map(c => c.type === 'cover' ? cover(d, c)
    : c.type === 'close' ? close(d, c)
    : c.type === 'photo' || c.type === 'photocover' ? pslide(d, c, mids.indexOf(c) + 1, mids.length)
    : body(d, c, mids.indexOf(c) + 1, mids.length)).join('') +
  `</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--font-render-hinting=none', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const dir = new URL(`./out/${id}/`, import.meta.url).pathname;
mkdirSync(dir, { recursive: true });
const els = await page.$$('.s');
for (const [k, el] of els.entries()) await el.screenshot({ path: `${dir}${String(k + 1).padStart(2, '0')}.png` });
writeFileSync(new URL(`./out/${id}.pdf`, import.meta.url).pathname,
  await page.pdf({ width: '1080px', height: '1350px', printBackground: true, pageRanges: `1-${els.length}` }));
await browser.close();
console.log(`${els.length} slides, out/${id}.pdf`);
