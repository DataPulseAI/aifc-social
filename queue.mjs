#!/usr/bin/env node
/**
 * The bank. Posts are written, rendered and banked in a weekly batch, then drained
 * into Buffer a few at a time. See docs/18-post-types-and-tools.md.
 *
 *   node queue.mjs stats
 *   node queue.mjs next 7 [--exclude id1,id2] [--type news]
 *   node queue.mjs mark <id> <status> [post_id]
 *   node queue.mjs validate
 *
 * `next` returns JSON, newest-eligible-first by priority then oldest created, and
 * spaces the result so no two consecutive items share a source, a photo or a
 * destination. It never returns an item whose card URL is blank.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { toObjects, fromObjects } from './lib/csv.mjs';

const FILE = process.env.QUEUE || 'bank/queue.csv';
export const HEAD = ['id','status','type','priority','headline','body_file','card_file','card_url',
  'asset_type','doc_title','source_publisher','source_date','source_url','archetype','hook_type',
  'photo_file','destination','mentions','first_comment','notes','created','post_id'];

const load = () => {
  if (!existsSync(FILE)) return { head: HEAD, recs: [] };
  const { head, recs } = toObjects(readFileSync(FILE, 'utf8'));
  return { head: head.length ? head : HEAD, recs };
};
const save = (head, recs) => writeFileSync(FILE, fromObjects(head, recs));

const cmd = process.argv[2];

if (cmd === 'stats') {
  const { recs } = load();
  const by = k => recs.reduce((m, r) => (m[r[k] || 'blank'] = (m[r[k] || 'blank'] || 0) + 1, m), {});
  console.log('total', recs.length);
  console.log('status', by('status'));
  console.log('type  ', by('type'));
  const ready = recs.filter(r => r.status === 'ready');
  console.log('ready ', ready.length, ready.length < 6 ? '  <-- top the bank up' : '');

} else if (cmd === 'next') {
  const n = Number(process.argv[3] || 3);
  const args = process.argv.slice(4);
  const ex = new Set((args[args.indexOf('--exclude') + 1] || '').split(',').filter(Boolean));
  const type = args.includes('--type') ? args[args.indexOf('--type') + 1] : null;
  const { recs } = load();
  let pool = recs.filter(r => r.status === 'ready' && !ex.has(r.id) && r.card_url);
  if (type) pool = pool.filter(r => r.type === type);
  pool.sort((a, b) => (Number(b.priority || 0) - Number(a.priority || 0)) ||
                      String(a.created).localeCompare(String(b.created)));
  const out = [];
  const clash = (a, b) => a && b && a === b;
  while (out.length < n && pool.length) {
    const last = out[out.length - 1];
    let i = pool.findIndex(c => !last || (!clash(c.source_publisher, last.source_publisher) &&
                                          !clash(c.photo_file, last.photo_file) &&
                                          !clash(c.destination, last.destination) &&
                                          !clash(c.hook_type, last.hook_type)));
    if (i === -1) i = 0;                       // spacing is a preference, not a blocker
    out.push(pool.splice(i, 1)[0]);
  }
  console.log(JSON.stringify(out, null, 1));

} else if (cmd === 'mark') {
  const [, , , id, status, postId] = process.argv;
  const ok = ['ready','queued','posted','held','dropped'];
  if (!ok.includes(status)) { console.error(`status must be one of ${ok.join(', ')}`); process.exit(1); }
  const { head, recs } = load();
  const r = recs.find(x => x.id === id);
  if (!r) { console.error(`no such id: ${id}`); process.exit(1); }
  r.status = status;
  if (postId) r.post_id = postId;
  save(head, recs);
  console.log(`${id} -> ${status}${postId ? ` (${postId})` : ''}`);

} else if (cmd === 'validate') {
  const { recs } = load();
  const bad = [];
  const seen = new Set();
  for (const r of recs) {
    if (!r.id) bad.push('row with no id');
    if (seen.has(r.id)) bad.push(`duplicate id ${r.id}`);
    seen.add(r.id);
    if (r.status === 'ready') {
      if (!r.card_url) bad.push(`${r.id}: ready but no card_url`);
      if (!r.body_file || !existsSync(r.body_file)) bad.push(`${r.id}: body_file missing (${r.body_file})`);
      if (!r.source_publisher) bad.push(`${r.id}: ready but no source_publisher`);
      if (r.asset_type === 'document' && !r.doc_title) bad.push(`${r.id}: document needs doc_title`);
    }
  }
  console.log(bad.length ? bad.join('\n') : `validate: clean, ${recs.length} rows`);
  process.exit(bad.length ? 1 : 0);

} else {
  console.log(readFileSync(new URL(import.meta.url)).toString().split('*/')[0].split('/**')[1].trim());
}
