// Tiny in-browser test kit: open tests/tests.html in any browser to run the suite.
function show(text, ok){
  const line = document.createElement("div");
  line.textContent = text;
  line.style.color = ok ? "#1d7a4d" : "#b3261e";
  document.getElementById("results").appendChild(line);
}
function test(name, fn){
  try { fn(); show("PASS " + name, true); }
  catch (e) { show("FAIL " + name + ": " + e.message, false); }
}
function assertEqual(actual, expected, label){
  const a = JSON.stringify(actual), b = JSON.stringify(expected);
  if (a !== b) throw new Error(label + ": expected " + b + ", got " + a);
}
