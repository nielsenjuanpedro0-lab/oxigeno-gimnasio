import { globSync, readFileSync } from "node:fs";

const files = [...globSync("src/**/*.tsx"), ...globSync("src/**/*.ts")];
const appCode = files.filter((f) => !f.includes("/components/ui/"));

const grep = (patron, etiqueta, excluirApp = false) => {
  const hits = [];
  for (const f of appCode) {
    if (excluirApp && f.endsWith("App.tsx")) continue;
    readFileSync(f, "utf8")
      .split("\n")
      .forEach((line, i) => {
        if (patron.test(line)) hits.push(`  ${f}:${i + 1}  ${line.trim().slice(0, 76)}`);
      });
  }
  console.log(`\n=== ${etiqueta} ===`);
  console.log(hits.length ? hits.join("\n") : "  NINGUNO");
};

grep(/useQuery|useMutation|queryClient\./, "react-query usado fuera de App", true);
grep(/useToast|\btoast\(/, "toast / sonner usado");
grep(/<Tooltip/, "Tooltip usado");

const imports = new Set();
for (const f of appCode) {
  for (const m of readFileSync(f, "utf8").matchAll(/from "@\/components\/ui\/([a-z-]+)"/g)) {
    imports.add(m[1]);
  }
}
console.log("\n=== componentes ui/ importados desde el código de la página ===");
console.log("  " + ([...imports].sort().join(", ") || "NINGUNO"));
console.log(`\n=== archivos presentes en src/components/ui/: ${globSync("src/components/ui/*").length}`);
