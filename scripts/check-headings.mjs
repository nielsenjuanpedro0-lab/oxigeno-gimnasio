import { chromium } from "playwright";

/**
 * Verifica que ningún titular quede oculto.
 *
 * El revelado por palabra deja cada palabra desplazada fuera de una máscara hasta que
 * la animación la trae. Si el disparador no llega a ejecutarse, la palabra se queda
 * afuera y el titular desaparece sin ningún error: pasó con el h1 del hero, que está
 * dentro del contenedor con transform del paralaje.
 *
 * Se recorre la página despacio y se comprueba que toda palabra haya vuelto a su sitio.
 */
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(process.env.PERF_URL ?? "http://localhost:8091/", {
  waitUntil: "networkidle",
});

await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 200) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 110));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(2000);

const problemas = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll("h1, h2").forEach((h) => {
    const texto = (h.getAttribute("aria-label") || h.textContent || "").trim().slice(0, 44);
    // Palabras aún desplazadas fuera de su máscara.
    const ocultas = [...h.querySelectorAll("span > span")].filter((s) => {
      const t = getComputedStyle(s).transform;
      if (!t || t === "none") return false;
      const ty = Number(t.match(/matrix\(([^)]+)\)/)?.[1]?.split(",")[5] ?? 0);
      return Math.abs(ty) > 2;
    });
    if (ocultas.length) out.push({ texto, ocultas: ocultas.length });

    // El titular también tiene que ocupar alto real.
    if (h.getBoundingClientRect().height < 8) out.push({ texto, ocultas: "alto 0" });
  });
  return out;
});

const total = await page.evaluate(() => document.querySelectorAll("h1, h2").length);

if (problemas.length === 0) {
  console.log(`Titulares: ${total} revisados, todos visibles.`);
} else {
  console.error("Titulares con palabras sin revelar:\n");
  for (const p of problemas) console.error(`  "${p.texto}"  ->  ${p.ocultas}`);
  process.exitCode = 1;
}

await browser.close();
