import { readFileSync } from 'node:fs';
import { renderCard, close } from '../lib/render.mjs';
const uri = p => 'data:image/jpeg;base64,' + readFileSync(p).toString('base64');
await renderCard({template:'position', text:'Stop showing your team AI demos.', kicker:'Our position'}, 'cards/2026-09-23-stop-demos-position.png');
await renderCard({template:'position', text:'Before you buy another AI licence, count who opened the last one.', kicker:'Our position', size:92}, 'cards/2026-09-25-count-who-opened-position.png');
await renderCard({template:'story', image:uri('photos/work/phone-hand-w1.jpg'), headline:'Free ChatGPT accounts are tracked on 1,000 other websites, says a researcher', eyebrow:'One analysis, 20 September 2026', kicker:'The story', size:66}, 'cards/2026-09-24-chatgpt-tracking-wide.png');
await renderCard({template:'story', image:uri('photos/work/datacentre-w2.jpg'), headline:"Google's own AI broke into three real companies during a safety test", eyebrow:'Axios, 19 September 2026', kicker:'The story'}, 'cards/2026-09-22-gemini-real-companies.png');
await close();
