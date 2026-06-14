import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Tunables                                                            */
/* ------------------------------------------------------------------ */
const SECTION_VH = 600;            // total scrollable height (longer = slower, more cinematic)
const SCRUB = 0.6;                 // ScrollTrigger smooth scrub
const INITIAL_BATCH = 20;          // frames preloaded immediately
const BATCH_SIZE = 20;             // frames per lazy batch
const BATCH_INTERVAL = 80;         // ms between lazy batches
const FALLBACK_MS = 4500;          // give up + show static bg after this
const FRAME_END = 0.92;            // frames play across 0..FRAME_END, CTA owns the tail

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

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const norm = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

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
  const stickyRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastDrawnRef = useRef<number>(-1);

  const [ready, setReady] = useState(false);
  const [framesOk, setFramesOk] = useState(frameCount > 0);
  const reduced = usePrefersReducedMotion();

  /* ---------------------------------------------------------------- */
  /* Image loading                                                    */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (frameCount <= 0) {
      setFramesOk(false);
      return;
    }
    let cancelled = false;
    let errored = 0;
    const images: HTMLImageElement[] = new Array(frameCount);
    imagesRef.current = images;

    const onFirstReady = (img: HTMLImageElement) => {
      if (cancelled) return;
      const canvas = canvasRef.current;
      if (canvas && img.naturalWidth && img.naturalHeight) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctxRef.current = ctx;
        ctx?.drawImage(img, 0, 0);
        lastDrawnRef.current = 0;
      }
      setReady(true);
    };

    const onErr = () => {
      errored++;
      if (!cancelled && errored >= 5) setFramesOk(false);
    };

    const loadOne = (i: number) => {
      const img = new window.Image();
      img.decoding = "async";
      if (i < INITIAL_BATCH) {
        (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "high";
      }
      img.onerror = onErr;
      if (i === 0) img.onload = () => onFirstReady(img);
      img.src = frameUrl(i);
      images[i] = img;
    };

    const initial = Math.min(INITIAL_BATCH, frameCount);
    for (let i = 0; i < initial; i++) loadOne(i);

    let cursor = initial;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const loadNext = () => {
      if (cancelled) return;
      const end = Math.min(frameCount, cursor + BATCH_SIZE);
      for (let i = cursor; i < end; i++) loadOne(i);
      cursor = end;
      if (cursor < frameCount) timer = setTimeout(loadNext, BATCH_INTERVAL);
    };
    timer = setTimeout(loadNext, BATCH_INTERVAL);

    const fallback = window.setTimeout(() => {
      if (!cancelled && !images[0]?.complete) setFramesOk(false);
    }, FALLBACK_MS);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      window.clearTimeout(fallback);
    };
  }, [frameCount, frameUrl]);

  /* ---------------------------------------------------------------- */
  /* Reduced motion: draw the first frame, no animation.              */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (!reduced || !ready) return;
    const img = imagesRef.current[0];
    const canvas = canvasRef.current;
    if (img && canvas && img.complete) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }, [reduced, ready]);

  /* ---------------------------------------------------------------- */
  /* Entry animation                                                  */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(bgRef.current, { opacity: 0, duration: 1.2, ease: "power2.out" }, 0);
      tl.from(canvasRef.current, { opacity: 0, duration: 1.2, ease: "power2.out" }, 0.2);
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  /* ---------------------------------------------------------------- */
  /* Scroll-driven cinematic scrub (full-bleed frames + tail CTA)     */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (reduced || !ready || !framesOk) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const isLoaded = (i: number) => {
        const img = imagesRef.current[i];
        return !!img && img.complete && img.naturalWidth > 0;
      };

      const drawFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx2 = ctxRef.current ?? canvas?.getContext("2d") ?? null;
        if (!canvas || !ctx2) return;
        ctxRef.current = ctx2;

        let useIdx = index;
        if (!isLoaded(useIdx)) {
          let found = -1;
          for (let d = 1; d < frameCount; d++) {
            if (useIdx - d >= 0 && isLoaded(useIdx - d)) { found = useIdx - d; break; }
            if (useIdx + d < frameCount && isLoaded(useIdx + d)) { found = useIdx + d; break; }
          }
          if (found === -1) return;
          useIdx = found;
        }
        if (lastDrawnRef.current === useIdx) return;
        const img = imagesRef.current[useIdx];
        if (!img) return;
        ctx2.drawImage(img, 0, 0, canvas.width, canvas.height);
        lastDrawnRef.current = useIdx;
      };

      const setCtaO = gsap.quickSetter(ctaRef.current, "opacity") as (v: number) => void;

      const render = (p: number) => {
        const mapped = norm(p, 0, FRAME_END);
        const frameIdx = Math.min(frameCount - 1, Math.floor(mapped * frameCount));
        drawFrame(frameIdx);

        if (ctaText) {
          const o = norm(p, 0.92, 0.99);
          setCtaO(o);
          const btn = ctaBtnRef.current;
          if (btn) btn.style.pointerEvents = o > 0.5 ? "auto" : "none";
        }
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: SCRUB,
        invalidateOnRefresh: true,
        onUpdate: (self) => render(self.progress),
      });

      render(0);

      if (document.fonts?.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      } else {
        ScrollTrigger.refresh();
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [ready, framesOk, reduced, frameCount, ctaText]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-clip text-white ${bgClassName}`}
      style={{ height: `${SECTION_VH}vh` }}
      aria-label="Cinematic Lamborghini Temerario showcase"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-[100svh] w-full overflow-hidden"
      >
        {/* background fill (also the static fallback) */}
        <div
          ref={bgRef}
          aria-hidden
          className="absolute inset-0 z-0"
          style={{
            backgroundColor: framesOk ? "#000" : accentHex,
            backgroundImage: !framesOk ? `url(${frameUrl(0)})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* full-bleed cinematic canvas */}
        {framesOk && (
          <canvas
            ref={canvasRef}
            aria-hidden
            className="absolute inset-0 z-10 h-full w-full object-cover"
          />
        )}

        {/* loader */}
        {!ready && framesOk && !reduced && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black">
            <div
              className="h-10 w-10 animate-spin rounded-full border-2 border-white/20"
              style={{ borderTopColor: accentHex }}
            />
          </div>
        )}

        {/* optional CTA — fades in over the dark tail of the sequence */}
        {ctaText && (
          <div
            ref={ctaRef}
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center will-change-[opacity]"
            style={{ opacity: 0 }}
          >
            <a
              ref={ctaBtnRef}
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta pointer-events-none inline-block focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
              style={{
                background: accentHex,
                color: "#000",
                fontWeight: 700,
                fontSize: "1.1rem",
                padding: "18px 48px",
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
              "radial-gradient(ellipse at center, transparent 58%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-40"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}
        />
      </div>
    </section>
  );
}

export default HeroScrub;
