import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SiteNav } from '../components/SiteNav';
import { SiteFooter } from '../components/SiteFooter';
import { FadeIn } from '../components/FadeIn';
import { getProject } from '../data/projects';
import { prefetchContact } from '../lib/prefetchContact';

const ACCENT = '#6C63FF';
const CYAN = '#00D4FF';
const CORAL = '#FF6B6B';
const MUTED = 'rgba(215,226,234,0.55)';

type ChatRole = 'alex' | 'user';
interface ChatMessage {
  role: ChatRole;
  text: string;
}

const demoScript: ChatMessage[] = [
  { role: 'alex', text: 'Salut! Sunt Alex. Cu ce te pot ajuta azi? 👋' },
  { role: 'user', text: 'Poți să-mi faci un rezumat al emailurilor de azi dimineață?' },
  {
    role: 'alex',
    text:
      'Sigur! Am găsit 12 emailuri. 3 necesită atenția ta:\n[1] Factură de la Acme SRL — scadentă vineri\n[2] Cerere întâlnire de la Mihai — necesită răspuns\n[3] Alertă server monitorizare — 09:42',
  },
];

const replies = [
  'Analizez asta acum... Pe baza preferințelor tale, recomand să începi cu prioritățile înalte. Vrei să creez o listă de sarcini?',
  'Bună întrebare! Am verificat calendarul — ai 2 intervale libere mâine: 10:00 și 15:00. Blocăm unul?',
  'Am găsit 5 documente relevante în workspace. Cel mai recent actualizat acum 2 ore. Vrei un rezumat?',
  'Pot gestiona asta! Voi redacta un răspuns pentru revizuire înainte de a-l trimite. Folosesc tonul profesional standard?',
  'Gata! Adăugat în lista ta cu deadline vineri. Îți trimit reminder joi după-amiază. Cu ce altceva te pot ajuta?',
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* ── fundal cu particule conectate (doar în hero) ── */
const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = window.innerWidth < 768 ? 38 : 75;
    const pts = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.8,
      op: Math.random() * 0.42 + 0.08,
    }));

    let raf = 0;
    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
            p.x = Math.random() * w;
            p.y = Math.random() * h;
          }
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108,99,255,${p.op})`;
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(108,99,255,${(1 - d / 110) * 0.09})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(frame);
    };
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="alex-canvas" aria-hidden />;
};

/* ── orbul cu inele orbitale ── */
const Orb: React.FC = () => (
  <div className="alex-orb-wrap">
    <div className="alex-orb-stage">
      <div className="alex-ring alex-ring-3" />
      <div className="alex-ring alex-ring-2" />
      <div className="alex-ring alex-ring-1" />
      <div className="alex-orb" />
    </div>
  </div>
);

/* ── demo de chat interactiv ── */
const ChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const [streamed, setStreamed] = useState<string | null>(null);
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const replyIndexRef = useRef(0);
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streamed, typing]);

  const pushAlex = async (text: string) => {
    setTyping(true);
    await sleep(820);
    if (!aliveRef.current) return;
    setTyping(false);
    setStreamed('');
    for (let i = 1; i <= text.length; i++) {
      await sleep(18);
      if (!aliveRef.current) return;
      setStreamed(text.slice(0, i));
    }
    setStreamed(null);
    setMessages((m) => [...m, { role: 'alex', text }]);
  };

  const runDemo = async () => {
    if (startedRef.current) return;
    startedRef.current = true;
    for (const m of demoScript) {
      await sleep(650);
      if (!aliveRef.current) return;
      if (m.role === 'alex') await pushAlex(m.text);
      else setMessages((prev) => [...prev, m]);
    }
  };

  /* pornește demo-ul când secțiunea intră în viewport */
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) runDemo();
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const send = async () => {
    const text = value.trim();
    if (!text || busy) return;
    setValue('');
    setBusy(true);
    setMessages((m) => [...m, { role: 'user', text }]);
    await sleep(250);
    await pushAlex(replies[replyIndexRef.current % replies.length]);
    replyIndexRef.current += 1;
    if (aliveRef.current) setBusy(false);
  };

  const renderText = (text: string) =>
    text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {i > 0 && <br />}
        {line}
      </React.Fragment>
    ));

  return (
    <div ref={sectionRef} className="alex-chat">
      <div className="alex-chat-head">
        <div className="alex-chat-avatar" />
        <div>
          <h4>Alex</h4>
          <span className="alex-online">Online · Disponibil</span>
        </div>
      </div>

      <div className="alex-chat-body" ref={boxRef}>
        {messages.map((m, i) => (
          <div key={i} className={`alex-msg ${m.role}`}>
            <div className={`alex-avatar ${m.role}`}>{m.role === 'user' ? 'TU' : ''}</div>
            <div className="alex-bubble">{renderText(m.text)}</div>
          </div>
        ))}

        {typing && (
          <div className="alex-msg alex">
            <div className="alex-avatar alex" />
            <div className="alex-bubble">
              <span className="alex-typing">
                <i />
                <i />
                <i />
              </span>
            </div>
          </div>
        )}

        {streamed !== null && (
          <div className="alex-msg alex">
            <div className="alex-avatar alex" />
            <div className="alex-bubble">{renderText(streamed)}</div>
          </div>
        )}
      </div>

      <div className="alex-chat-input">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') send();
          }}
          placeholder="Întreabă-l pe Alex orice..."
          autoComplete="off"
          aria-label="Scrie un mesaj pentru Alex"
        />
        <button type="button" onClick={send} aria-label="Trimite mesajul">
          <svg viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const AlexPage: React.FC = () => {
  const project = getProject('alex');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = project?.features ?? [];
  const steps = project?.steps ?? [];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="alex-page w-full overflow-x-clip">
      <SiteNav />

      {/* HERO */}
      <section className="alex-hero">
        <ParticleField />
        <div className="alex-hero-inner">
          <Orb />
          <FadeIn as="p" y={16} className="alex-eyebrow">
            {project?.category ?? 'Asistent AI · Automatizare'}
          </FadeIn>
          <FadeIn as="h1" delay={0.05} className="alex-h1">
            El este <span className="alex-grad">Alex.</span>
          </FadeIn>
          <FadeIn as="h2" delay={0.12} className="alex-h2">
            Agentul tău AI pentru automatizarea afacerii tale
          </FadeIn>
          <FadeIn as="p" delay={0.2} className="alex-sub">
            Alex gestionează sarcini, răspunde la întrebări și învață fluxul tău de lucru — nonstop, fără efort.
          </FadeIn>
          <FadeIn as="div" delay={0.28} className="alex-hero-cta">
            <button type="button" className="alex-btn-primary" onClick={() => scrollTo('alex-demo')}>
              Vorbește cu Alex
            </button>
            <button type="button" className="alex-btn-ghost" onClick={() => scrollTo('alex-proces')}>
              Cum funcționează <span className="alex-arrow">↓</span>
            </button>
          </FadeIn>
        </div>
      </section>

      {/* CAPABILITĂȚI */}
      <section className="alex-section" id="alex-capabilitati">
        <div className="alex-container">
          <FadeIn as="p" className="alex-label">
            // capabilități
          </FadeIn>
          <FadeIn as="h2" delay={0.05} className="alex-h3">
            Construit pentru felul în care <span className="alex-grad">lucrezi cu adevărat</span>
          </FadeIn>
          <FadeIn as="p" delay={0.1} className="alex-section-sub">
            Alex se adaptează la fluxul tău unic de lucru, îți memorează preferințele și execută sarcini cu precizie.
          </FadeIn>

          <div className="alex-grid">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={0.05 * i} className="alex-card">
                <div className="alex-card-icon">
                  <span />
                  <span />
                  <span />
                </div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section className="alex-section" id="alex-demo">
        <div className="alex-container alex-container-narrow">
          <FadeIn as="p" className="alex-label alex-center">
            // demo live
          </FadeIn>
          <FadeIn as="h2" delay={0.05} className="alex-h3 alex-center alex-grad">
            Testează-ți noul asistent AI.
          </FadeIn>
          <FadeIn as="p" delay={0.1} className="alex-section-sub alex-center">
            Acesta este un demo general, dar îți arată instantaneu cât de natural va decurge conversația cu clienții
            tăi odată ce Alex este personalizat pentru afacerea ta.
          </FadeIn>

          <FadeIn delay={0.15}>
            <ChatDemo />
          </FadeIn>

          <p className="alex-note">Powered by NEXAS · Răspuns în &lt;1s</p>
        </div>
      </section>

      {/* PROCES */}
      <section className="alex-section" id="alex-proces">
        <div className="alex-container">
          <FadeIn as="p" className="alex-label alex-center">
            // proces
          </FadeIn>
          <FadeIn as="h2" delay={0.05} className="alex-h3 alex-center">
            Cum ajunge Alex să lucreze pentru tine
          </FadeIn>

          <div className="alex-steps">
            {steps.map((s, i) => (
              <FadeIn key={s.title} delay={0.05 * i} className="alex-step">
                <div className="alex-step-num">0{i + 1}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="alex-cta">
        <div className="alex-cta-glow" aria-hidden />
        <div className="alex-container alex-center alex-cta-inner">
          <FadeIn as="p" className="alex-label alex-center">
            // hai să începem
          </FadeIn>
          <FadeIn as="h2" delay={0.05} className="alex-h3 alex-center">
            <span className="alex-grad">{project?.ctaTitle ?? 'Gata să-l angajezi pe Alex?'}</span>
          </FadeIn>
          <FadeIn as="p" delay={0.1} className="alex-section-sub alex-center">
            {project?.ctaText ?? 'Scrie-mi și configurăm Alex pentru afacerea ta.'}
          </FadeIn>
          <FadeIn delay={0.15}>
            <Link
              to="/contact"
              onMouseEnter={prefetchContact}
              onTouchStart={prefetchContact}
              className="glass-btn alex-cta-btn"
            >
              Contactează-ne
            </Link>
          </FadeIn>
          <p className="alex-note">Răspuns în maxim 1 oră · Fără obligații</p>
        </div>
      </section>

      <SiteFooter />

      <style>{`
        .alex-page {
          background:
            radial-gradient(ellipse 70% 50% at 50% 0%, rgba(108,99,255,.16), transparent 60%),
            #0C0C0C;
          color: #D7E2EA;
        }
        .alex-container { max-width: 1160px; margin: 0 auto; padding: 0 1.5rem; }
        .alex-container-narrow { max-width: 760px; }
        .alex-center { text-align: center; margin-left: auto; margin-right: auto; }

        .alex-grad {
          background: linear-gradient(135deg, ${ACCENT}, ${CYAN});
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* HERO */
        .alex-hero {
          position: relative;
          min-height: 88vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
          padding: 2rem 0 5rem;
        }
        .alex-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; }
        .alex-hero-inner { position: relative; z-index: 2; max-width: 820px; padding: 2rem 1.5rem 0; }

        .alex-orb-wrap { display: flex; justify-content: center; margin-bottom: 2.25rem; perspective: 600px; }
        .alex-orb-stage { position: relative; width: 180px; height: 180px; display: flex; align-items: center; justify-content: center; }
        .alex-orb {
          width: 100px; height: 100px; border-radius: 50%; position: relative; z-index: 3;
          background: radial-gradient(circle at 35% 35%, ${CYAN}, ${ACCENT}, #2a0a4e);
          box-shadow: 0 0 40px rgba(108,99,255,.6), 0 0 80px rgba(0,212,255,.3), inset 0 0 20px rgba(255,255,255,.1);
          animation: alexPulse 3s ease-in-out infinite;
        }
        .alex-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(108,99,255,.28); transform-style: preserve-3d; }
        .alex-ring-1 { width: 140px; height: 140px; animation: alexR1 8s linear infinite; }
        .alex-ring-2 { width: 170px; height: 170px; border-color: rgba(0,212,255,.18); animation: alexR2 12s linear infinite reverse; }
        .alex-ring-3 { width: 200px; height: 200px; border-color: rgba(255,107,107,.12); animation: alexR3 16s linear infinite; }
        @keyframes alexPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 40px rgba(108,99,255,.6), 0 0 80px rgba(0,212,255,.3); }
          50% { transform: scale(1.03); box-shadow: 0 0 60px rgba(108,99,255,.8), 0 0 120px rgba(0,212,255,.4); }
        }
        @keyframes alexR1 { from { transform: rotateX(70deg) rotateZ(0); } to { transform: rotateX(70deg) rotateZ(360deg); } }
        @keyframes alexR2 { from { transform: rotateX(60deg) rotateY(45deg) rotateZ(0); } to { transform: rotateX(60deg) rotateY(45deg) rotateZ(360deg); } }
        @keyframes alexR3 { from { transform: rotateX(80deg) rotateY(20deg) rotateZ(0); } to { transform: rotateX(80deg) rotateY(20deg) rotateZ(360deg); } }

        .alex-eyebrow {
          font-size: .72rem; letter-spacing: .22em; text-transform: uppercase;
          color: ${ACCENT}; font-weight: 500; margin-bottom: .9rem; opacity: .9;
        }
        .alex-h1 {
          font-weight: 900; text-transform: uppercase; letter-spacing: -.02em;
          font-size: clamp(2.6rem, 7vw, 4.4rem); line-height: 1.02;
        }
        .alex-h2 {
          font-weight: 600; font-size: clamp(1.25rem, 3.2vw, 2rem); line-height: 1.25;
          margin: .6rem 0 1.1rem; color: #D7E2EA;
        }
        .alex-sub { color: ${MUTED}; font-weight: 300; font-size: 1.02rem; line-height: 1.8; max-width: 540px; margin: 0 auto 2.1rem; }
        .alex-hero-cta { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

        .alex-btn-primary {
          background: linear-gradient(135deg, ${ACCENT}, ${CYAN});
          color: #fff; border: none; border-radius: 3rem; padding: .9rem 1.9rem;
          font-family: inherit; font-size: .95rem; font-weight: 600; cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .alex-btn-primary:hover { transform: scale(1.04); box-shadow: 0 8px 40px rgba(108,99,255,.45); }
        .alex-btn-ghost {
          background: transparent; color: #D7E2EA; border: 1px solid rgba(108,99,255,.38);
          border-radius: 3rem; padding: .9rem 1.9rem; font-family: inherit; font-size: .95rem;
          font-weight: 500; cursor: pointer; display: inline-flex; align-items: center; gap: .45rem;
          transition: border-color .2s ease, background .2s ease;
        }
        .alex-btn-ghost:hover { border-color: ${CYAN}; background: rgba(0,212,255,.06); }
        .alex-arrow { display: inline-block; animation: alexArrow 1.5s ease-in-out infinite; }
        @keyframes alexArrow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(4px); } }

        /* SECTIUNI */
        .alex-section { padding: 5rem 0; position: relative; }
        .alex-label {
          font-size: .72rem; letter-spacing: .18em; text-transform: uppercase;
          color: ${ACCENT}; opacity: .85; margin-bottom: .75rem; font-weight: 500;
        }
        .alex-h3 {
          font-weight: 900; text-transform: uppercase; letter-spacing: -.01em;
          font-size: clamp(1.7rem, 4vw, 2.6rem); line-height: 1.15; margin-bottom: .5rem;
        }
        .alex-section-sub { color: ${MUTED}; font-weight: 300; font-size: .98rem; line-height: 1.8; max-width: 620px; }

        .alex-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem; margin-top: 2.75rem;
        }
        .alex-card {
          padding: 2rem 1.75rem; border-radius: 20px; position: relative; overflow: hidden;
          background: rgba(255,255,255,.035); border: 1px solid rgba(215,226,234,.12);
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease, background .25s ease;
        }
        .alex-card:hover {
          transform: translateY(-6px);
          border-color: rgba(108,99,255,.45);
          background: linear-gradient(180deg, rgba(108,99,255,.09), rgba(255,255,255,.035));
          box-shadow: 0 22px 60px rgba(108,99,255,.16);
        }
        .alex-card h3 { font-weight: 700; font-size: 1.15rem; margin-bottom: .55rem; }
        .alex-card p { color: ${MUTED}; font-weight: 300; font-size: .92rem; line-height: 1.7; }
        .alex-card-icon {
          width: 50px; height: 50px; border-radius: 14px; margin-bottom: 1.15rem;
          background: rgba(108,99,255,.1); border: 1px solid rgba(108,99,255,.24);
          display: flex; align-items: center; justify-content: center; gap: 4px;
        }
        .alex-card-icon span { width: 6px; height: 6px; border-radius: 50%; background: ${CYAN}; animation: alexDot 1.4s ease-in-out infinite; }
        .alex-card-icon span:nth-child(2) { background: ${ACCENT}; animation-delay: .2s; }
        .alex-card-icon span:nth-child(3) { background: ${CORAL}; animation-delay: .4s; }
        @keyframes alexDot { 0%, 100% { transform: scale(1); opacity: .6; } 50% { transform: scale(1.4); opacity: 1; } }

        /* CHAT */
        .alex-chat {
          margin-top: 2.25rem; border-radius: 22px; overflow: hidden;
          background: rgba(15,15,26,.97); border: 1px solid rgba(215,226,234,.12);
          box-shadow: 0 40px 100px rgba(0,0,0,.5), 0 0 0 1px rgba(108,99,255,.1);
        }
        .alex-chat-head {
          padding: 1.05rem 1.35rem; display: flex; align-items: center; gap: .7rem;
          border-bottom: 1px solid rgba(215,226,234,.1); background: rgba(255,255,255,.02);
        }
        .alex-chat-head h4 { font-size: .92rem; font-weight: 600; }
        .alex-chat-avatar {
          width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
          background: radial-gradient(circle at 35% 35%, ${CYAN}, ${ACCENT});
          box-shadow: 0 0 10px rgba(108,99,255,.5); animation: alexPulse 3s ease-in-out infinite;
        }
        .alex-online { font-size: .74rem; color: #00ff88; display: flex; align-items: center; gap: 5px; font-weight: 300; }
        .alex-online::before {
          content: ''; width: 5px; height: 5px; border-radius: 50%; background: #00ff88;
          animation: alexBlink 2s ease-in-out infinite;
        }
        @keyframes alexBlink { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }

        .alex-chat-body {
          padding: 1.25rem; min-height: 280px; max-height: 380px; overflow-y: auto;
          display: flex; flex-direction: column; gap: .9rem;
        }
        .alex-chat-body::-webkit-scrollbar { width: 3px; }
        .alex-chat-body::-webkit-scrollbar-thumb { background: rgba(108,99,255,.35); border-radius: 2px; }
        .alex-msg { display: flex; gap: .65rem; animation: alexMsgIn .35s cubic-bezier(.16,1,.3,1); }
        .alex-msg.user { flex-direction: row-reverse; }
        @keyframes alexMsgIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .alex-avatar { width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0; margin-top: 2px; }
        .alex-avatar.alex {
          background: radial-gradient(circle at 35% 35%, ${CYAN}, ${ACCENT});
          box-shadow: 0 0 8px rgba(108,99,255,.5);
        }
        .alex-avatar.user {
          background: linear-gradient(135deg, #3a3a5a, #555); display: flex; align-items: center;
          justify-content: center; font-size: .6rem; color: #ccc; font-weight: 600;
        }
        .alex-bubble {
          max-width: 88%; padding: .65rem .9rem; border-radius: 16px;
          font-size: .88rem; font-weight: 300; line-height: 1.6;
        }
        .alex-msg.alex .alex-bubble {
          background: rgba(108,99,255,.1); border: 1px solid rgba(108,99,255,.2);
          border-bottom-left-radius: 4px;
        }
        .alex-msg.user .alex-bubble {
          background: linear-gradient(135deg, ${ACCENT}, ${CYAN}); color: #fff;
          border-bottom-right-radius: 4px; font-weight: 400;
        }
        .alex-typing { display: inline-flex; gap: 4px; align-items: center; }
        .alex-typing i { width: 5px; height: 5px; border-radius: 50%; background: ${ACCENT}; animation: alexTyping 1.2s ease-in-out infinite; }
        .alex-typing i:nth-child(2) { animation-delay: .2s; }
        .alex-typing i:nth-child(3) { animation-delay: .4s; }
        @keyframes alexTyping { 0%, 100% { transform: scale(1); opacity: .5; } 50% { transform: scale(1.4); opacity: 1; } }

        .alex-chat-input {
          padding: 1rem 1.25rem; border-top: 1px solid rgba(215,226,234,.1);
          display: flex; gap: .6rem; align-items: center;
        }
        .alex-chat-input input {
          flex: 1; background: rgba(255,255,255,.04); border: 1px solid rgba(215,226,234,.12);
          border-radius: 2rem; padding: .68rem 1.1rem; color: #D7E2EA; font-family: inherit;
          font-size: .88rem; font-weight: 300; outline: none;
          transition: border-color .2s ease, box-shadow .2s ease;
        }
        .alex-chat-input input:focus { border-color: ${ACCENT}; box-shadow: 0 0 0 3px rgba(108,99,255,.15); }
        .alex-chat-input input::placeholder { color: rgba(215,226,234,.45); }
        .alex-chat-input button {
          width: 38px; height: 38px; border-radius: 50%; border: none; flex-shrink: 0; cursor: pointer;
          background: linear-gradient(135deg, ${ACCENT}, ${CYAN});
          display: flex; align-items: center; justify-content: center;
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .alex-chat-input button:hover { transform: scale(1.08); box-shadow: 0 0 20px rgba(108,99,255,.5); }
        .alex-chat-input svg { width: 15px; height: 15px; fill: #fff; }
        .alex-note {
          text-align: center; margin-top: 1.1rem; font-size: .74rem; font-weight: 300;
          letter-spacing: .06em; color: ${MUTED};
        }

        /* PROCES */
        .alex-steps {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem; margin-top: 3rem;
        }
        .alex-step {
          position: relative; padding: 2rem 1.6rem; border-radius: 20px; overflow: hidden;
          background: rgba(255,255,255,.035); border: 1px solid rgba(215,226,234,.12);
          transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease;
        }
        .alex-step:hover { transform: translateY(-6px); border-color: rgba(108,99,255,.45); box-shadow: 0 22px 60px rgba(108,99,255,.16); }
        .alex-step-num {
          position: absolute; right: 1rem; top: .5rem; font-size: 2.8rem; font-weight: 900;
          color: rgba(215,226,234,.07); line-height: 1;
        }
        .alex-step h3 { font-weight: 700; font-size: 1.05rem; margin-bottom: .45rem; }
        .alex-step p { color: ${MUTED}; font-weight: 300; font-size: .9rem; line-height: 1.7; }

        /* CTA */
        .alex-cta { position: relative; overflow: hidden; padding: 6rem 0 5rem; }
        .alex-cta-glow {
          position: absolute; left: 50%; top: 50%; width: 620px; height: 620px; transform: translate(-50%, -50%);
          border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(108,99,255,.13), transparent 70%);
          animation: alexGlow 4s ease-in-out infinite;
        }
        @keyframes alexGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: .85; }
          50% { transform: translate(-50%, -50%) scale(1.06); opacity: 1; }
        }
        .alex-cta-inner { position: relative; z-index: 2; max-width: 640px; }
        .alex-cta-btn {
          display: inline-block; margin-top: 2rem; padding: 1rem 2.4rem; border-radius: 3rem;
          color: #fff; text-decoration: none; font-weight: 600; text-transform: uppercase;
          letter-spacing: .1em; font-size: .85rem;
        }

        @media (max-width: 768px) {
          .alex-hero { min-height: 72vh; }
          .alex-hero-inner { padding-top: 1rem; }
          .alex-orb-stage { width: 150px; height: 150px; }
          .alex-section { padding: 3.5rem 0; }
          .alex-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .alex-page *, .alex-page *::before, .alex-page *::after {
            animation-duration: .01ms !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>
    </div>
  );
};
