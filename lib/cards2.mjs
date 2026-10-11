/**
 * Card system 2. Built 11 October 2026 to the owner's verdict on the six-jobs grid:
 * "Should be title and value." docs/prompts/00-card-system.md is the rule book.
 *
 *   One typeface (Instrument Sans). Two content sizes: title (--t) and body (--b).
 *   One small size (24px) for the footer only. Body never below 34px.
 *   Sizes are not chosen by hand: an in-page fitter grows title and body together until the
 *   content fills the space between title and footer, then spreads any remainder evenly
 *   between items. If the content does not fit at body 34px it throws, naming the field.
 *
 * Templates (one per schema in the shared brief):
 *   cheatsheet, stat, prompt, result, statement, roundup, beforeafter,
 *   carousel slides: cover, step, end   (CARDS.carousel(spec) returns one HTML per slide)
 *
 * renderCard2(spec, outPath) -> PNG path, or an array of paths for a carousel
 * (outPath "x.png" becomes x-01.png, x-02.png ...).
 */
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { FONT_CSS } from './fonts.mjs';
import { getBrowser } from './render.mjs';
import { clean } from './clean.mjs';

const B = JSON.parse(readFileSync(new URL('../brand.json', import.meta.url)));
const T = B.tokens;
const W = B.canvas.w, H = B.canvas.h;

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/* *phrase* in a title is set in the accent. Use it once per card at most. */
const hi = s => esc(s).replace(/\*([^*]+)\*/g, '<span class="hi">$1</span>');

/* The brand wordmark (vector, one colour), recoloured for the ground it sits on. */
const WM_SVG = readFileSync(new URL('../viren/assets/brand/wordmark-white-clean.svg', import.meta.url), 'utf8')
  .replace(/<metadata>[\s\S]*?<\/metadata>/, '');
const wordmark = colour => `<img class="wm" alt="AIforCompanies" src="data:image/svg+xml;base64,${
  Buffer.from(WM_SVG.replace(/#FFFFFF/gi, colour)).toString('base64')}">`;

/* Tool logos, inline at body height, so a non-technical reader recognises the app. */
const LOGO_DIR = new URL('../viren/assets/logos/', import.meta.url);
const logo = name => {
  const slug = String(name).toLowerCase().replace(/\s+/g, '-');
  const f = new URL(`${slug}.png`, LOGO_DIR);
  return existsSync(f) ? `<img class="logo" alt="" src="data:image/png;base64,${readFileSync(f).toString('base64')}">` : '';
};
const orList = a => a.length <= 1 ? (a[0] || '') : `${a.slice(0, -1).join(', ')} or ${a[a.length - 1]}`;

/* ---------------------------------------------------------------- the fitter
   Runs inside the page. cfg:
     bMin, bMax     body range in px (bMin is 34 unless a template says otherwise)
     ratio          title = body * ratio, clamped to [tMin, tMax]
     tMaxLines      the title may not wrap past this; title shrinks first, body second
   Searches body from bMax down; the first size where .main's natural height fits wins.
   Then .stack stretches to fill with space-between (or centre, for statement/cover). */
