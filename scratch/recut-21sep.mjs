import { readFileSync } from 'node:fs';
import { renderCard, close } from '../lib/render.mjs';
const uri = p => 'data:image/jpeg;base64,' + readFileSync(p).toString('base64');
const jobs = [
  ['cards/2026-09-23-stop-demos-position.png', 'Stop showing your team AI demos', 'photos/work/whiteboard-w1.jpg', 88],
  ['cards/2026-09-25-count-who-opened-position.png', 'Before you buy another AI licence, count who opened the last one', 'photos/work/laptop-desk-w2.jpg', 78],
  ['cards/2026-09-24-chatgpt-tracking-wide.png', 'Free ChatGPT accounts are tracked on 1,000 other websites, says a researcher', 'photos/work/phone-hand-w1.jpg', 74],
  ['cards/2026-09-22-gemini-real-companies.png', "Google's own AI broke into three real companies during a safety test", 'photos/work/datacentre-w2.jpg', 84],
];
for (const [out, headline, photo, size] of jobs) {
  await renderCard({ template: 'news', image: uri(photo), headline, size, focus: '50% 30%' }, out);
  console.log('rendered', out);
}
await close();
