import { readFileSync, writeFileSync } from 'node:fs';
import { toObjects, fromObjects } from '../lib/csv.mjs';
const { head, recs } = toObjects(readFileSync('bank/queue.csv','utf8'));
const rows = JSON.parse(readFileSync('_to_delete/rows.json','utf8'));
const RAW='https://raw.githubusercontent.com/DataPulseAI/aifc-social/main/';
for (const r of rows) {
  if (recs.find(x=>x.id===r.id)) { console.log('exists', r.id); continue; }
  const card = r.asset_type==='document' ? `cards/${r.id}.pdf` : `cards/${r.id}.png`;
  recs.push({ ...Object.fromEntries(head.map(h=>[h,''])), ...r, status:'ready', priority:'2',
    body_file:`bank/posts/${r.id}.md`, card_file:card, card_url:RAW+card, photo_file:'', mentions:'', created:'2026-11-01', post_id:'' });
}
writeFileSync('bank/queue.csv', fromObjects(head, recs));
console.log('rows', recs.length);
