import { renderCard, close } from '../lib/render.mjs';
const of=6;
await renderCard({template:'cover', of, eyebrow:'A carousel', title:'What to say when a client asks if you used AI', sub:'Six pages, four facts, one sentence you can use tomorrow.'}, 'out/system/c1.png');
await renderCard({template:'tips', n:2, of, eyebrow:'First, the facts', title:'What the client is actually asking', items:['Whether their data left your building','Whether a person checked the work','Whether the price reflects the hours','Whether you would say so unprompted']}, 'out/system/c2.png');
await renderCard({template:'slide', kind:'body', n:3, of, eyebrow:'The sentence', title:'"Yes. On the first draft, checked line by line by the person whose name is on it."', text:'Say it before they ask and the question stops being awkward.'}, 'out/system/c3.png');
await renderCard({template:'outro', n:6, of, title:'The one-page policy that answers this in writing.', sub:'Seven clauses, four decisions, free.', url:'aiforcompanies.co.uk/resources/ai-policy'}, 'out/system/c6.png');
await close();
