import { readFileSync, mkdirSync } from 'node:fs';
import { renderCard, close } from '../lib/render.mjs';
const uri = p => 'data:image/jpeg;base64,' + readFileSync(p).toString('base64');
mkdirSync('out/system', { recursive: true });
const specs = [
 { name:'story', template:'story', image: uri('photos/work/datacentre-w2.jpg'), headline:"Google's own AI broke into three real companies during a safety test", eyebrow:'Axios, 19 September 2026', kicker:'The story' },
 { name:'position', template:'position', text:'Stop showing your team AI demos.', kicker:'Thursday' },
 { name:'position2', template:'position', text:'Before you buy another AI licence, count who opened the last one.', kicker:'Thursday', size:80 },
 { name:'count', template:'count', eyebrow:'The Monday count', value:'6 of 8', claim:'tools a 40-person accountancy already pays for have an AI assistant switched on. Two are being used.', source:'Counted by us across Microsoft 365, Xero, Sage, HubSpot, DocuSign, Slack, Zoom and Adobe, 21 September 2026.', kicker:'Monday' },
 { name:'correction', template:'correction', belief:'Copilot is Microsoft’s own AI model.', fact:'Copilot picks a model. It has used OpenAI’s and now Anthropic’s, and from this month you can pick it yourself.', source:'Microsoft 365 Roadmap, read 21 September 2026.', kicker:'Wednesday' },
 { name:'plainlist', template:'plainlist', eyebrow:'The library', headline:'Twelve prompts, grouped by the moment in the week you need them.', kicker:'aiforcompanies.co.uk/prompts', items:[
   {t:'Monday, 9am', sub:'Turn these notes into decisions, owners and dates.'},{t:'Before a client call', sub:'List every question in this document we have not answered.'},{t:'The tender', sub:'Every answer shorter than the question deserves.'},{t:'The board pack', sub:'Owners and dates only, nothing else.'},{t:'Supplier reconciliation', sub:'Two lists that should match. Show me where they do not.'},{t:'A difficult email', sub:'Three versions: shorter, kinder, firmer.'},{t:'Friday, 4pm', sub:'What did we agree this week and what did nobody own?'} ] },
 { name:'roundup', template:'roundup', eyebrow:'The week, read', headline:'Four things changed in the tools you pay for. One needs a decision.', items:[
   {source:'OpenAI', date:'17 Sep', title:'ChatGPT is now a sidebar inside Word', why:'On every plan. The copying and pasting step goes away, and so does the wrong version.'},
   {source:'Google Workspace', date:'18 Sep', title:'Gmail search answers the question instead of listing threads', why:'Paid plans in English. The overview is a start, not a source.'},
   {source:'Microsoft 365 Roadmap', date:'16 Sep', title:'Purview inline protection reaches Edge in November', why:'Run the simulation mode before writing the rule.'},
   {source:'ICO', date:'8 Sep', title:'Eight ways an agent can put you on the wrong side of data law', why:'The one needing a decision. Not legal advice.'} ] },
 { name:'grid', template:'grid', eyebrow:'One task, one hour', headline:'The Monday supplier reconciliation, done with the assistant you already have.', kicker:'Tuesday', items:[
   {title:'Attach both lists', body:'The statement and your ledger export. Nothing else in the chat.'},{title:'Type this', body:'"Show me every line that appears in one and not the other, and every amount that differs."'},{title:'What good looks like', body:'A table you can check in two minutes, not a paragraph.'},{title:'What goes wrong first time', body:'Dates in two formats. Say which is which.'},{title:'Save the prompt', body:'With the moment it is for, or it never gets used again.'},{title:'Next Monday', body:'Same prompt, same files, five minutes.'} ] },
];
for (const s of specs) { await renderCard(s, `out/system/${s.name}.png`); console.log('ok', s.name); }
await close();
