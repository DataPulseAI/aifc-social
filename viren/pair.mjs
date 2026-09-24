// The two-page document post: prompt card, then what comes back.
// node viren/pair.mjs <out-name> <card-a> <card-b>   reads viren/cards/<id>.png -> viren/cards/<out-name>.pdf
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
const [out, ...ids] = process.argv.slice(2);
if (!out || ids.length < 2) { console.error('usage: node viren/pair.mjs <out-name> <card-a> <card-b> [more]'); process.exit(1); }
const img = id => `data:image/png;base64,${readFileSync(new URL(`./cards/${id}.png`, import.meta.url)).toString('base64')}`;
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@page{size:1080px 1350px;margin:0}*{margin:0;padding:0}
.p{width:1080px;height:1350px;page-break-after:always;overflow:hidden}.p:last-child{page-break-after:auto}
img{display:block;width:1080px;height:1350px}</style></head><body>
${ids.map(id => `<div class="p"><img src="${img(id)}"></div>`).join('')}</body></html>`;
const browser = await chromium.launch({ executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
await page.setContent(html, { waitUntil: 'networkidle' });
const pdf = await page.pdf({ width: '1080px', height: '1350px', printBackground: true, pageRanges: `1-${ids.length}` });
writeFileSync(new URL(`./cards/${out}.pdf`, import.meta.url).pathname, pdf);
await browser.close();
console.log(`${ids.length} pages, viren/cards/${out}.pdf`);
