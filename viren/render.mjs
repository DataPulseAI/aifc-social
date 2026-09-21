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
const avatar = readFileSync(new URL('./assets/viren-circle.png', import.meta.url)).toString('base64');
const TICK = `<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path fill="#1d9bf0" d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"/></svg>`;

const who = (d, mute) => `<div class="who"><img src="data:image/png;base64,${avatar}"><div><b>${esc(d.name || 'Viren Samani')} ${TICK}</b><span style="color:${mute}">${esc(d.tagline || 'Founder, Convu and AI for Companies')}</span></div></div>`;

const shell = (bg, fg, css, inner) => `<!doctype html><html><head><meta charset="utf-8"><style>${FONT_CSS}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1080px;height:1350px;background:${bg};color:${fg};font-family:'Instrument Sans';-webkit-font-smoothing:antialiased}
.card{height:100%;display:flex;flex-direction:column}
.who{display:flex;align-items:center;gap:24px}
.who img{width:112px;height:112px;border-radius:50%;object-fit:cover}
.who b{display:flex;align-items:center;gap:10px;font-size:37px;font-weight:600;letter-spacing:-.015em}
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
  const fs = d.size || (d.prompt.length > 420 ? 40 : d.prompt.length > 300 ? 44 : 48);
  return shell(T.greendeep, '#fff', `
.card{padding:92px 84px 76px}
.eyebrow{font-size:25px;font-weight:600;letter-spacing:.17em;text-transform:uppercase;color:${T.greenlight}}
h1{font-size:64px;line-height:1.04;font-weight:700;letter-spacing:-.032em;margin-top:26px;text-wrap:balance}
.q{flex:1;display:flex;align-items:center}
.q p{font-size:${fs}px;line-height:1.33;font-weight:400;color:#fff;border-left:5px solid ${T.greenlight};padding-left:34px;text-wrap:pretty}
.attach{font-size:27px;line-height:1.4;color:#9dbdab;padding-bottom:40px;max-width:840px}
.attach b{color:${T.greenlight};font-weight:600}
.who{padding-top:36px;border-top:1px solid #2b5442}`,
  `<div class="card">
<div class="eyebrow">${esc(d.eyebrow || '')}</div>
<h1>${esc(d.headline)}</h1>
<div class="q"><p>${esc(d.prompt)}</p></div>
${d.attach ? `<div class="attach"><b>Attach</b> ${esc(d.attach)}</div>` : ''}
${who(d, '#9dbdab')}</div>`);
};

const TEMPLATES = { tweet, prompt };
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
