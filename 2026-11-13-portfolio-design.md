# Mattias Paul portfolio: design

Date: 2026-11-13
Status: room design settled; version 1 scope proposed below
Reference mockup: https://claude.ai/artifact/CxKmddLiAqSJWSdtxP78SX (private link)

## 1. Intent

A personal résumé and portfolio site for Mattias Paul, Senior Consultant at Kundelab.

- **Main audience:** Kundelab clients deciding whether to hire Mattias as a Zendesk consultant.
- **Secondary audience:** recruiters and hiring managers.
- **What a visitor should leave with:** a clear sense of what Mattias can help with (Zendesk setup and optimisation, automation, project management, workshops), proof that he has done it before (Lyse Dialog), and an easy way to get in touch.
- **Why it is playful:** inspired by the sense of exploration on peteroravec.com, but with an original world and visual identity. Nothing (artwork, branding, layout) is copied from that site or from any existing game.

## 2. Goals, non-goals, anti-goals

**Goals**
- An explorable isometric office ("the Support Floor") where objects open sections.
- A direct route to every section: a persistent menu plus a plain résumé view.
- Works on desktop and phone, with keyboard, screen readers and reduced motion.
- Content kept in one data file, so projects and roles can be added without touching layout code.
- Mattias builds it himself, with plain HTML, CSS and JavaScript.

**Non-goals (for now)**
- No CMS, no backend, no contact form that sends email.
- No sound in version 1 (the toggle exists and is off; sound comes later, if at all).
- No multilingual version; the site is in English.

**Anti-goals (would be a failure even if it works)**
- A visitor has to play, walk or wait to read something.
- Any invented achievement, metric or project result.
- Private details on the public site (see section 4).

## 3. Approaches considered

**World (visual direction)**

| Option | Summary | Outcome |
|---|---|---|
| A. Harbour Town | Pixel-art west-coast harbour, houses as sections | Not chosen |
| B. The Support Floor | Isometric office, objects as sections | **Chosen** by Mattias |
| C. Ticket Archipelago | Map of islands named after ticket statuses | Not chosen |

**Avatar:** three styles were compared (refined blocks, soft rounded, pixel sprite). **Refined blocks (A)** was chosen because it matches the furniture.

**Build approach**

| Option | Trade-off | Outcome |
|---|---|---|
| 1. Plain HTML, CSS, JS, no build step | Simplest to learn and host; some hand-written rendering | **Chosen** |
| 2. Same plus Vite | Live reload, but Node setup | Not chosen |
| 3. Astro framework | Components, but a second thing to learn | Not chosen |
| Canvas game engine (e.g. Phaser) | Rejected: harder to make accessible, pushes towards "play to read" | Rejected |

## 4. Content rules

1. **Sources:** CV (2026), LinkedIn text pasted by Mattias, the Zendesk customer story about Lyse, and Mattias's own messages in the design conversation. Nothing else.
2. **No invented results.** Unknown parts are shown as clearly labelled placeholders until Mattias supplies them.
3. **Credit team results to the team.** Example: the Lyse backlog result is the customer service team's outcome, cited from Zendesk's story.
4. **Never published:** home address, date of birth, relationship status, phone number, referees and their contact details, credential IDs.
5. **Downloadable CV:** must be a separate public version of the PDF without the items in rule 4. The current CV contains all of them and must not be uploaded as is.
6. **Check with Kundelab** whether there are rules for how consultants present client work and services. (Unknown; Mattias to confirm.)

## 5. The experience

### 5.1 Page layout

- **Header (always visible):** name and title ("Senior Consultant, Kundelab"), section menu (About, Experience, Projects, Toolkit, Education, Contact), Download CV button, sound icon (off by default).
- **Left: introduction and room.** Portrait (rounded square, about 96 px), headline "Hi, I'm Mattias. I connect people, processes and technology.", hint line "Explore my workspace to get to know me, or use the menu above.", then the room.
- **Right: section panel.** Opens with Projects by default, so the featured Lyse case study is the first thing visitors read.
- **Phone:** menu becomes a sideways-scrolling row of tabs under the header; sections open as a bottom sheet below the room; portrait about 64 px.
- **Résumé view:** a separate plain page (`resume.html`) with all sections in order, no animation, printable from the browser.

### 5.2 The room (isometric, viewed from the front right)

| Zone | Object | Opens |
|---|---|---|
| Centre | Desk with centred monitor, chair, yellow project folder | **Projects** |
| Back-left wall | Large whiteboard with a timeline | **Experience** |
| Back-left wall, front part | Cork pin board with sticky notes, one reading "Say hi!" and one with an envelope | **Contact** |
| Front-left | Workbench with a red toolbox and screwdriver | **My toolkit** |
| Back-right wall, between door and window (equal gaps) | Bookshelf with framed certificate above | **Education and certifications** |
| Right | Sofa facing the desk, coffee table with a cup | **About me** |

Decoration only (no section): door with a medal on the handle, running sneakers on the door mat, light switch, floor lamp, window with fjord view, rug.

### 5.3 Interactions

