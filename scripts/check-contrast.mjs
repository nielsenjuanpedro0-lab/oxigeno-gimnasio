import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:8090/", { waitUntil: "networkidle" });
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 200) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 100));
  }
});
await page.waitForTimeout(600);

const results = await page.evaluate(() => {
  const parse = (c) => c.match(/[\d.]+/g).slice(0, 3).map(Number);
  const lum = ([r, g, b]) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
    return (x + 0.05) / (y + 0.05);
  };
  // Resuelve el fondo real subiendo por los ancestros hasta hallar uno opaco.
  const bgOf = (el) => {
    let n = el;
    while (n) {
      const c = getComputedStyle(n).backgroundColor;
      if (c && !c.includes("rgba(0, 0, 0, 0)")) {
        const p = parse(c);
        const alpha = c.startsWith("rgba") ? Number(c.match(/[\d.]+/g)[3]) : 1;
        if (alpha > 0.9) return p;
      }
      n = n.parentElement;
    }
    return [10, 10, 10];
  };

  const out = [];
  const seen = new Set();
  document.querySelectorAll("button, a.btn-primary, a.btn-secondary, a[href]").forEach((el) => {
    const txt = (el.innerText || "").trim().slice(0, 26);
    if (!txt || seen.has(txt)) return;
    const cs = getComputedStyle(el);
    if (el.getBoundingClientRect().height < 12) return;
    seen.add(txt);
    const fg = parse(cs.color);
    const bg = bgOf(el);
    out.push({
      texto: txt,
      ratio: Number(ratio(fg, bg).toFixed(2)),
      size: parseFloat(cs.fontSize),
    });
  });
  return out;
});

console.log("Contraste de elementos interactivos (AA normal = 4.5, grande = 3.0)\n");
let fails = 0;
for (const r of results.sort((a, b) => a.ratio - b.ratio)) {
  const min = r.size >= 18.66 ? 3.0 : 4.5;
  const ok = r.ratio >= min;
  if (!ok) fails++;
  console.log(
    `${ok ? "ok  " : "FALLA"} ${String(r.ratio).padStart(6)}:1  (min ${min})  ${r.texto}`,
  );
}
console.log(`\n${fails} elemento(s) por debajo del mínimo AA.`);

await browser.close();
