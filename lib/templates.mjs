/**
 * The card system. Rebuilt 21 September 2026 against the AIforCompanies design system
 * (project/tokens.json and README.md in the design-system artifact): stone ground, charcoal
 * type, one deep green, hairlines instead of boxes, air. Newsreader carries the big statement
 * at weight 500 and nothing else; Instrument Sans takes labels, numbers, lists and the source
 * line at 400, 500 and 600. Nothing is italic, nothing is faux bold, no gradients, no scrims,
 * type never sits on a photograph.
 *
 * One template per format in bank/formats.md, plus the carousel set:
 *   story       photo in a soft frame, one sentence beneath it            (the story)
 *   plainlist   a numbered list on hairlines, the list is the card          (library, one task)
 *   count       one large number, a claim, a source                        (Monday count)
 *   correction  the belief and the fact, two blocks on a rule               (the correction)
 *   position    a statement in display type, nothing else                   (the position)
 *   roundup     publisher, date, claim, why, four to six of them            (the week, read)
 *   grid        two columns of numbered items on hairlines                  (do-this-Monday)
 *   cover, tips, slide, outro                                               (carousels)
 *
 * news, stat, list and quote stay as names so older scripts still run; they map onto the
 * templates above. docs/25-card-system.md explains the decisions.
 */
import { readFileSync } from 'node:fs';
import { FONT_CSS } from './fonts.mjs';
const B = JSON.parse(readFileSync(new URL('../brand.json', import.meta.url)));
const T = B.tokens;

const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

/* The mark as live type in the display face at one weight: AI and Companies in grow, for in
   heading. On the deep green ground the parts are white and white at 72%. */
export const wordmark = (onDark = false) => {
  const g = onDark ? T.onaccent : T.grow;
  const i = onDark ? 'rgba(255,255,255,.72)' : T.heading;
  return `<span class="wm" aria-label="AI for Companies"><span style="color:${g}">AI</span> <span style="color:${i}">for</span> <span style="color:${g}">Companies</span></span>`;
};

const BASE = `
${FONT_CSS}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${B.canvas.w}px;height:${B.canvas.h}px}
body{font-family:'Instrument Sans',system-ui,sans-serif;background:${T.ink};color:${T.body};
  -webkit-font-smoothing:antialiased;overflow:hidden}
.card{width:${B.canvas.w}px;height:${B.canvas.h}px;position:relative;display:flex;flex-direction:column;padding:80px 84px 72px}
.wm{font-family:'Newsreader',serif;font-weight:500;font-size:36px;letter-spacing:-.015em;font-optical-sizing:auto;white-space:nowrap}
.display{font-family:'Newsreader',serif;font-weight:500;letter-spacing:-.015em;font-optical-sizing:auto;
  color:${T.heading};text-wrap:balance;line-height:1.06}
.eyebrow{font-size:22px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:${T.muted};line-height:1;
  display:flex;align-items:center;gap:14px}
.eyebrow::before{content:'';width:10px;height:10px;border-radius:9999px;background:${T.growsolid};flex:0 0 10px}
.spacer{flex:1}
.hair{height:1px;background:${T.line}}
.foot{display:flex;justify-content:space-between;align-items:baseline;padding-top:28px;border-top:1px solid ${T.line}}
.foot .wm{font-size:34px}
.foot .kick{font-size:20px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:${T.muted}}
.src{font-size:24px;line-height:1.5;color:${T.muted};text-wrap:pretty}
.num{font-family:'Newsreader',serif;font-weight:500;color:${T.grow};font-optical-sizing:auto;letter-spacing:-.015em}
p,li{text-wrap:pretty}
`;

const page = (inner, extra = '') =>
`<!doctype html><html><head><meta charset="utf-8"><style>${BASE}${extra}</style></head><body>${inner}</body></html>`;

const footer = kick => `<div class="foot">${wordmark()}${kick ? `<span class="kick">${esc(kick)}</span>` : ''}</div>`;

/* ---------- STORY: the photograph in a soft frame, the sentence beneath it ----------
   Type never sits on the image (design system, Photography). The frame is radius-lg on raised.
   d = { image, headline, focus, size, kicker, eyebrow } */