const FIT = cfg => `<script>
(async () => {
  const cfg = ${JSON.stringify(cfg)};
  await document.fonts.ready;
  const root = document.documentElement, main = document.querySelector('.main');
  const title = document.querySelector('.title'), stack = document.querySelector('.stack');
  const set = (t, b) => { root.style.setProperty('--t', t + 'px'); root.style.setProperty('--b', b + 'px'); };
  const lines = t => title ? Math.round(title.getBoundingClientRect().height / (t * cfg.tLH)) : 0;
  const fits = () => main.scrollHeight <= main.clientHeight + 0.5 && main.scrollWidth <= main.clientWidth + 0.5;
  let res = null, titleErr = false;
  for (let b = cfg.bMax; b >= cfg.bMin; b--) {
    let t = Math.min(cfg.tMax, Math.max(cfg.tMin, Math.round(b * cfg.ratio)));
    set(t, b);
    const tooWide = () => title && title.scrollWidth > title.clientWidth + 0.5;
    while ((lines(t) > cfg.tMaxLines || tooWide()) && t > cfg.tMin) { t -= 2; set(t, b); }
    if (lines(t) > cfg.tMaxLines) { titleErr = true; continue; }
    titleErr = false;
    if (fits()) { res = { t, b }; break; }
  }
  if (!res) {
    let field = 'title';
    if (!titleErr) {
      const els = [...document.querySelectorAll('[data-f]')].filter(e => e.dataset.f !== 'title');
      els.sort((a, z) => z.getBoundingClientRect().height - a.getBoundingClientRect().height);
      field = els[0] ? els[0].dataset.f : 'content';
      // name the total too: the overflow is shared, the tallest field is the cheapest cut
    }
    window.__fit = { ok: false, field, titleErr, over: main.scrollHeight - main.clientHeight, wide: main.scrollWidth - main.clientWidth };
    return;
  }
  stack.classList.add('filled');
  window.__fit = { ok: true, ...res, slack: main.clientHeight - main.scrollHeight };
})();
</script>`;

const BASE = ({ dark }) => {
  const ground = dark ? T.growdeep : T.ink;
  const ink = dark ? T.onaccent : T.heading;
  const soft = dark ? '#cfe0d6' : T.body;
  const accent = dark ? T.growlight : T.grow;
  const rule = dark ? 'rgba(255,255,255,.18)' : T.line;
  const foot = dark ? '#a9c6b6' : T.muted;
  return `${FONT_CSS}
:root{--t:64px;--b:40px;--ink:${ink};--soft:${soft};--accent:${accent};--rule:${rule}}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{background:${ground};color:var(--ink);font-family:'Instrument Sans',sans-serif;-webkit-font-smoothing:antialiased;
  font-kerning:normal}
.card{width:${W}px;height:${H}px;display:flex;flex-direction:column;padding:76px 72px 0}
.main{flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden}
.title{font-size:var(--t);line-height:1.08;font-weight:700;letter-spacing:-.022em;color:var(--ink);text-wrap:balance;
  flex:0 0 auto}
.hi{color:var(--accent)}
.stack{display:flex;flex-direction:column;flex:0 0 auto;margin-top:calc(var(--b) * 1.1);font-size:var(--b);line-height:1.3}
.stack.filled{flex:1 1 auto;justify-content:space-between}
.stack.filled.centre{justify-content:center}
p,li,td,th,div{text-wrap:pretty}
b,strong{font-weight:700}
.lab{color:var(--accent);font-weight:700}
.foot{flex:0 0 auto;display:flex;justify-content:space-between;align-items:center;gap:40px;
  margin-top:40px;padding:26px 0 40px;border-top:2px solid var(--rule);font-size:24px;line-height:1.35;color:${foot}}
.foot .wm{height:30px;width:auto;display:block;flex:0 0 auto}
.foot .r{text-align:right;max-width:700px;text-wrap:balance}
.logo{height:1em;width:1em;object-fit:contain;vertical-align:-0.14em;margin-right:.22em;border-radius:50%;background:#fff}
`;
};

const page = ({ css = '', inner, fit, dark = false, foot = '' }) => `<!doctype html><html><head><meta charset="utf-8">
<style>${BASE({ dark })}${css}</style></head><body>
<div class="card"><div class="main">${inner}</div>
<div class="foot">${wordmark(dark ? T.onaccent : T.grow)}<div class="r">${foot}</div></div></div>
${FIT({ bMin: 34, tLH: 1.08, ...fit })}</body></html>`;

const need = (cond, msg) => { if (!cond) throw new Error(`cards2: ${msg}`); };

/* ---------------------------------------------------------------- cheatsheet
   {"template":"cheatsheet","title":"","items":[{"label":"","value":""}],"source":""}
   Each item: label (the situation, accent, bold) above value (the usable thing), on hairlines. */
