import { readFileSync } from 'node:fs';
import { FONT_CSS } from './fonts.mjs';
const B = JSON.parse(readFileSync(new URL('../brand.json', import.meta.url)));
const C = B.colour;

const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

/* Wordmark: AI + for + Companies, one word, "for" in ink */
export const wordmark = (onDark = false) => {
  const g = onDark ? C.white : C.green;
  const i = onDark ? 'rgba(255,255,255,.72)' : C.ink;
  return `<span class="wm"><span style="color:${g}">AI</span><span style="color:${i}">for</span><span style="color:${g}">Companies</span></span>`;
};

const BASE = `
${FONT_CSS}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${B.canvas.w}px;height:${B.canvas.h}px}
body{font-family:'Instrument Sans',sans-serif;background:${C.stone};color:${C.ink};
  -webkit-font-smoothing:antialiased;overflow:hidden}
.card{width:${B.canvas.w}px;height:${B.canvas.h}px;position:relative;display:flex;flex-direction:column}
.wm{font-family:'Instrument Sans',sans-serif;font-weight:700;font-size:34px;letter-spacing:-.02em}
.pad{padding:76px}
.spacer{flex:1}
.eyebrow{font-size:28px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${C.greenLight}}
.src{font-size:25px;font-weight:400;color:${C.inkSoft};line-height:1.45}
.rule{height:5px;width:96px;background:${C.green};border-radius:3px}
`;

const page = (inner, extra = '') =>
`<!doctype html><html><head><meta charset="utf-8"><style>${BASE}${extra}</style></head><body>${inner}</body></html>`;

/* ---------- 1. NEWS CARD: photo + headline overlay (Business Insider shape) ---------- */
export const news = d => page(`
<div class="card">
  <img class="photo" src="${d.image}">
  <div class="scrim"></div>
  <div class="top pad">${wordmark(true)}</div>
  <div class="spacer"></div>
  <div class="btm pad">
    ${d.eyebrow ? `<div class="kicker">${esc(d.eyebrow)}</div>` : ''}
    <h1>${esc(d.headline)}</h1>
    ${d.credit ? `<div class="credit">${esc(d.credit)}</div>` : ''}
  </div>
</div>`, `
.photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.scrim{position:absolute;inset:0;background:
  linear-gradient(180deg,rgba(10,14,12,.62) 0%,rgba(10,14,12,.12) 30%,rgba(10,14,12,.55) 62%,rgba(10,14,12,.93) 100%)}
.top,.btm{position:relative;z-index:2}
.kicker{font-size:27px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  color:#8FD3B0;margin-bottom:26px}
h1{font-family:'Instrument Sans',sans-serif;font-weight:700;font-size:${d.size || 82}px;line-height:1.1;
  letter-spacing:-.025em;color:#fff;text-wrap:balance}
.credit{margin-top:30px;font-size:23px;color:rgba(255,255,255,.66);font-weight:400}
`);

/* ---------- 2. STAT CARD ---------- */
export const stat = d => page(`
<div class="card pad">
  ${wordmark()}
  <div class="spacer"></div>
  ${d.eyebrow ? `<div class="eyebrow">${esc(d.eyebrow)}</div>` : ''}
  <div class="big">${esc(d.value)}</div>
  <div class="claim">${esc(d.claim)}</div>
  <div class="rule" style="margin:44px 0 30px"></div>
  <div class="src">${esc(d.source)}</div>
</div>`, `
.big{font-family:'Newsreader',serif;font-weight:500;font-size:${d.size || 300}px;line-height:.9;
  color:${C.green};letter-spacing:-.04em;margin:30px 0 34px}
.claim{font-size:54px;font-weight:500;line-height:1.24;letter-spacing:-.02em;max-width:900px;text-wrap:balance}
`);

