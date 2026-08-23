import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:8090/", { waitUntil: "networkidle" });

await page.evaluate(async () => {
  let y = 0;
  while (y < document.body.scrollHeight) {
    window.scrollTo(0, y);
    y += 300;
    await new Promise((r) => setTimeout(r, 40));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(600);

const info = await page.evaluate(() => {
  const sections = [];
  document.querySelectorAll("main > section, main > footer").forEach((el) => {
    const r = el.getBoundingClientRect();
    sections.push({
      id: el.id || el.tagName.toLowerCase(),
      top: Math.round(r.top + scrollY),
      alto: Math.round(r.height),
    });
  });

  const invisibles = [];
  document.querySelectorAll("main *").forEach((el) => {
    const cs = getComputedStyle(el);
    if (parseFloat(cs.opacity) < 0.9 && el.getBoundingClientRect().height > 40) {
      invisibles.push({
        tag: el.tagName,
        cls: (el.className || "").toString().slice(0, 45),
        opacity: cs.opacity,
      });
    }
  });

  return { total: document.body.scrollHeight, sections, invisibles: invisibles.slice(0, 10) };
});

console.log("ALTO TOTAL:", info.total, "px");
console.table(info.sections);
console.log("INVISIBLES:", info.invisibles.length ? info.invisibles : "ninguno");

await browser.close();