export const story = d => page(`
<div class="card">
  <div class="frame"><img src="${d.image}"></div>
  ${d.eyebrow ? `<div class="eyebrow" style="margin-top:44px">${esc(d.eyebrow)}</div>` : ''}
  <h1 class="display">${esc(d.headline)}</h1>
  <div class="spacer"></div>
  ${footer(d.kicker)}
</div>`, `
.frame{height:${d.frame || 690}px;border-radius:12px;overflow:hidden;background:${T.raised};flex:0 0 auto}
.frame img{width:100%;height:100%;object-fit:cover;object-position:${d.focus || '50% 30%'};display:block}
h1{font-size:${d.size || 74}px;margin-top:${d.eyebrow ? 24 : 48}px}
`);
export const news = story;

/* ---------- PLAINLIST: the list is the card ----------
   d = { eyebrow, headline, items: [string | {t, sub}], kicker, size, body } */
export const plainlist = d => {
  const n = d.items.length;
  const body = d.body || (n > 10 ? 27 : n > 8 ? 30 : n > 6 ? 34 : 38);
  const pad = n > 10 ? 13 : n > 8 ? 16 : n > 6 ? 19 : 26;
  return page(`
<div class="card">
  ${d.eyebrow ? `<div class="eyebrow">${esc(d.eyebrow)}</div>` : ''}
  <h1 class="display">${esc(d.headline)}</h1>
  <ol>${d.items.map((it, i) => {
    const t = typeof it === 'string' ? it : it.t; const sub = typeof it === 'string' ? '' : it.sub;
    return `<li><span class="num">${i + 1}</span><span class="t">${esc(t)}${sub ? `<span class="sub">${esc(sub)}</span>` : ''}</span></li>`;
  }).join('')}</ol>
  <div class="spacer"></div>
  ${footer(d.kicker)}
</div>`, `
h1{font-size:${d.size || (n > 8 ? 52 : 58)}px;margin:${d.eyebrow ? 22 : 0}px 0 30px}
ol{list-style:none;border-top:1px solid ${T.line}}
li{display:flex;gap:28px;align-items:baseline;padding:${pad}px 0;border-bottom:1px solid ${T.line}}
.num{font-size:${body + 4}px;flex:0 0 52px;text-align:right}
.t{font-size:${body}px;line-height:1.3;color:${T.heading};font-weight:500;letter-spacing:-.01em;display:flex;flex-direction:column;gap:4px}
.sub{font-size:${Math.round(body * .72)}px;color:${T.muted};font-weight:400;line-height:1.35}
`);
};
export const list = d => plainlist({ ...d, items: d.items });

/* ---------- COUNT: one number, a claim, a source ----------
   d = { eyebrow, value, claim, source, kicker, size } */
export const count = d => page(`
<div class="card">
  ${d.eyebrow ? `<div class="eyebrow">${esc(d.eyebrow)}</div>` : ''}
  <div class="spacer"></div>
  <div class="big display">${esc(d.value)}</div>
  <div class="claim display">${esc(d.claim)}</div>
  ${d.source ? `<div class="hair" style="margin:44px 0 26px"></div><div class="src">${esc(d.source)}</div>` : ''}
  <div class="spacer"></div>
  ${footer(d.kicker)}
</div>`, `
.big{font-size:${d.size || 360}px;line-height:.86;color:${T.grow};letter-spacing:-.03em;margin-left:-10px}
.claim{font-size:62px;line-height:1.1;margin-top:36px;max-width:900px}
`);
export const stat = count;

/* ---------- CORRECTION: the belief, then the fact ----------
   d = { belief, fact, source, kicker } */
export const correction = d => page(`
<div class="card">
  <div class="eyebrow">What people think</div>
  <p class="belief display">${esc(d.belief)}</p>
  <div class="hair" style="margin:52px 0"></div>
  <div class="eyebrow eb2">What is true</div>
  <p class="fact display">${esc(d.fact)}</p>
  ${d.source ? `<div class="src" style="margin-top:40px">${esc(d.source)}</div>` : ''}
  <div class="spacer"></div>
  ${footer(d.kicker)}
</div>`, `
.belief{font-size:${d.beliefSize || 58}px;color:${T.muted};margin-top:26px;line-height:1.16}
.eb2::before{background:${T.growsolid}}
.fact{font-size:${d.factSize || 78}px;margin-top:26px}
`);

/* ---------- POSITION: a statement in display type ----------
   d = { text, eyebrow, kicker, size } */
