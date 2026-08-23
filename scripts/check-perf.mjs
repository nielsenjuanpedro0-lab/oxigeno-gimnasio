import { chromium } from "playwright";

const URL = process.env.PERF_URL ?? "http://localhost:8091/";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// Bytes transferidos por tipo de recurso.
const bytes = { js: 0, css: 0, imagen: 0, fuente: 0, otro: 0 };
page.on("response", async (res) => {
  const tipo = res.request().resourceType();
  const len = Number(res.headers()["content-length"] ?? 0);
  const clave =
    tipo === "script" ? "js"
    : tipo === "stylesheet" ? "css"
    : tipo === "image" ? "imagen"
    : tipo === "font" ? "fuente"
    : "otro";
  bytes[clave] += len;
});

await page.goto(URL, { waitUntil: "networkidle" });

const metricas = await page.evaluate(
  () =>
    new Promise((resolve) => {
      let lcp = 0;
      let cls = 0;

      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) lcp = e.startTime;
      }).observe({ type: "largest-contentful-paint", buffered: true });

      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (!e.hadRecentInput) cls += e.value;
        }
      }).observe({ type: "layout-shift", buffered: true });

      setTimeout(() => {
        const nav = performance.getEntriesByType("navigation")[0];
        const fcp = performance
          .getEntriesByType("paint")
          .find((p) => p.name === "first-contentful-paint");
        resolve({
          lcp: Math.round(lcp),
          cls: Number(cls.toFixed(4)),
          fcp: Math.round(fcp?.startTime ?? 0),
          domInteractive: Math.round(nav?.domInteractive ?? 0),
        });
      }, 2500);
    }),
);

// Los datos estructurados tienen que ser JSON válido o los buscadores los descartan.
const jsonLd = await page.evaluate(() =>
  [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
    try {
      const d = JSON.parse(s.textContent);
      return { ok: true, tipo: d["@type"] };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }),
);

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

console.log("--- Bytes transferidos en la carga inicial ---");
for (const [k, v] of Object.entries(bytes)) console.log(`  ${k.padEnd(8)} ${kb(v)}`);
console.log(`  ${"TOTAL".padEnd(8)} ${kb(Object.values(bytes).reduce((a, b) => a + b, 0))}`);

console.log("\n--- Métricas de carga ---");
console.log(`  FCP              ${metricas.fcp} ms`);
console.log(`  LCP              ${metricas.lcp} ms   (bueno < 2500)`);
console.log(`  CLS              ${metricas.cls}      (bueno < 0.1)`);
console.log(`  DOM interactivo  ${metricas.domInteractive} ms`);

console.log("\n--- Datos estructurados ---");
for (const b of jsonLd) {
  console.log(b.ok ? `  ok    ${b.tipo}` : `  ERROR ${b.error}`);
}
if (jsonLd.length === 0) console.log("  NINGUNO");

await browser.close();