const cheatsheet = d => {
  need(Array.isArray(d.items) && d.items.length >= 3 && d.items.length <= 6, 'cheatsheet needs 3 to 6 items');
  return page({
    css: `.it{padding:calc(var(--b)*.42) 0;border-top:2px solid var(--rule)}
.it:first-child{border-top:0;padding-top:0}.it:last-child{padding-bottom:0}
.it .lab{display:block;margin-bottom:.12em}
.it .v{color:var(--ink)}`,
    inner: `<h1 class="title" data-f="title">${hi(d.title)}</h1>
<div class="stack">${d.items.map((it, i) => `<div class="it"><span class="lab" data-f="items[${i}].label">${esc(it.label)}</span><div class="v" data-f="items[${i}].value">${esc(it.value)}</div></div>`).join('')}</div>`,
    foot: esc(d.source || ''),
    fit: { bMax: 60, ratio: 1.55, tMin: 56, tMax: 88, tMaxLines: 3 },
  });
};

/* ---------------------------------------------------------------- stat
   {"template":"stat","number":"","meaning":"","action":"","source":""}
   The number is the title size (very large); meaning and action are body. */
const stat = d => page({
  css: `.title.num{color:var(--accent);letter-spacing:-.04em;line-height:.92;white-space:nowrap}
.stack .m{color:var(--ink)}
.stack .a{border-left:10px solid ${T.grow};padding-left:calc(var(--b)*.6);margin-top:calc(var(--b)*.9);color:var(--ink);font-weight:700}`,
  inner: `<div class="title num" data-f="number">${esc(d.number)}</div>
<div class="stack"><div class="m" data-f="meaning">${esc(d.meaning)}</div>
<div class="a" data-f="action">${esc(d.action)}</div></div>`,
  foot: esc(d.source || ''),
  fit: { tLH: .92, bMax: 72, ratio: 6.5, tMin: 150, tMax: 420, tMaxLines: 1, bMin: 34 },
});

/* ---------------------------------------------------------------- prompt
   {"template":"prompt","title":"","prompt":"","attach":"","tools":["ChatGPT","Copilot","Gemini"]} */
const prompt = d => {
  const tools = d.tools && d.tools.length ? d.tools : ['ChatGPT', 'Copilot', 'Gemini'];
  return page({
    css: `.lead{font-weight:700;color:var(--accent)}
.lead .tl{white-space:nowrap}
.box{background:${T.surface};border:2px solid ${T.line};border-left:10px solid ${T.grow};border-radius:14px;
  padding:calc(var(--b)*.75) calc(var(--b)*.8);color:${T.heading}}
.box{margin-top:calc(var(--b)*.45)}
.att{color:var(--ink);margin-top:calc(var(--b)*.7)}`,
    inner: `<h1 class="title" data-f="title">${hi(d.title)}</h1>
<div class="stack"><div class="lead" data-f="tools">Type this into ${tools.map(t => `<span class="tl">${logo(t)}${esc(t)}</span>`).reduce((a, s, i, arr) => a + (i === 0 ? '' : i === arr.length - 1 ? ' or ' : ', ') + s, '')}</div>
<div class="box" data-f="prompt">${esc(d.prompt)}</div>
${d.attach ? `<div class="att" data-f="attach"><span class="lab">Then attach </span>${esc(d.attach)}</div>` : ''}</div>`,
    foot: '',
    fit: { bMax: 54, ratio: 1.5, tMin: 56, tMax: 84, tMaxLines: 3 },
  });
};

/* ---------------------------------------------------------------- result
   {"template":"result","title":"","header":[""],"rows":[[""]],"note":"","illustrative":true}
   A table at body size. Header row in the accent. A cell starting "!" is a gap and is set as a pill. */
