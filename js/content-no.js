// Norwegian (Bokmål) version of SITE. Same structure as js/content.js; links, email and photos are reused from there.
// js/i18n.js swaps it in when the visitor chooses Norwegian.
const SITE_NO = {
  lang: "no",
  ui: {
    seeWork: "Se prosjektene mine", getInTouch: "Ta kontakt", featuredWork: "Utvalgt arbeid", viewProject: "Se prosjektet",
    workflowChanged: "Slik endret arbeidsflyten seg", before: "Før", after: "Etter",
    myRole: "Min rolle", problem: "Problem", outcome: "Resultat", howBuilt: "Slik bygde jeg det", tools: "Verktøy:",
    featuredProject: "Utvalgt prosjekt", source: "Kilde", validUntil: "gyldig til ",
    portraitAlt: "Portrett av Mattias Paul", languages: "Språk", certificates: "Sertifiseringer", education: "Utdanning", show: "Vis",
    emailMe: "Send meg en e-post", linkedin: "Knytt kontakt på LinkedIn", copy: "Kopier", copied: "Kopiert", selectAddress: "Marker adressen",
    icebreaker: "Trenger du en icebreaker? Spør meg om:",
    soundOn: "Lyd på", soundOff: "Lyd av", readingView: "Lesevisning",
    coffee: "KAFFE #", sayHi: "Si hei!", askMeAbout: "SPØR MEG OM", askMeAboutLabel: "Spør meg om: ", opensContact: "Åpner Kontakt.",
    doorLabel: "Medalje og joggesko. Åpner en historie fra banen.",
    switchLabel: "Lysbryter. Av er dagslys, på er kveld.",
    cupLabel: "Kaffekopp på pulten. Ta en kaffepause.", coffeesSoFar: "Kopper så langt: "
  },
  person: { ...SITE.person, title: "Seniorkonsulent @ Kundelab",
    headline: "Jeg hjelper team med å gjøre Zendesk enklere og kundeservice bedre." },
  sections: {
    about:      { menu: "Om meg",     title: "Om meg",                       object: "Sofa", heading: "Hei, jeg er Mattias." },
    experience: { menu: "Erfaring",   title: "Erfaring",                     object: "Tavle", heading: "Fra førstelinje til seniorkonsulent" },
    projects:   { menu: "Prosjekter", title: "Prosjekter",                   object: "Pult", heading: "Utvalgte prosjekter" },
    toolkit:    { menu: "Verktøy",    title: "Verktøykassen min",            object: "Verktøykasse", heading: "Programmene jeg bruker mest" },
    education:  { menu: "Utdanning",  title: "Utdanning og sertifiseringer", object: "Bokhylle", heading: "I bokhylla" },
    contact:    { menu: "Kontakt",    title: "Kontakt",                      object: "Oppslagstavle", heading: "Vil du ta en prat? Jeg spanderer kaffen" }
  },
  about: {
    intro: "Enklere arbeidsflyt, nyttig automatisering og verktøy folk er komfortable med å bruke. Jeg liker å nøste opp i rotete problemer sammen med dem som møter dem hver dag.",
    location: "Bosatt i Stavanger. Alltid nysgjerrig.",
    featured: { title: "Da strømkrisen traff Lyse Dialog", summary: "Ett Zendesk-arbeidsområde for alle rådgiverne, med automatisert oppfølging.", result: "29 min → 5 min", resultLabel: "gjennomsnittlig behandlingstid per sak", attribution: "Teamets resultat, kundeservice i KS Energi og Lyse Dialog" } },
  experienceIntro: "Jeg startet som rådgiver i førstelinjen og svarte på telefon og chat. Der lærte jeg hvor stor forskjell et godt system gjør, og hvor frustrerende et dårlig et kan være. Siden har jeg ledet støttesystemene i Lyse, jobbet med Customer Success i Aritma og blitt seniorkonsulent i Kundelab.",
  extras: {
    running: { label: "Bak døren", title: "På friidrettsbanen", object: "Medalje og joggesko",
      photos: [
        { ...SITE.extras.running.photos[0], alt: "Meg og en treningspartner som løper på en blå bane, med fjell og skyer bak oss", caption: "Banetrening i fjellet." },
        { ...SITE.extras.running.photos[1], alt: "Meg på sykkel ved siden av en løper på en rød bane", caption: "På sykkelen ved banen." }
      ],
      paragraphs: [
      "Jeg løp mellomdistanse på nasjonalt nivå og vant noen kretsmesterskap i min aldersklasse. Som oftest kom jeg likevel i mål bak treningskompisen min Jakob Ingebrigtsen, som senere ble olympisk mester.",
      "Å trene sammen med ham og brødrene hans lærte meg mye om meg selv, og om hva andre gjorde for å lykkes. Den viktigste lærdommen: omgi deg med folk som er bedre enn deg. Det gode er at i IT trenger du ikke gener i verdensklasse. Nysgjerrighet og jevn øving tar deg langt."
    ] }
  },
  coffeeTopics: [
    { text: "Hvorfor jeg maser om omnikanal-ruting", label: true },
    { text: "En kunnskapsbase som er til hjelp for kunder og agenter", label: true },
    { text: "Visninger og grupper som ikke blir en jungel", label: true },
    { text: "Hvordan var det å trene med Team-Ingebrigtsen?", label: true },
    { text: "Lurer på hvor mange som sitter på hjemmekontor og spiller GTA VI nå...", label: false },
    { text: "Anti-AI eller pro-AI? Hvorfor ikke noe midt imellom?", label: false },
    { text: "Hvorfor enhver help desk bør vurdere Zendesk", label: true }
  ],
  contact: {
    intro: "Skal du rydde i et Zendesk-oppsett, ser du etter noen til neste prosjekt, eller vil du bare utveksle erfaringer? Si hei.",
    icebreakers: [
      "Hvordan slipper du å svare på det samme hele tiden",
      "Sett opp ruting basert på de ansattes kompetanse",
      "Hvordan holder du orden i Zendesk når det baller på seg"
    ]
  },
  languages: ["Norsk, morsmål", "Engelsk", "Tysk"],
  experience: [
    { period: "Juni 2026 – nå", title: "Seniorkonsulent", company: "Kundelab", summary: "Oppsett og optimalisering av Zendesk, automatisering, prosjektledelse, workshops og opplæring." },
    { period: "2025 – 2026", title: "Customer Success Manager", company: "Aritma", summary: "Var med på å bygge opp Customer Success og en felles kundereise; betalingsløsninger og bankintegrasjoner." },
    { period: "2024 – 2025", title: "Customer Success Specialist", company: "Aritma", summary: "Bankmigreringer og fusjoner, feilsøking med SQL, testing i Azure DevOps, admin i HubSpot." },
    { period: "2022 – 2024", title: "Fagansvarlig støttesystemer", company: "Lyse Dialog", summary: "Eide Zendesk for Lyse-konsernet og Altibox; automatisering i Zendesk og Power Platform." },
    { period: "2021 – 2022", title: "Skiftleder", company: "Lyse Dialog", summary: "Daglig drift av kundesenteret, bemanning og oppfølging av hendelser." },
    { period: "2019 – 2021", title: "Kunderådgiver", company: "Lyse Dialog", summary: "Privat- og bedriftskunder på telefon, chat og sosiale medier." }
  ],
  projects: [
    { ...SITE.projects[0],
      title: "Da strømkrisen traff Lyse Dialog",
      period: "Feb. 2021 – mars 2022",
      summary: "Flyttet et travelt kundeserviceteam over på ett ryddig Zendesk-oppsett og automatiserte den rutinemessige oppfølgingen.",
      keyNumbers: [
        { value: "29 min → 5 min", primary: true, label: "Gjennomsnittlig behandlingstid per sak (feb. 2021 til mars 2022)" },
        { value: "2.8K → 511", label: "Åpne saker på toppen i slutten av januar 2022, og tre uker senere, etter utvidede åpningstider og flere rådgivere" }
      ],
      workflow: [
        { step: "Hvor rådgiverne jobber", before: "Flere systemer å logge inn i for én kundesak.", after: "Ett Zendesk-arbeidsområde for alle kanaler." },
        { step: "Valg av neste sak", before: "Rådgiverne leter i en lang liste og bestemmer selv hva som er neste.", after: "Én visning med egne og ufordelte saker; Play-knappen gir deg neste sak." },
        { step: "Svar fra kunden", before: "Et svar venter på tur i køen.", after: "Et svar fra kunden gir saken høy prioritet." },
        { step: "Venter på kunden", before: "Rådgiverne purrer på kunder manuelt.", after: "Automatiske påminnelser etter 3 dager; løst etter andre påminnelse." },
        { step: "Venter på andre", before: "Saker på vent kan bli glemt.", after: "Kunden får en oppdatering etter 3 dager; etter en uke åpnes saken igjen for rådgiveren." }
      ],
      problem: "Rådgiverne måtte jobbe i flere systemer, og stigende strømpriser ga rundt ti ganger så mange henvendelser som normalt.",
      role: "Jeg tok mye av Zendesk-konfigurasjonen, som en del av en teaminnsats.",
      actions: [
        "Samlet alle saker i én kø som gir rådgiveren neste sak",
        "Automatiserte oppfølging slik at ingen kunde eller sak blir glemt",
        "Satte opp automatiske svar på de vanligste fakturaspørsmålene"
      ],
      outcome: "Gjennomsnittlig behandlingstid falt fra 29 til 5 minutter per sak. Etter toppen i januar 2022 fikk utvidede åpningstider og flere rådgivere på saker teamet tilbake i kontroll i løpet av omtrent tre uker.",
      howBuilt: [
        "KS Energi flyttet kundeservicen sin til Zendesk i februar 2021. Pågangen varte fra tidlig i desember 2021 til slutten av januar 2022; i den perioden brukte teamet Zendesk Explore til å justere åpningstider og bemanning.",
        "I Zendesk satte jeg opp Bump-Bump-Solve med automatiske påminnelser på saker som venter på kunden, som lukkes etter andre påminnelse; oppfølging av saker på vent, med en oppdatering til kunden etter 3 dager og gjenåpning for rådgiveren etter en uke; visninger som samler egne og ufordelte saker, gir kundesvar høy prioritet og serverer neste sak med Play-knappen; og autosvar med de 3 vanligste svarene på faktura- og betalingssaker."
      ],
      credit: "Resultatene tilskrives kundeserviceteamet i KS Energi og Lyse Dialog, slik det er beskrevet i Zendesks kundehistorie og teamets egen rapportering.",
      sourceLabel: "Les kundehistorien hos Zendesk (på engelsk)" },
    { ...SITE.projects[1],
      title: "Da TV2 forsvant fra Altibox",
      period: "April 2022",
      summary: "Hindret at en plutselig bølge av TV2-henvendelser oversvømte den vanlige kundeservicen.",
      problem: "Da forhandlingene mellom TV2 og Altibox brøt sammen, økte henvendelsene kraftig. Alle måtte bidra: kundeservice, analyse, salg og backoffice.",
      role: "Jeg gjorde endringene i støttesystemene.",
      actions: [
        "Ga pågangen egne køer, adskilt fra det daglige arbeidet",
        "Skrev ferdige svar for kundeservice og chat",
        "Besvarte vanlige spørsmål automatisk og lukket saker som ikke trengte svar"
      ],
      outcome: "Pågangen fylte ikke opp de etablerte gruppene. Nye kolleger kunne læres opp raskere på denne ene køen, og bemanningen kunne tilpasses den.",
      howBuilt: [
        "Jeg satte opp egne køer i Puzzel og saksgrupper i Zendesk, skrev makroer for kundeservice og chat, kjørte en engangsautomatisering som løste saker uten svar, og satte opp automatiske FAQ-svar på saker sendt inn i denne kategorien."
      ],
      credit: "En teaminnsats på tvers av kundeservice, analyse, salg og backoffice; jeg gjorde endringene i støttesystemene.",
      sourceLabel: "Les VGs artikkel" }
  ],
  toolGroups: [
    { key: "contact", title: "Kundedialog" },
    { key: "data", title: "Data og automatisering" },
    { key: "build", title: "Bygge og dokumentere" }
  ],
  tools: [
    { group: "contact", name: "Zendesk", sentence: "Eide Zendesk for Lyse-konsernet, og setter det nå opp og optimaliserer det for Kundelabs kunder." },
    { group: "contact", name: "Puzzel", sentence: "Endret samtaleflyt, ruting og talemeldinger." },
    { group: "contact", name: "HubSpot", sentence: "Admin for Customer Operations i Aritma." },
    { group: "data", name: "Microsoft Power Automate", sentence: "Lagde flyter i Lyse Dialog, blant annet én for å rapportere om fellesfeil og én som sender gårsdagens driftstall fra Power BI-scorecards til ledergruppen på SMS." },
    { group: "data", name: "Microsoft SQL Server", sentence: "Feilsøking av betalingsfiler i Aritma, og oppdateringsspørringer for å rette feil ved bankmigreringer." },
    { group: "data", name: "Postman", sentence: "Testing av API-er, samtykkeflyter og enkle forespørsler." },
    { group: "build", name: "Azure DevOps", sentence: "Skrev brukerhistorier og testet nye versjoner i Aritma." },
    { group: "build", name: "Notion", sentence: "Intern dokumentasjon og SOP-er (standardrutiner) for avdelingen min." },
    { group: "build", name: "ChatGPT og Claude", sentence: "Bygge egne apper, idémyldring og kritikk av design, og gjennomgang av prosesskart." }
  ],
  certificates: SITE.certificates.map(c => ({ ...c,
    issued: c.issued.replace("Nov", "nov.").replace("Aug", "aug.").replace("Apr", "apr.").replace("Feb", "feb.").replace("Jan", "jan.").replace("Mar", "mars"),
    ...(c.validUntil ? { validUntil: c.validUntil.replace("May", "mai") } : {}),
    name: c.name === "CFT Training" ? "CFT-opplæring" : c.name })),
  education: [
    { period: "2018 – 2022", title: "Bachelor i markedsføringsledelse", school: "Handelshøyskolen BI" },
    { period: "2015 – 2018", title: "Videregående, studiespesialisering", school: "Sandnes videregående skole" }
  ]
};
