#!/usr/bin/env node
/**
 * Repetition guard. Run before drafting:  node lib/freshness.mjs
 * Reads ledger.csv and reports what is at risk of repeating.
 */
import { readFileSync, existsSync } from 'node:fs';

const LEDGER = process.argv[2] || 'ledger.csv';
if (!existsSync(LEDGER)) { console.log('no ledger yet, nothing to check'); process.exit(0); }

const rows = readFileSync(LEDGER, 'utf8').trim().split('\n');
const head = rows.shift().split(',').map(s => s.trim());
const recs = rows.map(r => Object.fromEntries(head.map((h, i) => [h, (r.split(',')[i] || '').trim()])));
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

console.log(warn.length ? warn.join('\n') : 'freshness: clear');
console.log(`\nledger: ${recs.length} posts, last ${recent.length} checked`);
