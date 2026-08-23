# Oxígeno Elevate

Build a full premium gym website for "GIMNASIO OXÍGENO" — a high-end fitness center located in Necochea, Argentina. This must feel like a world-class fitness brand website (think Equinox meets a boutique Argentine gym). Dark, powerful, energetic aesthetic.



---



## 🎨 DESIGN SYSTEM



**Color Palette:**

- Background: #0A0A0A (near black)

- Primary accent: #F5A623 (deep amber/gold — from the Oxígeno logo)

- Secondary accent: #E63946 (intense red for CTAs)

- Text primary: #FFFFFF

- Text muted: #8A8A8A

- Card surfaces: #141414 / #1A1A1A



**Typography:**

- Display/Headers: "Bebas Neue" or "Barlow Condensed" — bold, athletic

- Body: "DM Sans" or "Outfit" — clean and modern

- Accent labels: uppercase tracking-widest in amber



**Visual Style:**

- Dark luxury fitness aesthetic

- Grain texture overlay on hero section

- Glowing amber/gold accents on hover states

- Smooth scroll with section fade-ins

- Parallax effects on hero and feature sections

- Custom cursor (crosshair style)

- Glassmorphism cards for membership plans



---



## 📄 PAGES & SECTIONS



### 1. NAVBAR (Sticky, transparent → solid on scroll)

- Logo: "OXÍGENO GYM" with a flame/oxygen icon in amber

- Nav links: Inicio | Nosotros | Actividades | Rutinas | Membresías | Contacto

- CTA button: "Únete ahora" in red pill shape

- Mobile: hamburger menu with full-screen overlay



---



### 2. HERO SECTION

- Full viewport height

- Bold headline split into two lines:

  Line 1 (white): "MÁS QUE"

  Line 2 (amber): "UN GIMNASIO."

- Subheadline: "Fuerza, comunidad y resultados reales. Tu mejor versión empieza aquí."

- Two CTAs: [Comenzar ahora →] [Ver instalaciones ▶]

- Background: dark gym photo with 60% dark overlay + subtle amber gradient bottom

- Floating stat badges animating in: "2,385 Miembros" | "Sala de Fuerza" | "Actividades Aeróbicas"

- Scroll indicator arrow bouncing at bottom



---



### 3. ABOUT US — "¿Por qué Oxígeno?"

- Left: large image of gym floor (modern equipment)

- Right: headline "SOMOS MÁS QUE UN GIMNASIO"

- 4 icon feature rows:

  - 🏋️ Equipamiento de primer nivel

  - 👥 Comunidad Sport Club

  - 🔥 Showroom Hype Fitness

  - 📍 Necochea, Av 58 n° 3752

- Subtle amber left border on feature items



---



### 4. ACTIVITIES SECTION — "NUESTRAS ACTIVIDADES"

- Masonry or bento grid layout

- Cards for: Sala de Fuerza | Aeróbicos | Funcional | Cardio | Clases Grupales | Yoga/Stretching

- Each card: dark glassmorphism background, amber icon, hover → amber glow border

- Section label: "ACTIVIDADES" in tiny uppercase amber tracking-widest above heading



---



### 5. MEMBERSHIP PLANS — "ELEGÍ TU PLAN"

- 3 plan cards in a horizontal layout:



  **BÁSICO** — Acceso sala de fuerza

  - Precio: $XXXX/mes

  - Features list with checkmarks

  - CTA: "Elegir plan"



  **PRO** ⭐ (highlighted/featured)

  - Amber gradient border + "MÁS POPULAR" badge

  - Precio: $XXXX/mes

  - All Básico features + clases grupales + acceso Sport Club

  - CTA: "Elegir plan" (red button)



  **ELITE**

  - Precio: $XXXX/mes

  - All Pro features + entrenamiento personal + acceso Hype Fitness Showroom

  - CTA: "Elegir plan"



- Below plans: "¿Tenés dudas? Contactanos por WhatsApp" with WhatsApp green icon linking to wa.me



---



### 6. ROUTINES SECTION — "RUTINAS PARA MIEMBROS" 🔒

- Section with: "ZONA DE MIEMBROS" in amber badge

- Headline: "Accedé a tus rutinas personalizadas"

- 6 routine cards in a 3×2 grid:

  - Rutina de Fuerza — Principiante

  - Rutina de Fuerza — Intermedio

  - Rutina de Hipertrofia

  - Rutina Funcional Full Body

  - Cardio & Resistencia

  - Rutina de Movilidad y Flexibilidad

- Each card: dark surface, amber top border, muscle group tags, difficulty badge (Beginner/Intermediate/Advanced), duration (45 min / 60 min), [Ver rutina →] button

- On click: modal or accordion expands showing the routine (exercises, sets, reps, rest time, technique tips)

- Lock overlay on cards with message: "Iniciá sesión para ver esta rutina" — blurred content behind with a lock icon for non-authenticated users

- Simple login/register modal (email + password) with "Ingresar" / "Registrarse" tabs



---



### 7. TESTIMONIALS — "LO QUE DICE NUESTRA COMUNIDAD"

- Horizontal scrolling carousel

- 4-5 testimonial cards: avatar, name, star rating, short quote

- Amber stars, dark card with subtle grain

- Auto-scroll with pause on hover



---



### 8. GALLERY / INSTALACIONES

- Full-width masonry photo grid (6-9 photos)

- Dark overlay on hover showing "VER MÁS" with expand icon

- Lightbox on click



---



### 9. CTA BANNER

- Full-width section with dark amber gradient background

- Headline: "TU TRANSFORMACIÓN COMIENZA HOY"

- Subtext: "Primeras 2 semanas de prueba sin costo."

- Big red CTA button: "EMPEZÁ GRATIS →"

- Background: subtle animated particle/smoke effect



---



### 10. CONTACT / FOOTER

- Left: Logo + tagline + social icons (Instagram, WhatsApp, TikTok)

- Center: Quick links

- Right: Map embed or address card

  - Av 58 n° 3752, Necochea, Argentina 7630

  - WhatsApp link

  - Instagram: @oxigeno.fitnessgym_

- Bottom bar: "© 2024 Gimnasio Oxígeno. Todos los derechos reservados."



---



## ⚙️ TECHNICAL REQUIREMENTS



- React + TypeScript

- Tailwind CSS for styling

- Framer Motion for animations (page load stagger, scroll reveals, hover effects)

- React Router for multi-page navigation

- Lucide React for icons

- State management: useState/useContext for auth simulation

- Responsive: mobile-first, perfect on 320px → 1920px

- Smooth scroll behavior

- SEO-friendly semantic HTML (h1, h2, article, section, nav tags)

- Dark mode only (no toggle needed)

- Performance: lazy loading images, optimized animations



---



## 🔐 AUTH FLOW (Routines Access)

- Simple client-side auth simulation with localStorage

- Login modal with email/password

- After login: routines unlock and show full content

- Registration stores user in localStorage

- "Cerrar sesión" appears in navbar after login



---



## 📱 MOBILE SPECIFICS

- Bottom sticky CTA bar on mobile: "ÚNETE AHORA" + WhatsApp icon

- Swipeable carousels for testimonials and activities

- Hamburger → full-screen nav overlay with staggered link animations

- Membership cards stack vertically with horizontal scroll hint



---



Make every section feel cinematic, powerful, and premium. This gym competes with the best fitness centers in Argentina. The design should make visitors feel energy and motivation the moment they land on the page.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://gimnasiooxigeno.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/efd3ac3d-8cb9-44b7-a7aa-e7f885710f7d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
