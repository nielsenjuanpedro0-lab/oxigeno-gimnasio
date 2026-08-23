import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const URL = process.env.SHOT_URL ?? "http://localhost:8090/";
const OUT = process.env.SHOT_OUT ?? "shots";

const widths = [
  { name: "360", width: 360, height: 800 },
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1440", width: 1440, height: 900 },
];

const sections = [
  "inicio",
  "nosotros",
  "actividades",
  "horarios",
  "instalaciones",
  "membresias",
  "rutinas",
  "contacto",
];

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

for (const vp of widths) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
  });
  await page.goto(URL, { waitUntil: "networkidle" });

  // Dispara las animaciones de entrada de toda la página antes de capturar.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 200) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);

  const perdidos = await page.evaluate(
    () =>
      [...document.querySelectorAll("main *")].filter(
        (el) =>
          parseFloat(getComputedStyle(el).opacity) < 0.9 &&
          el.getBoundingClientRect().height > 40,
      ).length,
  );
  if (perdidos > 0) console.warn(`  aviso: ${perdidos} elementos sin revelar`);

  await page.screenshot({ path: `${OUT}/full-${vp.name}.png`, fullPage: true });

  // Detecta scroll horizontal, el sintoma clasico de un layout que se rompe.
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  console.log(
    `${vp.name.padEnd(5)} overflow-x: ${overflow}px ${overflow > 0 ? "  <-- SE ROMPE" : "ok"}`,
  );

  for (const id of sections) {
    const el = page.locator(`#${id}`);
    if ((await el.count()) === 0) continue;
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    await el.screenshot({ path: `${OUT}/${id}-${vp.name}.png` }).catch(() => {});
  }

  await page.close();
}

await browser.close();
console.log(`\nCapturas en ${OUT}/`);
