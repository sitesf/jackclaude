import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { NexasLogo } from '../components/NexasLogo';

const WHATSAPP_URL =
  'https://wa.me/40730858640?text=Salut%2C%20vreau%20sa%20testez%20NIRO%20Agent';

const msgs = [
  { dir: 'left', text: 'Bună, sunt NIRO, consultantul virtual al service-ului. Cu ce te pot ajuta?' },
  { dir: 'right', text: 'Bună. Vreau o programare pentru schimb plăcuțe.' },
  { dir: 'left', text: 'Sigur. Pentru ce mașină doriți programarea?' },
  { dir: 'right', text: 'BMW Seria 3, 2019.' },
  { dir: 'left', text: 'Perfect. Vă pot programa mâine la 11:00 sau 14:30. Ce variantă alegeți?' },
  { dir: 'right', text: '11:00.' },
  { dir: 'left', text: 'Programarea a fost salvată. Vă așteptăm mâine la service.' },
];

const features = [
  { title: 'Răspuns instant', text: 'Clienții primesc răspuns imediat pe WhatsApp, indiferent de oră.' },
  { title: 'Programări automate', text: 'Agentul colectează datele clientului și pregătește programarea automat.' },
  { title: 'Salvare în Google Sheets', text: 'Toate programările sunt salvate automat într-un dashboard centralizat.' },
  { title: 'Conversații naturale', text: 'NIRO folosește AI pentru a răspunde natural și profesionist.' },
  { title: 'Reducere timp pierdut', text: 'Echipa nu mai pierde timp cu apeluri repetitive și mesaje.' },
  { title: 'Integrare WhatsApp', text: 'Clienții comunică direct pe aplicația pe care deja o folosesc.' },
];

const steps = [
  { title: 'Clientul scrie pe WhatsApp', text: 'NIRO preia automat conversația imediat după primul mesaj.' },
  { title: 'Agentul colectează date', text: 'Nume, marcă, problemă, data dorită și alte detalii importante.' },
  { title: 'Programarea este salvată', text: 'Informațiile ajung automat în Google Sheets sau CRM.' },
  { title: 'Service-ul confirmă rapid', text: 'Echipa vede instant toate programările într-un singur loc.' },
];

const plans = [
  {
    name: 'STARTER',
    price: '200',
    unit: '€ / lună',
    desc: 'Ideal pentru service-uri care vor un agent AI de bază, clar și rapid de implementat.',
    features: ['WhatsApp AI', 'Programări automate', 'Google Sheets', 'Suport tehnic'],
    featured: false,
  },
  {
    name: 'PRO',
    price: '500',
    unit: '€ / lună',
    desc: 'Soluția potrivită pentru service-uri care vor fluxuri personalizate și răspunsuri avansate.',
    features: ['AI avansat', 'Flux personalizat', 'Integrări multiple', 'Suport prioritar'],
    featured: true,
  },
  {
    name: 'PREMIUM',
    price: '1500',
    unit: '€ / lună',
    desc: 'Pentru service-uri care vor automatizare completă, integrare avansată și scalare.',
    features: ['CRM integrat', 'API personalizat', 'Dashboard dedicat', 'Scalare completă'],
    featured: false,
  },
];

