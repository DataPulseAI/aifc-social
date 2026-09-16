#!/usr/bin/env node
/**
 * Add photos to the library.
 *
 *   node ingest.mjs manifest.csv
 *
 * CSV columns (header required):
 *   file,subject,tags,licence,attribution,source_url
 *
 * file        path to the image, relative to photos/ or absolute
 * subject     the named person, blank for scenes
 * tags        semicolon separated, e.g. office;meeting;london
 * licence     a key from photos/index.json licences
 * attribution the exact credit string the licence requires
 * source_url  where it came from, so provenance is always provable
 */
import { readFileSync, writeFileSync, existsSync, copyFileSync, mkdirSync } from 'node:fs';
import { basename, join, isAbsolute } from 'node:path';
import sharp from 'sharp';

const csvPath = process.argv[2];
if (!csvPath) { console.error('usage: node ingest.mjs <manifest.csv>'); process.exit(1); }

const idxPath = new URL('./photos/index.json', import.meta.url);
const idx = JSON.parse(readFileSync(idxPath, 'utf8'));

/** RFC4180-ish parser: respects quoted fields containing commas. */
function parseCsvLine(line) {
  const out = []; let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') q = false;
      else cur += c;
    } else if (c === '"') q = true;
    else if (c === ',') { out.push(cur); cur = ''; }
    else cur += c;
  }
  out.push(cur);
  return out.map(s => s.trim());
}

const rows = readFileSync(csvPath, 'utf8').trim().split('\n');
const head = parseCsvLine(rows.shift());
const need = ['file','subject','tags','licence','attribution','source_url'];
for (const c of need) if (!head.includes(c)) { console.error('missing column:', c); process.exit(1); }

let added = 0, skipped = 0;
for (const line of rows) {
  const cells = parseCsvLine(line);
  const r = Object.fromEntries(head.map((h, i) => [h, cells[i] || '']));
  if (!r.file) continue;

  if (!idx.licences[r.licence]) { console.error('SKIP, unknown licence:', r.file, r.licence); skipped++; continue; }
  if (idx.licences[r.licence].needsAttribution && !r.attribution) {
    console.error('SKIP, licence needs attribution and none given:', r.file); skipped++; continue;
  }
  const src = isAbsolute(r.file) ? r.file : join('photos', r.file);
  if (!existsSync(src)) { console.error('SKIP, file not found:', src); skipped++; continue; }

  const bucket = r.subject ? 'people' : (r.tags.includes('london') || r.tags.includes('city') ? 'places' : 'work');
  mkdirSync(join('photos', bucket), { recursive: true });
  const name = basename(src);
  const dest = join('photos', bucket, name);
  if (src !== dest) copyFileSync(src, dest);

  const meta = await sharp(dest).metadata();
  idx.photos = idx.photos.filter(p => p.file !== `${bucket}/${name}`);
  idx.photos.push({
    file: `${bucket}/${name}`,
    subject: r.subject || null,
    tags: r.tags ? r.tags.split(';').map(s => s.trim()).filter(Boolean) : [],
    licence: r.licence,
    attribution: r.attribution || null,
    source_url: r.source_url || null,
    w: meta.width, h: meta.height,
    added: new Date().toISOString().slice(0, 10),
    lastUsed: null,
  });
  added++;
}
writeFileSync(idxPath, JSON.stringify(idx, null, 2));
console.log(`added ${added}, skipped ${skipped}, library now ${idx.photos.length} photos`);
