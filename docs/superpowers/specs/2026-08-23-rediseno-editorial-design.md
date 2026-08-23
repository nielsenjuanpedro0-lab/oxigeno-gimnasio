# Rediseño editorial — Gimnasio Oxígeno

Fecha: 2026-08-23
Rama: `worktree-rediseno-editorial`

## Problema

La landing se lee como generada por IA. No es una impresión vaga: es un conjunto de
tics repetidos y contables.

| Tic | Ocurrencias |
|---|---|
| `glass-card` (fondo translúcido + `backdrop-blur-xl` + borde) | 10 |
| `text-gradient-amber` en la segunda palabra del H2 | 10 |
| `rounded-xl` / `rounded-2xl` / `rounded-full` | 39 |
| Eyebrow centrado + H2 centrado + grilla de cards | 9 secciones |
| `whileInView` fade-up con `delay: i * 0.1` | 17 |
| Card de ícono + título + una línea de descripción | 5 |
| `cursor: crosshair` en `body` | 1 |

Consecuencias concretas:

- **Sin jerarquía.** Toda superficie usa el mismo tratamiento, así que una tarjeta de
  precio pesa visualmente lo mismo que un testimonio.
- **CTA ilegible.** El botón "Inscribirme" usa `bg-accent/10 border-accent/20
  text-accent`: rojo al 10% sobre negro, con un contraste cercano a 2:1. Lee como
  deshabilitado.
- **Datos no comparables.** Días, horarios y precios viven dentro de cajas separadas,
  de modo que el lector no puede comparar dos clases entre sí.

## Dirección elegida

**Editorial deportivo.** Estructura de revista: tipografía condensada grande alineada
a la izquierda, filas con reglas finas en lugar de tarjetas, secciones numeradas,
grilla asimétrica.

Decisiones tomadas junto al usuario:

1. **Tipografía** — Bebas Neue y DM Sans se conservan (Bebas ya es la identidad del
   gimnasio). Se suma JetBrains Mono, exclusiva para datos numéricos.
2. **Paleta** — Ámbar pasa a ser el único color de marca y se usa poco. El rojo queda
   reservado para señales reales: cupos limitados, errores, urgencia. Se eliminan
   todos los degradés de texto.

## Sistema base

### Superficies

Se elimina `glass-card`. La profundidad pasa a ser una escala de fondos opacos:

| Token | Valor | Uso |
|---|---|---|
| `--surface-0` | `#0A0A0A` | Fondo de página |
| `--surface-1` | `#101010` | Banda de sección alterna |
| `--surface-2` | `#151515` | Bloque destacado |
| `--border` | `#242424` | Reglas y divisores |

`backdrop-blur` sobrevive solo donde tiene justificación física: navbar fija y overlay
de modal.

### Color

- `--primary` (ámbar) es el único color de marca. Aparece en precio, CTA primario y
  número de sección. Objetivo: dos apariciones por bloque, no ocho.
- `--signal` (rojo) se reserva para "cupos limitados", errores de pago y validación.
- Se borra la utilidad `text-gradient-amber` y sus diez usos.

### Tipografía

- `font-display`: Bebas Neue — titulares.
- `font-body`: DM Sans — prosa.
- `font-mono`: JetBrains Mono con `font-variant-numeric: tabular-nums` — precios,
  horarios, días, números de sección.

La monoespaciada es lo que hace que la columna de horarios alinee. En DM Sans, `08:00`
y `18:30` miden distinto y la columna baila.

### Forma

`--radius` baja de `0.5rem` a `2px`. Los botones dejan de ser píldoras.

### Otros

Se elimina `cursor: crosshair` del `body`.

## Ritmo editorial

Un componente `SectionHeader` reemplaza el bloque repetido nueve veces:

```
02 / ACTIVIDADES ────────────────────────────────
NUESTRAS ACTIVIDADES
```

