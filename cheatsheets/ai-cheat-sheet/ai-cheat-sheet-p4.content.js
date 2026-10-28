// The Ultimate AI Cheat Sheet, page 4: use it safely, prove it works.
window.SHEET = {
  title: "Use AI safely, and prove it works",
  sub: "Check the output, protect your data, measure the time it gives back.",
  pageLabel: "Part 4 of 4",
  pageIcon: "shield-check",

  sections: [
    { span: 6, type: "iconlist", title: "Spot a wrong answer", icon: "triangle-alert", from: 7, fromLabel: "Check before it leaves",
      items: [
        { icon: "badge-check", t: "Very confident, no source", d: "Ask: “Where does this come from?”" },
        { icon: "calculator", t: "Figures that don’t add up", d: "Recheck totals yourself" },
        { icon: "user", t: "Names or dates you never gave it", d: "It may have invented them" },
        { icon: "quote", t: "Quotes you can’t find", d: "Never publish an unchecked quote" },
        { icon: "align-justify", t: "Long but vague", d: "Ask for specifics, or a shorter answer" },
      ] },

    { span: 6, type: "crosslist", title: "What AI is still weak at", icon: "ban", tone: "warn",
      items: [
        { t: "Very recent events", d: "unless it searches the web" },
        { t: "Exact maths on big data sets", d: "use a spreadsheet" },
        { t: "Legal or tax certainty", d: "ask a professional" },
        { t: "Anything it cannot see", d: "attach the file" },
        { t: "Your unwritten know-how", d: "write it in your brief" },
        { t: "Knowing when it is wrong", d: "a person checks" },
      ] },

    { span: 7, type: "form", title: "A six-rule AI policy", icon: "scroll-text", from: 6, fromLabel: "Never paste in",
      items: [
        { icon: "building-2", t: "Accounts", d: "Use business accounts for work, never personal ones" },
        { icon: "lock", t: "Data", d: "No customer, staff or confidential data unless approved" },
        { icon: "user-check", t: "Checking", d: "A person reviews everything before it goes out" },
        { icon: "eye", t: "Honesty", d: "Tell clients if they ask whether AI helped" },
        { icon: "flag", t: "Reporting", d: "Flag anything that looks wrong or unsafe" },
        { icon: "key-round", t: "Ownership", d: "One person owns the tools, settings and access" },
      ],
      tip: "Check your privacy notice covers AI tools. A starting point, not legal advice." },

    { span: 5, type: "tracker", title: "Track the time it saves", icon: "timer",
      head: ["Job", "Before", "With AI"],
      items: [["Monday report", "", ""], ["Quote follow-ups", "", ""], ["Meeting notes", "", ""], ["Customer replies", "", ""], ["Job adverts", "", ""], ["Total per week", "", ""]],
      tip: "Minutes per week. Check again after a month." },

    { span: 12, type: "chain", title: "Your 30-day plan", icon: "calendar-check", from: 9, fromLabel: "Start this week",
      items: [
        { icon: "target", t: "Week 1", d: "One repeated job, done with AI" },
        { icon: "library", t: "Week 2", d: "Save the prompts that worked" },
        { icon: "folder-plus", t: "Week 3", d: "Set up a Project with your brief" },
        { icon: "trending-up", t: "Week 4", d: "Measure, share, pick the next job" },
      ],
      tip: "Small and repeated beats big and once." },

    { span: 12, type: "tiles", title: "Advanced moves", icon: "zap", from: 10, fromLabel: "Power moves",
      items: [
        { icon: "git-compare", t: "Second opinion", d: "Ask another tool, compare" },
        { icon: "list-checks", t: "Mark against a list", d: "“Check this against our rules”" },
        { icon: "file-pen", t: "Spot the changes", d: "“What changed between these?”" },
        { icon: "users", t: "Play the customer", d: "“Reply as a sceptical buyer”" },
      ] },
    { span: 12, type: "cta", title: "When a prompt is not enough", icon: "sparkles", hl: true,
      signs: [
        { icon: "database", t: "Data in three systems" },
        { icon: "repeat", t: "The same task every day" },
        { icon: "triangle-alert", t: "Mistakes that cost money" },
      ],
      text: "That needs a solution built around your business. Tell us what is holding you back, and we\u2019ll tell you whether it is worth fixing.",
      button: "Book a call", url: "aiforcompanies.co.uk/book", href: "https://aiforcompanies.co.uk/book", email: "hello@aiforcompanies.co.uk" },
  ],

  footer: { share: "Share with someone who needs this", cta: "Questions? hello@aiforcompanies.co.uk", quiet: true, href: "mailto:hello@aiforcompanies.co.uk" },
};
