// Chooses English or Norwegian. Order: ?lang= in the URL, then the visitor's saved choice, then the browser language.
const LANG_KEY = "mp-lang";

function pickLang(param, saved, browserLangs) {
  for (const v of [param, saved]) if (v === "en" || v === "no") return v;
  return (browserLangs || []).some(l => /^(nb|nn|no)\b/i.test(l)) ? "no" : "en";
}

(function () {
  let saved = null;
  try { saved = localStorage.getItem(LANG_KEY); } catch (_) { /* storage blocked */ }
  const lang = pickLang(new URLSearchParams(location.search).get("lang"), saved, navigator.languages || [navigator.language]);
  if (lang === "no" && typeof SITE_NO !== "undefined") SITE = SITE_NO;
  document.documentElement.lang = lang === "no" ? "nb" : "en";
})();

// Static text in index.html: elements carry data-i18n="key" (text) or data-i18n-aria="key" (aria-label).
const PAGE_TEXT = {
  en: { skip: "Skip to content", sections: "Sections", downloadCv: "Download CV", download: "Download ", hint: "Explore my workspace, or use the menu.",
        intro: "I help teams make Zendesk simpler and customer service work better.", hi: "Hi, I’m Mattias.",
        room: "My workspace. Each marked object opens a section.", h1: "Mattias Paul, Senior Consultant at Kundelab", section: "Section",
        langSwitch: "Bytt til norsk", langShort: "NO", sheetToggle: "Show or hide the section",
        interactiveView: "Interactive view", cvButton: "Download CV", readingTitle: "Mattias Paul, reading view", interactiveVersion: "Interactive version:",
        cvFile: "assets/Mattias-Paul-CV.pdf", siteUrl: "https://mattiaspaul.app/?utm_source=cv" },
  no: { skip: "Hopp til innholdet", sections: "Seksjoner", downloadCv: "Last ned CV", download: "Last ned ", hint: "Utforsk arbeidsplassen min, eller bruk menyen.",
        intro: "Jeg hjelper team med å gjøre Zendesk enklere og kundeservice bedre.", hi: "Hei, jeg er Mattias.",
        room: "Arbeidsplassen min. Hvert merket objekt åpner en seksjon.", h1: "Mattias Paul, seniorkonsulent i Kundelab", section: "Seksjon",
        langSwitch: "Switch to English", langShort: "EN", sheetToggle: "Vis eller skjul seksjonen",
        interactiveView: "Interaktiv visning", cvButton: "Last ned CV", readingTitle: "Mattias Paul, lesevisning", interactiveVersion: "Interaktiv versjon:",
        cvFile: "assets/Mattias-Paul-CV-no.pdf", siteUrl: "https://mattiaspaul.app/?utm_source=cv&lang=no" }
};

function applyPageText() {
  const t = PAGE_TEXT[SITE.lang];
  document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t[el.dataset.i18n]; });
  document.querySelectorAll("[data-i18n-aria]").forEach(el => el.setAttribute("aria-label", t[el.dataset.i18nAria]));
  document.querySelectorAll("[data-i18n-ui]").forEach(el => { el.textContent = SITE.ui[el.dataset.i18nUi]; });
  document.querySelectorAll("[data-i18n-alt]").forEach(el => { el.alt = SITE.ui.portraitAlt; });
  document.querySelectorAll("[data-cv]").forEach(a => { a.href = t.cvFile; });
  document.querySelectorAll("[data-site]").forEach(a => { a.href = t.siteUrl; });
  const brand = document.querySelector(".brand small");
  if (brand) brand.textContent = SITE.person.title;
  const sound = document.getElementById("sound");
  if (sound) { sound.setAttribute("aria-label", SITE.ui.soundOff); sound.title = SITE.ui.soundOff; }
  document.querySelectorAll(".actions .ghost[href='resume.html']").forEach(a => { a.textContent = SITE.ui.readingView; });
  const toggle = document.getElementById("lang");
  if (toggle) toggle.addEventListener("click", () => {
    const next = SITE.lang === "no" ? "en" : "no";
    try { localStorage.setItem(LANG_KEY, next); } catch (_) { /* the URL carries it instead */ }
    const url = new URL(location.href);
    url.searchParams.set("lang", next);
    location.replace(url.toString());
  });
}
