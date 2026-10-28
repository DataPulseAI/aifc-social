// Content for The Business Owner's AI Cheat Sheet, page 1.
// Edit words here; the template draws the page. Keep lines short.
// icon: a lucide icon name. logo / apps: file slugs from public/logos.
window.SHEET = {
  title: "The Ultimate AI Cheat Sheet",
  sub: "Practical AI for small and medium businesses, in plain English.",
  pageLabel: "Save this · Part 1 of 4",

  tools: { n: 1, title: "Which tool for which job", note: "Start with the one your team already pays for.",
    rows: [
      { logo: "microsoft-copilot-mark", name: "Microsoft 365 Copilot", best: "Your team lives in Microsoft", apps: ["outlook", "word", "excel", "teams"] },
      { logo: "gemini-mark", name: "Gemini", best: "You run on Google", apps: ["gmail", "google-docs", "google-sheets", "google-calendar"] },
      { logo: "chatgpt-mark", name: "ChatGPT", best: "You want one all-rounder", apps: [] },
      { logo: "claude-mark", name: "Claude", best: "Best writing, analysis and long documents", pick: "Our pick", apps: [] },
    ] },

  formula: { n: 2, title: "The prompt formula",
    parts: [ { icon: "user", t: "Role" }, { icon: "target", t: "Task" }, { icon: "layers", t: "Context" }, { icon: "layout-template", t: "Format" } ],
    weak: "“Write a follow-up email.”",
    strong: "“As our sales manager, write a follow-up to a client gone quiet after a quote. They run a family bakery. Under 120 words, one clear next step.”",
    tip: "Paste in an example of good work and it will follow it." },

  areas: { n: 3, title: "Hand these to AI first",
    items: [
      { icon: "briefcase", t: "Sales", d: "Proposals, follow-ups, call prep, LinkedIn posts" },
      { icon: "headset", t: "Customers", d: "Reply drafts, FAQs, complaints, review replies" },
      { icon: "settings-2", t: "Operations", d: "Process guides from a voice note, checklists" },
      { icon: "pound-sterling", t: "Finance", d: "Explain the numbers, chase late payers" },
      { icon: "clipboard-list", t: "Admin", d: "Meeting notes, actions, agendas, job adverts" },
    ] },

  teach: { n: 5, title: "Teach AI your business",
    items: [
      { icon: "folder", t: "Projects in Claude and ChatGPT" },
      { icon: "gem", t: "Gems in Gemini" },
      { icon: "upload", t: "Add price list, tone guide, FAQs" },
      { icon: "plug", t: "Connect email, calendar, files" },
    ] },

  prompts: { n: 4, title: "Twelve useful prompt starters",
    items: [
      "You are our [role]. Write [task].",
      "Turn these notes into a summary.",
      "Rewrite this to be clearer and shorter.",
      "Give three options, then pick one.",
      "What should I ask before deciding?",
      "Find the weak points in this proposal.",
      "Put this in a table with [columns].",
      "Explain this report to a non-expert.",
      "Draft a reply that says no politely.",
      "Turn this into a step-by-step checklist.",
      "Summarise this thread and list actions.",
      "Write three subject lines for this.",
    ] },

  lists: [
    { n: 6, title: "Never paste in", icon: "shield-x", tone: "warn",
      items: ["Customer personal data", "Passwords or bank details", "Anything under NDA", "Contracts and HR files", "Unpublished financial results"] },
    { n: 7, title: "Check before it leaves", icon: "circle-check",
      items: ["Facts, figures and dates", "Names and spellings", "Tone for this customer", "Anything legal or financial", "Promises you can’t keep"] },
    { n: 8, title: "Habits of good users", icon: "lightbulb",
      items: ["Give it an example", "Tell it who will read it", "Ask it to critique itself", "Reply to improve, don’t restart", "Save prompts that work"] },
  ],

  steps: { n: 9, title: "Start this week",
    items: [ { icon: "repeat", t: "Pick one weekly job", d: "Like the Monday report" }, { icon: "pencil-line", t: "Write the prompt", d: "Role, task, context, format" }, { icon: "save", t: "Save as a template", d: "In a shared Project" }, { icon: "timer", t: "Measure time back", d: "Minutes before and after" } ] },

  beyond: { n: 10, title: "Power moves",
    moves: [
      { icon: "mic", t: "Talk, don\u2019t type", d: "Voice notes into emails and plans" },
      { icon: "image", t: "Show it a picture", d: "Screenshots, receipts, whiteboards" },
      { icon: "message-circle-question", t: "Let it interview you", d: "\u201cAsk me five questions first\u201d" },
      { icon: "table", t: "Ask for a table", d: "Then turn it into an email or slide" },
    ] },

  defs: { n: null, title: "Key terms",
    items: [
      { t: "Prompt", d: "The instruction you give the AI" },
      { t: "LLM", d: "The engine behind tools like these" },
      { t: "Hallucination", d: "A confident answer that is wrong" },
      { t: "Context window", d: "How much it can read at once" },
      { t: "Connector", d: "A link to your email, files or apps" },
      { t: "Agent", d: "AI that does tasks, not just answers" },
    ] },

  footer: { share: "Share with someone who needs this", cta: "Comment “AI” for the full guide" },
};
