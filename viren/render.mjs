// Viren's single cards. node viren/render.mjs <id>   reads viren/posts/<id>.json -> out/<id>.png
//
// Two templates only.
//   tweet   a belief or a moment, in his voice. Near-black, avatar, name, tick, tagline.
//   prompt  one real prompt, given away, big enough to read off the screen. Deep green.
import { chromium } from 'playwright';
import { FONT_CSS } from '../lib/fonts.mjs';
import { readFileSync, mkdirSync } from 'node:fs';

const T = JSON.parse(readFileSync(new URL('./brand.json', import.meta.url))).tokens;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const hi = s => esc(s).replace(/\*([^*]+)\*/g, '<span class="hi">$1</span>');
const avatar = readFileSync(new URL('./assets/viren-circle.png', import.meta.url)).toString('base64');
const TICK = `<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path fill="#1d9bf0" d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/></svg>`;


import { existsSync } from 'node:fs';
const ICONS = {
  bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',
  send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
};
const icon = (n, size = 30, color = '#80be9c') => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ''}</svg>`;
const NAMES = { copilot: 'Copilot', chatgpt: 'ChatGPT', gemini: 'Gemini', claude: 'Claude', word: 'Word', excel: 'Excel', outlook: 'Outlook', powerpoint: 'PowerPoint', teams: 'Teams', gmail: 'Gmail', 'google-docs': 'Docs', 'google-sheets': 'Sheets' };
const logo = (slug, only) => {
  const f = new URL(`./assets/logos/${slug}.png`, import.meta.url);
  if (!existsSync(f)) return '';
  const img = `<img src="data:image/png;base64,${readFileSync(f).toString('base64')}" alt="${esc(NAMES[slug] || slug)}">`;
  return only ? `<span class="tool only">${img}</span>` : `<span class="tool">${img}<i>${esc(NAMES[slug] || slug)}</i></span>`;
};
ICONS.file = '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>';
ICONS.arrow = '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>';
ICONS.table = '<path d="M12 3v18"/><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/>';
ICONS.sparkles = '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>';
const ftype = t => `<span class="tool ft">${icon('file', 26, '#e6efe9')}<i>${esc(t)}</i></span>`;
const toolsRow = d => (d.tools && d.tools.length) || d.category || (d.files && d.files.length) ? `<div class="top">
  <div class="tools">${(d.tools || []).map(t => logo(t, d.logosOnly)).join('')}</div>
  ${d.category ? `<div class="cat">${esc(d.category)}</div>` : ''}
