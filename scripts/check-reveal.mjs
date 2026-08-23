import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:8090/", { waitUntil: "networkidle" });

/** Elementos invisibles que además están dentro de la ventana: el fallo que ve el usuario. */
const hiddenInViewport = () =>
  page.evaluate(
    () =>
      [...document.querySelectorAll("main *")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          const visibleArea = r.top < innerHeight && r.bottom > 0 && r.height > 40;
          return visibleArea && parseFloat(getComputedStyle(el).opacity) < 0.9;
        })
        .map((el) => (el.className || "").toString().slice(0, 40)),
  );

await page.evaluate(() => document.querySelector("#membresias")?.scrollIntoView());
await page.waitForTimeout(1200);
console.log("Tras saltar a #membresias — invisible EN PANTALLA:", await hiddenInViewport());

// ¿Se recupera al volver hacia arriba?
await page.evaluate(() => document.querySelector("#nosotros")?.scrollIntoView());
await page.waitForTimeout(1200);
console.log("Tras volver a #nosotros  — invisible EN PANTALLA:", await hiddenInViewport());

await browser.close();
