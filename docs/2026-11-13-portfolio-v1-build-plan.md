# Portfolio version 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **For Mattias:** you are the builder. Work through one task at a time, tick the boxes, and ask Claude when a step is unclear or a check fails. Each task ends with something you can see working in the browser.

**Goal:** A working, deployed version 1 of the portfolio: header menu, introduction with portrait, a static clickable isometric room, a section panel that renders all content from one data file (Projects complete as the example section), and a plain résumé view.

**Architecture:** Plain HTML, CSS and JavaScript with no build step. All text lives in `js/content.js`; `js/render.js` turns it into HTML; `js/iso.js` and `js/room.js` draw the room as SVG; `js/app.js` connects menu, room and panel. Scripts are loaded with ordinary `<script src>` tags, so the site works from a double-clicked file and from static hosting.

**Tech Stack:** HTML, CSS, vanilla JavaScript (ES2020), SVG, Google Fonts, Git, GitHub Pages.

**Spec:** `docs/2026-11-13-portfolio-design.md` (read sections 4, 5, 7 and 8 before starting). Visual reference: `docs/reference/support-floor-mockup.html` (open it in a browser; its source holds the exact drawing code you will port in Task 6).

## Global Constraints

- Language: English. No emojis in text or code.
- Never put in any file: home address, date of birth, relationship status, phone number, referees, credential IDs.
- No invented results: unknown content is `placeholder: true` and shows as a dashed box labelled "Placeholder".
- Team results are credited to the team (Lyse credit line is fixed copy, see Task 2).
- Colours: accent `#2f7d6d`, markers `#e07a5f`, panel `#fffdf8`, page `#f4efe6`, text `#1f2624`, muted `#5d6864`, lines `#e2d9c8`.
- Fonts: Bricolage Grotesque (headings), Atkinson Hyperlegible (body), IBM Plex Mono (labels), Caveat 700 ("Say hi!" note only); each with a system fallback.
- Menu order and names: About, Experience, Projects, Toolkit, Education, Contact. Default section on load: Projects.
- Headline copy: "Hi, I'm Mattias. I connect people, processes and technology." Hint copy: "Explore my workspace to get to know me, or use the menu above."
- Sound button exists, shows as off, and plays nothing in version 1.
- Must honour `prefers-reduced-motion` and work by keyboard (Tab, Enter, Space).
- Phone layout below 860 px wide: one column; menu becomes a sideways-scrolling tab row; no horizontal page scroll at 360 px.

## Review Focus

1. **Missing optional fields** (a project without `sourceUrl`, a certificate without `validUntil`): nothing may render the text "undefined" or an empty link. Test in Task 3.
2. **Special characters in content** (`&`, `<`, quotes, "Résumé", "videregående"): must display as written, never break the HTML. Test in Task 3 (`esc()`).
3. **Keyboard-only visitor** choosing a marker: the panel must update and focus must move to the panel heading, so screen readers announce it. Check in Task 7.
4. **Long text at phone width** (360 px): panel and cards wrap; no sideways page scroll. Check in Task 9.
5. **Private details sneaking into content** while editing later: the content test fails if forbidden patterns appear. Test in Task 2.

---

## File map

| File | Responsibility | Created in |
|---|---|---|
| `index.html` | Page skeleton: header, intro, room container, panel | Task 1 |
| `css/styles.css` | Tokens, layout, panel, menu, markers, responsive, reduced motion | Task 1, extended later |
| `assets/portrait.jpg` | 240 x 240 portrait | Task 1 |
| `tests/tests.html`, `tests/test-kit.js` | In-browser test runner | Task 2 |
| `js/content.js` | Global `SITE` with all content | Task 2 |
| `js/render.js` | `esc()`, `renderSection(key)` and helpers | Task 3 |
| `js/app.js` | Menu, panel, selection state, room wiring | Task 4, extended in Task 7 |
| `js/iso.js` | `iso()`, `pts()`, `shade()`, `el()`, `poly()`, `line()`, `box()` | Task 5 |
| `js/room.js` | `drawRoom(svg, onPick, onHover)` | Task 6 |
| `resume.html` | Plain résumé view | Task 8 |

