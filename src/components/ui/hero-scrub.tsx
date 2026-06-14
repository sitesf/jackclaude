import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Tunables                                                            */
/* ------------------------------------------------------------------ */
const SECTION_VH = 500;            // total scrollable height of the section
const SCRUB = 0.5;                 // ScrollTrigger smooth scrub
const IMMERSE_OVERFILL = 1.04;     // how much the immersive frame overfills the viewport
const INITIAL_BATCH = 20;          // frames preloaded immediately
const BATCH_SIZE = 20;             // frames per lazy batch
const BATCH_INTERVAL = 80;         // ms between lazy batches
const FALLBACK_MS = 4500;          // give up + show static bg after this
const START_SCALE_DESKTOP = 0.65;
const START_SCALE_MOBILE = 0.85;

export type HeroScrubProps = {
  frameCount: number;
  frameUrl: (i: number) => string;
  titleTop: string;
  titleBottom: string;
  accentHex?: string;
  bgClassName?: string;
  ctaText?: string;
  ctaHref?: string;
  defaultAspect?: number;
};

/* ------------------------------------------------------------------ */
/* Math helpers                                                        */
/* ------------------------------------------------------------------ */
const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
/** Linear map of `p` from [a,b] -> [0,1], clamped. */
const norm = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
/**
 * Trapezoid "band" envelope: returns 0 before `a`, ramps to 1 by `b`,
 * holds 1 until `c`, ramps back to 0 by `d`, then 0 after `d`.
 */
