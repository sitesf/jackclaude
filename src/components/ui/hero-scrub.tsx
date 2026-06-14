import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

/* ------------------------------------------------------------------ */
/* Premium cinematic showcase                                          */
/*                                                                     */
/* The supplied 300-frame sequence is a cross-dissolve montage whose   */
/* transition frames contain baked-in "ghosting" (two overlapping      */
/* cars), which reads as jitter no matter how it is played back.       */
/* So instead of scrubbing through every frame, we hand-pick the       */
/* cleanest hero stills and present them with a slow continuous zoom    */
/* (Ken Burns) and elegant cross-fades — a real, buttery-smooth        */
/* camera move built from GPU transforms.                              */
/* ------------------------------------------------------------------ */

// Curated clean frames (0-indexed): lateral, 3/4, cockpit, seats, dashboard.
const CURATED = [34, 54, 189, 229, 269];
const SLIDE = 5;     // seconds each shot is the hero
const FADE = 1.4;    // cross-fade length (overlap between shots)
const ZOOM_FROM = 1.06;
const ZOOM_TO = 1.22;

export type HeroScrubProps = {
  frameCount: number;
  frameUrl: (i: number) => string;
  titleTop?: string;
  titleBottom?: string;
  accentHex?: string;
  bgClassName?: string;
  ctaText?: string;
  ctaHref?: string;
  defaultAspect?: number;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

export function HeroScrub({
  frameCount,
  frameUrl,
  accentHex = "#D4A017",
  bgClassName = "bg-black",
  ctaText,
  ctaHref = "https://nexas.ro",
}: HeroScrubProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  // Resolve the hero frames against the available range, with a fallback
  // to a few evenly-spaced frames if the curated picks don't exist.
  const frames = useMemo(() => {
    const picks = CURATED.filter((i) => i < frameCount);
    if (picks.length >= 2) return picks;
    if (frameCount <= 0) return [];
    return [0, 0.4, 0.7].map((p) => Math.min(frameCount - 1, Math.floor(p * frameCount)));
  }, [frameCount]);

  /* ---------------------------------------------------------------- */
  /* The cinematic loop                                               */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (frames.length === 0) return;
    const layers = layersRef.current.filter(Boolean) as HTMLDivElement[];
    if (layers.length === 0) return;

    // Reduced motion: just reveal the first hero shot, no animation.
    if (reduced) {
      gsap.set(layers, { opacity: 0, scale: 1 });
      gsap.set(layers[0], { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(sectionRef.current, { opacity: 0 });
      gsap.to(sectionRef.current, { opacity: 1, duration: 1.2, ease: "power2.out" });

      gsap.set(layers, { opacity: 0, scale: ZOOM_FROM, transformOrigin: "50% 50%" });

      const n = layers.length;
      const tl = gsap.timeline({ repeat: -1 });

      layers.forEach((el, i) => {
        const start = i * SLIDE;
        // continuous slow zoom across the whole time the shot is visible
        tl.fromTo(
          el,
          { scale: ZOOM_FROM },
          { scale: ZOOM_TO, duration: SLIDE + FADE, ease: "none" },
          start
        );
        // fade in
        tl.fromTo(
          el,
          { opacity: 0 },
          { opacity: 1, duration: FADE, ease: "power1.inOut" },
          start
        );
        // fade out (the next shot fades in over this, i.e. a cross-fade)
        tl.to(el, { opacity: 0, duration: FADE, ease: "power1.inOut" }, start + SLIDE);
      });

      // Seamless loop: first shot fades back in as the last one fades out.
      tl.fromTo(
        layers[0],
        { opacity: 0, scale: ZOOM_FROM },
        { opacity: 1, duration: FADE, ease: "power1.inOut" },
        n * SLIDE
      );

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 1.6 }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [frames, reduced]);

  if (frames.length === 0) {
    return (
      <section
        className={`relative h-[100svh] w-full ${bgClassName}`}
        style={{ backgroundColor: accentHex }}
        aria-label="Lamborghini Temerario showcase"
      />
    );
  }

  return (
    <section
      ref={sectionRef}
      className={`relative h-[100svh] w-full overflow-hidden text-white ${bgClassName}`}
      aria-label="Cinematic Lamborghini Temerario showcase"
    >
      {/* stacked hero stills (cross-fade + slow zoom) */}
      {frames.map((frameIdx, i) => (
        <div
          key={frameIdx}
          ref={(el) => (layersRef.current[i] = el)}
          aria-hidden
          className="absolute inset-0 z-0 will-change-transform"
          style={{
            backgroundImage: `url(${frameUrl(frameIdx)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0,
          }}
        />
      ))}

      {/* preload the hero stills */}
      <div className="hidden">
        {frames.map((frameIdx) => (
          <img key={frameIdx} src={frameUrl(frameIdx)} alt="" aria-hidden loading="eager" />
        ))}
      </div>

      {/* optional CTA */}
      {ctaText && (
        <div
          ref={ctaRef}
          className="absolute inset-x-0 bottom-12 z-30 flex justify-center"
          style={{ opacity: 0 }}
        >
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta inline-block focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
            style={{
              background: accentHex,
              color: "#000",
              fontWeight: 700,
              fontSize: "1.1rem",
              padding: "16px 44px",
              borderRadius: "9999px",
            }}
          >
            {ctaText}
          </a>
        </div>
      )}

      {/* ---------- cinematic visual effects (no text) ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 56%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-40"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.65), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-44"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)" }}
      />
    </section>
  );
}

export default HeroScrub;