---

### Task 0: Tools and repository

**Files:** none yet.

- [ ] **Step 1: Install tools** (skip what you already have): Visual Studio Code, Git, a GitHub account, and Chrome or Firefox.
- [ ] **Step 2: Create the repository.** On GitHub create an empty public repository named `portfolio`. Then in a terminal:

```bash
git clone https://github.com/<your-username>/portfolio.git
```

- [ ] **Step 3: Copy the `docs/` folder** from this planning session into the cloned folder (it holds the design, this plan and the reference mockup).
- [ ] **Step 4: Commit**

```bash
git add docs
git commit -m "docs: add design, build plan and reference mockup"
```

---

### Task 1: Page skeleton and layout

**Files:**
- Create: `index.html`, `css/styles.css`, `assets/portrait.jpg` (copy `docs/reference/portrait-240.jpg`)

**Interfaces:**
- Produces (element ids later tasks use): `#nav` (menu container), `#cv` (Download CV button), `#sound` (sound button), `#room` (empty `<svg viewBox="-205 -150 410 360">`), `#panel` (`<section aria-live="polite">`).

- [ ] **Step 1: Write `index.html`** with: `<html lang="en">`, charset and viewport metas, `<title>Mattias Paul</title>`, the Google Fonts link for the four fonts, `css/styles.css`, then in the body:
  - `<header>` with name "Mattias Paul", subtitle "Senior Consultant, Kundelab", `<nav id="nav" aria-label="Sections">` (empty), `<a id="cv" class="cta" href="assets/Mattias-Paul-CV.pdf" download>Download CV</a>`, `<button id="sound" aria-pressed="false" aria-label="Sound off">` with a speaker icon.
  - `<main>` with two columns: left `<div class="scene">` holding the intro (portrait `<img src="assets/portrait.jpg" width="96" height="96" alt="Portrait of Mattias Paul">`, the headline as `<h1>`, the hint line) and `#room`; right `#panel`.
  - Script tags at the end of the body in this order: `js/content.js`, `js/render.js`, `js/iso.js`, `js/room.js`, `js/app.js` (the files can be empty for now).
- [ ] **Step 2: Write `css/styles.css`**: colour and font tokens on `:root` (values from Global Constraints), header as a flex row that wraps, `main` as `grid-template-columns: minmax(0,1.3fr) minmax(0,1fr)`, portrait with `border-radius: 18px`, panel with `padding: 24px 26px`, and the phone rule `@media (max-width: 860px)` switching to one column, portrait 64 px, nav `flex-wrap: nowrap; overflow-x: auto`.
- [ ] **Step 3: Check in the browser.** Double-click `index.html`. Expected: header with name, empty menu area, Download CV button; portrait and headline on the left; empty panel on the right. Narrow the window below 860 px: one column, no sideways scroll.
- [ ] **Step 4: Commit**

```bash
git add index.html css assets
git commit -m "feat: page skeleton and responsive layout"
```

---

### Task 2: Content file and test runner

**Files:**
- Create: `tests/test-kit.js`, `tests/tests.html`, `js/content.js`

**Interfaces:**
- Produces: global `SITE` (shape below); global `test(name, fn)` and `assertEqual(actual, expected, label)` for all later tests.

- [ ] **Step 1: Write `tests/test-kit.js`** with `test(name, fn)` (runs `fn`, appends a green "PASS name" or red "FAIL name: message" line to `<main id="results">`) and `assertEqual(actual, expected, label)` (throws `label: expected X, got Y` when `JSON.stringify` differs). About 20 lines.
- [ ] **Step 2: Write `tests/tests.html`**: loads `../js/content.js`, `../js/render.js`, `../js/iso.js`, `test-kit.js`, then an inline script with the content tests:

