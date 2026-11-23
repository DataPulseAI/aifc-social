import { readFileSync, writeFileSync } from 'node:fs';
import { toObjects } from './lib/csv.mjs';
const sent = [
['2026-10-20-job-advert-from-notes','6adff0ca0565644c9481ae30','2026-10-27','08:09:22'],
['2026-10-20-phrases-we-say','6adff0d03bff354cec6a016b','2026-10-27','16:13:23'],
['2026-10-21-site-notes-to-quote','6adff0d25837b0fb9bfb42f9','2026-10-28','07:43:22'],
['2026-10-21-skills-not-tools','6adff0d714a7789a82fa6fc6','2026-10-28','12:52:24'],
['2026-10-22-price-rise-letter','6adff0db3bff354cec6a0395','2026-10-29','08:18:22'],
['2026-10-22-phone-call-agreed','6adff0def266a5f7e10681e3','2026-10-29','16:38:25'],
['2026-10-30-lock-talk-ask','6adff0e43bff354cec6a05b5','2026-10-30','07:51:23'],
['2026-10-23-five-things-training','6adff0e85837b0fb9bfb4823','2026-10-30','12:26:22']];
const { recs } = toObjects(readFileSync('bank/queue.csv','utf8'));
const by = Object.fromEntries(recs.map(r=>[r.id,r]));
const out = sent.map(([id,pid,d,t])=>{ const r=by[id]; if(!r) throw new Error('missing '+id);
 return {date:d,time:t,headline:r.headline,source_publisher:r.source_publisher,source_date:r.source_date,archetype:r.archetype,hook_type:r.hook_type,photo_file:r.photo_file,destination:r.destination,post_id:pid,format:r.type,channel:'page'};});
writeFileSync(process.env.HOME+'/entries.json', JSON.stringify(out,null,1));
for (const id of ['2026-10-19-estate-agent-five-jobs','2026-10-19-who-to-hand-it-to']) console.log(id, by[id]?.status, by[id]?.archetype);
console.log(out.map(o=>o.archetype+' | '+o.format+' | '+o.headline).join('\n'));