export const position = d => page(`
<div class="card">
  <div class="eyebrow">${esc(d.eyebrow || 'Our position')}</div>
  <div class="spacer"></div>
  <p class="display stmt">${esc(d.text)}</p>
  <div class="spacer"></div>
  ${footer(d.kicker)}
</div>`, `
.stmt{font-size:${d.size || 104}px;line-height:1.02;max-width:940px}
`);
export const quote = d => position({ ...d, text: d.text, eyebrow: d.attribution || 'Quoted', kicker: d.foot });

/* ---------- ROUNDUP: the week, read ----------
   d = { eyebrow, headline, items: [{source, date, title, why}], kicker } */
export const roundup = d => {
  const n = d.items.length;
  const ttl = d.titleSize || (n >= 6 ? 30 : n >= 5 ? 34 : 38);
  const why = d.bodySize || (n >= 6 ? 23 : n >= 5 ? 26 : 28);
  const gap = d.gap || (n >= 6 ? 20 : n >= 5 ? 24 : 28);
  return page(`
<div class="card">
  ${d.eyebrow ? `<div class="eyebrow">${esc(d.eyebrow)}</div>` : ''}
  <h1 class="display">${esc(d.headline)}</h1>
  <div class="items">
    ${d.items.map(it => `
    <div class="it">
      <div class="meta">${esc(it.source)}${it.date ? `<span class="sep">&middot;</span>${esc(it.date)}` : ''}</div>
      <div class="t">${esc(it.title)}</div>
      ${it.why ? `<div class="w">${esc(it.why)}</div>` : ''}
    </div>`).join('')}
  </div>
  <div class="spacer"></div>
  ${footer(d.kicker || 'Links in the post')}
</div>`, `
h1{font-size:${d.size || 60}px;margin:${d.eyebrow ? 24 : 0}px 0 36px}
.items{border-top:1px solid ${T.line}}
.it{padding:${gap}px 0;border-bottom:1px solid ${T.line}}
.meta{font-size:20px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${T.grow};margin-bottom:10px}
.sep{margin:0 12px;color:${T.muted}}
.t{font-size:${ttl}px;font-weight:500;line-height:1.22;letter-spacing:-.012em;color:${T.heading}}
.w{margin-top:8px;font-size:${why}px;line-height:1.4;color:${T.body}}
`);
};

/* ---------- GRID: two columns of numbered items on hairlines ----------
   d = { eyebrow, headline, items: [{title, body}], cols, kicker } */
export const grid = d => {
  const cols = d.cols || 2; const n = d.items.length; const rows = Math.ceil(n / cols);
  const ttl = d.titleSize || (rows >= 5 ? 29 : rows >= 4 ? 33 : 38);
  const bdy = d.bodySize || (rows >= 5 ? 23 : rows >= 4 ? 26 : 29);
  return page(`
<div class="card">
  ${d.eyebrow ? `<div class="eyebrow">${esc(d.eyebrow)}</div>` : ''}
  <h1 class="display">${esc(d.headline)}</h1>
  <div class="grid">
    ${d.items.map((it, i) => `
    <div class="cell">
      <div class="num">${String(i + 1).padStart(2, '0')}</div>
      <div class="t">${esc(it.title)}</div>
      ${it.body ? `<div class="b">${esc(it.body)}</div>` : ''}
    </div>`).join('')}
  </div>
  <div class="spacer"></div>
  ${footer(d.kicker)}
</div>`, `
h1{font-size:${d.size || 56}px;margin:${d.eyebrow ? 24 : 0}px 0 36px}
.grid{display:grid;grid-template-columns:repeat(${cols},1fr);column-gap:44px;row-gap:0;border-top:1px solid ${T.line}}
.cell{padding:${rows >= 5 ? 20 : 30}px 0 ${rows >= 5 ? 18 : 28}px;border-bottom:1px solid ${T.line}}
.num{font-size:26px;margin-bottom:10px}
.t{font-size:${ttl}px;font-weight:500;line-height:1.2;letter-spacing:-.012em;color:${T.heading}}
.b{margin-top:8px;font-size:${bdy}px;line-height:1.4;color:${T.body}}
`);
};

/* ---------- CAROUSEL ---------- growdeep ground with white type on the cover and outro,
   which is the one place white type belongs; stone ground for the tips slides. */
const row = (dark, n, of) => `<div class="row">${wordmark(dark)}${n ? `<span class="pg">${n}/${of}</span>` : ''}</div>`;