```js
test("every section has a menu name and an object", () => {
  ["about","experience","projects","toolkit","education","contact"].forEach(k => {
    assertEqual(typeof SITE.sections[k].menu, "string", k + " menu");
    assertEqual(typeof SITE.sections[k].object, "string", k + " object");
  });
});
test("no private details in content", () => {
  const all = JSON.stringify(SITE);
  [/\+47/, /Storhaugen/, /1999/, /Samboer/i, /Gjøse/, /Bratten/].forEach(rx =>
    assertEqual(rx.test(all), false, "forbidden " + rx));
});
test("exactly one featured project", () => {
  assertEqual(SITE.projects.filter(p => p.featured).length, 1, "featured");
});
test("certificates are newest first", () => {
  const order = SITE.certificates.map(c => c.sortKey);
  assertEqual(order, [...order].sort().reverse(), "order");
});
```

- [ ] **Step 3: Open `tests/tests.html`.** Expected: FAIL lines ("SITE is not defined").
- [ ] **Step 4: Write `js/content.js`.** This is fixed copy from the design conversation; type it as given:

```js
const SITE = {
  person: {
    name: "Mattias Paul", title: "Senior Consultant, Kundelab",
    headline: "Hi, I'm Mattias. I connect people, processes and technology.",
    email: "mattias.paul07@gmail.com",
    linkedin: "https://www.linkedin.com/in/mattias-paul-a3ab39181/"
  },
  sections: {
    about:      { menu: "About",      title: "About me",                     object: "Sofa" },
    experience: { menu: "Experience", title: "Experience",                   object: "Whiteboard" },
    projects:   { menu: "Projects",   title: "Projects",                     object: "Desk" },
    toolkit:    { menu: "Toolkit",    title: "My toolkit",                   object: "Toolbox" },
    education:  { menu: "Education",  title: "Education and certifications", object: "Bookshelf" },
    contact:    { menu: "Contact",    title: "Contact",                      object: "Pin board" }
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
    { placeholder: true, title: "Placeholder project", text: "Challenge, contribution, tools, outcome. Waiting for details." },
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
```

- [ ] **Step 5: Reload `tests/tests.html`.** Expected: four PASS lines.
- [ ] **Step 6: Commit**

```bash
git add tests js/content.js
git commit -m "feat: content data file with privacy and ordering tests"
```

---

### Task 3: Rendering sections

**Files:**
- Create: `js/render.js`
- Modify: `tests/tests.html` (add tests)

**Interfaces:**
- Consumes: `SITE` (Task 2).
- Produces: `esc(text) -> string`; `renderSection(key) -> string` (HTML for the panel, starting with `<span class="kicker">` and an `<h2>` with the section title); `renderResume() -> string` (all sections in menu order, used in Task 8).

- [ ] **Step 1: Add failing tests** to `tests/tests.html`:

```js
test("esc escapes HTML", () => assertEqual(esc(`<a & "b">`), "&lt;a &amp; &quot;b&quot;&gt;", "esc"));
test("projects panel shows the featured card first", () => {
  const html = renderSection("projects");
  assertEqual(html.indexOf("Unifying customer service") < html.indexOf("Placeholder project"), true, "order");
  assertEqual(html.includes("My contribution"), true, "label");
});
test("missing optional fields never print undefined", () => {
  ["about","experience","projects","toolkit","education","contact"].forEach(k =>
    assertEqual(renderSection(k).includes("undefined"), false, k));
});
test("placeholders are labelled", () => assertEqual(renderSection("about").includes("Placeholder"), true, "about"));
test("education has a certificates and education toggle", () => {
  const html = renderSection("education");
  assertEqual(html.includes('data-tab="certs"') && html.includes('data-tab="edu"'), true, "tabs");
});
```

