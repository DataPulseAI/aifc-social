// The Ultimate AI Cheat Sheet, page 3: set it up once.
window.SHEET = {
  title: "Set AI up for your business",
  sub: "Do this once. Every answer after it gets better.",
  pageLabel: "Part 3 of 4",
  pageIcon: "settings-2",

  group: { from: 5, label: "More on “Teach AI your business” from page 1", count: 4 },

  sections: [
    { span: 6, type: "form", title: "Your company brief", icon: "building-2",
      items: [
        { icon: "building", t: "Who we are", d: "Family bakery, 3 shops, 40 staff" },
        { icon: "package", t: "What we sell", d: "Bread, cakes, wholesale to cafés" },
        { icon: "users-round", t: "Our customers", d: "Local families and independent cafés" },
        { icon: "mic", t: "How we sound", d: "Warm, plain English, never pushy" },
        { icon: "ban", t: "Never say", d: "“Artisanal”, “family-run since forever”" },
        { icon: "file-text", t: "Set answers", d: "Delivery times, allergens, returns" },
      ],
      tip: "Write it once. Paste it into every Project or Gem." },

    { span: 6, type: "vsteps", title: "Set up a Project or Gem", icon: "folder-plus",
      items: [
        { icon: "folder-plus", t: "Create one per job", d: "Claude and ChatGPT: Projects. Gemini: Gems" },
        { icon: "pen-line", t: "Add your instructions", d: "Your brief, plus how this job is done" },
        { icon: "file-up", t: "Upload reference files", d: "The six shown below" },
        { icon: "messages-square", t: "Start related chats there", d: "Every chat starts with your brief and files" },
      ] },

    { span: 12, type: "tiles", title: "Good files to upload", icon: "file-up",
      items: [
        { icon: "pound-sterling", t: "Price list", d: "So quotes are right" },
        { icon: "mic", t: "Tone guide", d: "Emails you liked" },
        { icon: "message-circle-question", t: "FAQs", d: "Your best answers" },
        { icon: "badge-check", t: "Best past work", d: "Proposals that won" },
        { icon: "package", t: "Product sheets", d: "Specs and features" },
        { icon: "list-checks", t: "Process notes", d: "How jobs get done" },
      ] },

    { span: 12, type: "quotes", title: "Instructions that work", icon: "scroll-text",
      items: [
        { icon: "pencil", t: "For writing", d: "“Write in our tone. Short sentences. UK English. End with one clear next step.”" },
        { icon: "calculator", t: "For numbers", d: "“Show your working. Flag anything unusual. Never guess a missing figure.”" },
        { icon: "headset", t: "For customer replies", d: "“Be warm and brief. Use our standard answers. Escalate refunds to a person.”" },
      ] },

    { span: 7, type: "logorows", title: "Use a business account for work", icon: "shield-check", from: 1, fromLabel: "Which tool",
      items: [
        { logo: "microsoft-copilot-mark", t: "Microsoft 365 Copilot", d: "Prompts and responses not used to train the models" },
        { logo: "gemini-mark", t: "Gemini in Google Workspace", d: "Your content not used to train Gemini" },
        { logo: "chatgpt-mark", t: "ChatGPT Business and Enterprise", d: "Business data not used for training by default" },
        { logo: "claude-mark", t: "Claude for Work", d: "Inputs and outputs not used for training by default" },
      ],
      note: "From each vendor’s own policy pages, October 2026. Free and personal plans differ: check the settings. Not legal advice." },

    { span: 5, type: "crosslist", title: "Connect your tools safely", icon: "plug", from: "Key terms", fromLabel: "Key terms",
      items: [
        { t: "Start with one connector", d: "add more as you trust it" },
        { t: "Share folders, not your whole drive", d: "" },
        { t: "Use read-only access first", d: "where it is offered" },
        { t: "Check what each connector can see", d: "" },
        { t: "Switch off what you don’t use", d: "" },
        { t: "Review access every quarter", d: "" },
      ] },

    { span: 12, type: "chain", title: "Roll it out to your team", icon: "users",
      items: [
        { icon: "user-check", t: "Pick a champion", d: "One person who enjoys it" },
        { icon: "file-text", t: "Share the brief", d: "Same facts for everyone" },
        { icon: "library", t: "Share the prompts", d: "Your library from page 2" },
        { icon: "messages-square", t: "Swap wins weekly", d: "Ten minutes in a team meeting" },
      ],
      tip: "Start with the people who repeat the same task most." },
  ],

  footer: { share: "Share with someone who needs this", cta: "Next: use it safely, on page 4" },
};