- **Markers:** each destination has an icon disc on a short stem, anchored at the top centre of its object. The name appears on hover, keyboard focus and when selected. Selected marker is filled.
- **Highlighting:** hovering an object, its marker or its menu item gives the object a soft coral outline. The whole object is clickable, with a padded touch target.
- **Opening a section:** the panel updates immediately on click. The avatar then walks to the object (at most about 1.2 seconds), and a new click redirects it from where it is.
- **Floor clicks:** the avatar walks to the clicked spot.
- **Coffee break:** clicking the cup makes the avatar walk over, lift the cup and sip with steam for about 2.5 seconds. Opens no section.
- **Light switch** (left of the door): off is daylight, on is evening (night window, lamp and monitor glow). It is a real switch for screen readers.
- **Reduced motion:** no walking (avatar moves instantly), no pulsing, no steam animation.

### 5.4 Avatar

Refined blocks, built from the same box helper as the furniture: shaved head, dot eyes, small smile, dark green quarter-zip with a silver zip, dark trousers, white running shoes. Four facing directions; face visible when facing towards the viewer.

### 5.5 Visual identity

- **Palette:** sage walls, warm wood floor, teal (#2f7d6d) as accent, coral (#e07a5f) for markers, cream panels. Evening palette swaps to blue-grey walls and darker wood.
- **Type:** Bricolage Grotesque (headings), Atkinson Hyperlegible (body), IBM Plex Mono (labels), Caveat (the "Say hi!" note only). All from Google Fonts, with system fallbacks.

## 6. Section content

| Section | Content | Status |
|---|---|---|
| About me | Personal introduction; languages (Norwegian, English, German) | **Placeholder:** intro text needed from Mattias |
| Experience | Six roles, Kundelab back to Lyse Dialog 2019, with one line each from LinkedIn | Complete |
| Projects | Featured: "Unifying customer service on Zendesk at Lyse Dialog" (Challenge, My contribution, Tools, Outcome, credit line, source link); two placeholders | Featured complete; 2 placeholders |
| My toolkit | Eight tools, name plus one sentence | Complete |
| Education and certifications | Toggle between Certificates (8, newest first) and Education (BI bachelor, Sandnes vgs.) | Complete |
| Contact | Email shown as text with Copy button; LinkedIn link | Complete (public CV PDF pending) |

## 7. Technical design

### 7.1 Files

```
portfolio/
  index.html          the explorable page
  resume.html         plain résumé view
  css/
    styles.css        layout, panel, menu, tokens (day and evening)
  js/
    content.js        ALL text: sections, roles, projects, tools, certificates
    render.js         turns content into panel HTML (shared by index and résumé view)
    iso.js            isometric helpers: iso(), box(), poly(), line()
    room.js           draws the room and furniture, registers clickable objects
    avatar.js         draws the avatar and the coffee pose
    walk.js           grid, pathfinding, walking animation
    app.js            wires menu, panel, markers, light switch, phone sheet
  assets/
    portrait.jpg      about 240 x 240, compressed
    Mattias-Paul-CV.pdf   public version only (see 4.5)
  tests/
    tests.html        tiny in-browser test runner, no installs
  docs/
    (this document, the build plan, and reference/ with the final mockup)
```

Scripts load with plain `<script src>` tags in order (content, iso, room, avatar, walk, app). No modules or build step, so the site also works when the file is opened directly.

### 7.2 Content data shape

`content.js` defines one global object. Adding a project means adding one object to `projects`; adding a role means adding one to `experience`.

```js
const SITE = {
  person: { name, title, headline, email, linkedin },
  sections: { about, experience, projects, toolkit, education, contact }, // label, menu name, object, icon
  experience: [ { from, to, title, company, summary } ],
  projects:   [ { featured, title, challenge, contribution, tools, outcome, credit, sourceUrl } ],
  tools:      [ { name, sentence } ],
  certificates: [ { issued, name, issuer, validUntil } ],
  education:  [ { from, to, title, school } ],
  languages:  [ ... ]
};
```

Placeholders use the same shape with `placeholder: true`, which the renderer shows with a dashed border and the label "Placeholder".

### 7.3 Accessibility

- The room is an SVG group labelled as the workspace; markers are the focusable buttons (Tab, Enter, Space); objects themselves are hidden from screen readers to avoid duplicates.
- Keyboard selection moves focus to the panel heading.
- Text contrast at least WCAG AA; visible focus outlines.
- `prefers-reduced-motion` honoured as in 5.3.
- Everything in the room is also reachable from the menu and the résumé view.

### 7.4 Hosting

Static hosting: GitHub Pages or Netlify (free). A custom domain is optional and can be added later.

## 8. Version 1 scope

Following the brief ("a working experience with navigation and one complete example section before more elaborate animation"):

**In version 1**
- Header with menu and Download CV; phone tab row.
- Introduction with portrait.
- Static room with all furniture, markers, highlighting and clickable objects.
- Panel that renders every section from `content.js`; **Projects is the complete example section**, the others render whatever content exists.
- Résumé view page.
- Accessibility basics from 7.3.
- Deployed to static hosting.

**Version 2 (after version 1 works)**
- Walking avatar with pathfinding and redirect.
- Light switch and evening palette.
- Coffee break.
- Phone bottom sheet polish, pulse animations.

## 9. Open items for Mattias

1. About me text (a few sentences: background, interests, how you work with clients).
2. Public CV PDF without private details.
3. Details for further projects (challenge, contribution, tools, outcome).
4. Confirm Kundelab has no rules against this kind of site.
5. Hosting choice: GitHub Pages or Netlify.

## 10. Left to the builder

- Exact pixel sizes and breakpoints, as long as section 5 holds.
- Code style and naming inside each file.
- Whether the mockup's drawing code is copied and adapted, or rewritten step by step for learning (the plan rewrites it step by step).
