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

function workflow(p) {
  if (!p.workflow || !p.workflow.length) return "";
  return `<div class="beforeafter"><h3>How the workflow changed</h3>
    <div class="ba-head" aria-hidden="true"><span>Before</span><span>After</span></div>
    ${p.workflow.map(w => `<div class="ba-row"><b class="ba-step">${esc(w.step)}</b>
      <p class="ba-before"><span class="ba-tag">Before</span>${esc(w.before)}</p>
      <p class="ba-after"><span class="ba-tag">After</span>${esc(w.after)}</p></div>`).join("")}</div>`;
}

function keyNumbers(p) {
  if (!p.keyNumbers || !p.keyNumbers.length) return "";
  return `<div class="kpis">${p.keyNumbers.map(k => `<div class="kpi${k.primary ? " primary" : ""}"><b>${esc(k.value)}</b><span>${esc(k.label)}</span></div>`).join("")}</div>`;
}

function projectCard(p, plain) {
  const role = p.role ? `<dt>My role</dt><dd>${esc(p.role)}${p.actions && p.actions.length ? `<ul class="key-actions">${p.actions.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}</dd>` : "";
  const rows = (p.problem ? `<dt>Problem</dt><dd>${esc(p.problem)}</dd>` : "") + role + (p.outcome ? `<dt>Outcome</dt><dd>${esc(p.outcome)}</dd>` : "");
  const built = (p.howBuilt && p.howBuilt.length) || p.tools || (p.workflow && p.workflow.length)
    ? `<details class="built"${plain ? " open" : ""}><summary>How I built it</summary><div class="built-body">
        ${(p.howBuilt || []).map(t => `<p>${esc(t)}</p>`).join("")}
        ${p.tools ? `<p><b>Tools:</b> ${esc(p.tools)}</p>` : ""}
        ${workflow(p)}</div></details>`
    : "";
  return `<article class="card${p.featured ? " feature" : ""}">${p.featured ? '<span class="chip">Featured project</span>' : ""}
    <span class="title">${esc(p.title)}</span>${keyNumbers(p)}<dl>${rows}</dl>
    ${p.credit ? `<span class="credit">${esc(p.credit)}</span>` : ""}
    ${built}
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
  projects: (lvl, opts = {}) => heading("projects", lvl)
    + SITE.projects.map(p => p.placeholder ? placeholderBox(p) : projectCard(p, opts.plain)).join(""),
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
    + `<div class="contact-hero">
       ${SITE.contact.photo ? `<img class="contact-photo" src="${esc(SITE.contact.photo.src)}" width="${SITE.contact.photo.width}" height="${SITE.contact.photo.height}" alt="${esc(SITE.contact.photo.alt)}" loading="lazy" decoding="async">` : ""}
       <div class="contact-text"><p>${esc(SITE.contact.intro)}</p>
       <div class="contact-actions">
         <a class="cta" href="mailto:${esc(SITE.person.email)}">Email me</a>
         <a class="ghost" href="${esc(SITE.person.linkedin)}" target="_blank" rel="noopener">Connect on LinkedIn</a>
       </div></div></div>
       <div class="copyrow"><code>${esc(SITE.person.email)}</code><button type="button" class="btn small" data-copy="${esc(SITE.person.email)}">Copy</button></div>
       <div class="icebreakers"><h3>Need an icebreaker? Ask me about:</h3>
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