export const cover = d => page(`
<div class="card dark">
  ${row(true, 1, d.of)}
  <div class="spacer"></div>
  ${d.eyebrow ? `<div class="eyebrow">${esc(d.eyebrow)}</div>` : ''}
  <h1 class="display">${esc(d.title)}</h1>
  ${d.sub ? `<p class="sub">${esc(d.sub)}</p>` : ''}
  <div class="spacer"></div>
  <div class="cue">${esc(d.cue || 'Swipe. Save it for Monday.')}</div>
</div>`, `
body{background:${T.growdeep}}
.row{display:flex;justify-content:space-between;align-items:center}
.pg{font-size:24px;font-weight:500;color:rgba(255,255,255,.55)}
.eyebrow{color:rgba(255,255,255,.7);margin-bottom:28px}.eyebrow::before{background:${T.growlight}}
h1.display{font-size:${d.size || 96}px;color:#fff;line-height:1.02}
.sub{margin-top:34px;font-size:36px;line-height:1.4;color:rgba(255,255,255,.8);max-width:860px}
.cue{font-size:26px;font-weight:500;color:${T.growlight}}
`);

export const tips = d => page(`
<div class="card">
  ${row(false, d.n, d.of)}
  ${d.eyebrow ? `<div class="eyebrow" style="margin-top:52px">${esc(d.eyebrow)}</div>` : ''}
  <h2 class="display">${esc(d.title)}</h2>
  <ul>${d.items.map(t => `<li><span class="mk"></span><span class="t">${esc(t)}</span></li>`).join('')}</ul>
  <div class="spacer"></div>
</div>`, `
.row{display:flex;justify-content:space-between;align-items:center}
.pg{font-size:24px;font-weight:500;color:${T.muted}}
h2{font-size:${d.size || 58}px;margin:${d.eyebrow ? 22 : 52}px 0 40px}
ul{list-style:none;border-top:1px solid ${T.line}}
li{display:flex;gap:26px;align-items:flex-start;padding:${d.gap || 26}px 0;border-bottom:1px solid ${T.line}}
.mk{flex:0 0 12px;width:12px;height:12px;border-radius:9999px;background:${T.growsolid};margin-top:16px}
.t{font-size:${d.body || 38}px;line-height:1.32;font-weight:500;color:${T.heading};letter-spacing:-.01em}
`);

export const slide = d => d.kind === 'body'
  ? page(`
<div class="card">
  ${row(false, d.n, d.of)}
  <div class="spacer"></div>
  ${d.eyebrow ? `<div class="eyebrow">${esc(d.eyebrow)}</div>` : ''}
  <h1 class="display">${esc(d.title)}</h1>
  ${d.text ? `<p class="tx">${esc(d.text)}</p>` : ''}
  <div class="spacer"></div>
  ${d.foot ? `<div class="src">${esc(d.foot)}</div>` : ''}
</div>`, `
.row{display:flex;justify-content:space-between;align-items:center}
.pg{font-size:24px;font-weight:500;color:${T.muted}}
h1{font-size:${d.size || 66}px;margin-top:${d.eyebrow ? 24 : 0}px}
.tx{margin-top:32px;font-size:38px;line-height:1.42;color:${T.body};max-width:880px}
`)
  : cover({ ...d, sub: d.text, cue: d.foot || ' ' });

export const outro = d => page(`
<div class="card">
  ${row(true, d.n, d.of)}
  <div class="spacer"></div>
  <h1 class="display">${esc(d.title)}</h1>
  ${d.sub ? `<p class="sub">${esc(d.sub)}</p>` : ''}
  ${d.url ? `<div class="url">${esc(d.url)}</div>` : ''}
  <div class="spacer"></div>
  ${d.foot ? `<div class="src" style="color:rgba(255,255,255,.55)">${esc(d.foot)}</div>` : ''}
</div>`, `
body{background:${T.growdeep}}
.row{display:flex;justify-content:space-between;align-items:center}
.pg{font-size:24px;font-weight:500;color:rgba(255,255,255,.55)}
h1.display{font-size:${d.size || 76}px;color:#fff;line-height:1.06}
.sub{margin-top:30px;font-size:36px;line-height:1.4;color:rgba(255,255,255,.8);max-width:860px}
.url{margin-top:44px;display:inline-block;font-size:28px;font-weight:500;color:${T.growdeep};
  background:#fff;padding:20px 30px;border-radius:6px}
`);

export const TEMPLATES = { story, news, plainlist, list, count, stat, correction, position, quote, roundup, grid, cover, tips, slide, outro };