Numerado, alineado a la izquierda, con una regla que corre hasta el borde. Las
secciones alternan entre ancho completo, contenido a la izquierda y bloques centrados,
para que el scroll no repita el mismo compás nueve veces.

## Botones

| Rol | Tratamiento | Reemplaza a |
|---|---|---|
| Primario | Ámbar sólido, texto negro, esquinas de 2px, mayúsculas con tracking | `bg-accent` píldora con glow |
| Secundario | Borde de 1px al 30% de blanco, fondo transparente | `border-border rounded-full` |
| Terciario | Texto con subrayado desplazado | Links con hover de color |

Se eliminan los glows `hover:shadow-[0_0_30px...]`, `animate-pulse-glow`, las flechas
`→` dentro del label y los rellenos `bg-*/10` con borde del mismo color.

El CTA "Inscribirme" pasa de un contraste cercano a 2:1 a más de 8:1.

## Secciones rehechas

| Sección | Hoy | Nuevo |
|---|---|---|
| Actividades | 5 cards con ícono | Índice numerado a dos columnas, separadores finos, sin cajas ni íconos |
| Clases especiales | 2 cards apretadas | Filas editoriales; datos en mono alineados en columnas comparables |
| Horarios | 3 cards | Tabla de tres filas |
| Membresías | 3 cards flotantes | Tabla comparativa en desktop (fila por beneficio, columna por plan); bloques apilados en mobile |
| Testimonios | Cards con auto-scroll | Citas tipográficas grandes sin caja, sin auto-scroll |
| Rutinas / app | Card con tres mini-cards adentro | Banda simple |
| Galería | Mosaico con `scale-105` en hover | Mosaico con bordes rectos, sin scale |
| Hero | Titular con degradé, stats en píldoras de vidrio | Titular sólido, stats en fila con reglas divisorias |

Los íconos de Actividades se eliminan: no aportan información, solo textura.

El auto-scroll de Testimonios usa un `setInterval` cada 30ms que mueve `scrollLeft` y
compite con el gesto del usuario en mobile. Se elimina.

## Responsive

Bugs concretos a corregir:

- **Hero** — `text-[10rem]` desborda en pantallas angostas; la imagen usa `scale-150`
  en mobile, lo que recorta el encuadre.
- **Clases especiales** — dos columnas dentro de `max-w-3xl` dan unos 380px por card,
  y adentro hay otra grilla de dos columnas. Se rompe entre 640 y 768px.
- **Membresías** — el `scale-105` de la card destacada desborda horizontalmente en
  mobile.
- **MobileCTA** — es `fixed bottom-0` y `<main>` no tiene padding inferior, así que la
  barra tapa el final del footer.
- **Container** — Tailwind ya aplica `padding: 2rem` y cada sección agrega
  `px-4 lg:px-8` encima. Padding duplicado.

Breakpoints de verificación: 360, 390, 768, 1024, 1440.

## Movimiento

Un solo patrón de entrada, sin encadenar `delay: i * 0.1` por ítem. Se eliminan el
rebote infinito de la flecha y `pulse-glow`. Se agrega soporte de
`prefers-reduced-motion`, hoy ausente: con 17 elementos animados, la página actual es
hostil para alguien con sensibilidad vestibular.

## Fuera de alcance

- Lógica de `PaymentModal` y `AuthModal`. Solo se re-estilan botones e inputs.
- Supabase, contexts y rutas.
- Textos, salvo quitar el emoji de Horarios y las flechas de los labels.
- `CTABanner.tsx` queda intacto. Está muerto (no se importa en ningún lado), pero su
  contenido anuncia una promo de dos semanas gratis cuya vigencia no está confirmada.
  Borrarlo destruiría contenido de negocio sin autorización.

## Verificación

- Screenshots antes y después por sección en los cinco breakpoints.
- Chequeo de contraste en los CTAs.
- `npm run build` y `npm test` en verde.

No hay cobertura de tests real en el repo — el único archivo es un placeholder
(`src/test/example.test.ts`). La verificación de un rediseño visual es por captura, no
por unit test.
