// Turns SITE content into HTML for the section panel and the résumé view.
const SECTION_ORDER = ["about", "experience", "projects", "toolkit", "education", "contact"];
const DEFAULT_SECTION = "about";   // the section shown when the page loads

// Section addresses: #projects etc. The Norwegian names work too, so #prosjekter opens Projects.
const SECTION_ALIASES = { "om-meg": "about", erfaring: "experience", prosjekter: "projects", verktoy: "toolkit", "verktøy": "toolkit", utdanning: "education", kontakt: "contact" };
function sectionFromHash(hash) {
  let k = "";
  try { k = decodeURIComponent(String(hash || "").replace(/^#/, "")).toLowerCase(); } catch (_) { return null; }
  k = SECTION_ALIASES[k] || k;
  return (SITE.sections[k] || (SITE.extras && SITE.extras[k])) ? k : null;
}

function esc(text) {
  return String(text).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Small inline icons for buttons (decorative: the button text says what happens)
const BTN_ICONS = {
  arrow: '<path d="M3 8h10M9 4l4 4-4 4"/>',
  plane: '<path d="M14.5 1.5 7 9M14.5 1.5 10 14.5 7 9 1.5 6z"/>',
  plus: '<path d="M8 3v10M3 8h10"/>'
};
function btnIcon(name) {
  return `<svg class="btn-ico" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${BTN_ICONS[name]}</svg>`;
}

function aboutNextSteps() {
  const f = SITE.about.featured;
  return `<div class="next-steps">
      <a class="cta" href="#projects" data-go="projects">${SITE.ui.seeWork}${btnIcon("arrow")}</a>
      <a class="ghost" href="#contact" data-go="contact">${SITE.ui.getInTouch}${btnIcon("arrow")}</a>
    </div>
    <article class="card featured-work">
      <span class="kicker">${SITE.ui.featuredWork}</span>
      <span class="title">${esc(f.title)}</span>
      <p>${esc(f.summary)}</p>
      <div class="fw-result"><b>${esc(f.result)}</b> <span>${esc(f.resultLabel)}</span></div>
      <span class="fw-credit">${esc(f.attribution)}</span>
      <a class="ghost fw-link" href="#projects" data-go="projects">${SITE.ui.viewProject}</a>
    </article>`;
}

function heading(key, level) {
  const s = SITE.sections[key];
  return `<span class="kicker">${esc(s.title)}</span><h${level}>${esc(s.heading || s.title)}</h${level}>`;
}

function placeholderBox(item) {
  return `<div class="ph"><b>${esc(item.title || "Placeholder")}.</b> ${esc(item.text)}</div>`;
}

function timeline(rows) {
  return `<ol class="tl">${rows.map(r =>
    `<li><span class="yr">${esc(r.period)}</span><span><b>${esc(r.title)}</b>${r.detail ? esc(r.detail) : ""}</span></li>`).join("")}</ol>`;
}

function workflow(p) {
  if (!p.workflow || !p.workflow.length) return "";
  return `<div class="beforeafter"><h3>${SITE.ui.workflowChanged}</h3>
    <div class="ba-head" aria-hidden="true"><span>${SITE.ui.before}</span><span>${SITE.ui.after}</span></div>
    ${p.workflow.map(w => `<div class="ba-row"><b class="ba-step">${esc(w.step)}</b>
      <p class="ba-before"><span class="ba-tag">${SITE.ui.before}</span>${esc(w.before)}</p>
      <p class="ba-after"><span class="ba-tag">${SITE.ui.after}</span>${esc(w.after)}</p></div>`).join("")}</div>`;
}

function keyNumbers(p) {
  if (!p.keyNumbers || !p.keyNumbers.length) return "";
  return `<div class="kpis">${p.keyNumbers.map(k => `<div class="kpi${k.primary ? " primary" : ""}"><b>${esc(k.value)}</b><span>${esc(k.label)}</span></div>`).join("")}</div>`;
}

function projectCard(p, plain) {
  const role = p.role ? `<dt>${SITE.ui.myRole}</dt><dd>${esc(p.role)}${p.actions && p.actions.length ? `<ul class="key-actions">${p.actions.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}</dd>` : "";
  const rows = (p.problem ? `<dt>${SITE.ui.problem}</dt><dd>${esc(p.problem)}</dd>` : "") + role + (p.outcome ? `<dt>${SITE.ui.outcome}</dt><dd>${esc(p.outcome)}</dd>` : "");
  const built = (p.howBuilt && p.howBuilt.length) || p.tools || (p.workflow && p.workflow.length)
    ? `<details class="built"${plain ? " open" : ""}><summary>${SITE.ui.howBuilt}</summary><div class="built-body">
        ${(p.howBuilt || []).map(t => `<p>${esc(t)}</p>`).join("")}
        ${p.tools ? `<p><b>${SITE.ui.tools}</b> ${esc(p.tools)}</p>` : ""}
        ${workflow(p)}</div></details>`
    : "";
  return `<article class="card${p.featured ? " feature" : ""}">${p.featured ? `<span class="chip">${SITE.ui.featuredProject}</span>` : ""}
    <span class="title">${esc(p.title)}</span>${p.period ? `<span class="period">${esc(p.period)}</span>` : ""}
    ${p.summary ? `<p class="summary">${esc(p.summary)}</p>` : ""}${keyNumbers(p)}<dl>${rows}</dl>
    ${p.credit ? `<span class="credit">${esc(p.credit)}</span>` : ""}
    ${built}
    ${p.sourceUrl ? `<a href="${esc(p.sourceUrl)}" target="_blank" rel="noopener">${esc(p.sourceLabel || SITE.ui.source)}</a>` : ""}</article>`;
}

function certificateRows() {
  return SITE.certificates.map(c => ({
    period: c.issued, title: c.name,
    detail: [c.issuer, c.validUntil ? SITE.ui.validUntil + c.validUntil : ""].filter(Boolean).join(", ")
  }));
}
function educationRows() {
  return SITE.education.map(e => ({ period: e.period, title: e.title, detail: e.school }));
}

const RENDERERS = {
  about: (lvl, { plain } = {}) => `<span class="kicker">${esc(SITE.sections.about.title)}</span>`
    + `<div class="greeting"><img class="portrait" src="assets/portrait.jpg" width="56" height="56" alt="${SITE.ui.portraitAlt}"><h${lvl}>${esc(SITE.sections.about.heading)}</h${lvl}></div>`
    + `<p class="headline">${esc(SITE.person.headline)}</p>`
    + `<p>${esc(SITE.about.intro)}</p>`
    + (plain ? "" : aboutNextSteps())
    + `<p class="location">${esc(SITE.about.location)}</p>`
    + (!plain ? "" : `<div class="card"><b>${SITE.ui.languages}</b><div class="chips">${SITE.languages.map(l => `<span class="chip">${esc(l)}</span>`).join("")}</div></div>`),
  experience: (lvl) => heading("experience", lvl) + `<p class="lede">${esc(SITE.experienceIntro)}</p>`
    + timeline(SITE.experience.map(r => ({ period: r.period, title: `${r.title}, ${r.company}`, detail: r.summary }))),
  projects: (lvl, opts = {}) => heading("projects", lvl)
    + SITE.projects.map(p => p.placeholder ? placeholderBox(p) : projectCard(p, opts.plain)).join(""),
  toolkit: (lvl) => heading("toolkit", lvl)
    + SITE.toolGroups.map(g => `<div class="tool-card"><h${lvl + 1} class="tool-group">${esc(g.title)}</h${lvl + 1}>`
      + `<ul class="tools">${SITE.tools.filter(t => t.group === g.key).map(t => `<li><b>${esc(t.name)}</b><span>${esc(t.sentence)}</span></li>`).join("")}</ul></div>`).join(""),
  education: (lvl, opts = {}) => heading("education", lvl) + (opts.plain
    ? `<h${lvl + 1}>${SITE.ui.certificates}</h${lvl + 1}>${timeline(certificateRows())}<h${lvl + 1}>${SITE.ui.education}</h${lvl + 1}>${timeline(educationRows())}`
    : `<div class="tabs" role="tablist" aria-label="${SITE.ui.show}">
        <button type="button" role="tab" aria-selected="true" data-tab="certs">${SITE.ui.certificates}</button>
        <button type="button" role="tab" aria-selected="false" data-tab="edu">${SITE.ui.education}</button></div>
       <div data-pane="certs">${timeline(certificateRows())}</div>
       <div data-pane="edu" hidden>${timeline(educationRows())}</div>`),
  contact: (lvl) => heading("contact", lvl)
    + `<div class="contact-hero">
       ${SITE.contact.photo ? `<img class="contact-photo" src="${esc(SITE.contact.photo.src)}" width="${SITE.contact.photo.width}" height="${SITE.contact.photo.height}" alt="${esc(SITE.contact.photo.alt)}" loading="lazy" decoding="async">` : ""}
       <div class="contact-text"><p>${esc(SITE.contact.intro)}</p>
       <div class="contact-actions">
         <a class="cta" href="mailto:${esc(SITE.person.email)}">${btnIcon("plane")}${SITE.ui.emailMe}</a>
         <a class="ghost" href="${esc(SITE.person.linkedin)}" target="_blank" rel="noopener">${btnIcon("plus")}${SITE.ui.linkedin}</a>
       </div></div></div>
       <div class="copyrow"><code>${esc(SITE.person.email)}</code><button type="button" class="btn small" data-copy="${esc(SITE.person.email)}">${SITE.ui.copy}</button></div>
       <div class="icebreakers"><h3>${SITE.ui.icebreaker}</h3>
         <ul>${SITE.contact.icebreakers.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>`
};

function renderExtra(key) {
  const x = SITE.extras[key];
  const photo = ph => `<figure class="photo"><img src="${esc(ph.src)}" width="${ph.width}" height="${ph.height}" alt="${esc(ph.alt)}" loading="lazy" decoding="async"><figcaption>${esc(ph.caption)}</figcaption></figure>`;
  const [first, ...rest] = x.photos || [];
  return `<span class="kicker">${esc(x.label)}</span><h2>${esc(x.title)}</h2>`
    + (first ? photo(first) : "")
    + x.paragraphs.map(t => `<p>${esc(t)}</p>`).join("")
    + rest.map(photo).join("");
}

function renderSection(key) {
  if (SITE.extras && SITE.extras[key]) return renderExtra(key);
  return (RENDERERS[key] || RENDERERS[DEFAULT_SECTION])(2);
}

function renderResume() {
  return SECTION_ORDER.map(k => `<section>${RENDERERS[k](2, { plain: true })}</section>`).join("");
}
