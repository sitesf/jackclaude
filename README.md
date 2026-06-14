# Jack - 3D Creator Portfolio

A modern, interactive portfolio landing page built with React, TypeScript, Tailwind CSS, Framer Motion, and Lucide React.

## Features

- **Responsive Design**: Mobile-first approach with seamless scaling from mobile to ultra-wide screens
- **Smooth Animations**: Framer Motion-powered scroll reveals, fade-ins, and interactive effects
- **Magnetic Hover Effects**: Mouse-following magnetic effect on hero image
- **Scroll-Driven Effects**: 
  - Character-by-character text animations
  - Marquee section with parallax scrolling
  - Card stacking effect with dynamic scaling
- **Modern Styling**: Dark theme with gradient text, smooth transitions
- **Optimized Performance**: Lazy loading, passive scroll listeners, will-change optimizations

## Sections

1. **Hero Section** - Navigation, main heading, hero portrait with magnetic effect
2. **Marquee Section** - Scrollable grid of animated GIFs
3. **About Section** - Bio with character-level scroll animation
4. **Services Section** - 5 key services with staggered animations
5. **Projects Section** - 3 showcase cards with sticky stacking effect

## Tech Stack

- **React 18.3.1** - UI framework
- **TypeScript** - Type-safe code
- **Tailwind CSS 3.4.1** - Utility-first styling
- **Framer Motion 12.38.0** - Advanced animations
- **Lucide React 0.344.0** - Icons
- **Vite** - Build tool
- **Google Fonts (Kanit)** - Typography

## Installation

```bash
# Clone or extract the project
cd jack-3d-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs on `http://localhost:5173`

## Project Structure

```
jack-3d-portfolio/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── .gitignore
├── README.md
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    └── components/
        ├── HeroSection.tsx
        ├── MarqueeSection.tsx
        ├── AboutSection.tsx
        ├── ServicesSection.tsx
        ├── ProjectsSection.tsx
        ├── ContactButton.tsx
        ├── LiveProjectButton.tsx
        ├── FadeIn.tsx
        ├── Magnet.tsx
        └── AnimatedText.tsx
```

## Customization

### Colors
Edit `src/index.css` and `tailwind.config.ts` to change the color scheme.

### Typography
The site uses Google Fonts "Kanit" (weights 300-900). Modify the font in `index.html` to use a different font.

### Content
Update text content in each section component (`src/components/*.tsx`).

### Images
Replace image URLs in the section components:
- Hero portrait in `HeroSection.tsx`
- Marquee GIFs in `MarqueeSection.tsx`
- Decorative images in `AboutSection.tsx`
- Project images in `ProjectsSection.tsx`

## Performance Tips

- Images are lazy-loaded
- Scroll listeners use passive event handling
- CSS animations use `will-change` for performance
- Consider using WebP format for images
- Optimize image sizes before deployment

## Browser Support

Modern browsers with ES2020 support (Chrome, Firefox, Safari, Edge)

## License

MIT

## Created from Prompt

This portfolio was created from a detailed design specification for motionsites.ai

---

# HeroScrub — Cinematic Scroll-Driven Hero (Lamborghini Temerario)

A canvas-based, scroll-scrubbed hero experience built with **GSAP + ScrollTrigger**.
As the user scrolls through a tall (500vh) section, a sticky viewport scrubs
through 300 sequential frames (a cinematic exterior → interior → beauty-shot
tour) while five timed text phases animate in and out and the frame "card"
scales from a small preview up to a fully immersive, viewport-filling shot and
back.

### Files

| File | Purpose |
| --- | --- |
| `src/components/ui/hero-scrub.tsx` | The component (production-ready, self-contained). |
| `src/pages/TemerarioPage.tsx` | Usage in this Vite app — route `#/temerario`. |
| `app/page.tsx` | Canonical Next.js-style usage example (reference only). |
| `public/frames/0001.webp … 0300.webp` | The 300 cinematic frames (1600×900, 16:9). |

### Run it

```bash
npm install          # gsap is already in package.json
npm run dev          # then open the printed URL and visit #/temerario
```

Example: `http://localhost:5173/jackclaude/#/temerario`

### Dependencies

- `gsap` (^3.15) — includes its own TypeScript types.
  > The brief mentioned `@types/gsap`, but that package is **deprecated and
  > empty** — GSAP v3 ships types in the box, so it is intentionally not installed.

### Props

```ts
export type HeroScrubProps = {
  frameCount: number;               // 300
  frameUrl: (i: number) => string;  // (i) => `/frames/${String(i+1).padStart(4,'0')}.webp`
  titleTop: string;                 // "LAMBORGHINI"
  titleBottom: string;              // "TEMERARIO"
  accentHex?: string;               // "#D4A017"
  bgClassName?: string;             // "bg-black"
  ctaText?: string;                 // "DISCOVER MORE →"
  ctaHref?: string;                 // "https://nexas.ro"
  defaultAspect?: number;           // 16/9
};
```

### How it works

- **Rendering:** frames are drawn to an HTML5 `<canvas>` (never `<img>`). The
  2D context is cached, and the canvas only redraws when the target frame index
  changes (`lastDrawnRef`). If a target frame hasn't downloaded yet, the nearest
  loaded frame is drawn instead.
- **Loading:** the first 20 frames preload immediately with
  `fetchPriority="high"`; the rest stream in batches of 20 every 80ms. A loader
  shows until the first frame is ready; if the first frame never arrives within
  4.5s the component falls back to a static background.
- **Scroll:** the section is `500vh` with a `position: sticky`, `100svh` inner
  stage (no ScrollTrigger pin — sticky CSS performs better). A single
  ScrollTrigger with `scrub: 0.5` drives a per-frame `render(progress)` that
  computes the frame index, card scale and every overlay's opacity.
- **Card scale:** starts at `0.65` (desktop) / `0.85` (mobile), grows to `1.0`
  by 15%, expands to `immerseScale = max(vw/baseW, vh/baseH) * 1.04` by 78%,
  then returns to the start scale by 100%.
- **Text phases:** ① split title (0–15%), ② spec subtitle (20–45%),
  ③ "Crafted for the Fearless" (50–70%), ④ "Where Art Meets Engineering"
  (75–90%), ⑤ CTA button fades in (90–100%) and is the **only** clickable
  element (it links to `ctaHref`).
- **Entry animation:** a GSAP timeline fades in the background and canvas and
  slides the two titles into place on load.
- **Accessibility:** section `aria-label`, `aria-hidden` canvas/decoration,
  focus-visible ring on the CTA, and full `prefers-reduced-motion` support
  (animations skipped, first frame shown statically).

### Reuse in another project

1. Copy `public/frames/` and `src/components/ui/hero-scrub.tsx`.
2. `npm install gsap`.
3. Render `<HeroScrub … />` (see `app/page.tsx`). In a Next.js app, add
   `"use client";` to the top of `hero-scrub.tsx`.
