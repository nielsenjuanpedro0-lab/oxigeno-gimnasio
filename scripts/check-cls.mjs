import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(process.env.PERF_URL ?? "http://localhost:8091/", {
  waitUntil: "networkidle",
});

const shifts = await page.evaluate(
  () =>
    new Promise((resolve) => {
      const out = [];
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (e.hadRecentInput) continue;
          out.push({
            valor: Number(e.value.toFixed(4)),
            momento: Math.round(e.startTime),
            fuentes: (e.sources ?? []).map((s) => {
              const n = s.node;
              if (!n) return "?";
              const tag = n.tagName?.toLowerCase() ?? n.nodeName;
              const cls = (n.className || "").toString().slice(0, 45);
              return `${tag}${cls ? "." + cls.replace(/\s+/g, ".") : ""}`;
            }),
          });
        }
      }).observe({ type: "layout-shift", buffered: true });

      setTimeout(() => resolve(out), 2500);
    }),
);

const total = shifts.reduce((a, s) => a + s.valor, 0);
console.log(`CLS total: ${total.toFixed(4)}\n`);
shifts
  .sort((a, b) => b.valor - a.valor)
  .slice(0, 8)
  .forEach((s) => {
    console.log(`  ${String(s.valor).padStart(7)}  a los ${s.momento} ms`);
    s.fuentes.forEach((f) => console.log(`           ${f}`));
  });

await browser.close();