const band = (p: number, a: number, b: number, c: number, d: number) =>
  Math.min(norm(p, a, b), 1 - norm(p, c, d));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

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
  titleTop,
  titleBottom,
  accentHex = "#D4A017",
  bgClassName = "bg-black",
  ctaText = "DISCOVER MORE →",
  ctaHref = "https://nexas.ro",
  defaultAspect = 16 / 9,
}: HeroScrubProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleTopRef = useRef<HTMLHeadingElement>(null);
  const titleBottomRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);
  const phase4Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);

  // Mutable, render-free state for the draw loop.
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastDrawnRef = useRef<number>(-1);

  const [ready, setReady] = useState(false);
  const [framesOk, setFramesOk] = useState(frameCount > 0);
  const [aspect, setAspect] = useState<number>(defaultAspect);
  const [isMobile, setIsMobile] = useState(false);
  const reduced = usePrefersReducedMotion();

  /* track viewport breakpoint -------------------------------------- */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

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
        setAspect(img.naturalWidth / img.naturalHeight);
      }
      setReady(true);
    };

    const onErr = () => {
      errored++;
      // Tolerate the odd 404, but bail to the static fallback if many fail.
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

    // 1) Preload the first batch immediately, high priority.
    const initial = Math.min(INITIAL_BATCH, frameCount);
    for (let i = 0; i < initial; i++) loadOne(i);

    // 2) Stream the rest in batches.
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

    // 3) Fallback: if the first frame never arrives, show static bg.
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
  /* Reduced motion: draw the first frame statically, no animation.   */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (!reduced || !ready) return;
    const img = imagesRef.current[0];
    const canvas = canvasRef.current;
    if (img && canvas && img.complete) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }, [reduced, ready]);

  /* ---------------------------------------------------------------- */
  /* Entry animation (runs once, before scroll)                       */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(bgRef.current, { opacity: 0, duration: 1.2, ease: "power2.out" }, 0);
      tl.from(cardRef.current, { opacity: 0, duration: 1, ease: "power3.out" }, 0.3);
      tl.from(titleTopRef.current, { y: -60, opacity: 0, duration: 1, ease: "expo.out" }, 0.5);
      tl.from(titleBottomRef.current, { y: 60, opacity: 0, duration: 1, ease: "expo.out" }, 0.6);
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  /* ---------------------------------------------------------------- */
  /* Scroll-driven scrub: frames + card scale + text phases           */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (reduced || !ready || !framesOk) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const startScale = isMobile ? START_SCALE_MOBILE : START_SCALE_DESKTOP;
      const vhFactor = isMobile ? 0.6 : 0.72;
      const slidePx = () => (isMobile ? 0.5 : 0.6) * window.innerWidth;

      const immerseScale = () => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const baseW = Math.min(vw * 0.96, vh * vhFactor * aspect);
        const baseH = Math.min(vh * vhFactor, (vw * 0.96) / aspect);
        if (baseW <= 0 || baseH <= 0) return 1.5;
        return Math.max(vw / baseW, vh / baseH) * IMMERSE_OVERFILL;
      };
      let immerse = immerseScale();

      const isLoaded = (i: number) => {
        const img = imagesRef.current[i];
        return !!img && img.complete && img.naturalWidth > 0;
      };

      const drawFrame = (index: number) => {
        const canvas = canvasRef.current;
        const ctx2 = ctxRef.current ?? canvas?.getContext("2d") ?? null;
        if (!canvas || !ctx2) return;
        ctxRef.current = ctx2;

        // Use the nearest already-loaded frame if the target isn't in yet.
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
        if (lastDrawnRef.current === useIdx) return; // only redraw on change
        const img = imagesRef.current[useIdx];
        if (!img) return;
        ctx2.drawImage(img, 0, 0, canvas.width, canvas.height);
        lastDrawnRef.current = useIdx;
      };

      // Performant per-frame setters (avoid allocating tweens each tick).
      const setCardScale = gsap.quickSetter(cardRef.current, "scale") as (v: number) => void;
      const setTopX = gsap.quickSetter(titleTopRef.current, "x", "px") as (v: number) => void;
      const setBottomX = gsap.quickSetter(titleBottomRef.current, "x", "px") as (v: number) => void;
      const setTopO = gsap.quickSetter(titleTopRef.current, "opacity") as (v: number) => void;
      const setBottomO = gsap.quickSetter(titleBottomRef.current, "opacity") as (v: number) => void;
      const setSubO = gsap.quickSetter(subtitleRef.current, "opacity") as (v: number) => void;
      const setP3O = gsap.quickSetter(phase3Ref.current, "opacity") as (v: number) => void;
      const setP4O = gsap.quickSetter(phase4Ref.current, "opacity") as (v: number) => void;
      const setCtaO = gsap.quickSetter(ctaRef.current, "opacity") as (v: number) => void;

      gsap.set(cardRef.current, { scale: startScale, transformOrigin: "50% 50%" });

      const render = (p: number) => {
        /* --- frames -------------------------------------------------- */
        const frameIdx = Math.min(frameCount - 1, Math.floor(p * frameCount));
        drawFrame(frameIdx);

        /* --- card scale --------------------------------------------- */
        let scale: number;
        if (p <= 0.15) scale = lerp(startScale, 1, norm(p, 0, 0.15));
        else if (p <= 0.78) scale = lerp(1, immerse, norm(p, 0.15, 0.78));
        else scale = lerp(immerse, startScale, norm(p, 0.78, 1));
        setCardScale(scale);

        /* --- Phase 1 titles: rest -> slide apart over 0..15% -------- */
        const t1 = norm(p, 0, 0.15);
        setTopX(-slidePx() * t1);
        setBottomX(slidePx() * t1);
        const titleO = 1 - t1;
        setTopO(titleO);
        setBottomO(titleO);

        /* --- Phase 2 subtitle: 20% in .. 45% out -------------------- */
        setSubO(band(p, 0.2, 0.25, 0.4, 0.45));
        /* --- Phase 3: 50% .. 70% ------------------------------------ */
        setP3O(band(p, 0.5, 0.55, 0.65, 0.7));
        /* --- Phase 4: 75% .. 90% ------------------------------------ */
        setP4O(band(p, 0.75, 0.8, 0.85, 0.9));
        /* --- Phase 5 CTA: fades in 90% .. 96% ----------------------- */
        const ctaO = norm(p, 0.9, 0.96);
        setCtaO(ctaO);
        const btn = ctaBtnRef.current;
        if (btn) btn.style.pointerEvents = ctaO > 0.5 ? "auto" : "none";
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: SCRUB,
        invalidateOnRefresh: true,
        onRefresh: () => { immerse = immerseScale(); },
        onUpdate: (self) => render(self.progress),
      });

      render(0);

      // Recompute trigger geometry once webfonts have settled.
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      } else {
        ScrollTrigger.refresh();
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [ready, framesOk, reduced, aspect, frameCount, isMobile]);

  /* ---------------------------------------------------------------- */
  /* Styles                                                           */
  /* ---------------------------------------------------------------- */
  const cardW = `min(96vw, calc(${(isMobile ? 0.6 : 0.72) * 100}svh * ${aspect}))`;
  const cardH = `min(${(isMobile ? 0.6 : 0.72) * 100}svh, 96vw / ${aspect})`;
  const titleFont = isMobile
    ? "clamp(3rem, 10vw, 6rem)"
    : "clamp(4rem, 12vw, 11rem)";

  const overlayText: React.CSSProperties = {
    fontWeight: 900,
    color: "#fff",
    fontSize: "clamp(2rem, 6vw, 5rem)",
    lineHeight: 1.02,
    letterSpacing: "-0.02em",
    textTransform: "uppercase",
    textAlign: "center",
    maxWidth: "min(90vw, 60ch)",
    textShadow: "0 4px 40px rgba(0,0,0,0.6)",
  };

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-clip text-white ${bgClassName}`}
      style={{ height: `${SECTION_VH}vh` }}
      aria-label="Cinematic Lamborghini Temerario showcase"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden"
      >
        {/* background fill (also the static fallback) */}
        <div
          ref={bgRef}
          aria-hidden
          className="absolute inset-0 z-0"
          style={{
            backgroundColor: accentHex,
            backgroundImage: !framesOk ? `url(${frameUrl(0)})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div aria-hidden className="absolute inset-0 z-0 bg-black/40" />

        {/* loader */}
        {!ready && framesOk && !reduced && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black">
            <div
              className="h-10 w-10 animate-spin rounded-full border-2 border-white/20"
              style={{ borderTopColor: accentHex }}
            />
          </div>
        )}

        {/* scaling frame card (canvas lives here) */}
        <div
          ref={cardRef}
          className="hero-canvas-wrapper relative z-10 overflow-hidden rounded-[12px] ring-1 ring-white/[0.08] md:rounded-[16px]"
          style={{
            width: cardW,
            height: cardH,
            aspectRatio: String(aspect),
            boxShadow: "0 20px 80px rgba(0,0,0,0.6)",
          }}
        >
          {framesOk && (
            <canvas
              ref={canvasRef}
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>

        {/* ---------- text overlays (above canvas) ---------- */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center">
          {/* Phase 1 — split title */}
          <h1
            ref={titleTopRef}
            className="font-black uppercase leading-[0.85] will-change-transform"
            style={{ fontSize: titleFont, letterSpacing: "-0.04em" }}
          >
            {titleTop}
          </h1>
          <h1
            ref={titleBottomRef}
            className="font-black uppercase leading-[0.85] will-change-transform"
            style={{ fontSize: titleFont, letterSpacing: "-0.04em" }}
          >
            {titleBottom}
          </h1>
        </div>

        {/* Phase 2 — subtitle */}
        <div
          ref={subtitleRef}
          className="pointer-events-none absolute inset-x-0 bottom-[18%] z-20 text-center will-change-[opacity]"
          style={{ opacity: 0 }}
        >
          <span
            className="uppercase"
            style={{ fontSize: "1rem", letterSpacing: "0.3em", color: accentHex }}
          >
            V8 Biturbo Ibrido • 920 CV • 0-100 in 2.9s
          </span>
        </div>

        {/* Phase 3 */}
        <div
          ref={phase3Ref}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 will-change-[opacity]"
          style={{ opacity: 0 }}
        >
          <p style={overlayText}>Crafted for the Fearless</p>
        </div>

        {/* Phase 4 */}
        <div
          ref={phase4Ref}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 will-change-[opacity]"
          style={{ opacity: 0 }}
        >
          <p style={overlayText}>Where Art Meets Engineering</p>
        </div>

        {/* Phase 5 — CTA */}
        <div
          ref={ctaRef}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center will-change-[opacity]"
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

        {/* ---------- cinematic visual effects (always on) ---------- */}
        {/* vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[25]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        {/* top gradient for nav readability */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[25] h-40"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
          }}
        />
        {/* bottom gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-40"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
          }}
        />
      </div>
    </section>
  );
}

export default HeroScrub;
