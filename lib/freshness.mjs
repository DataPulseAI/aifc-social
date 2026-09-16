#!/usr/bin/env node
/**
 * Repetition guard. Run before drafting:  node lib/freshness.mjs bank/ledger.csv
 * Reads the ledger and reports what is at risk of repeating.
 * Exits 1 if anything trips, so a run can gate on it.
 */
import { readFileSync, existsSync } from 'node:fs';

const LEDGER = process.argv[2] || 'bank/ledger.csv';
if (!existsSync(LEDGER)) { console.log('no ledger yet, nothing to check'); process.exit(0); }

/** RFC4180 parse. Headlines contain commas, so a naive split corrupts every row. */
function parseCsv(text) {
  const rows = []; let row = [], field = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') q = false;
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows.filter(r => r.some(c => c !== ''));
}

const rows = parseCsv(readFileSync(LEDGER, 'utf8'));
const head = rows.shift().map(s => s.trim());
const recs = rows.map(r => Object.fromEntries(head.map((h, i) => [h, (r[i] || '').trim()])));
const recent = recs.slice(-10);
const days = n => recs.filter(r => (Date.now() - Date.parse(r.date)) / 86400000 <= n);

const count = (arr, key) => arr.reduce((m, r) => (r[key] ? (m[r[key]] = (m[r[key]] || 0) + 1, m) : m), {});
const over = (obj, n) => Object.entries(obj).filter(([, v]) => v > n);

const warn = [];
for (const [s, n] of over(count(recent, 'source_publisher'), 2))
  warn.push(`SOURCE  "${s}" used ${n}x in the last 10 posts, limit 2`);
for (const [h, n] of over(count(recent.slice(-3), 'hook_type'), 2))
  warn.push(`HOOK    "${h}" opened the last ${n} posts in a row, limit 2`);
for (const [a, n] of over(count(days(7), 'archetype'), 3))
  warn.push(`FORMAT  "${a}" ran ${n}x in 7 days, consider varying`);
for (const [p, n] of over(count(days(21), 'photo_file'), 1))
  warn.push(`PHOTO   "${p}" used ${n}x in 21 days, pick another`);
for (const [d, n] of over(count(days(21), 'destination'), 6))
  warn.push(`LINK    "${d}" used ${n}x in 21 days, check the rotation in docs/16`);

console.log(warn.length ? warn.join('\n') : 'freshness: clear');
console.log(`\nledger: ${recs.length} posts, last ${recent.length} checked`);
process.exit(warn.length ? 1 : 0);
