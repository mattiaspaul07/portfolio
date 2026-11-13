// All text on the site lives here. Add a project to `projects`, a role to `experience`.
// Never add: home address, date of birth, relationship status, phone number, referees, credential IDs.
const SITE = {
  person: {
    name: "Mattias Paul", title: "Senior Consultant, Kundelab",
    headline: "Hi, I'm Mattias. I connect people, processes and technology.",
    email: "mattias.paul07@gmail.com",
    linkedin: "https://www.linkedin.com/in/mattias-paul-a3ab39181/"
  },
  sections: {
    about:      { menu: "About",      title: "About me",                     object: "Sofa" },
    experience: { menu: "Experience", title: "Experience",                   object: "Whiteboard", heading: "From the phones to the Zendesk admin" },
    projects:   { menu: "Projects",   title: "Projects",                     object: "Desk", heading: "On my desk" },
    toolkit:    { menu: "Toolkit",    title: "My toolkit",                   object: "Toolbox", heading: "The tools I work with" },
    education:  { menu: "Education",  title: "Education and certifications", object: "Bookshelf", heading: "On the shelf" },
    contact:    { menu: "Contact",    title: "Contact",                      object: "Pin board", heading: "Let's talk" }
  },
  about: { placeholder: true, text: "Personal introduction: background, interests outside work, and how you approach work with clients." },
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
      title: "Unifying customer service on Zendesk at Lyse Dialog",
      challenge: "Agents had to work across several systems. When energy prices rose sharply, ticket volume grew about tenfold.",
      contribution: "I handled much of the Zendesk configuration, including personal work views, automated follow-ups and prioritisation.",
      tools: "Zendesk Suite, Bump Bump Solve",
      outcome: "The team halved the ticket backlog and was back in control within a few weeks.",
      credit: "Outcome credited to the Lyse Dialog customer service team, as described in Zendesk's customer story.",
      sourceUrl: "https://www.zendesk.co.uk/customer/lyse/", sourceLabel: "Read the Zendesk customer story" },
    { title: "Handling the TV 2 surge at Lyse Dialog",
      challenge: "When negotiations between TV 2 and Altibox broke down, enquiries surged. It was all hands on deck: customer service, analytics, sales and back office.",
      contribution: "As the one responsible for our support systems, I made the system changes: I set up dedicated queues in Puzzel and ticket groups in Zendesk, wrote macros for support and chat, ran a one-off automation that solved tickets with no reply, and set up automated FAQ answers for tickets submitted in this category.",
      tools: "Puzzel, Zendesk",
      outcome: "The surge did not clutter the established groups. New colleagues could be onboarded to this one queue faster, and staffing could be matched to it.",
      credit: "A team effort across customer service, analytics, sales and back office; I made the changes in the support systems." },
    { placeholder: true, title: "Placeholder project", text: "Waiting for details." }
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
    { sortKey: "2023-02", issued: "Feb 2023", name: "CFT Training", issuer: "Puzzel" },
    { sortKey: "2023-00", issued: "2023", name: "Lean Green Belt" }
  ],
  education: [
    { period: "2018 – 2022", title: "Bachelor in Marketing Management", school: "BI Norwegian Business School" },
    { period: "2015 – 2018", title: "Upper secondary, general studies", school: "Sandnes videregående skole" }
  ]
};
