import { PDFDocument } from 'pdf-lib';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

/** Combine rendered slide PNGs into the single PDF LinkedIn renders as a carousel. */
export async function slidesToPdf(dir, outPath) {
  const files = readdirSync(dir).filter(f => f.endsWith('.png')).sort();
  const pdf = await PDFDocument.create();
  for (const f of files) {
    const png = await pdf.embedPng(readFileSync(`${dir}/${f}`));
    const page = pdf.addPage([1080, 1350]);
    page.drawImage(png, { x: 0, y: 0, width: 1080, height: 1350 });
  }
  writeFileSync(outPath, await pdf.save());
  return { path: outPath, pages: files.length };
}
