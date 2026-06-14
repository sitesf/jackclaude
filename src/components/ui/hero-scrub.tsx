import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Tunables                                                            */
/* ------------------------------------------------------------------ */
const START_FRAME = 34;       // 0-indexed -> 0035.webp = clean lateral hero shot
const PLAY_DURATION = 14;     // seconds for the full cinematic (longer = slower zoom)
const INITIAL_BATCH = 20;
const BATCH_SIZE = 20;
const BATCH_INTERVAL = 80;
const FALLBACK_MS = 4500;

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
  const bgRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastDrawnRef = useRef<number>(-1);

  const startIdx = Math.min(START_FRAME, Math.max(0, frameCount - 1));

  const [ready, setReady] = useState(false);
  const [framesOk, setFramesOk] = useState(frameCount > 0);
  const reduced = usePrefersReducedMotion();

  /* ---------------------------------------------------------------- */
  /* Image loading — load forward from the lateral start frame first. */
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

    // Priority order: start frame → end, then backfill the earlier frames.
    const order: number[] = [];
    for (let i = startIdx; i < frameCount; i++) order.push(i);
    for (let i = startIdx - 1; i >= 0; i--) order.push(i);

    const drawInitial = (img: HTMLImageElement) => {
      const canvas = canvasRef.current;
      if (canvas && img.naturalWidth && img.naturalHeight) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctxRef.current = ctx;
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        lastDrawnRef.current = startIdx;
      }
      setReady(true);
    };

    const onErr = () => {
      errored++;
      if (!cancelled && errored >= 5) setFramesOk(false);
    };

    const loadOne = (i: number, priority: boolean) => {
      const img = new window.Image();
      img.decoding = "async";
      if (priority) {
        (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "high";
      }
      img.onerror = onErr;
      if (i === startIdx) img.onload = () => { if (!cancelled) drawInitial(img); };
      img.src = frameUrl(i);
      images[i] = img;
    };

    let pos = 0;
    const initial = Math.min(INITIAL_BATCH, order.length);
    for (; pos < initial; pos++) loadOne(order[pos], true);

    let timer: ReturnType<typeof setTimeout> | null = null;
    const loadNext = () => {
      if (cancelled) return;
      const end = Math.min(order.length, pos + BATCH_SIZE);
      for (; pos < end; pos++) loadOne(order[pos], false);
      if (pos < order.length) timer = setTimeout(loadNext, BATCH_INTERVAL);
    };
    timer = setTimeout(loadNext, BATCH_INTERVAL);

    const fallback = window.setTimeout(() => {
      if (!cancelled && !images[startIdx]?.complete) setFramesOk(false);
    }, FALLBACK_MS);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      window.clearTimeout(fallback);
    };
  }, [frameCount, frameUrl, startIdx]);

  /* ---------------------------------------------------------------- */
  /* Reduced motion: just show the lateral frame.                     */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (!reduced || !ready) return;
    const img = imagesRef.current[startIdx];
    const canvas = canvasRef.current;
    if (img && canvas && img.complete) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }, [reduced, ready, startIdx]);

  /* ---------------------------------------------------------------- */
  /* Entry fade                                                       */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(bgRef.current, { opacity: 0, duration: 1.2, ease: "power2.out" });
      gsap.from(canvasRef.current, { opacity: 0, duration: 1.4, ease: "power2.out", delay: 0.2 });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  /* ---------------------------------------------------------------- */
  /* Cinematic playback — starts on first scroll / touch only.        */
  /* Plays frames at a constant film-like cadence (no scroll scrub),  */
  /* so the motion is smooth regardless of how the user scrolls.      */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (reduced || !ready || !framesOk) return;

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

    const setCtaO = ctaText
      ? (gsap.quickSetter(ctaRef.current, "opacity") as (v: number) => void)
      : null;

    let started = false;
    let finished = false;
    let tween: gsap.core.Tween | null = null;
    const frameObj = { f: startIdx };

    const preventTouch = (e: TouchEvent) => { if (!finished) e.preventDefault(); };
    const lock = () => {
      document.body.style.overflow = "hidden";
      window.addEventListener("touchmove", preventTouch, { passive: false });
    };
    const unlock = () => {
      finished = true;
      document.body.style.overflow = "";
      window.removeEventListener("touchmove", preventTouch);
    };

    lock();
    drawFrame(startIdx);

    const start = () => {
      if (started) return;
      started = true;
      hintRef.current && gsap.to(hintRef.current, { opacity: 0, duration: 0.4 });

      tween = gsap.to(frameObj, {
        f: frameCount - 1,
        duration: PLAY_DURATION,
        ease: "none",
        onUpdate: () => {
          drawFrame(Math.round(frameObj.f));
          if (setCtaO) {
            const p = norm(frameObj.f, startIdx, frameCount - 1);
            setCtaO(norm(p, 0.9, 1));
          }
        },
        onComplete: () => {
          unlock();
          const btn = ctaBtnRef.current;
          if (btn) btn.style.pointerEvents = "auto";
        },
      });
    };

    const onWheel = () => start();
    const onTouchStart = () => start();
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) start();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      tween?.kill();
      unlock();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("keydown", onKey);
    };
  }, [ready, framesOk, reduced, frameCount, startIdx, ctaText]);

  return (
    <section
      ref={sectionRef}
      className={`relative h-[100svh] w-full overflow-hidden text-white ${bgClassName}`}
      aria-label="Cinematic Lamborghini Temerario showcase"
    >
      {/* background fill (also the static fallback) */}
      <div
        ref={bgRef}
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: framesOk ? "#000" : accentHex,
          backgroundImage: !framesOk ? `url(${frameUrl(startIdx)})` : undefined,
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

      {/* scroll / touch hint (icon only, no text on image) */}
      {ready && framesOk && !reduced && (
        <div
          ref={hintRef}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex justify-center"
        >
          <ChevronDown className="h-7 w-7 animate-bounce text-white/80" />
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
    </section>
  );
}

export default HeroScrub;
