// Viren's profile cards. node viren/render.mjs <post-id>   (reads viren/posts/<id>.json)
import { chromium } from 'playwright';
import { FONT_CSS } from '../lib/fonts.mjs';
import { readFileSync, mkdirSync } from 'node:fs';

const B = JSON.parse(readFileSync(new URL('./brand.json', import.meta.url)));
const T = B.tokens;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

const base = `
${FONT_CSS}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1080px;height:1350px;background:${T.paper};color:${T.ink};font-family:'Instrument Sans';-webkit-font-smoothing:antialiased}
.card{height:100%;padding:76px 72px 64px;display:flex;flex-direction:column}
.kick{font-size:22px;font-weight:600;color:${T.accent};letter-spacing:.02em;margin-bottom:22px}
h1{font-weight:700;font-size:64px;line-height:1.02;letter-spacing:-.03em;color:${T.ink};text-wrap:balance}
h1 .s{font-family:'Newsreader';font-weight:500;font-style:normal;letter-spacing:-.01em}
.sign{margin-top:auto;padding-top:26px;border-top:2px solid ${T.ink};display:flex;justify-content:space-between;align-items:baseline}
.sign b{font-size:26px;font-weight:700;letter-spacing:-.02em}
.sign span{font-size:20px;color:${T.mute};font-weight:500}
`;

// then/now: rows of {then, now}. The old way struck through, the prompt beside it.
const thennow = d => {
  const n = d.rows.length;
  const fs = n > 6 ? 27 : n > 5 ? 29 : 31;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${base}
.rows{margin-top:44px;border-top:1px solid ${T.rule}}
.row{display:grid;grid-template-columns:1fr 1fr;gap:0 40px;padding:${n > 6 ? 18 : 22}px 0;border-bottom:1px solid ${T.rule}}
.then{font-size:${fs}px;line-height:1.25;color:${T.ink2};font-weight:500;text-decoration:line-through;text-decoration-color:${T.accent};text-decoration-thickness:2px}
.now{font-size:${fs}px;line-height:1.25;color:${T.ink};font-weight:500}
.now q{quotes:'\\201C' '\\201D';color:${T.ink}}
.hdr{display:grid;grid-template-columns:1fr 1fr;gap:0 40px;padding:0 0 12px;font-size:18px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${T.mute}}
.hdr span:last-child{color:${T.accent}}
</style></head><body><div class="card">
${d.kick ? `<div class="kick">${esc(d.kick)}</div>` : ''}
<h1>${d.headline}</h1>
<div class="rows"><div class="hdr" style="margin-top:14px"><span>${esc(d.thenLabel || 'The job, done by hand')}</span><span>${esc(d.nowLabel || 'What you type now')}</span></div>
${d.rows.map(r => `<div class="row"><div class="then">${esc(r.then)}</div><div class="now"><q>${esc(r.now)}</q></div></div>`).join('')}</div>
<div class="sign"><b>${esc(d.name || 'Viren Samani')}</b><span>${esc(d.sig || 'ex JP Morgan · founder, AI for Companies')}</span></div>
</div></body></html>`;
};


// file: the real file, shown as a file. Dark editor, mono, the filename as the only chrome.
// lines: array of strings; markdown-ish colouring: '# ' and '## ' headings, '- ' bullets, quoted strings.
const file = d => {
  const n = d.lines.length;
  const fs = d.size || (n > 34 ? 22 : n > 28 ? 24 : 26);
  const colour = l => {
    const e = esc(l);
    if (/^# /.test(l)) return `<span class="h1">${e}</span>`;
    if (/^## /.test(l)) return `<span class="h2">${e}</span>`;
    if (/^- /.test(l)) return `<span class="b">-</span> ${e.slice(2).replace(/&quot;([^&]*)&quot;|"([^"]*)"/g, m => `<span class="s">${m}</span>`)}`;
    return e.replace(/"([^"]*)"/g, m => `<span class="s">${m}</span>`);
  };
  return `<!doctype html><html><head><meta charset="utf-8"><style>${FONT_CSS}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1080px;height:1350px;background:${d.bg || '#0f1115'};font-family:'JetBrains Mono';-webkit-font-smoothing:antialiased;padding:56px 52px}
.win{height:100%;background:#161a20;border:1px solid #262b33;border-radius:18px;overflow:hidden;display:flex;flex-direction:column}
.bar{display:flex;align-items:center;gap:10px;padding:20px 24px;border-bottom:1px solid #262b33;background:#1b2027}
.dot{width:14px;height:14px;border-radius:50%;background:#2e343d}
.tab{margin-left:18px;font-size:21px;color:#c9d1d9;font-weight:500}
.tab span{color:#6b7480;margin-left:14px;font-weight:400}
pre{flex:1;padding:34px 36px 36px;font-size:${fs}px;line-height:1.46;color:#c9d1d9;white-space:pre-wrap;font-family:inherit}
.h1{color:#ffffff;font-weight:500}
.h2{color:${d.accent || '#f0a35e'};font-weight:500}
.b{color:#5a6472}
.s{color:#9ecbff}
.c{color:#6b7480}
</style></head><body><div class="win">
<div class="bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><div class="tab">${esc(d.filename)}${d.path ? `<span>${esc(d.path)}</span>` : ''}</div></div>
<pre>${d.lines.map(colour).join('\n')}</pre>
</div></body></html>`;
};


// tweet: the conventional card. Dark ground, avatar, name and handle, two or three short sentences in white.
const tweet = d => {
  const avatar = readFileSync(new URL('./assets/viren-circle.png', import.meta.url)).toString('base64');
  const n = d.text.replace(/\n/g,' ').length;
  const fs = d.size || (n > 260 ? 44 : n > 180 ? 50 : 56);
  const bg = d.light ? '#ffffff' : '#000000', fg = d.light ? '#111311' : '#ffffff', mute = d.light ? '#6b6f6a' : '#8a8e88';
  return `<!doctype html><html><head><meta charset="utf-8"><style>${FONT_CSS}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1080px;height:1350px;background:${bg};color:${fg};font-family:'Instrument Sans';-webkit-font-smoothing:antialiased}
.card{height:100%;padding:150px 110px 120px;display:flex;flex-direction:column;justify-content:center}
.who{display:flex;align-items:center;gap:22px;margin-bottom:54px}
.who img{width:104px;height:104px;border-radius:50%;object-fit:cover}
.who b{display:block;font-size:34px;font-weight:600;letter-spacing:-.01em}
.who span{display:block;font-size:26px;color:${mute};margin-top:4px}
p{font-size:${fs}px;line-height:1.28;letter-spacing:-.015em;font-weight:500;margin-bottom:${Math.round(fs*.75)}px;text-wrap:pretty}
p:last-child{margin-bottom:0}
</style></head><body><div class="card">
<div class="who"><img src="data:image/png;base64,${avatar}"><div><b>${esc(d.name || 'Viren Samani')}</b><span>${esc(d.handle || 'linkedin.com/in/viren-samani')}</span></div></div>
${d.text.split('\n').filter(Boolean).map(l => `<p>${esc(l)}</p>`).join('')}
</div></body></html>`;
};

const TEMPLATES = { thennow, file, tweet };

const id = process.argv[2];
if (!id) { console.error('usage: node viren/render.mjs <post-id>'); process.exit(1); }
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
