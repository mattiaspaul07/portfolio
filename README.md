# Mattias Paul portfolio

An explorable isometric office ("the Support Floor") where each object opens a part of my professional story, plus a plain résumé view.

Plain HTML, CSS and JavaScript: no build step, no dependencies.

## Run it locally

Double-click `index.html`, or open it in any browser.

## Change the content

All text lives in `js/content.js`.

- Add a project: add an object to `projects` (same fields as the featured one). Set `featured: true` on only one.
- Add a role: add a row at the top of `experience`.
- Add a certificate: add a row to `certificates` with a `sortKey` like `2027-03` (newest first).
- Never add: home address, date of birth, relationship status, phone number, referees, credential IDs.

After editing, open `tests/tests.html` in a browser: every line should be green (PASS).

The downloadable CV is `assets/Mattias-Paul-CV.pdf`. It was generated from the résumé view (`resume.html`) and contains only public information. Replace it with your own public version whenever you like.

## Files

| Path | What it does |
|---|---|
| `index.html` | The explorable page |
| `resume.html` | Plain résumé view |
| `css/styles.css` | All styling, day and evening colours, phone layout |
| `js/content.js` | All text |
| `js/render.js` | Turns content into the panel and résumé HTML |
| `js/iso.js` | Isometric drawing helpers |
| `js/walk.js` | Pathfinding for the avatar |
| `js/room.js` | The room, markers, avatar, light switch and coffee break |
| `js/app.js` | Connects menu, room and panel |
| `tests/` | In-browser tests |
| `docs/` | Design document, build plan and the reference mockup |

## Deploy on Vercel

1. Sign in at vercel.com with GitHub.
2. Add New, Project, import `mattiaspaul07/portfolio`.
3. Framework preset: Other. Leave build command and output directory empty. Deploy.

Every push to `main` then updates the live site automatically.