const result = d => {
  need(Array.isArray(d.rows) && d.rows.length >= 1 && d.rows.length <= 6, 'result needs 1 to 6 rows');
  const cell = (c, f) => {
    const s = String(c ?? '');
    return s.startsWith('!') ? `<span class="pill" data-f="${f}">${esc(s.slice(1))}</span>` : `<span data-f="${f}">${esc(s)}</span>`;
  };
  const illus = d.illustrative !== false;
  return page({
    css: `table{width:100%;border-collapse:collapse;table-layout:auto}
th{text-align:left;color:var(--accent);font-weight:700;padding:0 calc(var(--b)*.6) calc(var(--b)*.35) 0;border-bottom:3px solid ${T.grow};vertical-align:bottom}
td{padding:calc(var(--b)*.42) calc(var(--b)*.6) calc(var(--b)*.42) 0;border-bottom:2px solid var(--rule);vertical-align:top;color:var(--ink)}
th:last-child,td:last-child{padding-right:0}
td:first-child{font-weight:700}
tr:last-child td{border-bottom:0}
.pill{display:inline-block;white-space:nowrap;background:${T.grow};color:${T.onaccent};font-weight:700;border-radius:10px;padding:0 .35em;line-height:1.3}
.note{border-top:3px solid ${T.grow};padding-top:calc(var(--b)*.6);color:var(--ink);font-weight:700}`,
    inner: `<h1 class="title" data-f="title">${hi(d.title)}</h1>
<div class="stack"><table>${d.header && d.header.length ? `<thead><tr>${d.header.map((h, i) => `<th data-f="header[${i}]">${esc(h)}</th>`).join('')}</tr></thead>` : ''}
<tbody>${d.rows.map((r, i) => `<tr>${r.map((c, j) => `<td>${cell(c, `rows[${i}][${j}]`)}</td>`).join('')}</tr>`).join('')}</tbody></table>
${d.note ? `<div class="note" data-f="note">${esc(d.note)}</div>` : ''}</div>`,
    foot: illus ? 'Illustrative example' : esc(d.source || ''),
    fit: { bMax: 52, ratio: 1.6, tMin: 56, tMax: 84, tMaxLines: 3 },
  });
};

/* ---------------------------------------------------------------- statement
   {"template":"statement","text":"","sub":""}  The sentence is the title size and fills the card. */
const statement = d => page({
  css: `.stack{margin-top:0}
.st{font-size:var(--t);line-height:1.08;font-weight:700;letter-spacing:-.025em;color:var(--ink);text-wrap:balance}
.sub{margin-top:calc(var(--b)*1.4);color:var(--soft);font-weight:400;border-top:3px solid ${T.grow};padding-top:calc(var(--b)*.8)}`,
  inner: `<div class="stack centre"><div class="st" data-f="text">${hi(d.text)}</div>${d.sub ? `<div class="sub" data-f="sub">${esc(d.sub)}</div>` : ''}</div>`,
  foot: '',
  fit: { bMax: 48, ratio: 2.8, tMin: 72, tMax: 132, tMaxLines: 99 },
});

/* ---------------------------------------------------------------- roundup
   {"template":"roundup","title":"","items":[{"tool":"","change":"","do":""}],"source":""} */
const roundup = d => {
  need(Array.isArray(d.items) && d.items.length >= 2 && d.items.length <= 4, 'roundup needs 2 to 4 items');
  return page({
    css: `.it{padding:calc(var(--b)*.5) 0;border-top:2px solid var(--rule)}
.it:first-child{border-top:0;padding-top:0}.it:last-child{padding-bottom:0}
.it .tool{display:block;color:var(--accent);font-weight:700}
.it .ch{color:var(--ink)}
.it .do{color:var(--ink);font-weight:700;margin-top:.25em}`,
    inner: `<h1 class="title" data-f="title">${hi(d.title)}</h1>
<div class="stack">${d.items.map((it, i) => `<div class="it"><span class="tool" data-f="items[${i}].tool">${logo(it.tool)}${esc(it.tool)}</span>
<div class="ch" data-f="items[${i}].change">${esc(it.change)}</div>${it.do ? `<div class="do" data-f="items[${i}].do">Do: ${esc(it.do)}</div>` : ''}</div>`).join('')}</div>`,
    foot: esc(d.source || ''),
    fit: { bMax: 56, ratio: 1.55, tMin: 56, tMax: 88, tMaxLines: 3 },
  });
};

