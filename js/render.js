// Turns SITE content into HTML for the section panel and the résumé view.
const SECTION_ORDER = ["about", "experience", "projects", "toolkit", "education", "contact"];
const DEFAULT_SECTION = "about";   // the section shown when the page loads

function esc(text) {
  return String(text).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
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

function keyNumbers(p) {
  if (!p.keyNumbers || !p.keyNumbers.length) return "";
  return `<div class="kpis">${p.keyNumbers.map(k => `<div class="kpi"><b>${esc(k.value)}</b><span>${esc(k.label)}</span></div>`).join("")}</div>`;
}

function projectCard(p) {
  const rows = [["Challenge", p.challenge], ["My contribution", p.contribution], ["Tools", p.tools], ["Outcome", p.outcome]]
    .filter(([, v]) => v).map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join("");
  return `<article class="card${p.featured ? " feature" : ""}">${p.featured ? '<span class="chip">Featured project</span>' : ""}
    <span class="title">${esc(p.title)}</span>${keyNumbers(p)}<dl>${rows}</dl>
    ${p.credit ? `<span class="credit">${esc(p.credit)}</span>` : ""}
    ${p.sourceUrl ? `<a href="${esc(p.sourceUrl)}" target="_blank" rel="noopener">${esc(p.sourceLabel || "Source")}</a>` : ""}</article>`;
}

function certificateRows() {
  return SITE.certificates.map(c => ({
    period: c.issued, title: c.name,
    detail: [c.issuer, c.validUntil ? "valid until " + c.validUntil : ""].filter(Boolean).join(", ")
  }));
}
function educationRows() {
  return SITE.education.map(e => ({ period: e.period, title: e.title, detail: e.school }));
}

const RENDERERS = {
  about: (lvl) => heading("about", lvl)
    + `<div class="intro-card"><img class="portrait" src="assets/portrait.jpg" width="96" height="96" alt="Portrait of Mattias Paul"><p class="headline">${esc(SITE.person.headline)}</p></div>`
    + (SITE.about.placeholder ? placeholderBox(SITE.about) : SITE.about.paragraphs.map(t => `<p>${esc(t)}</p>`).join(""))
    + `<div class="card"><b>Languages</b><div class="chips">${SITE.languages.map(l => `<span class="chip">${esc(l)}</span>`).join("")}</div></div>`,
  experience: (lvl) => heading("experience", lvl)
    + timeline(SITE.experience.map(r => ({ period: r.period, title: `${r.title}, ${r.company}`, detail: r.summary }))),
  projects: (lvl) => heading("projects", lvl)
    + SITE.projects.map(p => p.placeholder ? placeholderBox(p) : projectCard(p)).join(""),
  toolkit: (lvl) => heading("toolkit", lvl)
    + `<ul class="tools">${SITE.tools.map(t => `<li><b>${esc(t.name)}</b><span>${esc(t.sentence)}</span></li>`).join("")}</ul>`,
  education: (lvl, opts = {}) => heading("education", lvl) + (opts.plain
    ? `<h${lvl + 1}>Certificates</h${lvl + 1}>${timeline(certificateRows())}<h${lvl + 1}>Education</h${lvl + 1}>${timeline(educationRows())}`
    : `<div class="tabs" role="tablist" aria-label="Show">
        <button type="button" role="tab" aria-selected="true" data-tab="certs">Certificates</button>
        <button type="button" role="tab" aria-selected="false" data-tab="edu">Education</button></div>
       <div data-pane="certs">${timeline(certificateRows())}</div>
       <div data-pane="edu" hidden>${timeline(educationRows())}</div>`),
  contact: (lvl) => heading("contact", lvl)
    + `<p>Want help with your Zendesk setup? Send me an email.</p>
       <div class="copyrow"><code>${esc(SITE.person.email)}</code><button type="button" class="btn" data-copy="${esc(SITE.person.email)}">Copy</button></div>
       <p><a href="${esc(SITE.person.linkedin)}" target="_blank" rel="noopener">LinkedIn profile</a></p>`
};

function renderSection(key) {
  return (RENDERERS[key] || RENDERERS[DEFAULT_SECTION])(2);
}

function renderResume() {
  return SECTION_ORDER.map(k => `<section>${RENDERERS[k](2, { plain: true })}</section>`).join("");
}