- [ ] **Step 2: Reload tests.** Expected: the new tests FAIL ("esc is not defined").
- [ ] **Step 3: Implement `js/render.js`.** `esc` replaces `& < > " '`. One small function per section; `renderSection(key)` picks one from an object map. Markup to produce (class names are used by the CSS in Task 4):
  - Featured project: `<article class="card feature">` with a "Featured project" chip, title, then a `<dl>` with `<dt>` Challenge, My contribution, Tools, Outcome above each `<dd>`, then the credit line (`class="credit"`) and the source link (only if `sourceUrl` exists, `target="_blank" rel="noopener"`).
  - Placeholder items: `<div class="ph"><b>Placeholder.</b> text</div>`.
  - Experience and education: `<ol class="tl">` rows with period and title/company.
  - Toolkit: `<ul class="tools">` with name in `<b>` and the sentence in a `<span>`.
  - Education: tab buttons `role="tab"` with `data-tab="certs"` (selected) and `data-tab="edu"`, and two lists with `data-pane`, the education one `hidden`. Certificates show issuer, plus ", valid until X" only when `validUntil` exists.
  - Contact: the email as `<code>` with a Copy button `data-copy`, plus the LinkedIn link.
  - About: placeholder box plus a "Languages" card with chips.
- [ ] **Step 4: Reload tests.** Expected: all PASS.
- [ ] **Step 5: Commit**

```bash
git add js/render.js tests/tests.html
git commit -m "feat: render every section from content"
```

---

### Task 4: Menu and panel

**Files:**
- Create: `js/app.js`
- Modify: `css/styles.css` (panel, cards, tabs, tools, timeline, menu styles)

**Interfaces:**
- Consumes: `SITE`, `renderSection(key)`.
- Produces: `select(key, {focus})` in `app.js`: renders the panel, sets `aria-current="true"` on the matching menu button, and calls `room.setSelected(key)` once the room exists (Task 7). `state.current` holds the key.

- [ ] **Step 1: Implement `app.js`**: build one `<button data-key>` per section in menu order inside `#nav` (icon optional in version 1); clicking calls `select(key, {focus: true})`; on load call `select("projects", {focus: false})`. Add one delegated click listener on `document` for `[data-tab]` (toggle `aria-selected` and `hidden` panes) and `[data-copy]` (copy with `navigator.clipboard.writeText`, button text "Copied" for 1.5 s, fall back to "Select the address" if it fails). With `{focus: true}`, give the panel `<h2>` `tabindex="-1"` and focus it.
- [ ] **Step 2: Style the panel** in `styles.css`: `.kicker` (mono, uppercase, accent), `.card`, `.card.feature` (2 px accent border, `padding: 20px 22px`), `dt` above `dd` (mono label, accent colour, `margin-top: 10px`), `.ph` dashed box, `.tl` rows (`grid-template-columns: 96px 1fr`), `.tools`, `.tabs` pill toggle, `nav button[aria-current="true"]`.
- [ ] **Step 3: Check in the browser.** Expected: Projects panel on load with the readable featured card; each menu item swaps the panel; the Education toggle switches lists; Copy works. Tab to a menu item and press Enter: focus lands on the panel heading.
- [ ] **Step 4: Commit**

```bash
git add js/app.js css/styles.css
git commit -m "feat: menu and section panel"
```

---

### Task 5: Isometric helpers

**Files:**
- Create: `js/iso.js`
- Modify: `tests/tests.html`

**Interfaces:**
- Produces: `S = 20`; `iso(x, y, z) -> [sx, sy]` with `sx = (x - y) * 0.866 * S`, `sy = (x + y) * 0.5 * S - z * S`; `pts(points) -> "sx,sy sx,sy ..."`; `shade(hex, factor) -> "#rrggbb"` (always returns hex); `el(tag, attrs, parent) -> SVGElement`; `poly(g, points, fill, extra)`; `line(g, points, stroke, width)`; `box(g, x, y, z, w, d, h, color)` draws the +y face, +x face and top face, shaded 0.86, 0.72 and 1.07.

- [ ] **Step 1: Add failing tests:**

```js
test("iso maps one unit along x", () => assertEqual(iso(1,0,0).map(v => +v.toFixed(2)), [17.32, 10], "x"));
test("iso lifts by z", () => assertEqual(iso(0,0,1), [0, -20], "z"));
test("shade returns hex", () => assertEqual(shade("#808080", 0.5), "#404040", "shade"));
test("shade clamps at white", () => assertEqual(shade("#ffffff", 2), "#ffffff", "clamp"));
```

