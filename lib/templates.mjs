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

/* ---------- 1. NEWS CARD: photo + one-sentence headline, wordmark centred top ----------
   Matches the Business Insider feed-card shape: logo centred, image fills the frame,
   dark gradient across the lower third, headline bottom-left, nothing else. */
export const news = d => page(`
<div class="card">
  <img class="photo" src="${d.image}">
  <div class="scrim"></div>
  <div class="top">${wordmark(true)}</div>
  <div class="spacer"></div>
  <div class="btm">
    ${d.eyebrow ? `<div class="kicker">${esc(d.eyebrow)}</div>` : ''}
    <h1>${esc(d.headline)}</h1>
  </div>
</div>`, `
.photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${d.focus || '50% 30%'}}
.scrim{position:absolute;inset:0;background:
  linear-gradient(180deg,rgba(8,12,10,.58) 0%,rgba(8,12,10,.10) 22%,rgba(8,12,10,0) 44%,
                  rgba(8,12,10,.42) 66%,rgba(8,12,10,.88) 88%,rgba(8,12,10,.96) 100%)}
.top{position:relative;z-index:2;padding:52px 76px 0;display:flex;justify-content:center}
.top .wm{font-size:42px;letter-spacing:-.02em}
.btm{position:relative;z-index:2;padding:0 72px 78px;text-align:center}
.kicker{font-size:26px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;
  color:#8FD3B0;margin-bottom:22px}
h1{font-family:'Instrument Sans',sans-serif;font-weight:700;font-size:${d.size || 84}px;line-height:1.08;
  letter-spacing:-.03em;color:#fff;text-wrap:balance;margin:0 auto;max-width:900px;
  text-shadow:0 2px 28px rgba(0,0,0,.45)}
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
.big{font-family:'Instrument Sans',sans-serif;font-weight:700;font-size:${d.size || 300}px;line-height:.9;
  color:${C.green};letter-spacing:-.055em;margin:26px 0 34px}
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
h1{font-family:'Instrument Sans',sans-serif;font-weight:700;font-size:${d.size || 70}px;line-height:1.12;
  letter-spacing:-.035em;text-wrap:balance}
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
.mark{font-family:'Instrument Sans',sans-serif;font-weight:700;font-size:150px;line-height:.6;color:#8FD3B0;opacity:.55;margin-bottom:20px}
blockquote{font-family:'Instrument Sans',sans-serif;font-weight:600;font-size:${d.size || 66}px;line-height:1.2;
  color:#fff;letter-spacing:-.03em;text-wrap:balance}
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
h1{font-family:'Instrument Sans',sans-serif;font-weight:700;line-height:1.1;letter-spacing:-.038em;
  font-size:${d.size || (d.kind === 'body' ? 66 : 88)}px;text-wrap:balance;
  color:${d.kind === 'body' ? C.ink : '#fff'}}
p{margin-top:34px;font-size:40px;line-height:1.38;font-weight:400;
  color:${d.kind === 'body' ? C.inkSoft : 'rgba(255,255,255,.85)'};text-wrap:balance}
.eyebrow{margin-bottom:26px;color:${d.kind === 'body' ? C.greenLight : '#8FD3B0'}}
.foot{font-size:27px;font-weight:600;color:${d.kind === 'body' ? C.greenLight : 'rgba(255,255,255,.7)'}}
`);

/* ---------- 6. CAROUSEL: cover ---------- */
export const cover = d => page(`
<div class="card pad">
  <div class="row">${wordmark(true)}<span class="pg">1/${d.of}</span></div>
  <div class="spacer"></div>
  ${d.eyebrow ? `<div class="kick">${esc(d.eyebrow)}</div>` : ''}
  <h1>${esc(d.title)}</h1>
  ${d.sub ? `<p class="sub">${esc(d.sub)}</p>` : ''}
  <div class="spacer"></div>
  <div class="swipe"><span class="dot"></span>${esc(d.cue || 'Swipe. Save it for Monday.')}</div>
</div>`, `
body{background:${C.green}}
.row{display:flex;justify-content:space-between;align-items:center}
.pg{font-size:26px;font-weight:600;color:rgba(255,255,255,.5)}
.kick{font-size:28px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;
  color:#8FD3B0;margin-bottom:30px}
h1{font-family:'Instrument Sans',sans-serif;font-weight:700;font-size:${d.size || 104}px;
  line-height:1.02;letter-spacing:-.045em;color:#fff;text-wrap:balance}
.sub{margin-top:36px;font-size:40px;line-height:1.35;color:rgba(255,255,255,.78);max-width:860px}
.swipe{display:flex;align-items:center;gap:18px;font-size:29px;font-weight:600;
  color:#8FD3B0}
.dot{width:14px;height:14px;border-radius:50%;background:#8FD3B0;flex:0 0 14px}
`);

