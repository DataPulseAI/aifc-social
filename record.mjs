#!/usr/bin/env node
/**
 * Close the loop after posts are scheduled.
 *   node record.mjs entries.json
 *
 * entries.json is an array of:
 *   { date, time, headline, source_publisher, source_date, archetype,
 *     hook_type, photo_file, destination, post_id, format, channel }
 *
 * Appends them to bank/ledger.csv and stamps lastUsed on each photo in
 * photos/index.json. Without this step the freshness guard has no memory and
 * lib/photos.mjs keeps picking the same top-scoring photo for similar tags.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const COLS = ['date','time','headline','source_publisher','source_date',
              'archetype','hook_type','photo_file','destination','post_id','format','channel'];
// format: one of the seven in docs/23 section 4 (monday-count, one-task, correction,
// position, week-read, library, story). channel: page or profile. Both added 21 Sep 2026.
const LEDGER = 'bank/ledger.csv';
const INDEX  = 'photos/index.json';

const q = v => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};

const entries = JSON.parse(readFileSync(process.argv[2] || 'entries.json', 'utf8'));
if (!Array.isArray(entries) || !entries.length) { console.error('no entries'); process.exit(1); }

let out = '';
if (!existsSync(LEDGER)) out += COLS.join(',') + '\n';
else if (!readFileSync(LEDGER, 'utf8').endsWith('\n')) out += '\n';
for (const e of entries) out += COLS.map(c => q(e[c])).join(',') + '\n';
writeFileSync(LEDGER, (existsSync(LEDGER) ? readFileSync(LEDGER, 'utf8') : '') + out);

const lib = JSON.parse(readFileSync(INDEX, 'utf8'));
const today = new Date().toISOString().slice(0, 10);
let stamped = 0;
for (const e of entries) {
  if (!e.photo_file) continue;
  const p = lib.photos.find(x => x.file === e.photo_file);
  if (p) { p.lastUsed = today; stamped++; }
  else console.warn(`photo not in index: ${e.photo_file}`);
}
writeFileSync(INDEX, JSON.stringify(lib, null, 1));
console.log(`ledger: +${entries.length} rows. lastUsed stamped on ${stamped} photos.`);