/* ---------------------------------------------------------------- beforeafter
   {"template":"beforeafter","title":"","before":{"label":"","text":""},"after":{"label":"","text":""}} */
const beforeafter = d => page({
  css: `.pn{border-radius:16px;padding:calc(var(--b)*.7) calc(var(--b)*.8)}
.pn .lab{display:block;margin-bottom:.25em}
.bf{background:${T.raised};color:${T.body}}
.bf .lab{color:${T.muted}}
.af{background:${T.surface};border:3px solid ${T.grow};color:${T.heading}}
.gap{height:calc(var(--b)*.8)}`,
  inner: `<h1 class="title" data-f="title">${hi(d.title)}</h1>
<div class="stack"><div class="pn bf"><span class="lab" data-f="before.label">${esc(d.before.label)}</span><div data-f="before.text">${esc(d.before.text)}</div></div>
<div class="gap"></div>
<div class="pn af"><span class="lab" data-f="after.label">${esc(d.after.label)}</span><div data-f="after.text">${esc(d.after.text)}</div></div></div>`,
  foot: esc(d.source || ''),
  fit: { bMax: 58, ratio: 1.5, tMin: 56, tMax: 84, tMaxLines: 3 },
});

/* ---------------------------------------------------------------- carousel slides
   {"template":"carousel","slides":[{"kind":"cover|step|end","title":"","body":""}]}
   cover and end sit on deep green; steps on the stone ground. Footer right carries n / total. */
