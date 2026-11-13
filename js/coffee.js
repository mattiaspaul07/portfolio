// Counts the coffees the avatar drinks during one visit (kept in sessionStorage, so it resets when the tab closes).
const COFFEE_KEY = "mp-coffees";
let coffeeFallback = 0;   // used when the browser blocks storage

function defaultStore() {
  try { return window.sessionStorage; } catch (_) { return null; }
}
function coffeeCount(store = defaultStore()) {
  if (!store) return coffeeFallback;
  try { return parseInt(store.getItem(COFFEE_KEY), 10) || 0; }
  catch (_) { return coffeeFallback; }   // storage blocked: count in memory
}
function addCoffee(store = defaultStore()) {
  const next = coffeeCount(store) + 1;
  coffeeFallback = next;
  try { if (store) store.setItem(COFFEE_KEY, String(next)); } catch (_) { /* memory only */ }
  return next;
}
function coffeeLabel(n) {
  return (n === 1 ? "COFFEE: " : "COFFEES: ") + n;
}
