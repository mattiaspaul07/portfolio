// All text on the site lives here. Add a project to `projects`, a role to `experience`.
// Never add: home address, date of birth, relationship status, phone number, referees, credential IDs.
var SITE = {   // var, so js/i18n.js can swap in the Norwegian version
  lang: "en",
  // Interface text: buttons, labels and screen reader descriptions
  ui: {
    seeWork: "See my projects", getInTouch: "Get in touch", featuredWork: "Featured work", viewProject: "View project",
    workflowChanged: "How the workflow changed", before: "Before", after: "After",
    myRole: "My role", problem: "Problem", outcome: "Outcome", howBuilt: "How I built it", tools: "Tools:",
    featuredProject: "Featured project", source: "Source", validUntil: "valid until ",
    portraitAlt: "Portrait of Mattias Paul", languages: "Languages", certificates: "Certificates", education: "Education", show: "Show",
    emailMe: "Email me", linkedin: "Connect on LinkedIn", copy: "Copy", copied: "Copied", selectAddress: "Select the address",
    icebreaker: "Need an icebreaker? Ask me about:",
    soundOn: "Sound on", soundOff: "Sound off", readingView: "Reading view",
    coffee: "COFFEE #", sayHi: "Say hi!", askMeAbout: "ASK ME ABOUT", askMeAboutLabel: "Ask me about: ", opensContact: "Opens Contact.",
    doorLabel: "Medal and running shoes. Opens a story from the track.",
    switchLabel: "Light switch. Off is daylight, on is evening.",
    cupLabel: "Coffee cup on the desk. Take a coffee break.", coffeesSoFar: "Coffees so far: "
  },
  person: {
    name: "Mattias Paul", title: "Senior Consultant @ Kundelab",
    headline: "I help teams make Zendesk simpler and customer service work better.",
    email: "mattias.paul07@gmail.com",
    linkedin: "https://www.linkedin.com/in/mattias-paul-a3ab39181/"
  },
  sections: {
    about:      { menu: "About",      title: "About me",                     object: "Sofa", heading: "Hi, I’m Mattias." },
    experience: { menu: "Experience", title: "Experience",                   object: "Whiteboard", heading: "From frontline support to Senior Consultant" },
    projects:   { menu: "Projects",   title: "Projects",                     object: "Desk", heading: "Selected projects" },
    toolkit:    { menu: "Toolkit",    title: "My toolkit",                   object: "Toolbox", heading: "Apps and programs I use frequently" },
    education:  { menu: "Education",  title: "Education and certifications", object: "Bookshelf", heading: "On the shelf" },
    contact:    { menu: "Contact",    title: "Contact",                      object: "Pin board", heading: "Let’s talk. Coffee optional." }
  },
  about: {
    intro: "Simpler workflows, useful automation, and tools people feel comfortable using. I like untangling messy problems with the people who deal with them every day.",
    location: "Based in Stavanger. Always curious.",
    featured: { title: "When the energy crisis hit Lyse Dialog", summary: "One Zendesk workspace for all agents, with automated follow-ups.", result: "29 min → 5 min", resultLabel: "average handling time per ticket", attribution: "Team outcome, KS Energi and Lyse Dialog customer service" } },
  // Opens the Experience section: the career story in short
  experienceIntro: "I started as an agent in first line support answering calls and chats. That’s where I learned how much difference a good system makes and how frustrating a bad one can be. Since then, I’ve led support systems at Lyse, worked in Customer Success at Aritma, and become a Senior Consultant at Kundelab.",
  // Hidden extras: found by exploring the room, no marker or menu item, not in the résumé.
  extras: {
    running: { label: "Behind the door", title: "On the track", object: "Medal and running shoes",
      photos: [
        { src: "assets/track-mountains.jpg", width: 1000, height: 1000, alt: "Me and a training partner running on a blue track, with mountains and clouds behind us", caption: "Track session in the mountains." },
        { src: "assets/track-bike.jpg", width: 1200, height: 800, alt: "Me on a bike beside a runner on a red track", caption: "On the bike at the track." }
      ],
      paragraphs: [
      "I ran middle distance at national level and won a few regional titles in my age group. Most of the time, though, I finished behind my friend Jakob Ingebrigtsen, who went on to become an Olympic champion.",
      "Training alongside him and his brothers taught me a lot about myself, and about what others did to succeed. The biggest lesson: surround yourself with people who are better than you. The good news is that in IT, you don’t need world-class genetics. Curiosity and steady practice take you a long way."
    ] }
  },
  // Shown one at a time in a speech bubble during each coffee break.
  coffeeTopics: ["Why I go on about omnichannel routing", "A knowledge base that helps both sides", "Views and groups that won’t become a jungle", "Training with the Ingebrigtsen brothers"],
  contact: {
    intro: "Untangling a Zendesk setup, looking for someone to join your next project, or just fancy comparing notes? Say hello.",
    icebreakers: [
      "Why I keep going on about omnichannel routing",
      "Knowledge bases that help both sides of the conversation",
      "Keeping views, groups, and workflows from becoming a jungle"
    ]
  },
  languages: ["Norwegian, native", "English", "German"],
  experience: [
    { period: "Jun 2026 – now", title: "Senior Consultant", company: "Kundelab", summary: "Zendesk setup and optimisation, automation, project management, workshops and training." },
    { period: "2025 – 2026", title: "Customer Success Manager", company: "Aritma", summary: "Helped build Customer Success and a shared customer journey; payment solutions and bank integrations." },
    { period: "2024 – 2025", title: "Customer Success Specialist", company: "Aritma", summary: "Bank migrations and mergers, SQL troubleshooting, Azure DevOps testing, HubSpot super admin." },
    { period: "2022 – 2024", title: "Support Systems Lead", company: "Lyse Dialog", summary: "Owned Zendesk for the Lyse group and Altibox; automation in Zendesk and Power Platform." },
    { period: "2021 – 2022", title: "Shift Lead", company: "Lyse Dialog", summary: "Daily customer centre operations, staffing and incident follow-up." },
    { period: "2019 – 2021", title: "Customer Advisor", company: "Lyse Dialog", summary: "Private and business customers by phone, chat and social media." }
  ],
  projects: [
    { featured: true,
      title: "When the energy crisis hit Lyse Dialog",
      period: "Feb 2021 – Mar 2022",
      summary: "Brought a busy customer service team onto one well-organised Zendesk setup and automated the routine follow-up work.",
      keyNumbers: [
        { value: "29 min → 5 min", primary: true, label: "Average handling time per ticket (Feb 2021 to Mar 2022)" },
        { value: "2.8K → 511", label: "Open-ticket backlog at the late-January 2022 peak, and three weeks later, after longer opening hours and more agents" }
      ],
      workflow: [
        { step: "Where agents work", before: "Several systems to log into for one customer case.", after: "One Zendesk workspace for all channels." },
        { step: "Choosing the next ticket", before: "Agents scan a long list and decide what to do next.", after: "One view with personal and unassigned tickets; the Play button serves the next one." },
        { step: "Customer replies", before: "A reply waits its turn in the queue.", after: "A customer reply raises the ticket to high priority." },
        { step: "Waiting on the customer", before: "Agents chase customers by hand.", after: "Automatic reminders after 3 days; solved after the second reminder." },
        { step: "Waiting on others", before: "Tickets on hold can be forgotten.", after: "The customer gets an update after 3 days; after a week the ticket reopens for the agent." }
      ],
      problem: "Agents had to work across several systems, and rising energy prices brought about ten times the usual volume of enquiries.",
      role: "I handled much of the Zendesk configuration, in a team effort.",
      actions: [
        "Put every ticket in one queue that serves agents the next case",
        "Automated follow-ups so no customer or ticket is forgotten",
        "Set up instant answers to the most common invoice questions"
      ],
      outcome: "Average handling time fell from 29 to 5 minutes per ticket. After the January 2022 peak, longer opening hours and more agents on tickets got the team back in control within about three weeks.",
      howBuilt: [
        "KS Energi moved its customer service to Zendesk in February 2021. The surge ran from early December 2021 to late January 2022; during it, the team used Zendesk Explore to adjust opening hours and staffing.",
        "In Zendesk I set up Bump-Bump-Solve for automatic reminders on pending tickets, closing them after the second reminder; follow-up on on-hold tickets, with an update to the customer after 3 days and the ticket reopening for the agent after a week; views that combine personal and unassigned tickets, raise customer replies to high priority and serve the next ticket with the Play button; and auto-replies with the top 3 answers on invoice and payment tickets."
      ],
      credit: "Results credited to the KS Energi and Lyse Dialog customer service team, as described in Zendesk's customer story and the team's own reporting.",
      sourceUrl: "https://www.zendesk.co.uk/customer/lyse/", sourceLabel: "Read the Zendesk customer story" },
    { title: "When TV2 disappeared from Altibox",
      period: "Apr 2022",
      summary: "Kept a sudden wave of TV2 enquiries from swamping everyday customer service.",
      problem: "When negotiations between TV2 and Altibox broke down, enquiries surged. It was all hands on deck: customer service, analytics, sales and back office.",
      role: "I made the changes in the support systems.",
      actions: [
        "Gave the surge its own queues, separate from everyday work",
        "Wrote ready-made answers for support and chat",
        "Answered common questions automatically and closed tickets that needed no reply"
      ],
      outcome: "The surge did not clutter the established groups. New colleagues could be onboarded to this one queue faster, and staffing could be matched to it.",
      howBuilt: [
        "I set up dedicated queues in Puzzel and ticket groups in Zendesk, wrote macros for support and chat, ran a one-off automation that solved tickets with no reply, and set up automated FAQ answers for tickets submitted in this category."
      ],
      tools: "Puzzel, Zendesk",
      credit: "A team effort across customer service, analytics, sales and back office; I made the changes in the support systems.",
      sourceUrl: "https://www.vg.no/nyheter/i/0Gxbv6/tv-2-har-avsluttet-forhandlingene-med-altibox", sourceLabel: "Read VG’s article (in Norwegian)" },
  ],
  tools: [
    { name: "Zendesk", sentence: "Owned the Lyse group's Zendesk and now set it up and optimise it for Kundelab clients." },
    { name: "HubSpot", sentence: "Super admin for Customer Operations at Aritma." },
    { name: "Notion", sentence: "Internal documentation." },
    { name: "Microsoft SQL Server", sentence: "Used SQL for troubleshooting at Aritma." },
    { name: "Microsoft Power Automate", sentence: "Built flows for different processes at Lyse Dialog." },
    { name: "Azure DevOps", sentence: "Wrote user stories and tested new releases at Aritma." },
    { name: "Postman", sentence: "Testing APIs, consent flows and basic requests." },
    { name: "ChatGPT and Claude", sentence: "Brainstorming and critique." }
  ],
  certificates: [
    { sortKey: "2026-11b", issued: "Nov 2026", name: "Applied AI Foundations", issuer: "OpenAI", validUntil: "May 2027" },
    { sortKey: "2026-11a", issued: "Nov 2026", name: "AI Foundations", issuer: "OpenAI", validUntil: "May 2027" },
    { sortKey: "2026-08", issued: "Aug 2026", name: "Zendesk Partner Solution Consultant Specialist", issuer: "Zendesk" },
    { sortKey: "2026-04", issued: "Apr 2026", name: "Zendesk AI", issuer: "Zendesk" },
    { sortKey: "2025-02", issued: "Feb 2025", name: "Microsoft Certified: Azure Fundamentals (AZ-900)", issuer: "Microsoft" },
    { sortKey: "2025-01", issued: "Jan 2025", name: "Professional Scrum Master I (PSM I)", issuer: "Scrum.org" },
    { sortKey: "2023-03", issued: "Mar 2023", name: "Lean Green Belt" },
    { sortKey: "2023-02", issued: "Feb 2023", name: "CFT Training", issuer: "Puzzel" }
  ],
  education: [
    { period: "2018 – 2022", title: "Bachelor in Marketing Management", school: "BI Norwegian Business School" },
    { period: "2015 – 2018", title: "Upper secondary, general studies", school: "Sandnes videregående skole" }
  ]
};
