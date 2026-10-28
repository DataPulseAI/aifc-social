// The Ultimate AI Cheat Sheet, page 2: the prompt library.
// Generic layout: each section has a type (plist, weakstrong, iconlist, fixtable, vsteps, chain, checklist) and a span out of 12.
window.SHEET = {
  title: "Prompts for every part of your business",
  sub: "Copy, paste, fill in the brackets. Works in any AI assistant.",
  pageLabel: "Part 2 of 4",
  pageIcon: "book-open",

  group: { from: 3, label: "More on “Hand these to AI first” from page 1", count: 6 },

  sections: [
    { span: 4, type: "plist", title: "Sales", icon: "briefcase",
      items: ["Follow up on [quote]. Keep it brief.", "Turn these call notes into actions.", "Three questions to ask [company]."],
      attach: "Attach: the quote or your call notes" },

    { span: 4, type: "plist", title: "Customer service", icon: "headset",
      items: ["Reply calmly to this complaint.", "Turn these emails into an FAQ.", "Make this reply warmer and clearer."],
      attach: "Attach: the customer’s message" },

    { span: 4, type: "plist", title: "Operations", icon: "settings-2",
      items: ["Turn this voice note into a guide.", "Write a checklist for [task].", "Which steps here could we cut?"],
      attach: "Attach: a voice note transcript or notes" },

    { span: 4, type: "plist", title: "Finance", icon: "pound-sterling",
      items: ["Explain these numbers simply.", "What changed since last month?", "Chase this late invoice, politely."],
      attach: "Attach: a report or export, never bank logins" },

    { span: 4, type: "plist", title: "People and HR", icon: "users",
      items: ["Write a job advert for a [role].", "Five interview questions on [skill].", "Turn our handbook into one page."],
      attach: "Attach: your notes, not personal files" },

    { span: 4, type: "plist", title: "Marketing", icon: "megaphone",
      items: ["Ten post ideas for [audience].", "Rewrite this post in our tone.", "Turn this article into five posts."],
      attach: "Attach: a past post you liked" },

    { span: 6, type: "weakstrong", title: "Before and after", from: 2, fromLabel: "The prompt formula", icon: "wand-sparkles",
      gains: ["Role", "Length", "Details", "Next step"],
      weak: "“Write a job advert.”",
      strong: "“Write a job advert for a part-time bookkeeper. Plain English, 150 words. List hours and pay range, and end with how to apply.”",
      tip: "The more it knows, the less you have to fix." },

    { span: 6, type: "iconlist", title: "Five phrases that lift any answer", icon: "sparkles", hl: true,
      items: [
        { icon: "message-circle-question", t: "“Tell me what you assumed.”" },
        { icon: "mic", t: "“Match the tone of this example.”" },
        { icon: "user", t: "“Write it for a busy managing director.”" },
        { icon: "align-justify", t: "“Give me the short version first.”" },
        { icon: "search", t: "“What am I missing?”" },
      ] },

    { span: 8, type: "fixtable", title: "Fix a bad answer", from: 8, fromLabel: "Habits of good users", icon: "wrench",
      head: ["If it is", "Reply with"],
      items: [
        { icon: "align-justify", t: "Too long", d: "“Cut this by half. Keep the main point.”" },
        { icon: "copy", t: "Too generic", d: "“Use our details. Here is more context: [context]”" },
        { icon: "volume-2", t: "Wrong tone", d: "“Make it warmer, more formal or more direct.”" },
        { icon: "circle-alert", t: "Wrong facts", d: "“Check each figure against the file I attached.”" },
        { icon: "target", t: "Off target", d: "“Here is an example of what good looks like.”" },
      ] },

    { span: 4, type: "vsteps", title: "Prompt library", icon: "library",
      items: [
        { icon: "file-text", t: "One shared document", d: "Every prompt that worked" },
        { icon: "tag", t: "Name it by the job", d: "“Quote follow-up”, “Monday report”" },
        { icon: "paperclip", t: "Note what to attach", d: "So anyone can reuse it" },
        { icon: "refresh-cw", t: "Review it monthly", d: "Keep the ones people use" },
      ] },

    { span: 12, type: "chain", title: "Chain prompts for bigger jobs", from: 10, fromLabel: "Power moves", icon: "link",
      items: [
        { icon: "search", t: "Research", d: "“What do we know?”" },
        { icon: "list", t: "Outline", d: "“Suggest a structure”" },
        { icon: "pencil-line", t: "Draft", d: "“Write section one”" },
        { icon: "message-circle-question", t: "Critique", d: "“What is weak here?”" },
        { icon: "circle-check", t: "Finish", d: "“Fix it, then tighten”" },
      ],
      tip: "One job per message, in the same chat. Each step builds on the last." },
  ],

  footer: { share: "Share with someone who needs this", cta: "Next: set it up once, on page 3" },
};
