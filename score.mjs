#!/usr/bin/env node
/**
 * The scorecard. Joins bank/ledger.csv (what each post was) with bank/metrics.csv (what it
 * did) and prints every cut as a multiple of the page median, then two lists the Sunday
 * batch reads: WRITE MORE and WRITE LESS. Writes the same to bank/scorecard.md.
 *
 *   node score.mjs                 # last 21 days, posts with 48h+ of metrics
 *   node score.mjs --days 60
 *   node score.mjs --min-age 0     # include everything, even yesterday's
 *
 * See docs/24-the-loop.md. Reposts and reach are weighted over reactions on purpose: a page
 * with a handful of followers only grows through posts people forward.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { toObjects } from './lib/csv.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : d; };
const DAYS = Number(arg('--days', 21));
const MIN_AGE_H = Number(arg('--min-age', 48));

const ledger = toObjects(readFileSync('bank/ledger.csv', 'utf8')).recs;
const metrics = existsSync('bank/metrics.csv') ? toObjects(readFileSync('bank/metrics.csv', 'utf8')).recs : [];
const M = Object.fromEntries(metrics.map(m => [m.post_id, m]));

// archetype -> band, so legacy rows without a format column still score by band
const BAND = {
  news: 'wide', contrast: 'wide', 'stat-in-context': 'wide', quote: 'wide', share: 'wide',
  position: 'position',
  'actionable-list': 'monday', guide: 'monday',
  'release-read': 'vendor', roundup: 'vendor', 'policy-note': 'vendor',
  promo: 'ours',
};
const destClass = d => !d || d === 'none' ? 'none'
  : d.startsWith('/insights') ? 'article' : d.startsWith('/industries') ? 'sector'
  : d.startsWith('/resources') ? 'magnet' : d === '/prompts' ? 'prompts' : 'other';
const hourBand = t => { const h = Number(String(t).slice(0, 2)); return h < 11 ? 'morning' : h < 14 ? 'midday' : 'afternoon'; };
const weekday = d => ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date(d + 'T12:00:00').getDay()];

const now = Date.now();
const rows = ledger.map(r => {
  const m = M[r.post_id]; if (!m) return null;
  const when = Date.parse(`${r.date}T${r.time || '12:00:00'}+01:00`);
  if (isNaN(when) || when > now) return null;
  const ageH = (now - when) / 36e5;
  if (ageH < MIN_AGE_H || ageH > DAYS * 24) return null;
  const n = k => Number(String(m[k] || '0').replace(/[^\d.]/g, '')) || 0;
  const imp = n('impressions');
  return {
    ...r, imp, reach: n('reach'), reactions: n('reactions'), comments: n('comments'),
    reposts: n('reposts'), clicks: n('clicks'), er: n('engagement_rate'),
    rpi: imp ? n('reposts') / imp * 1000 : 0,        // reposts per 1,000 impressions
    band: r.band || BAND[r.archetype] || 'other',
    format: r.format || '(legacy)', dest: destClass(r.destination),
    day: weekday(r.date), slot: hourBand(r.time), channel: r.channel || 'page',
  };
}).filter(Boolean);

if (!rows.length) {
  console.log(`scorecard: no posts with metrics in the last ${DAYS} days (min age ${MIN_AGE_H}h). Run the Monday pass to fill bank/metrics.csv.`);
  process.exit(0);
}

const med = a => { const s = [...a].sort((x, y) => x - y); const m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const page = { imp: med(rows.map(r => r.imp)), reach: med(rows.map(r => r.reach)), reactions: med(rows.map(r => r.reactions)),
  comments: med(rows.map(r => r.comments)), reposts: med(rows.map(r => r.reposts)), er: med(rows.map(r => r.er)) };
const x = (v, base) => base ? (v / base).toFixed(1) + 'x' : (v ? '∞' : '0x');

const out = [];
const P = s => out.push(s);
P(`# Scorecard, ${new Date().toISOString().slice(0, 10)}`);
P('');
P(`${rows.length} posts with ${MIN_AGE_H}h+ of metrics in the last ${DAYS} days. Page medians: ${page.imp} impressions, ${page.reach} reach, ${page.reactions} reactions, ${page.comments} comments, ${page.reposts} reposts, ${page.er}% engagement.`);
P('');

const more = [], less = [];
function cut(title, key) {
  const groups = {};
  for (const r of rows) (groups[r[key]] ||= []).push(r);
  P(`## By ${title}`); P('');
  P('| | posts | impressions | reach | reactions | comments | reposts | reposts/1k imp |');
  P('|---|---|---|---|---|---|---|---|');
  for (const [g, rs] of Object.entries(groups).sort((a, b) => med(b[1].map(r => r.imp)) - med(a[1].map(r => r.imp)))) {
    const mi = med(rs.map(r => r.imp)), mr = med(rs.map(r => r.reposts));
    P(`| ${g} | ${rs.length} | ${x(mi, page.imp)} | ${x(med(rs.map(r => r.reach)), page.reach)} | ${x(med(rs.map(r => r.reactions)), page.reactions)} | ${x(med(rs.map(r => r.comments)), page.comments)} | ${x(mr, page.reposts)} | ${med(rs.map(r => r.rpi)).toFixed(1)} |`);
    if (rs.length >= 3 && (key === 'format' || key === 'band' || key === 'hook_type')) {
      if (mi >= 1.5 * page.imp || (page.reposts && mr >= 1.5 * page.reposts)) more.push(`${title}: ${g} (${rs.length} posts, ${x(mi, page.imp)} impressions, ${x(mr, page.reposts)} reposts)`);
      if (mi <= 0.6 * page.imp && mr <= page.reposts) less.push(`${title}: ${g} (${rs.length} posts, ${x(mi, page.imp)} impressions, ${x(mr, page.reposts)} reposts)`);
    }
  }
  P('');
}
cut('format', 'format'); cut('band', 'band'); cut('hook', 'hook_type'); cut('destination', 'dest');
cut('weekday', 'day'); cut('slot', 'slot'); cut('channel', 'channel');

P('## Most forwarded, per 1,000 impressions'); P('');
for (const r of [...rows].sort((a, b) => b.rpi - a.rpi).slice(0, 3)) P(`- ${r.rpi.toFixed(1)}  ${r.date}  ${r.headline}  (${r.format}, ${r.band})`);
P(''); P('## Least forwarded'); P('');
for (const r of [...rows].sort((a, b) => a.rpi - b.rpi).slice(0, 3)) P(`- ${r.rpi.toFixed(1)}  ${r.date}  ${r.headline}  (${r.format}, ${r.band})`);
P('');
P('## WRITE MORE'); P(''); P(more.length ? more.map(s => '- ' + s).join('\n') : '- nothing clears 1.5x with three or more posts yet'); P('');
P('## WRITE LESS'); P(''); P(less.length ? less.map(s => '- ' + s).join('\n') : '- nothing sits below 0.6x with three or more posts yet'); P('');
P('The batch moves one slot a week from WRITE LESS to WRITE MORE, never more (docs/24 section 2). docs/01 and docs/10 are not up for negotiation whatever the numbers say.');

const text = out.join('\n');
console.log(text);
writeFileSync('bank/scorecard.md', text + '\n');
