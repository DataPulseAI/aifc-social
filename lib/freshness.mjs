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
// AIFC in the source column means "no external source", not one source overused. Position
// posts (docs/22 section 3) are ours by definition and are exempt; own-material grids,
// guides and promos still count, capped at 3 in 10 (docs/22 section 3).
const sourced = recent.filter(r => r.archetype !== 'position');
for (const [s, n] of over(count(sourced, 'source_publisher'), 2)) {
  if (s === 'AIFC') { if (n > 3) warn.push(`OWN     own-material posts (AIFC, not position) ${n}x in the last 10, limit 3`); continue; }
  warn.push(`SOURCE  "${s}" used ${n}x in the last 10 posts, limit 2`);
}
// docs/22 section 4: the same weekly cap for every assistant vendor, not only Microsoft.
for (const v of ['OpenAI', 'Google', 'Google Workspace Updates', 'Microsoft', 'Microsoft 365 Roadmap']) {
  const n = days(7).filter(r => r.source_publisher === v).length;
  if (n > 1) warn.push(`VENDOR  ${v} sourced ${n} posts in 7 days, limit 1 (docs/22 s4); fold the rest into the weekly roundup`);
}
for (const [h, n] of over(count(recent.slice(-3), 'hook_type'), 2))
  warn.push(`HOOK    "${h}" opened the last ${n} posts in a row, limit 2`);
// The queue can now run weeks deep, so a flat limit of 3 misfires the moment a batch
// lands. Cap any one archetype at a third of the window, with a floor of 3.
const wk = days(7);
const archCap = Math.max(3, Math.ceil(wk.length / 3));
for (const [a, n] of over(count(wk, 'archetype'), archCap))
  warn.push(`FORMAT  "${a}" ran ${n}x in ${wk.length} posts over 7 days, cap ${archCap}`);
for (const [p, n] of over(count(days(21), 'photo_file'), 1))
  warn.push(`PHOTO   "${p}" used ${n}x in 21 days, pick another`);
// docs/16 targets 9 of any 21 posts carrying no link. Judge against the window's size,
// not a fixed count, or a long queue trips it permanently.
const win = days(21);
const linkCap = Math.max(6, Math.round(win.length * 9 / 21));
for (const [d, n] of over(count(win, 'destination'), linkCap))
  warn.push(`LINK    "${d}" used ${n}x in ${win.length} posts over 21 days, cap ${linkCap}, see docs/16`);

console.log(warn.length ? warn.join('\n') : 'freshness: clear');
console.log(`\nledger: ${recs.length} posts, last ${recent.length} checked`);
process.exit(warn.length ? 1 : 0);
