import { backdrop } from './lib/backdrop.mjs';
import { renderCard, close } from './lib/render.mjs';
import { readFileSync, writeFileSync } from 'node:fs';
const uri = p => 'data:image/jpeg;base64,' + readFileSync(p).toString('base64');

const DAY = [
{ slot:'07:45', band:'Wide', size:80, tone:'ink',
  headline:'A DeepMind researcher just quit, saying AI could kill us all',
  copy:`Imagine a pharmaceutical company spends four years telling everyone its new drug will cure every disease.

The evidence is thin and the questions keep coming, but nothing slows the push. Then, days before launch, the company announces the medicine may also be a poison, and that for everyone's safety the whole field should slow down.

That is roughly where the AI industry has arrived this month.

Bilal Chughtai, until recently a researcher at Google DeepMind, said he left the lab because AI "has the potential to kill us all" and humanity "might be running out of time to avoid this outcome". He follows Jacob Coxon, formerly of Anthropic and OpenAI, whose resignation post argued that people inside these companies privately fear the same thing.

Others have pushed back hard. Mark Cuban says the public backlash to AI is a bigger risk than any apocalypse. David Sacks and Lina Khan, who agree on almost nothing, both say we already have product liability law for dangerous products.

If you run a company, none of this changes what you do on Monday. But it is going to reach your team, and someone will ask you about it. Worth having read the actual statements rather than the headlines about them.

Read more on Business Insider: businessinsider.com

(Credit: placeholder, see photo library)

#ai #aisafety #technology` },

{ slot:'12:15', band:'Wide', size:82, tone:'forest',
  headline:'This CEO says no to 80% of her email, and takes two hour lunches',
  copy:`Julie Chapon runs Yuka, the food scanning app used by tens of millions of people. She is 39, she co-founded it in France about ten years ago, and she does not like her day to be too defined.

She used to work at a consultancy where she had no say in what she did. When she started Yuka she thought, in her words, "OK, now no one's going to tell me what I have to do."

Three things she has settled on since:

She says no, politely, to around 80% of the email she receives. Yuka has a yearly roadmap she owns, and as she puts it, if she spends her time on other things she cannot deliver it.

She used to talk herself out of opportunities because she did not feel like the right person for them, even when she was. Now she acts first, and finds the legitimacy arrives afterwards.

And she does not compare herself to other founders, which in an industry built on public scoreboards is the least discussed discipline of the three.

Not every business can be run this way. But the 80% number is worth sitting with, because most of us have never actually counted.

Read more on Business Insider: businessinsider.com

(Credit: placeholder, see photo library)

#leadership #founders #productivity` },

{ slot:'17:15', band:'Useful', size:78, tone:'slate',
  headline:'Microsoft shipped 11 Copilot changes this fortnight. Three matter.',
  copy:`Most Copilot release notes are for administrators. Every so often something lands that changes what your team can actually do, and it goes out with no more fanfare than the rest.

Three from the latest batch worth two minutes of your time:

Agent Mode in Excel and PowerPoint now edits the file you have open rather than handing you text to paste. That is the difference between a demo and a tool.

Copilot Notebooks let you group the files and chats for one project so context stops resetting every morning. If your team has complained that Copilot forgets everything, this is the answer.

And the roadmap shows tenant level controls arriving for which connectors staff can use. Worth knowing before somebody asks you about data policy rather than after.

The rest of the batch is genuinely administrative and you can skip it.

If you want the full list, it is in the Microsoft 365 Copilot release notes, published 25 August.

Which of the three would actually change something at your place?

#copilot #microsoft365 #ai` },
];

for (const [i,p] of DAY.entries()) {
  await backdrop(p.headline, `out/wd-${i}.jpg`, 1080,1350, p.tone);
  await renderCard({template:'news', image:uri(`out/wd-${i}.jpg`), headline:p.headline, size:p.size},
                   `out/wide/${i+1}-${p.slot.replace(':','')}.png`);
}
await close();
writeFileSync('out/wide/copy.json', JSON.stringify(DAY,null,2));
console.log(DAY.map(p=>`${p.slot} ${p.band.padEnd(7)} ${p.copy.length} chars | hook ${p.copy.split('\n')[0].length} chars`).join('\n'));
