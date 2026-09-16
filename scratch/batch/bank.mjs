import { posts } from './posts.mjs';
import { posts2 } from './posts2.mjs';
import { carousel } from './carousel.mjs';
import { toObjects, fromObjects } from '../../lib/csv.mjs';
import { firstComments } from './schedule.mjs';
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs';

const OUT = 'scratch/batch/out';
const photos = JSON.parse(readFileSync(`${OUT}/photos.json`, 'utf8'));
const RAW = 'https://raw.githubusercontent.com/DataPulseAI/aifc-social/main/cards/';
const all = [...posts, ...posts2, carousel];
mkdirSync('bank/posts', { recursive: true });
mkdirSync('cards', { recursive: true });

const rows = [];
for (const p of all) {
  const isDoc = p.type === 'carousel';
  const ext = isDoc ? 'pdf' : 'png';
  copyFileSync(`${OUT}/${p.id}.${ext}`, `cards/${p.id}.${ext}`);
  writeFileSync(`bank/posts/${p.id}.md`, p.body.trimEnd() + '\n');
  rows.push({
    id: p.id, status: 'ready', type: p.type, priority: String(p.priority ?? 0),
    headline: p.headline, body_file: `bank/posts/${p.id}.md`,
    card_file: `cards/${p.id}.${ext}`, card_url: RAW + `${p.id}.${ext}`,
    asset_type: isDoc ? 'document' : 'image', doc_title: isDoc ? p.doc_title : '',
    source_publisher: p.source_publisher, source_date: p.source_date, source_url: p.source_url || '',
    archetype: p.archetype, hook_type: p.hook_type,
    photo_file: photos[p.id]?.photo || '', destination: p.destination,
    mentions: '', first_comment: firstComments[p.id] || '', notes: `Alt text: ${p.alt}`, created: '2026-09-16', post_id: '',
  });
}
if (carousel) {
  // the carousel thumbnail LinkedIn shows under the document is slide 1
  copyFileSync(`${OUT}/slides/01.png`, `cards/${carousel.id}-thumb.png`);
  const r = rows.find(x => x.id === carousel.id);
  r.notes = `Thumbnail cards/${carousel.id}-thumb.png . Caption: ${carousel.caption.split('\n')[0]} . ${r.notes}`;
}

const text = readFileSync('bank/queue.csv', 'utf8');
const { head, recs: existing } = toObjects(text);
for (const r of existing) if (!r.first_comment && firstComments[r.id]) r.first_comment = firstComments[r.id];
const ids = new Set(existing.map(r => r.id));
const add = rows.filter(r => !ids.has(r.id));
writeFileSync('bank/queue.csv', fromObjects(head, [...existing, ...add]));
console.log('banked', add.length, 'new rows; bank now', existing.length + add.length);