</div>${d.files && d.files.length ? `<div class="files"><em>Attach</em>${d.files.map(ftype).join('')}</div>` : ''}` : '';
const keepLine = d => d.keep ? `<div class="keep">${icon(d.keep.icon || 'bookmark')}<span>${esc(d.keep.text)}</span></div>` : '';

const wordmark = readFileSync(new URL('./assets/brand/wordmark-white-clean.svg', import.meta.url)).toString('base64');
const mark = () => `<div class="who lockup"><img src="data:image/svg+xml;base64,${wordmark}" alt="AIforCompanies"></div>`;
const who = (d, mute) => d.page ? mark() : `<div class="who"><img src="data:image/png;base64,${avatar}"><div><b>${esc(d.name || 'Viren Samani')} ${TICK}</b><span style="color:${mute}">${esc(d.tagline || 'Founder, Convu & AIforCompanies')}</span></div></div>`;

const shell = (bg, fg, css, inner) => `<!doctype html><html><head><meta charset="utf-8"><style>${FONT_CSS}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1080px;height:1350px;background:${bg};color:${fg};font-family:'Instrument Sans';-webkit-font-smoothing:antialiased}
.card{height:100%;display:flex;flex-direction:column}
.hi{color:#80be9c}
.who{display:flex;align-items:center;gap:24px}
.who img{width:112px;height:112px;border-radius:50%;object-fit:cover}
.who b{display:flex;align-items:center;gap:10px;font-size:37px;font-weight:600;letter-spacing:-.015em}
.who.lockup img{width:auto;height:38px;border-radius:0;object-fit:contain;display:block}
.who span{display:block;font-size:26px;margin-top:6px;font-weight:400}
${css}</style></head><body>${inner}</body></html>`;

const tweet = d => {
  const n = d.text.replace(/\n/g, ' ').length;
  const fs = d.size || (n > 300 ? 42 : n > 200 ? 48 : 54);
  return shell('#0b0f14', '#fff', `
.card{padding:150px 96px 130px;justify-content:center}
.who{margin-bottom:56px}
p{font-size:${fs}px;line-height:1.3;letter-spacing:-.012em;font-weight:400;margin-bottom:${Math.round(fs * .8)}px;text-wrap:pretty}
p:last-child{margin-bottom:0}`,
  `<div class="card">${who(d, '#8b949e')}
${d.text.split('\n').filter(Boolean).map(l => `<p>${esc(l)}</p>`).join('')}</div>`);
};

const prompt = d => {
  const fs = d.size || (d.prompt.length > 420 ? 38 : d.prompt.length > 300 ? 41 : 44);
  return shell(T.greendeep, '#fff', `
.card{padding:92px 84px 76px}
.eyebrow{font-size:25px;font-weight:600;letter-spacing:.17em;text-transform:uppercase;color:${T.greenlight}}
h1{font-size:${d.headlineSize || 70}px;line-height:1.05;font-weight:700;letter-spacing:-.03em;margin-top:${d.eyebrow ? 26 : 0}px;text-wrap:balance}
.q{flex:1;display:flex;flex-direction:column;justify-content:center;gap:26px;padding-bottom:16px;margin-top:36px}
.q p{font-size:${fs}px;line-height:1.4;font-weight:400;color:#fff;border-left:5px solid ${T.greenlight};padding-left:34px;text-wrap:pretty}
.attach{font-size:30px;line-height:1.4;color:#b7c9bf;padding-left:39px;max-width:880px}
.attach b{color:${T.greenlight};font-weight:600}
.who{padding-top:36px;border-top:1px solid #2b5442}
.top{display:flex;justify-content:space-between;align-items:center;margin-bottom:26px}
.files{display:flex;align-items:center;gap:12px;margin-bottom:56px}
.files em{font-style:normal;font-size:19px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#9dbdab;margin-right:14px}
.tools{display:flex;gap:16px;align-items:center}
.tool{display:flex;align-items:center;gap:11px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:8px 20px 8px 9px}
.tool img{width:38px;height:38px;object-fit:contain;border-radius:50%;background:#fff;padding:5px}
.tool i{font-style:normal;font-size:22px;font-weight:500;color:#e6efe9}
.tools em{font-style:normal;font-size:19px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#9dbdab;margin-right:4px}
.tools em.gap{margin-left:18px}
.tool.ft{padding:6px 14px 6px 10px;gap:8px}
.tool.only{padding:0;border:0;background:none}
.tool.only img{width:56px;height:56px;padding:9px;background:#fff;border-radius:50%}
.tool.ft i{font-size:20px}
.cat{font-size:21px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:${T.greenlight};border:1px solid ${T.greenlight};border-radius:999px;padding:14px 24px;line-height:1}
.bottom{display:flex;justify-content:space-between;align-items:center;gap:60px;padding-top:36px;border-top:1px solid #2b5442}
.bottom .who img{width:96px;height:96px}
.bottom .who b{font-size:33px}
.bottom .who span{font-size:24px;margin-top:4px}
.bottom .keep{font-size:23px;gap:12px}
.bottom .who.lockup img{width:auto;height:46px;border-radius:0}
.bottom .who{padding-top:0;border-top:0;flex:0 0 auto}
.bottom .who span,.bottom .keep{white-space:nowrap}
.keep{display:flex;align-items:center;gap:14px;font-size:24px;color:#c2d3c9;font-weight:500}`,
  `<div class="card">
${toolsRow(d)}
${d.eyebrow ? `<div class="eyebrow">${esc(d.eyebrow)}</div>` : ''}
<h1>${hi(d.headline)}</h1>
<div class="q"><p>${esc(d.prompt)}</p>${d.attach ? `<div class="attach"><b>Attach</b> ${esc(d.attach)}</div>` : ''}</div>
<div class="bottom">${who(d, '#9dbdab')}${keepLine(d)}</div></div>`);
};

const figure = d => shell('#0b0f14', '#fff', `
.card{padding:150px 96px 130px;justify-content:center}
.who{margin-bottom:56px}
.fig{font-size:${d.figSize || 260}px;line-height:1;font-weight:700;letter-spacing:-.05em;color:#80be9c}
.fig small{font-size:${Math.round((d.figSize || 260) * .42)}px;color:#fff;font-weight:500;letter-spacing:-.02em;margin-left:18px}
p{font-size:${d.size || 48}px;line-height:1.3;letter-spacing:-.012em;margin-top:44px;max-width:860px;text-wrap:pretty}`,
  `<div class="card">${who(d, '#8b949e')}<div class="fig">${esc(d.figure)}${d.of ? `<small>${esc(d.of)}</small>` : ''}</div><p>${esc(d.text)}</p></div>`);

const table = d => shell(T.greendeep, '#fff', `
.card{padding:72px 84px 64px}
.flow{display:flex;align-items:center;gap:16px;margin-bottom:34px}
.flow svg{flex:none}
.flow .step{display:flex;align-items:center;gap:12px;white-space:nowrap;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:11px 20px;font-size:22px;font-weight:500;color:#e6efe9}
h1{font-size:${d.headlineSize || 48}px;line-height:1.08;font-weight:700;letter-spacing:-.03em;text-wrap:balance;margin-bottom:${d.lede ? 18 : 40}px}
.lede{font-size:34px;line-height:1.35;color:#b7c9bf;max-width:880px;margin-bottom:56px;text-wrap:pretty}
table{width:100%;border-collapse:collapse;font-size:${d.fontSize || 27}px;line-height:1.3;table-layout:fixed}
col.k{width:250px}
th{text-align:left;font-size:20px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#9dbdab;padding:0 0 16px 0;border-bottom:1px solid #4a7a62}
td{padding:${d.rowPad || 26}px 20px ${d.rowPad || 26}px 0;border-bottom:1px solid #2b5442;vertical-align:middle;color:#e6efe9;text-wrap:pretty}
td.k{color:#fff;font-weight:600}
tr:last-child td{border-bottom:0}
td q{quotes:none;color:#e6efe9}
td q small{font-size:22px;color:#9dbdab;margin-left:8px}
td .ns{display:inline-block;background:${T.greenlight};color:${T.greendeep};font-weight:700;border-radius:8px;padding:5px 14px;font-size:24px;letter-spacing:.01em}
.why{display:flex;gap:28px;margin-top:36px}
.why div{flex:1;border-top:2px solid ${T.greenlight};padding-top:14px;font-size:24px;line-height:1.35;color:#e6efe9}
.why b{display:block;color:${T.greenlight};font-weight:700;margin-bottom:6px}
.note{margin-top:auto;padding-top:26px;border-top:1px solid #2b5442;display:flex;justify-content:space-between;align-items:center;gap:40px;font-size:21px;color:#9dbdab}
.note>span{max-width:560px;line-height:1.35}
.note .keep{white-space:nowrap}
.keep{display:flex;align-items:center;gap:14px;font-size:24px;color:#c2d3c9;font-weight:500}`,
  `<div class="card">
${d.flow && d.flow.length ? `<div class="flow">${d.flow.map((f, i) => `${i ? icon('arrow', 26, '#9dbdab') : ''}<span class="step">${icon(f.icon, 26, '#80be9c')}${esc(f.text)}</span>`).join('')}</div>` : ''}
<h1>${hi(d.headline)}</h1>
${d.lede ? `<p class="lede">${hi(d.lede)}</p>` : ''}
<table><colgroup><col class="k">${(d.cols || []).map(() => '<col>').join('')}</colgroup><tr><th></th>${(d.cols || []).map(c => `<th>${esc(c)}</th>`).join('')}</tr>
${(d.rows || []).map(r => `<tr><td class="k">${r.k.startsWith('!') ? `<span class="ns">${esc(r.k.slice(1))}</span>` : esc(r.k)}</td>${r.v.map(v => `<td>${v === 'not stated' || v.startsWith('!') ? `<span class="ns">${esc(v.replace(/^!/, ''))}</span>` : `<q>${esc(v).replace(/\s*\(([^)]+)\)\s*$/, ' <small>$1</small>')}</q>`}</td>`).join('')}</tr>`).join('')}</table>
${d.why ? `<div class="why">${d.why.map(w => `<div><b>${esc(w.b)}</b>${esc(w.t)}</div>`).join('')}</div>` : ''}
<div class="note"><span>${esc(d.note || '')}</span>${keepLine(d)}</div></div>`);


// answer: what comes back when the output is prose, not a table. Labelled blocks or a numbered list.
const answer = d => shell(T.greendeep, '#fff', `
.card{padding:72px 84px 64px}
h1{font-size:${d.headlineSize || 66}px;line-height:1.08;font-weight:700;letter-spacing:-.03em;text-wrap:balance;margin-bottom:${d.lede ? 18 : 48}px}
.lede{font-size:34px;line-height:1.35;color:#b7c9bf;max-width:880px;margin-bottom:${d.ledeGap || 56}px;text-wrap:pretty}
.blocks{display:flex;flex-direction:column;${d.items ? '' : 'flex:1'}}
${d.items ? '' : '.blk{flex:1;display:flex;flex-direction:column;justify-content:center}'}
.blk{padding:${d.blockPad || 30}px 0;border-top:1px solid #2b5442}
.blk:last-child{border-bottom:1px solid #2b5442}
.blk .lab{font-size:20px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${T.greenlight};margin-bottom:12px}
.blk .tx{font-size:${d.textSize || 30}px;line-height:1.36;color:#e6efe9;text-wrap:pretty}
.blk .tx small{font-size:22px;color:#9dbdab;margin-left:8px}
.blk .tx .ns{display:inline-block;background:${T.greenlight};color:${T.greendeep};font-weight:700;border-radius:8px;padding:3px 12px;font-size:22px;vertical-align:2px}
ol{list-style:none;flex:1;display:flex;flex-direction:column}
ol li{flex:1;align-items:center;display:flex;gap:26px;padding:${d.blockPad || 22}px 0;border-top:1px solid #2b5442;font-size:${d.textSize || 29}px;line-height:1.34;color:#e6efe9;text-wrap:pretty}
ol li:last-child{border-bottom:1px solid #2b5442}
ol li b{color:${T.greenlight};font-weight:700;flex:0 0 40px}
ol li small{display:block;font-size:22px;color:#9dbdab;margin-top:6px}
.note{margin-top:auto;padding-top:26px;border-top:1px solid #2b5442;display:flex;justify-content:space-between;align-items:center;gap:40px;font-size:21px;color:#9dbdab}
.note>span{max-width:560px;line-height:1.35}
.note .keep{white-space:nowrap}
.keep{display:flex;align-items:center;gap:14px;font-size:24px;color:#c2d3c9;font-weight:500}`,
  `<div class="card">
<h1>${hi(d.headline)}</h1>
${d.lede ? `<p class="lede">${hi(d.lede)}</p>` : ''}
${d.blocks ? `<div class="blocks">${d.blocks.map(b => `<div class="blk"><div class="lab">${esc(b.label)}</div><div class="tx">${esc(b.text).replace(/\[\[([^\]]+)\]\]/g, '<span class="ns">$1</span>').replace(/\s*\(([^)]+)\)\s*$/, ' <small>$1</small>')}</div></div>`).join('')}</div>` : ''}
${d.items ? `<ol>${d.items.map((it, k) => `<li><b>${k + 1}</b><span>${esc(it.text)}${it.ref ? `<small>${esc(it.ref)}</small>` : ''}</span></li>`).join('')}</ol>` : ''}
<div class="note"><span>${esc(d.note || '')}</span>${keepLine(d)}</div></div>`);

const TEMPLATES = { tweet, prompt, figure, table, answer };
const id = process.argv[2];
if (!id) { console.error('usage: node viren/render.mjs <id>'); process.exit(1); }
const spec = JSON.parse(readFileSync(new URL(`./posts/${id}.json`, import.meta.url)));
const browser = await chromium.launch({ executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--font-render-hinting=none', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
await page.setContent(TEMPLATES[spec.template](spec), { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
mkdirSync(new URL('./out/', import.meta.url), { recursive: true });
const out = new URL(`./out/${id}.png`, import.meta.url).pathname;
await page.screenshot({ path: out, type: 'png' });
await browser.close();
console.log(out);