export const NiroPage: React.FC = () => {
  const chatRef = useRef<HTMLDivElement>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ fontFamily: "'Geist', system-ui, -apple-system, sans-serif", background: '#06070c', color: '#f5f7ff', overflowX: 'hidden', minHeight: '100vh' }}>
      {/* Backgrounds */}
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(circle at top left, rgba(143,92,255,.18), transparent 30%), radial-gradient(circle at bottom right, rgba(92,107,255,.14), transparent 30%), #06070c', zIndex: -2 }} />
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)', backgroundSize: '70px 70px', maskImage: 'linear-gradient(to bottom, rgba(0,0,0,.6), transparent)', zIndex: -1 }} />

      {/* Header */}
      <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100, backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,.05)', background: 'rgba(6,7,12,.55)' }}>
        <div style={{ width: 'min(1180px, 92%)', margin: 'auto', height: 78, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'block' }}>
            <NexasLogo fontSize="1.2rem" gap="0.07em" />
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <Link to="/#projects" style={{ color: '#fff', textDecoration: 'none', opacity: .85, fontSize: '.94rem', padding: '4px 12px' }}>Proiecte</Link>
            <Link to="/preturi" style={{ color: '#fff', textDecoration: 'none', opacity: .85, fontSize: '.94rem', padding: '4px 12px' }}>Prețuri</Link>
            <Link to="/contact" className="glass-btn" style={{ padding: '13px 22px', borderRadius: 14, color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '.9rem', display: 'inline-block' }}>
              Solicită demo
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div style={{ width: 'min(1220px, 92%)', margin: 'auto', minHeight: '100vh', display: 'grid', gridTemplateColumns: 'clamp(1fr, 1fr, 1.1fr) clamp(1fr, 1fr, .9fr)', alignItems: 'center', gap: 70, paddingTop: 120 }}
        className="niro-hero">
        {/* Text */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 16px', border: '1px solid rgba(255,255,255,.08)', borderRadius: 999, color: '#c8cff7', marginBottom: 28, background: 'rgba(255,255,255,.03)' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#00d98b', boxShadow: '0 0 14px #00d98b' }} />
            NIRO Agent activ 24/7 pe WhatsApp
          </div>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: .92, letterSpacing: '-.06em', fontWeight: 900, maxWidth: 720, marginBottom: 0 }}>
            Agentul NIRO care face{' '}
            <span style={{ background: 'linear-gradient(135deg,#fff,#8f5cff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              programări automat
            </span>
          </h1>
          <p style={{ marginTop: 28, color: '#9ea6c4', fontSize: '1.12rem', lineHeight: 1.8, maxWidth: 620 }}>
            NIRO răspunde instant clienților pe WhatsApp, explică serviciile, preia cereri de programare și salvează automat toate datele în Google Sheets. Fără apeluri pierdute. Fără timp pierdut.
          </p>
          <div style={{ display: 'flex', gap: 18, marginTop: 36, flexWrap: 'wrap' }}>
            <Link to="/contact" className="glass-btn" style={{ padding: '13px 22px', borderRadius: 14, color: '#fff', textDecoration: 'none', fontWeight: 700, display: 'inline-block' }}>
              Solicită demo
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ padding: '13px 22px', borderRadius: 14, border: '1px solid rgba(255,255,255,.08)', textDecoration: 'none', color: '#fff', fontWeight: 600, background: 'rgba(255,255,255,.03)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <MessageCircle size={16} /> WhatsApp Demo
            </a>
          </div>
        </div>

        {/* Phone mockup */}
        <div style={{ position: 'relative', width: 'min(390px, 100%)', margin: 'auto', borderRadius: 42, background: '#0d1117', padding: 18, border: '1px solid rgba(255,255,255,.08)', boxShadow: '0 40px 120px rgba(0,0,0,.55)' }}>
          <div style={{ borderRadius: 30, overflow: 'hidden', background: '#0a0f14', border: '1px solid rgba(255,255,255,.05)' }}>
            {/* WA header */}
            <div style={{ height: 76, background: '#161f28', display: 'flex', alignItems: 'center', padding: '0 18px', gap: 14, borderBottom: '1px solid rgba(255,255,255,.05)' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,#8f5cff,#5c6bff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '.8rem' }}>NIRO</div>
              <div>
                <strong>NIRO Agent</strong>
                <div style={{ color: '#8ee5be', fontSize: '.88rem', marginTop: 4 }}>online acum</div>
              </div>
            </div>
            {/* Chat */}
            <div ref={chatRef} style={{ padding: '24px 18px 34px', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 420, background: 'radial-gradient(circle at top left, rgba(143,92,255,.16), transparent 34%), linear-gradient(180deg, rgba(11,18,26,.96), rgba(7,12,18,.98))' }}>
              {msgs.map((m, i) => (
                <div key={i} style={{
                  maxWidth: '82%', padding: '12px 14px', borderRadius: 18, lineHeight: 1.6, fontSize: '.93rem',
                  background: m.dir === 'left' ? '#1d2733' : '#005c4b',
                  marginLeft: m.dir === 'right' ? 'auto' : undefined,
                  borderTopLeftRadius: m.dir === 'left' ? 6 : 18,
                  borderTopRightRadius: m.dir === 'right' ? 6 : 18,
                }}>
                  {m.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section style={{ width: 'min(1180px, 92%)', margin: 'auto', padding: '100px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 70 }}>
          <span style={{ color: '#8f5cff', fontWeight: 700, letterSpacing: '.12em', fontSize: '.85rem' }}>FUNCȚII</span>
          <h2 style={{ marginTop: 16, fontSize: 'clamp(32px, 5vw, 60px)', lineHeight: 1, letterSpacing: '-.05em', fontWeight: 900 }}>Automatizare completă pentru service-ul tău</h2>
          <p style={{ margin: '20px auto 0', maxWidth: 720, color: '#9ea6c4', lineHeight: 1.8 }}>
            NIRO funcționează nonstop și gestionează conversațiile cu clienții în mod natural.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {features.map((f) => (
            <div key={f.title} className="niro-card" style={{ borderRadius: 30, padding: 42, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.03)', position: 'relative', overflow: 'hidden', transition: 'all .35s ease' }}>
              <div style={{ position: 'absolute', width: 180, height: 180, background: 'rgba(143,92,255,.12)', borderRadius: '50%', top: -60, right: -60, filter: 'blur(20px)' }} />
              <h3 style={{ fontSize: '1.3rem', marginBottom: 14 }}>{f.title}</h3>
              <p style={{ color: '#9ea6c4', lineHeight: 1.8 }}>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section style={{ width: 'min(1180px, 92%)', margin: 'auto', padding: '0 0 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: 70 }}>
          <span style={{ color: '#8f5cff', fontWeight: 700, letterSpacing: '.12em', fontSize: '.85rem' }}>PROCES</span>
          <h2 style={{ marginTop: 16, fontSize: 'clamp(32px, 5vw, 60px)', lineHeight: 1, letterSpacing: '-.05em', fontWeight: 900 }}>Cum funcționează NIRO</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 22 }}>
          {steps.map((s, i) => (
            <div key={s.title} className="niro-card" style={{ borderRadius: 30, padding: 42, border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.03)', position: 'relative', overflow: 'hidden', transition: 'all .35s ease' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(255,255,255,.08)', position: 'absolute', right: 20, top: 12 }}>0{i + 1}</div>
              <h4 style={{ marginBottom: 14, fontSize: '1.3rem' }}>{s.title}</h4>
              <p style={{ color: '#9ea6c4', lineHeight: 1.8, fontSize: '.96rem' }}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ width: 'min(1180px, 92%)', margin: 'auto', padding: '0 0 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: 70 }}>
          <span style={{ color: '#8f5cff', fontWeight: 700, letterSpacing: '.12em', fontSize: '.85rem' }}>PREȚURI</span>
          <h2 style={{ marginTop: 16, fontSize: 'clamp(32px, 5vw, 60px)', lineHeight: 1, letterSpacing: '-.05em', fontWeight: 900 }}>Pachete pentru service-uri auto</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, alignItems: 'start' }}>
          {plans.map((p) => (
            <div key={p.name} className="niro-card" style={{
              borderRadius: 30, padding: 42, border: `1px solid ${p.featured ? 'rgba(143,92,255,.5)' : 'rgba(255,255,255,.08)'}`,
              background: 'rgba(255,255,255,.03)', position: 'relative', overflow: 'hidden', transition: 'all .35s ease',
              transform: p.featured ? 'scale(1.03)' : undefined,
              boxShadow: p.featured ? '0 20px 80px rgba(143,92,255,.18)' : undefined,
            }}>
              {p.featured && (
                <div style={{ position: 'absolute', top: 20, right: 20, background: 'linear-gradient(135deg,#8f5cff,#5c6bff)', borderRadius: 999, padding: '4px 12px', fontSize: '.75rem', fontWeight: 700, letterSpacing: '.08em' }}>POPULAR</div>
              )}
              <h3 style={{ fontSize: '1.5rem', marginBottom: 16 }}>{p.name}</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, flexWrap: 'wrap', fontSize: '4rem', fontWeight: 900, letterSpacing: '-.08em', marginBottom: 18, lineHeight: .9 }}>
                {p.price}
                <span style={{ fontSize: '1.2rem', opacity: .75, marginBottom: 10, letterSpacing: 0, fontWeight: 400 }}>{p.unit}</span>
              </div>
              <p style={{ color: '#9ea6c4', marginBottom: 26, lineHeight: 1.8 }}>{p.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {p.features.map((f) => (
                  <div key={f} style={{ color: '#dfe4ff', opacity: .9, paddingLeft: 18, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, top: '.65em', width: 6, height: 6, borderRadius: 999, background: '#8f5cff', boxShadow: '0 0 12px rgba(143,92,255,.55)', display: 'inline-block' }} />
                    {f}
                  </div>
                ))}
              </div>
              <Link to="/contact" className="glass-btn" style={{ display: 'block', marginTop: 30, padding: '13px 22px', borderRadius: 14, color: '#fff', textDecoration: 'none', fontWeight: 700, textAlign: 'center' }}>
                Solicită demo
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <footer style={{ padding: '70px 20px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,.05)', color: '#9ba3c0' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', marginBottom: 18, color: '#f5f7ff' }}>Construiește propriul recepționer AI</h2>
        <p style={{ maxWidth: 720, margin: 'auto', lineHeight: 1.8, color: '#a4abc6' }}>
          Automatizează programările pe WhatsApp și transformă modul în care interacționezi cu clienții.
        </p>
        <div style={{ marginTop: 34, display: 'flex', justifyContent: 'center', gap: 18, flexWrap: 'wrap' }}>
          <Link to="/contact" className="glass-btn" style={{ padding: '13px 22px', borderRadius: 14, color: '#fff', textDecoration: 'none', fontWeight: 700 }}>
            Solicită demo
          </Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ padding: '13px 22px', borderRadius: 14, border: '1px solid rgba(255,255,255,.08)', textDecoration: 'none', color: '#fff', fontWeight: 600, background: 'rgba(255,255,255,.03)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <MessageCircle size={16} /> WhatsApp Demo
          </a>
        </div>
        <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 14 }}>
          {[['Confidențialitate', '/confidentialitate'], ['Cookies', '/cookies'], ['Termeni', '/termeni'], ['Contact', '/contact']].map(([label, to]) => (
            <Link key={to} to={to} style={{ color: '#c8cff7', textDecoration: 'none', fontSize: '.9rem', opacity: .78 }}>{label}</Link>
          ))}
        </div>
        <div style={{ marginTop: 30, fontSize: '.92rem', opacity: .6 }}>© 2026 NIRO Agent. Powered by NEXAS.</div>
      </footer>

      {/* Hover styles */}
      <style>{`
        .niro-card:hover {
          transform: translateY(-10px) !important;
          border-color: rgba(143,92,255,.55) !important;
          box-shadow: 0 28px 90px rgba(143,92,255,.22) !important;
          background: linear-gradient(180deg, rgba(143,92,255,.11), rgba(255,255,255,.035)) !important;
        }
        .niro-hero {
          grid-template-columns: 1.1fr .9fr;
        }
        @media (max-width: 900px) {
          .niro-hero {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};
