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
const TICK = `<svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><path fill="#1d9bf0" d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/></svg>`;
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

.cover .mid{flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:40px}
.cover h1{font-size:110px;line-height:.96;font-weight:700;letter-spacing:-.038em;margin-top:38px;text-wrap:balance}
.cover .sub{font-size:40px;line-height:1.32;color:#c2d3c9;margin-top:34px;font-weight:400;max-width:820px;text-wrap:pretty}
.who{margin-top:auto;display:flex;align-items:center;gap:22px;padding-top:38px;border-top:1px solid #2b5442}
.who img{width:92px;height:92px;border-radius:50%;object-fit:cover}
.who b{display:block;font-size:30px;font-weight:600;letter-spacing:-.01em}
.who span{display:block;font-size:23px;color:#9dbdab;margin-top:4px;font-weight:400}
.swipe{position:absolute;right:84px;bottom:88px;font-size:23px;color:#9dbdab;font-weight:500}

.light h2{font-size:90px;line-height:1.0;font-weight:700;letter-spacing:-.032em;margin-top:24px;text-wrap:balance}
.light .lede{font-size:42px;line-height:1.36;color:${T.ink2};margin-top:36px;font-weight:400;max-width:850px;text-wrap:pretty}
.item{margin-top:56px;border-left:5px solid ${T.green};padding-left:34px}
.item .label{font-size:30px;font-weight:600;color:${T.green};letter-spacing:-.005em}
.item .prompt{font-size:44px;line-height:1.3;font-weight:400;color:${T.ink};margin-top:12px;text-wrap:pretty}
ol.list{list-style:none;margin-top:36px}
ol.list li{font-size:42px;line-height:1.32;color:${T.ink};padding:22px 0;border-bottom:1px solid ${T.rule};display:flex;gap:26px;text-wrap:pretty}
ol.list li:first-child{border-top:1px solid ${T.rule}}
ol.list li b{color:${T.green};font-weight:700;flex:0 0 auto}
.foot{padding-top:30px;border-top:1px solid ${T.rule};display:flex;justify-content:space-between;align-items:baseline;font-size:23px;color:${T.mute};font-weight:500}

.close h2{font-size:96px;line-height:1.0;font-weight:700;letter-spacing:-.032em;margin-top:34px;text-wrap:balance}
.close p{font-size:42px;line-height:1.4;color:#c2d3c9;margin-top:40px;max-width:830px;text-wrap:pretty}
.close .cta{font-size:38px;font-weight:600;color:${T.greenlight};margin-top:38px}
.end .mid{align-items:flex-start;text-align:left;justify-content:center}
.end .me{display:flex;align-items:center;gap:28px}
.end .me img{width:124px;height:124px;border-radius:50%;object-fit:cover}
.end .me b{display:flex;align-items:center;gap:12px;font-size:40px;font-weight:600;letter-spacing:-.015em}
.end .me span{display:block;font-size:27px;color:#9dbdab;margin-top:6px}
.end h2{font-size:78px;line-height:1.04;font-weight:700;letter-spacing:-.032em;text-wrap:balance;max-width:880px;margin-top:88px}
.end .acts{display:flex;flex-direction:column;gap:0;margin-top:72px}
.end .act{display:flex;align-items:center;gap:22px;font-size:40px;font-weight:600;color:${T.greenlight};letter-spacing:-.01em}
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
  <div class="mid">
  <div class="eyebrow">${esc(c.eyebrow || '')}</div>
  <h1>${esc(c.headline)}</h1>
  ${c.sub ? `<div class="sub">${esc(c.sub)}</div>` : ''}
  </div>
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
  <div class="foot"><span></span><span>${i} / ${total}</span></div>
</div>`;

const close = (d, c) => `<div class="s dark close">
  <div class="mid">
    <div class="eyebrow">${esc(c.eyebrow || '')}</div>
    <h2>${esc(c.headline)}</h2>
    ${c.body ? `<p>${esc(c.body)}</p>` : ''}
    ${c.cta ? `<div class="cta">${esc(c.cta)}</div>` : ''}
  </div>
  ${c.foot ? `<div class="foot2">${esc(c.foot)}</div>` : ''}
</div>`;

// end: the clean finish. Three centred lines with lucide icons, nothing else.
const ICONS = {
  send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
  bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
  follow: '<path d="M2 21a8 8 0 0 1 13.292-6"/><circle cx="10" cy="8" r="5"/><path d="M19 16v6"/><path d="M22 19h-6"/>',
};
const icon = (n, size = 44, color = '#80be9c') => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ''}</svg>`;
const end = (d, c) => `<div class="s dark end">
  <div class="mid">
    <div class="me"><img src="data:image/png;base64,${avatar}"><div><b>${esc(d.name)} ${TICK}</b><span>${esc(d.tagline || '')}</span></div></div>
    ${c.headline ? `<h2>${esc(c.headline)}</h2>` : ''}
    <div class="acts">${(c.actions || []).slice(0, 1).map(a => `<div class="act">${icon(a.icon, 40, T.greenlight)}<span>${esc(a.text)}</span></div>`).join('')}</div>
  </div>
</div>`;

const pslide = (d, c, i, total) => `<div class="s ph${c.type === 'photocover' ? ' cover' : ''}" style="${photo(c.img)}">
  ${missing(c.img) ? `<div class="gap">Photograph: ${esc(c.img || 'not set')}</div>` : ''}
  <div class="scrim"></div>
  <div class="inner">
    ${c.type === 'photocover'
      ? `<div class="eyebrow" style="color:${T.greenlight}">${esc(c.eyebrow || '')}</div><h1>${esc(c.headline)}</h1>${c.sub ? `<div class="sub">${esc(c.sub)}</div>` : ''}${d.byline === false ? '<div class="pfoot"><span></span><span>Swipe</span></div>' : `<div class="pfoot"><span>${esc(d.name)}</span><span>Swipe</span></div>`}`
      : `<div class="n">(${String(c.n || i).padStart(2, '0')})</div><div class="line">${esc(c.text)}</div>${c.note ? `<div class="note">${esc(c.note)}</div>` : ''}<div class="pfoot"><span></span><span>${i} / ${total}</span></div>`}
  </div>
</div>`;

const id = process.argv[2];
if (!id) { console.error('usage: node viren/carousel.mjs <id>'); process.exit(1); }
const d = JSON.parse(readFileSync(new URL(`./carousels/${id}.json`, import.meta.url)));
const mids = d.slides.filter(s => s.type !== 'cover' && s.type !== 'photocover' && s.type !== 'close' && s.type !== 'end');
const html = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>` +
  d.slides.map(c => c.type === 'cover' ? cover(d, c)
    : c.type === 'close' ? close(d, c)
    : c.type === 'end' ? end(d, c)
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