const counter = (i, n) => (i != null && n ? `${i + 1} / ${n}` : '');
const cover = (s, i, n) => page({
  dark: true,
  css: `.stack{margin-top:0}
.ct{font-size:var(--t);line-height:1.06;font-weight:700;letter-spacing:-.025em;text-wrap:balance}
.cb{margin-top:calc(var(--b)*1.2);color:var(--soft)}`,
  inner: `<div class="stack centre"><div class="ct" data-f="slides[${i ?? 0}].title">${hi(s.title)}</div>${s.body ? `<div class="cb" data-f="slides[${i ?? 0}].body">${esc(s.body)}</div>` : ''}</div>`,
  foot: counter(i, n),
  fit: { bMax: 60, ratio: 2.9, tMin: 80, tMax: 180, tMaxLines: 99 },
});
const step = (s, i, n, opt = {}) => page({
  css: `.stack .bd{color:var(--ink)}
.stack .bd p+p{margin-top:.6em}
.stack.filled .bd{flex:1 1 auto;display:flex;flex-direction:column}
.stack.filled .bd p.say{flex:1 1 auto}
.stack .bd p.say{background:${T.surface};border:2px solid ${T.line};border-left:10px solid ${T.grow};border-radius:14px;
  padding:calc(var(--b)*.6) calc(var(--b)*.7);color:${T.heading}}`,
  inner: `<h1 class="title" data-f="slides[${i ?? 0}].title">${hi(s.title)}</h1>
<div class="stack"><div class="bd" data-f="slides[${i ?? 0}].body">${String(s.body || '').split('\n').filter(Boolean).map(p => `<p${/^[“"]/.test(p.trim()) ? ' class="say"' : ''}>${esc(p)}</p>`).join('')}</div></div>`,
  foot: counter(i, n),
  fit: { bMax: 100, ratio: 1.3, tMin: 56, tMax: 136, tMaxLines: 4 },
});
const end = (s, i, n) => page({
  dark: true,
  css: `.stack{margin-top:0}
.ct{font-size:var(--t);line-height:1.06;font-weight:700;letter-spacing:-.025em;text-wrap:balance}
.cb{margin-top:calc(var(--b)*1.2);color:var(--soft)}`,
  inner: `<div class="stack centre"><div class="ct" data-f="slides[${i ?? 0}].title">${hi(s.title)}</div>${s.body ? `<div class="cb" data-f="slides[${i ?? 0}].body">${esc(s.body).replace(/\n/g, '<br>')}</div>` : ''}</div>`,
  foot: counter(i, n),
  fit: { bMax: 64, ratio: 2.9, tMin: 64, tMax: 190, tMaxLines: 99 },
});
/* Each step slide fits its own title and body together (title = 1.3 x body, body 34 to 100px)
   so a short step fills its slide and the title always outranks the body. Owner's rule,
   11 October 2026: every card fills its space. */
const carousel = (d, opt = {}) => {
  need(Array.isArray(d.slides) && d.slides.length >= 2, 'carousel needs slides');
  const n = d.slides.length;
  return d.slides.map((s, i) => ({ cover, step, end })[s.kind || 'step'](s, i, n, opt));
};

export const CARDS = { cheatsheet, stat, prompt, result, statement, roundup, beforeafter, cover, step, end, carousel };

/* ---------------------------------------------------------------- render */
async function shoot(html, outPath, label) {
  const b = await getBrowser();
  const pg = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  try {
    await pg.setContent(html, { waitUntil: 'load' });
    await pg.waitForFunction(() => window.__fit, null, { timeout: 15000 });
    const fit = await pg.evaluate(() => window.__fit);
    if (!fit.ok) {
      throw new Error(`cards2 ${label}: content does not fit at body 34px. Shorten ${fit.field}` +
        (fit.titleErr ? ' (title wraps past its line limit at the smallest title size)' : fit.over > 0 ? ` (over by ${Math.ceil(fit.over)}px)` : ` (too wide by ${Math.ceil(fit.wide)}px)`));
    }
    mkdirSync(dirname(outPath), { recursive: true });
    await pg.screenshot({ path: outPath, type: 'png' });
    await clean(outPath);
    return { path: outPath, ...fit };
  } finally { await pg.close(); }
}

export async function renderCard2(spec, outPath) {
  const fn = CARDS[spec.template];
  if (!fn) throw new Error(`cards2: unknown template "${spec.template}"`);
  if (spec.template === 'carousel') {
    let opt = {};
    const steps = spec.slides.map((s, i) => [s, i]).filter(([s]) => (s.kind || 'step') === 'step');
    if (steps.length) {
      let b = Infinity, t = Infinity;
      for (const [s, i] of steps) {
        const f = await fitHtml(step(s, i, spec.slides.length));
        if (!f.ok) throw new Error(`cards2 carousel slide ${i + 1} (step): content does not fit at body 34px. Shorten ${f.field}`);
        b = Math.min(b, f.b); t = Math.min(t, f.t);
      }
      opt = {}; // each step fits title and body together, title always 1.38x body
    }
    const htmls = carousel(spec, opt);
    const base = outPath.replace(/\.png$/, '');
    const out = [];
    for (const [i, h] of htmls.entries()) {
      const p = `${base}-${String(i + 1).padStart(2, '0')}.png`;
      out.push((await shoot(h, p, `carousel slide ${i + 1} (${spec.slides[i].kind})`)).path);
    }
    return out;
  }
  return (await shoot(fn(spec), outPath, spec.template)).path;
}

async function fitHtml(html) {
  const b = await getBrowser();
  const pg = await b.newPage({ viewport: { width: W, height: H } });
  try {
    await pg.setContent(html, { waitUntil: 'load' });
    await pg.waitForFunction(() => window.__fit, null, { timeout: 15000 });
    return await pg.evaluate(() => window.__fit);
  } finally { await pg.close(); }
}

/* Exposed for tests and the prompt docs: render and return the chosen sizes. */
export async function fitInfo(spec) {
  const fn = CARDS[spec.template];
  const b = await getBrowser();
  const pg = await b.newPage({ viewport: { width: W, height: H } });
  try {
    await pg.setContent(fn(spec), { waitUntil: 'load' });
    await pg.waitForFunction(() => window.__fit, null, { timeout: 15000 });
    return await pg.evaluate(() => window.__fit);
  } finally { await pg.close(); }
}