- [ ] **Step 2: Reload tests.** Expected: FAIL.
- [ ] **Step 3: Implement `js/iso.js`.** Port the helpers from `docs/reference/support-floor-mockup.html` (search for `const iso=` and `function box(`), using the hex version of `shade` from the list above.
- [ ] **Step 4: Reload tests.** Expected: all PASS.
- [ ] **Step 5: Commit**

```bash
git add js/iso.js tests/tests.html
git commit -m "feat: isometric drawing helpers"
```

---

### Task 6: The room

**Files:**
- Create: `js/room.js`
- Modify: `css/styles.css` (`.hot.lit` outline, markers)

**Interfaces:**
- Consumes: everything in `iso.js`; `SITE.sections[key].object` and `.title` for labels.
- Produces: `drawRoom(svg, { onPick(key), onHover(key | null) }) -> { setSelected(key), setHover(key | null) }`.

- [ ] **Step 1: Port the static room** from the reference mockup into `drawRoom`, in this order (line numbers refer to `docs/reference/support-floor-mockup.html`): room shell (from line 372), window (383), door with medal and mat (396), whiteboard (407), pin board with "Say hi!" note (416), light switch drawing only, no click yet (437), bookshelf (448), chair and desk (455), sofa and coffee table with cup (479), lamp (513), workbench and toolbox (517), sneakers (524). Leave out the avatar, walking, coffee break and evening palette: they are version 2. Use the daylight colours only.
- [ ] **Step 2: Draw floor objects back to front** by sorting them on `x + w/2 + y + d/2` of their footprint (the mockup does this before appending), so nothing overlaps wrongly.
- [ ] **Step 3: Make destinations clickable.** Wrap each destination's drawing in `<g class="hot" aria-hidden="true">`, add a transparent padded rectangle (`getBBox()` plus 6 px each side) as first child, and call `onPick(key)` on click and `onHover(key)` / `onHover(null)` on mouseenter/leave.
- [ ] **Step 4: Add markers** in a top layer, using these anchors (top centre of each object) and the icon paths from the mockup's `ICONS` (line 309):

| key | anchor (x, y, z) |
|---|---|
| about | 9.24, 3.85, 1.45 |
| experience | 0.02, 2.9, 5.0 |
| projects | 5.3, 6.21, 2.15 |
| toolkit | 2.4, 9.45, 2.05 |
| education | 4.0, 0.4, 3.8 |
| contact | 0.02, 6.95, 4.7 |

  Each marker: stem from the anchor up 26 px, disc radius 12 (cream fill, coral 2.5 px stroke), icon inside, a hidden name tag above. Markers are `<g role="button" tabindex="0" aria-label="<section title>">` and respond to click, Enter and Space with `onPick(key)`.
- [ ] **Step 5: Implement `setSelected` and `setHover`:** toggle class `lit` on the matching object groups (selected or hovered) and `sel` / `lit` on markers. CSS: `.hot.lit{filter:drop-shadow(0 0 1.5px #e07a5f) drop-shadow(0 0 5px rgba(224,122,95,.75))}`; tag visible on `:hover`, `.lit`, `.sel`; selected disc filled coral with white icon.
- [ ] **Step 6: Check in the browser.** Expected: the room matches the reference mockup minus the avatar; each marker sits on top of its object; hovering an object lights it up.
- [ ] **Step 7: Commit**

```bash
git add js/room.js css/styles.css
git commit -m "feat: static isometric room with markers"
```

---

### Task 7: Connect room, menu and panel

**Files:**
- Modify: `js/app.js`, `css/styles.css`

**Interfaces:**
- Consumes: `drawRoom` (Task 6), `select` (Task 4).