/* ---------- 7. CAROUSEL: tips slide, 4 to 5 short items ---------- */
export const tips = d => page(`
<div class="card pad">
  <div class="row">${wordmark()}<span class="pg">${d.n}/${d.of}</span></div>
  <div class="hd">
    ${d.eyebrow ? `<div class="kick">${esc(d.eyebrow)}</div>` : ''}
    <h2>${esc(d.title)}</h2>
  </div>
  <ul>${d.items.map(t => `<li><span class="tick"></span><span class="t">${esc(t)}</span></li>`).join('')}</ul>
  <div class="spacer"></div>
</div>`, `
.row{display:flex;justify-content:space-between;align-items:center}
.pg{font-size:26px;font-weight:600;color:${C.inkSoft};opacity:.6}
.hd{margin:52px 0 46px}
.kick{font-size:26px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;
  color:${C.greenLight};margin-bottom:20px}
h2{font-family:'Instrument Sans',sans-serif;font-weight:700;font-size:${d.size || 62}px;
  line-height:1.1;letter-spacing:-.035em;text-wrap:balance}
ul{list-style:none;display:flex;flex-direction:column;gap:${d.gap || 34}px}
li{display:flex;gap:24px;align-items:flex-start}
.tick{flex:0 0 40px;width:40px;height:40px;border-radius:12px;background:${C.greenPale};
  position:relative;margin-top:6px}
.tick::after{content:'';position:absolute;left:13px;top:9px;width:9px;height:17px;
  border:solid ${C.green};border-width:0 4px 4px 0;transform:rotate(42deg)}
.t{font-size:${d.body || 40}px;line-height:1.32;font-weight:500;letter-spacing:-.012em}
`);

/* ---------- 8. CAROUSEL: closing slide ---------- */
export const outro = d => page(`
<div class="card pad">
  <div class="row">${wordmark(true)}<span class="pg">${d.n}/${d.of}</span></div>
  <div class="spacer"></div>
  <h1>${esc(d.title)}</h1>
  ${d.sub ? `<p class="sub">${esc(d.sub)}</p>` : ''}
  ${d.url ? `<div class="url">${esc(d.url)}</div>` : ''}
  <div class="spacer"></div>
  ${d.foot ? `<div class="foot">${esc(d.foot)}</div>` : ''}
</div>`, `
body{background:${C.green}}
.row{display:flex;justify-content:space-between;align-items:center}
.pg{font-size:26px;font-weight:600;color:rgba(255,255,255,.5)}
h1{font-family:'Instrument Sans',sans-serif;font-weight:700;font-size:${d.size || 76}px;
  line-height:1.08;letter-spacing:-.04em;color:#fff;text-wrap:balance}
.sub{margin-top:32px;font-size:38px;line-height:1.35;color:rgba(255,255,255,.78);max-width:860px}
.url{margin-top:44px;display:inline-block;font-size:34px;font-weight:700;color:${C.green};
  background:#8FD3B0;padding:22px 34px;border-radius:16px;letter-spacing:-.01em}
.foot{font-size:27px;font-weight:600;color:rgba(255,255,255,.55)}
`);


/* ---------- 9. GRID: the numbered one-pager infographic ----------
   A single saveable image carrying a whole short list. Built for the save, not the
   scroll: people screenshot these and send them on.

   d = { kicker, lines: [{t, accent}], items: [{title, body}], cols, foot }

   Sizing is the whole game. Two columns stay legible to about ten items with two-line
   bodies. Past that the body type drops below what a phone can read in feed, and the
   piece should be a carousel instead. See docs/18. */
