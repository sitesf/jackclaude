// Canonical usage example (Next.js "app router" style) as specified in the brief.
//
// NOTE: this repository is a Vite + React app, not Next.js, so this file is a
// reference only and is intentionally excluded from the build (tsconfig only
// compiles ./src). The component actually runs from src/pages/TemerarioPage.tsx,
// reachable at #/temerario. In a Next.js project this file would live at
// app/page.tsx and work as-is once "use client" is added to hero-scrub.tsx.

import { HeroScrub } from "@/components/ui/hero-scrub";

export default function Page() {
  return (
    <main>
      <HeroScrub
        frameCount={300}
        frameUrl={(i) => `/frames/${String(i + 1).padStart(4, "0")}.webp`}
        titleTop="LAMBORGHINI"
        titleBottom="TEMERARIO"
        accentHex="#D4A017"
        bgClassName="bg-black"
        ctaText="DISCOVER MORE →"
        ctaHref="https://nexas.ro"
        defaultAspect={16 / 9}
      />
    </main>
  );
}
