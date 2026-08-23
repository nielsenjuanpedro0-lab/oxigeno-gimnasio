import { chromium } from "playwright";

/**
 * Calcula el size-adjust correcto para las tipografías de reserva.
 *
 * La comparación tiene que ser con el mismo peso: la reserva se renderiza en negrita
 * cuando el titular pide peso 800, y Arial Bold es bastante más ancha que Arial normal.
 * Medir contra Arial regular da un factor equivocado, el texto de reserva queda
 * demasiado angosto y el bloque cambia de cantidad de líneas al cargar la fuente.
 */
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(process.env.PERF_URL ?? "http://localhost:8091/", {
  waitUntil: "networkidle",
});
await page.evaluate(() => document.fonts.ready);

const r = await page.evaluate(() => {
  const MUESTRA = "MÁS QUE UN GIMNASIO ENTRENÁ CON PROFES 0123456789";

  const ancho = (css) => {
    const el = document.createElement("span");
    el.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;font-size:100px;${css}`;
    el.textContent = MUESTRA;
    document.body.appendChild(el);
    const w = el.getBoundingClientRect().width;
    el.remove();
    return w;
  };

  return {
    // Titular: Archivo condensada pesada contra Arial al mismo peso.
    archivoWeb: ancho('font-family:Archivo;font-weight:800;font-variation-settings:"wdth" 82,"wght" 800;'),
    arialBold: ancho("font-family:Arial;font-weight:800;"),
    // Botones y etiquetas usan otro punto del eje.
    archivoBtn: ancho('font-family:Archivo;font-weight:700;font-variation-settings:"wdth" 92,"wght" 700;'),
    arialBold700: ancho("font-family:Arial;font-weight:700;"),
    // Cuerpo.
    interWeb: ancho("font-family:'Inter Tight';font-weight:400;"),
    arialReg: ancho("font-family:Arial;font-weight:400;"),
  };
});

const pct = (a, b) => ((a / b) * 100).toFixed(1);

console.log("size-adjust calculado (mismo peso en ambos lados):\n");
console.log(`  Archivo 800/wdth82  ${r.archivoWeb.toFixed(0)} px   vs Arial 800 ${r.arialBold.toFixed(0)} px`);
console.log(`    -> Archivo Fallback: size-adjust: ${pct(r.archivoWeb, r.arialBold)}%\n`);
console.log(`  Archivo 700/wdth92  ${r.archivoBtn.toFixed(0)} px   vs Arial 700 ${r.arialBold700.toFixed(0)} px`);
console.log(`    (referencia para etiquetas y botones: ${pct(r.archivoBtn, r.arialBold700)}%)\n`);
console.log(`  Inter Tight 400     ${r.interWeb.toFixed(0)} px   vs Arial 400 ${r.arialReg.toFixed(0)} px`);
console.log(`    -> Inter Tight Fallback: size-adjust: ${pct(r.interWeb, r.arialReg)}%`);

await browser.close();