export const grid = d => {
  const cols = d.cols || 2;
  const n = d.items.length;
  const rows = Math.ceil(n / cols);
  // Type scales down as the grid gets denser, within readable floors.
  const ttl = d.titleSize || (rows >= 6 ? 27 : rows >= 5 ? 30 : 34);
  const bdy = d.bodySize  || (rows >= 6 ? 21 : rows >= 5 ? 23 : 26);
  const gap = d.gap || (rows >= 6 ? 16 : 20);
  return page(`
<div class="card pad">
  <div class="top">
    ${wordmark()}
    ${d.kicker ? `<span class="kick">${esc(d.kicker)}</span>` : ''}
  </div>
  <h1>${d.lines.map(l => `<span class="${l.accent ? 'acc' : ''}">${esc(l.t)}</span>`).join('<br>')}</h1>
  <div class="grid">
    ${d.items.map((it, i) => `
    <div class="cell">
      <div class="num">${i + 1}</div>
      <div class="txt">
        <div class="t">${esc(it.title)}</div>
        ${it.body ? `<div class="b">${esc(it.body)}</div>` : ''}
      </div>
    </div>`).join('')}
  </div>
  <div class="spacer"></div>
  <div class="foot"><span>${esc(d.foot || B.domain)}</span>${d.src ? `<span class="s">${esc(d.src)}</span>` : ''}</div>
</div>`, `
.pad{padding:64px 60px 52px}
.top{display:flex;justify-content:space-between;align-items:baseline}
.kick{font-size:23px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${C.greenLight}}
h1{font-family:'Instrument Sans',sans-serif;font-weight:800;font-size:${d.size || 62}px;
  line-height:1.03;letter-spacing:-.04em;text-transform:uppercase;margin:34px 0 34px}
h1 .acc{color:${C.greenLight}}
.grid{display:grid;grid-template-columns:repeat(${cols},1fr);gap:${gap}px}
.cell{display:flex;gap:16px;align-items:flex-start;background:${C.white};
  border:1.5px solid ${C.greenPale};border-radius:16px;padding:18px 18px 18px 16px}
.num{flex:0 0 38px;width:38px;height:38px;border-radius:50%;background:${C.green};color:#fff;
  font-size:21px;font-weight:700;display:flex;align-items:center;justify-content:center;margin-top:1px}
.txt{min-width:0}
.t{font-size:${ttl}px;font-weight:700;line-height:1.14;letter-spacing:-.02em;
  text-transform:uppercase;margin-bottom:7px}
.b{font-size:${bdy}px;line-height:1.36;font-weight:450;color:${C.inkSoft};letter-spacing:-.005em}
.foot{display:flex;justify-content:space-between;align-items:baseline;margin-top:26px}
.foot span{font-size:24px;font-weight:700;color:${C.greenLight};letter-spacing:.02em}
.foot .s{font-weight:450;color:${C.inkSoft};font-size:21px;letter-spacing:0}
`);
};

/* ---------- 10. ROUNDUP: what is worth reading, with the sources named ----------
   The link post that earns its link. Three to five items, each a publisher, a claim
   and one line on why it matters. The post body carries the URLs; the card carries
   the reason to open them.

   d = { kicker, headline, items: [{source, date, title, why}], foot } */
export const roundup = d => page(`
<div class="card pad">
  <div class="top">
    ${wordmark()}
    ${d.kicker ? `<span class="kick">${esc(d.kicker)}</span>` : ''}
  </div>
  <h1>${esc(d.headline)}</h1>
  <div class="rule" style="margin:0 0 34px"></div>
  <div class="items">
    ${d.items.map(it => `
    <div class="it">
      <div class="meta">${esc(it.source)}${it.date ? ` <span class="dot">&middot;</span> ${esc(it.date)}` : ''}</div>
      <div class="t">${esc(it.title)}</div>
      ${it.why ? `<div class="w">${esc(it.why)}</div>` : ''}
    </div>`).join('')}
  </div>
  <div class="spacer"></div>
  <div class="foot">${esc(d.foot || 'Links in the post')}</div>
</div>`, `
.pad{padding:70px 64px 58px}
.top{display:flex;justify-content:space-between;align-items:baseline}
.kick{font-size:24px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${C.greenLight}}
h1{font-family:'Instrument Sans',sans-serif;font-weight:700;font-size:${d.size || 66}px;
  line-height:1.08;letter-spacing:-.04em;margin:38px 0 30px;text-wrap:balance}
.items{display:flex;flex-direction:column;gap:${d.gap || 32}px}
.it{border-left:5px solid ${C.greenPale};padding-left:26px}
.meta{font-size:${d.metaSize || 23}px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:${C.greenLight};margin-bottom:10px}
.dot{opacity:.5}
.t{font-size:${d.titleSize || 37}px;font-weight:700;line-height:1.2;letter-spacing:-.022em}
.w{margin-top:9px;font-size:${d.bodySize || 27}px;line-height:1.38;font-weight:450;color:${C.inkSoft}}
.foot{font-size:26px;font-weight:700;color:${C.greenLight};letter-spacing:.02em}
`);

export const TEMPLATES = { news, stat, list, quote, slide, cover, tips, outro, grid, roundup };
