import { HeroScrub } from "@/components/ui/hero-scrub";

/**
 * Cinematic scroll-driven hero for the Lamborghini Temerario.
 * Reachable at #/temerario in this Vite app.
 */
export function TemerarioPage() {
  return (
    <main className="bg-black">
      <HeroScrub
        frameCount={300}
        frameUrl={(i) => `${import.meta.env.BASE_URL}frames/${String(i + 1).padStart(4, "0")}.webp`}
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

export default TemerarioPage;