- [ ] **Step 1: Call `drawRoom(document.getElementById("room"), { onPick: k => select(k, {focus: true}), onHover: k => room.setHover(k) })`** in `app.js` before the first `select`, and make `select` call `room.setSelected(key)`. Menu buttons also call `room.setHover` on mouseenter/leave.
- [ ] **Step 2: Reduced motion.** In CSS, wrap marker pulses and transitions in `@media (prefers-reduced-motion: no-preference)` so they only run when motion is allowed.
- [ ] **Step 3: Keyboard check.** Unplug the mouse mentally: Tab through the menu, then into the room markers. Enter on a marker: panel updates, the object lights up, focus moves to the panel heading. A screen reader (VoiceOver: Cmd+F5 on Mac; Narrator: Ctrl+Win+Enter on Windows) reads the new heading.
- [ ] **Step 4: Commit**

```bash
git add js/app.js css/styles.css
git commit -m "feat: room, menu and panel stay in sync"
```

---

### Task 8: Résumé view and CV download

**Files:**
- Create: `resume.html`; `assets/Mattias-Paul-CV.pdf` (public version, see below)
- Modify: `js/render.js` (`renderResume`), `index.html` (link), `tests/tests.html`

**Interfaces:**
- Consumes: `renderSection`.
- Produces: `renderResume() -> string`.

- [ ] **Step 1: Add a failing test:**

```js
test("resume lists every section in menu order", () => {
  const html = renderResume();
  const pos = ["About me","Experience","Projects","My toolkit","Education and certifications","Contact"].map(t => html.indexOf(t));
  assertEqual(pos.every((p, i) => p >= 0 && (i === 0 || p > pos[i - 1])), true, "order");
});
```

- [ ] **Step 2: Implement `renderResume()`** by joining `renderSection` for every key in menu order, with both education lists visible (no toggle).
- [ ] **Step 3: Write `resume.html`**: same header (with a "Back to the workspace" link instead of the menu), name, headline, then `renderResume()` output. Add a `@media print` rule hiding the header buttons. Link to it from the index header as "Résumé view".
- [ ] **Step 4: Make the public CV PDF.** Copy your CV document, delete address, date of birth, relationship status, phone number and the referees section, export as `assets/Mattias-Paul-CV.pdf`. Open the PDF and check that none of those remain.
- [ ] **Step 5: Run tests and check.** All tests PASS; "Download CV" downloads the public PDF; the résumé view prints cleanly (browser print preview).
- [ ] **Step 6: Commit**

```bash
git add resume.html js/render.js index.html tests/tests.html assets/Mattias-Paul-CV.pdf
git commit -m "feat: resume view and public CV download"
```

---

### Task 9: Responsive and accessibility pass

**Files:**
- Modify: `css/styles.css`, any file a check sends you back to.

- [ ] **Step 1: Phone width.** In browser dev tools, set the width to 360 px. Expected: one column, menu scrolls sideways, room fits the width, panel text wraps, no sideways page scroll (`document.documentElement.scrollWidth` in the console equals 360).
- [ ] **Step 2: Contrast.** Check body text and muted text against the panel colour with any WCAG contrast checker. Expected: at least 4.5:1.
- [ ] **Step 3: Lighthouse.** Chrome dev tools, Lighthouse, Accessibility. Expected: score 90 or higher; fix any listed issue.
- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "fix: phone layout and accessibility pass"
```

---

### Task 10: Publish

- [ ] **Step 1: Push**

```bash
git push -u origin main
```

- [ ] **Step 2: Turn on GitHub Pages:** repository Settings, Pages, Source "Deploy from a branch", branch `main`, folder `/ (root)`.
- [ ] **Step 3: Check the live site** at `https://<your-username>.github.io/portfolio/`: menu, room, panel, résumé view, CV download, and `tests/tests.html` all PASS online.
- [ ] **Step 4: Tell Claude the link** for a review before you share it.

---

## After version 1 (separate plan)

Walking avatar A with pathfinding and redirect, light switch with evening palette, coffee break, phone bottom sheet, sound (if wanted). Each is already working in the reference mockup and will be ported in its own plan.
