import { readFileSync } from "node:fs";
import { globSync } from "node:fs";

/**
 * Detecta modificadores de opacidad fuera de la escala de Tailwind.
 *
 * Un valor fuera de escala —bg-background/88— no genera ninguna clase, así que la
 * propiedad queda ausente y el efecto desaparece sin ningún error: ni el build ni
 * TypeScript avisan. Pasó con los tres velos de la página.
 */
const ESCALA = new Set([
  0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
]);

const PATRON =
  /\b((?:bg|via|from|to|text|border|decoration|ring|fill|stroke)-(?!left-|top-|w-|h-)[a-z0-9-]+\/(\d+))\b/g;

const files = globSync("src/**/*.tsx");
let fallos = 0;

for (const file of files) {
  const src = readFileSync(file, "utf8");
  src.split("\n").forEach((line, i) => {
    for (const m of line.matchAll(PATRON)) {
      if (!ESCALA.has(Number(m[2]))) {
        console.error(`${file}:${i + 1}  ${m[1]}  <-- fuera de escala, no genera CSS`);
        fallos++;
      }
    }
  });
}

if (fallos === 0) {
  console.log(`Modificadores de opacidad: ${files.length} archivos, todos en escala.`);
} else {
  console.error(`\n${fallos} modificador(es) sin efecto.`);
  process.exit(1);
}
