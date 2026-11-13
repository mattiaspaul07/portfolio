// Connects the menu, the room and the section panel.
const ICONS = window.ROOM_ICONS;   // defined in room.js, shared by menu and markers

const state = { current: null, room: null };
const nav = document.getElementById("nav");
const panel = document.getElementById("panel");

function select(key, { focus } = {}) {
  if (!SITE.sections[key]) key = DEFAULT_SECTION;
  state.current = key;
  panel.innerHTML = renderSection(key);
  nav.querySelectorAll("button").forEach(b => b.setAttribute("aria-current", b.dataset.key === key ? "true" : "false"));
  if (state.room) state.room.setSelected(key);
  if (focus) {
    const h = panel.querySelector("h2");
    h.tabIndex = -1;
    h.focus({ preventScroll: true });
    if (window.matchMedia("(max-width: 860px)").matches) panel.scrollIntoView({ behavior: "smooth", block: "start" });
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
}

document.addEventListener("click", e => {
  const tab = e.target.closest("[data-tab]");
  if (tab) {
    const box = tab.closest(".panel, section") || document;
    box.querySelectorAll("[data-tab]").forEach(b => b.setAttribute("aria-selected", b === tab ? "true" : "false"));
    box.querySelectorAll("[data-pane]").forEach(p => { p.hidden = p.dataset.pane !== tab.dataset.tab; });
  }
  const copy = e.target.closest("[data-copy]");
  if (copy) {
    const done = () => { copy.textContent = "Copied"; setTimeout(() => { copy.textContent = "Copy"; }, 1500); };
    try { navigator.clipboard.writeText(copy.dataset.copy).then(done, () => { copy.textContent = "Select the address"; }); }
    catch (_) { copy.textContent = "Select the address"; }
  }
});

const sound = document.getElementById("sound");
sound.addEventListener("click", () => {
  const on = sound.getAttribute("aria-pressed") !== "true";
  const label = on ? "Sound on" : "Sound off";
  sound.setAttribute("aria-pressed", String(on));
  sound.setAttribute("aria-label", label);
  sound.title = label;
  sound.querySelector(".x").style.display = on ? "none" : "";
});

buildNav();
if (typeof drawRoom === "function") {
  state.room = drawRoom(document.getElementById("room"), { onPick: key => select(key, { focus: true }) });
}
select(DEFAULT_SECTION);
