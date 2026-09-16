/* The running order. Horizons from docs/19: news 3 days, roundup and share 5,
   evergreen 3 weeks. Every slot inside three days was already taken by the daily
   runs, so the two genuinely time-decaying news posts take the earliest slots and
   the rest, which are calendared statistics and policy reads, sit behind them.
   Sources spaced so none appears more than twice in any ten, hook shapes so none
   runs three consecutive, and every day carries three different types. */
export const order = [
  ['2026-09-21','17:15','2026-09-22-agent-audit-40m'],
  ['2026-09-22','07:45','2026-09-22-thinking-mode'],
  ['2026-09-22','12:15','2026-09-30-client-asks-ai-carousel'],
  ['2026-09-22','17:15','2026-09-25-stop-pasting-grid'],
  ['2026-09-23','07:45','2026-09-23-entry-level-hiring'],
  ['2026-09-23','12:15','2026-09-28-tools-roundup'],
  ['2026-09-23','17:15','2026-10-01-week-four-promo'],
  ['2026-09-24','07:45','2026-09-24-construction-13'],
  ['2026-09-24','12:15','2026-09-22-sme-barriers-grid'],
  ['2026-09-24','17:15','2026-09-23-waste-25-percent'],
  ['2026-09-25','07:45','2026-09-24-edge-dlp-november'],
  ['2026-09-25','12:15','2026-09-29-ncsc-agent-guide'],
  ['2026-09-25','17:15','2026-09-23-six-jobs-grid'],
  ['2026-09-28','07:45','2026-09-25-ico-eight-risks'],
  ['2026-09-28','12:15','2026-10-01-uk-guidance-roundup'],
  ['2026-09-28','17:15','2026-09-30-what-firms-use-grid'],
  ['2026-09-29','07:45','2026-10-02-ncsc-free-advice'],
  ['2026-09-29','12:15','2026-09-26-five-prompts-promo'],
];

/* First comments. docs/21: an extension, never a link. The next action, a caveat,
   or a question only a real reader can answer. */
export const firstComments = {
  '2026-09-22-agent-audit-40m': 'The cheap version of this for a small firm: write down, in one line each, the three things your assistant must never do without a person seeing it first. That is your audit.',
  '2026-09-22-thinking-mode': 'Our split, if it helps as a starting point: Thinking for anything with a number in it, anything going to a client, and anything where being wrong is expensive. Instant for everything else.',
  '2026-09-30-client-asks-ai-carousel': 'The four facts are the whole thing. If your firm cannot answer them today, that is the afternoon of work, not the policy document.',
  '2026-09-25-stop-pasting-grid': 'The list is only half the job. The other half is naming the approved tool in the same sentence, because a prohibition with no alternative is a slower route to the same paste.',
  '2026-09-23-entry-level-hiring': 'Worth saying plainly: this is a snapshot of job adverts, not of employment. It tells you what employers advertised for, which moves faster than what they actually did.',
  '2026-09-28-tools-roundup': 'Of the four, the OpenAI sharing change is the one to look at this week. Workspace-wide means everyone in the workspace, including whoever joined on Monday.',
  '2026-10-01-week-four-promo': 'Which of the three would be hardest to answer at your place right now? Usually it is the second one, and that answer is the useful one.',
  '2026-09-24-construction-13': 'Not a criticism of construction. The 58% industry is one where the work is already text and data. The gap is about what the job looks like, not about who is behind.',
  '2026-09-22-sme-barriers-grid': 'The barriers people name and the barriers that actually stop them are rarely the same list. Cost gets named because it is the respectable answer.',
  '2026-09-23-waste-25-percent': 'The confront step is the one people skip. Deleting is easy once you have asked why a thing exists. Nobody wants to ask.',
  '2026-09-24-edge-dlp-november': 'Run the simulation before you write the rule. A policy written against what you imagine people are doing is a policy everyone ignores, including whoever wrote it.',
  '2026-09-29-ncsc-agent-guide': 'The NCSC document is better than this summary and takes about twenty minutes. This is the version for the person who has not got twenty minutes today.',
  '2026-09-23-six-jobs-grid': 'The point of a list like this is not the six. It is that each one names a moment. A prompt with no moment attached is a prompt nobody remembers exists.',
  '2026-09-25-ico-eight-risks': 'The sentence to keep: the organisation stays responsible for the agentic AI it develops, deploys or integrates. Buying it does not move that anywhere.',
  '2026-10-01-uk-guidance-roundup': 'All four are free and none of them are trying to sell you anything, which is not something you can say about most writing on this subject.',
  '2026-09-30-what-firms-use-grid': 'The line that surprised us was the second one. Nobody talks about image generation at work, and it is running at almost the same rate as chat.',
  '2026-10-02-ncsc-free-advice': 'We make nothing from this and we are not affiliated with the scheme. It is just the cheapest good answer to the first objection anyone raises.',
  '2026-09-26-five-prompts-promo': 'If you only take one, take the tender one. The second half of it, about answers shorter than the question deserves, is what finds the paragraph that says nothing.',
};