/* ---------- 3. LIST CARD (the numbered-list workhorse) ---------- */
export const list = d => page(`
<div class="card pad">
  ${wordmark()}
  <div class="hd">
    ${d.eyebrow ? `<div class="eyebrow" style="margin-bottom:22px">${esc(d.eyebrow)}</div>` : ''}
    <h1>${esc(d.headline)}</h1>
  </div>
  <ol>${d.items.map(t => `<li><span class="n"></span><span class="t">${esc(t)}</span></li>`).join('')}</ol>
  <div class="spacer"></div>
  <div class="foot">${esc(d.foot || B.domain)}</div>
</div>`, `
.hd{margin:44px 0 40px}
h1{font-family:'Newsreader',serif;font-weight:500;font-size:${d.size || 74}px;line-height:1.1;
  letter-spacing:-.025em;text-wrap:balance}
ol{list-style:none;counter-reset:n;display:flex;flex-direction:column;gap:${d.gap || 26}px}
li{counter-increment:n;display:flex;gap:26px;align-items:flex-start}
.n::before{content:counter(n);display:flex;align-items:center;justify-content:center;
  width:52px;height:52px;border-radius:50%;background:${C.greenPale};color:${C.green};
  font-size:26px;font-weight:700;flex:0 0 52px}
.n{display:flex;flex:0 0 52px}
.t{font-size:${d.body || 38}px;line-height:1.35;font-weight:500;padding-top:7px;letter-spacing:-.01em}
.foot{font-size:26px;font-weight:600;color:${C.greenLight};letter-spacing:.02em}
`);

/* ---------- 4. QUOTE / CLAIM CARD ---------- */
export const quote = d => page(`
<div class="card pad">
  ${wordmark(true)}
  <div class="spacer"></div>
  <div class="mark">&ldquo;</div>
  <blockquote>${esc(d.text)}</blockquote>
  <div class="rule" style="background:#8FD3B0;margin:46px 0 28px"></div>
  <div class="attr">${esc(d.attribution)}</div>
  <div class="spacer"></div>
  <div class="foot">${esc(d.foot || B.domain)}</div>
</div>`, `
body{background:${C.green}}
.mark{font-family:'Newsreader',serif;font-size:190px;line-height:.6;color:#8FD3B0;opacity:.55;margin-bottom:20px}
blockquote{font-family:'Newsreader',serif;font-weight:400;font-size:${d.size || 66}px;line-height:1.24;
  color:#fff;letter-spacing:-.02em;text-wrap:balance}
.attr{font-size:31px;font-weight:600;color:rgba(255,255,255,.82);line-height:1.4}
.foot{font-size:26px;font-weight:600;color:rgba(255,255,255,.55)}
`);

/* ---------- 5. CAROUSEL SLIDE ---------- */
export const slide = d => page(`
<div class="card pad ${d.kind}">
  <div class="row">${wordmark(d.kind !== 'body')}${d.n ? `<span class="pg">${d.n}/${d.of}</span>` : ''}</div>
  <div class="spacer"></div>
  ${d.eyebrow ? `<div class="eyebrow">${esc(d.eyebrow)}</div>` : ''}
  <h1>${esc(d.title)}</h1>
  ${d.text ? `<p>${esc(d.text)}</p>` : ''}
  <div class="spacer"></div>
  ${d.foot ? `<div class="foot">${esc(d.foot)}</div>` : ''}
</div>`, `
.card.cover{background:${C.green}}
.card.end{background:${C.green}}
.row{display:flex;justify-content:space-between;align-items:center}
.pg{font-size:26px;font-weight:600;opacity:.55}
.cover .pg,.end .pg{color:#fff}
h1{font-family:'Newsreader',serif;font-weight:500;line-height:1.1;letter-spacing:-.03em;
  font-size:${d.size || (d.kind === 'body' ? 66 : 88)}px;text-wrap:balance;
  color:${d.kind === 'body' ? C.ink : '#fff'}}
p{margin-top:34px;font-size:40px;line-height:1.38;font-weight:400;
  color:${d.kind === 'body' ? C.inkSoft : 'rgba(255,255,255,.85)'};text-wrap:balance}
.eyebrow{margin-bottom:26px;color:${d.kind === 'body' ? C.greenLight : '#8FD3B0'}}
.foot{font-size:27px;font-weight:600;color:${d.kind === 'body' ? C.greenLight : 'rgba(255,255,255,.7)'}}
`);

export const TEMPLATES = { news, stat, list, quote, slide };
