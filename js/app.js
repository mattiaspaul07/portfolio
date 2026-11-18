// Connects the menu, the room and the section panel.
const ICONS = window.ROOM_ICONS;   // defined in room.js, shared by menu and markers

const state = { current: null, room: null };
const nav = document.getElementById("nav");
const panel = document.getElementById("panel");

function select(key, { focus } = {}) {
  if (!SITE.sections[key] && !(SITE.extras && SITE.extras[key])) key = DEFAULT_SECTION;
  state.current = key;
  panel.innerHTML = renderSection(key);
  nav.querySelectorAll("button").forEach(b => b.setAttribute("aria-current", b.dataset.key === key ? "true" : "false"));
  if (state.room) state.room.setSelected(key);
  if (focus) {
    const h = panel.querySelector("h2");
    h.tabIndex = -1;
    h.focus({ preventScroll: true });
    if (PHONE.matches) { setSheet(true); panel.scrollTop = 0; }
  }
}

function buildNav() {
  SECTION_ORDER.forEach(key => {
    const b = document.createElement("button");
    b.type = "button";
    b.dataset.key = key;
    b.innerHTML = `<svg viewBox="-8 -8 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[key]}</svg>${SITE.sections[key].menu}`;
    b.addEventListener("click", () => select(key, { focus: true }));
    b.addEventListener("mouseenter", () => state.room && state.room.setHover(key));
    b.addEventListener("mouseleave", () => state.room && state.room.setHover(null));
    nav.appendChild(b);
  });
  // phones: the header has no room for the Simple view button, so it ends the tab row instead
  const simple = document.createElement("a");
  simple.className = "nav-view";
  simple.href = "resume.html";
  simple.textContent = SITE.ui.readingView;
  nav.appendChild(simple);
}

document.addEventListener("click", e => {
  const go = e.target.closest("[data-go]");
  if (go) { e.preventDefault(); select(go.dataset.go, { focus: true }); return; }
  const tab = e.target.closest("[data-tab]");
  if (tab) {
    const box = tab.closest(".panel, section") || document;
    box.querySelectorAll("[data-tab]").forEach(b => b.setAttribute("aria-selected", b === tab ? "true" : "false"));
    box.querySelectorAll("[data-pane]").forEach(p => { p.hidden = p.dataset.pane !== tab.dataset.tab; });
  }
  const copy = e.target.closest("[data-copy]");
  if (copy) {
    const done = () => { copy.textContent = SITE.ui.copied; setTimeout(() => { copy.textContent = SITE.ui.copy; }, 1500); };
    try { navigator.clipboard.writeText(copy.dataset.copy).then(done, () => { copy.textContent = SITE.ui.selectAddress; }); }
    catch (_) { copy.textContent = SITE.ui.selectAddress; }
  }
});

const sound = document.getElementById("sound");
sound.addEventListener("click", () => {
  const on = sound.getAttribute("aria-pressed") !== "true";
  const label = on ? SITE.ui.soundOn : SITE.ui.soundOff;
  sound.setAttribute("aria-pressed", String(on));
  sound.setAttribute("aria-label", label);
  sound.title = label;
  sound.querySelector(".x").style.display = on ? "none" : "";
});

buildNav();

// Phones: the room fills the screen and the section panel is a bottom sheet.
// The sheet peeks up from the bottom; picking an object or a section slides it up.
const PHONE = window.matchMedia("(max-width: 860px)");
const sheet = document.getElementById("sheet");
const grip = sheet.querySelector(".sheet-grip");
const sheetNav = sheet.querySelector(".sheet-nav");
const headerSpot = document.createComment("nav");
nav.before(headerSpot);
function placeNav() {   // the section buttons live in the sheet on phones and in the header on desktop
  if (PHONE.matches) sheetNav.appendChild(nav); else headerSpot.after(nav);
  if (!PHONE.matches) setSheet(false);
  setHeaderHeight();
}
function setSheet(open) {
  document.body.classList.toggle("sheet-open", open);
  grip.setAttribute("aria-expanded", String(open));
  if (!open) panel.scrollTop = 0;
}
grip.addEventListener("click", () => setSheet(!document.body.classList.contains("sheet-open")));
panel.addEventListener("click", () => { if (PHONE.matches && !document.body.classList.contains("sheet-open")) setSheet(true); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && document.body.classList.contains("sheet-open")) setSheet(false); });
// swipe on the sheet's top bar: up opens, down closes
let touchY = null;
sheet.querySelector(".sheet-head").addEventListener("touchstart", e => { touchY = e.touches[0].clientY; }, { passive: true });
sheet.querySelector(".sheet-head").addEventListener("touchend", e => {
  if (touchY === null) return;
  const dy = e.changedTouches[0].clientY - touchY; touchY = null;
  if (dy < -40) setSheet(true); else if (dy > 40) setSheet(false);
});
// swiping down on the content when it is scrolled to the top also closes the sheet
let panelY = null;
panel.addEventListener("touchstart", e => { panelY = panel.scrollTop <= 0 ? e.touches[0].clientY : null; }, { passive: true });
panel.addEventListener("touchend", e => {
  if (panelY !== null && e.changedTouches[0].clientY - panelY > 80 && document.body.classList.contains("sheet-open")) setSheet(false);
  panelY = null;
});
// keep the sticky room just below the header, whatever height the header has at this width
const topbar = document.querySelector(".topbar");
const setHeaderHeight = () => document.documentElement.style.setProperty("--header-h", topbar.offsetHeight + "px");
placeNav();
PHONE.addEventListener("change", placeNav);
window.addEventListener("resize", setHeaderHeight);
if (typeof drawRoom === "function") {
  state.room = drawRoom(document.getElementById("room"), { onPick: key => select(key, { focus: true }) });
}
select(DEFAULT_SECTION);
