import { chromium } from "playwright";

/**
 * Carga la página y reporta errores de consola y peticiones fallidas.
 *
 * Un módulo que no resuelve no rompe el build ni los tests: falla recién en el
 * navegador, al pedirlo. Este chequeo es el que lo detecta.
 */
const URL = process.env.RUNTIME_URL ?? "http://localhost:8090/";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errores = [];
const fallidas = [];

page.on("console", (m) => {
  if (m.type() === "error") errores.push(m.text().slice(0, 160));
});
page.on("pageerror", (e) => errores.push(`pageerror: ${e.message.slice(0, 160)}`));
page.on("requestfailed", (r) =>
  fallidas.push(`${r.failure()?.errorText ?? "falló"}  ${r.url().slice(0, 110)}`),
);
page.on("response", (r) => {
  if (r.status() >= 400) fallidas.push(`HTTP ${r.status()}  ${r.url().slice(0, 110)}`);
});

await page.goto(URL, { waitUntil: "networkidle" });

// Se recorre la página para disparar la carga diferida de imágenes y secciones.
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 80));
  }
});

// Y se abre el modal de pago, que se carga bajo demanda.
const boton = page.getByRole("button", { name: /elegir black/i }).first();
if (await boton.count()) {
  await boton.click();
  await page.waitForTimeout(1500);
}

await page.waitForTimeout(500);

console.log(`Errores de consola:   ${errores.length}`);
errores.forEach((e) => console.log(`  ${e}`));
console.log(`Peticiones fallidas:  ${fallidas.length}`);
fallidas.forEach((f) => console.log(`  ${f}`));

// El modal cargado bajo demanda tiene que haber aparecido.
const modal = await page.locator('[role="dialog"], form').count();
console.log(`\nModal de pago tras el clic: ${modal > 0 ? "abre" : "NO ABRE"}`);

if (errores.length || fallidas.length || modal === 0) process.exitCode = 1;

await browser.close();
