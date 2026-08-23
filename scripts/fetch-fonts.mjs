import { mkdirSync, writeFileSync } from "node:fs";

/**
 * Descarga las tipografías a public/fonts.
 *
 * Alojarlas en el propio sitio, en vez de pedirlas a fonts.googleapis.com, permite
 * precargarlas desde el HTML: llegan antes del primer pintado, así no hay reemplazo de
 * fuente y por lo tanto no hay salto de layout. Además elimina una conexión a un
 * tercero, que costaba DNS y TLS antes de poder empezar a descargar.
 *
 * Ambas familias están bajo SIL Open Font License, que permite redistribuirlas.
 */
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const FAMILIAS = [
  {
    archivo: "archivo-variable.woff2",
    url: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900",
  },
  {
    archivo: "inter-tight-variable.woff2",
    url: "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300..700",
  },
];

mkdirSync("public/fonts", { recursive: true });

for (const f of FAMILIAS) {
  const css = await (await fetch(f.url, { headers: { "User-Agent": UA } })).text();

  // Se toma el bloque latin, que es el que necesita un sitio en español.
  const bloques = css.split("/*").filter((b) => b.trim().startsWith("latin"));
  const bloque = bloques.find((b) => b.trim().startsWith("latin ")) ?? bloques[0];
  const url = bloque?.match(/https:\/\/fonts\.gstatic\.com[^)]+\.woff2/)?.[0];

  if (!url) {
    console.error(`  no se encontró woff2 latin para ${f.archivo}`);
    process.exitCode = 1;
    continue;
  }

  const bin = Buffer.from(await (await fetch(url)).arrayBuffer());
  writeFileSync(`public/fonts/${f.archivo}`, bin);
  console.log(`  ${f.archivo.padEnd(30)} ${(bin.length / 1024).toFixed(0)} KB`);
}
