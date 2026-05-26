# Harshika Gahlot — Personal Portfolio

A cinematic, Gen-Z inspired personal portfolio built as an immersive, motion-driven journey through my thinking and work.

> **Status:** In active development — building section by section.

---

## ✨ What this is

This is not a traditional resume site. It's an interactive portfolio that guides the visitor deeper with every scroll — designed to feel like entering a creative and product world.

**Emotional tone:** immersive · smooth · modern · playful but intelligent · motion-driven · product-minded

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vite + React 18 + TypeScript |
| Styling | Tailwind CSS v4 (CSS-first, `@theme` tokens) |
| Animation | Framer Motion (primary) |
| Scroll effects | GSAP + ScrollTrigger (for future pinned sequences) |
| Smooth scroll | Lenis (wired to GSAP ticker) |
| Routing | React Router DOM v7 |

---

## 🎨 Design System

All design tokens live in `src/index.css` under `@theme {}`:

| Token | Value | Usage |
|---|---|---|
| `--color-bg-primary` | `#0a0a0f` | Main background |
| `--color-bg-secondary` | `#111118` | Navbar, cards |
| `--color-bg-card` | `#16161f` | Card surfaces |
| `--color-accent-purple` | `#7c6ff7` | Primary accent |
| `--color-accent-teal` | `#2dd4a8` | Secondary accent |
| `--color-accent-coral` | `#f47c5a` | Emphasis only |
| `--color-text-primary` | `#f0eff8` | Headings, body |
| `--color-text-secondary` | `#8b8a9a` | Subtext |
| `--color-text-hint` | `#4a4958` | Very muted labels |

**Fonts:**
- `--font-display`: Cabinet Grotesk (headings) — via Fontshare
- `--font-body`: Satoshi (body text) — via Fontshare
- `--font-mono`: JetBrains Mono — via Google Fonts

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed top navbar with scroll-aware bg
│   │   └── PageWrapper.tsx     # Root layout wrapper
│   ├── icons/                  # Inline SVG icon components
│   │   ├── EyeIcon.tsx
│   │   ├── UserIcon.tsx
│   │   ├── LayersIcon.tsx
│   │   ├── BoltIcon.tsx
│   │   ├── FlowIcon.tsx
│   │   └── HeartIcon.tsx
│   └── GuideCharacter.tsx      # Persistent SVG mascot (bottom-right)
├── sections/
│   ├── Hero.tsx                # Full-viewport hero section (Part 1)
│   └── HowIThink.tsx           # Thought cards section (Part 2)
├── lib/
│   ├── motion.ts               # Framer Motion TRANSITIONS + VARIANTS config
│   └── smoothScroll.ts         # Lenis + GSAP wiring, scrollTo() helper
├── App.tsx                     # Root component + section assembly
├── main.tsx                    # React DOM entry point
├── index.css                   # Global styles + Tailwind v4 @theme tokens
└── vite-env.d.ts               # Vite client type declarations
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# → http://localhost:5173/
```

---

## 📦 Build

```bash
npm run build
```

Output goes to `dist/`.

---

## 🗺️ Sections — Build Progress

| # | Section | Status |
|---|---|---|
| 1 | Hero | ✅ Complete |
| 2 | How I Think | ✅ Complete |
| 3 | Work / Case Studies | 🔜 Part 3 |
| 4 | Thinking / Blog | 🔜 Future |
| 5 | Teardown | 🔜 Future |
| 6 | Timeline | 🔜 Future |

---

## 🧠 Architecture Notes

- **Dark mode only** — no light mode toggle, ever
- **Tailwind v4** — all tokens in `@theme {}`, no `tailwind.config.ts`
- **Lenis** smooth scroll is wired to GSAP's ticker (`gsap.ticker.add`), which allows ScrollTrigger to work correctly with smooth scroll
- **`useReducedMotion`** from Framer Motion is respected everywhere — all animations skip/instant if the user has `prefers-reduced-motion` enabled
- **No UI component libraries** — everything is hand-built with Tailwind + Framer Motion
- **React StrictMode disabled** intentionally — Lenis does not handle double-effect invocation gracefully in dev mode

---

*Built by Harshika Gahlot*
