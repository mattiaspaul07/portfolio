// Connects the menu, the room and the section panel.
const ICONS = {
  about: '<circle cx="0" cy="-3" r="2.6"/><path d="M-5 5.5a5 5 0 0 1 10 0"/>',
  experience: '<path d="M-6 3h12"/><circle cx="-4" cy="3" r="1.3"/><circle cx="0" cy="3" r="1.3"/><circle cx="4" cy="3" r="1.3"/><path d="M-4 -1v-4M0 -1v-2M4 -1v-5"/>',
  projects: '<path d="M-6 -4h4l1.5 2h6.5v8h-12z"/>',
  toolkit: '<path d="M-6 -1h12v6h-12z"/><path d="M-3 -1v-2.5h6v2.5"/><path d="M-6 2h12"/>',
  education: '<path d="M-6 -5h4.5a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 0 -1.5 -1.5h-4.5zM6 -5h-4.5a1.5 1.5 0 0 0 -1.5 1.5v10a1.5 1.5 0 0 1 1.5 -1.5h4.5z"/>',
  contact: '<path d="M-6 -5h12v8h-6l-3.5 3v-3h-2.5z"/>'
};

const state = { current: null, room: null };
const nav = document.getElementById("nav");
const panel = document.getElementById("panel");

function select(key, { focus } = {}) {
  if (!SITE.sections[key]) key = "projects";
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
  state.room = drawRoom(document.getElementById("room"), {
    start: "projects",
    onPick: key => select(key, { focus: true }),
    onHover: key => state.room && state.room.setHover(key)
  });
}
select("projects");
