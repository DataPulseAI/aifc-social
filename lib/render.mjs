import { chromium } from 'playwright';
import { TEMPLATES } from './templates.mjs';
import { mkdirSync } from 'node:fs';
import { clean } from './clean.mjs';
import { dirname } from 'node:path';

let browser;
export async function getBrowser() {
  if (!browser) browser = await chromium.launch({ executablePath: process.env.PW_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--font-render-hinting=none','--no-sandbox'] });
  return browser;
}

/** render one card spec -> png path */
export async function renderCard(spec, outPath) {
  const b = await getBrowser();
  const page = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  const html = TEMPLATES[spec.template](spec);
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  mkdirSync(dirname(outPath), { recursive: true });
  await page.screenshot({ path: outPath, type: 'png' });
  await page.close();
  await clean(outPath);
  return outPath;
}

export async function renderAll(specs, dir) {
  const out = [];
  for (const [i, s] of specs.entries()) {
    out.push(await renderCard(s, `${dir}/${s.name || String(i + 1).padStart(2, '0')}.png`));
  }
  return out;
}
export async function close() { if (browser) { await browser.close(); browser = null; } }
