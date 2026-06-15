import React, { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

const GEMINI_API_URL =
  'https://script.google.com/macros/s/AKfycbxHH7rOcvXulGaoHuZdKodbOhsuYoBMCad1ZSc2wisFSWFzunY9R3q1ubq8bkKnaWknIw/exec';
const PAGESPEED_API_URL =
  'https://script.google.com/macros/s/AKfycbyPbcfnc-WhYS1Qq7gU_u63tfhKbBa8opOXuOBd8UY45HoQqE8GxQInAF1ASwTP1D0S/exec';
const NEXAS_EMAIL = 'nexas.axs@gmail.com';
const NEXAS_WA = '40730858640';

const STEPS_TEXT = [
  'Se conectează la Agentul SEO...',
  'Analizează performanța desktop...',
  'Analizează performanța mobil...',
  'Extrage date SEO tehnice...',
  'Agentul SEO interpretează datele...',
  'Generează raport cu recomandări...',
  'Pregătește raportul...',
];

interface Metrics {
  strategy: string;
  performance: number;
  seo: number;
  accessibility: number;
  best_practices: number;
  fcp: string;
  lcp: string;
  tbt: string;
  cls: string;
  speed_index: string;
  title: string;
  meta_desc: string;
  robots_txt: string;
  canonical: string;
  mobile_friendly: string;
  image_alt: string;
  https: string;
  issues: { title: string; description: string; score: number | null }[];
}

interface ReportData {
  scor_general: number;
  rezumat_executiv: string;
  puncte_forte: string[];
  probleme_critice: { problema: string; impact: string; prioritate: string }[];
  recomandari: { actiune: string; motiv: string; dificultate: string }[];
  analiza_viteza: string;
  analiza_mobile: string;
  cuvinte_cheie_recomandate: string[];
  urmatorii_pasi: string[];
}

function cleanUrl(raw: string): string | null {
  let url = raw.trim();
  if (!url.startsWith('http')) url = 'https://' + url;
  try {
    new URL(url);
    return url;
  } catch {
    return null;
  }
}

async function fetchPageSpeed(url: string, strategy: string): Promise<any> {
  const resp = await fetch(PAGESPEED_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ url, strategy }),
  });
  if (!resp.ok) throw new Error(`PageSpeed eroare: HTTP ${resp.status}`);
  const data = await resp.json();
  if (data.success === false) throw new Error(data.error || 'Eroare PageSpeed.');
  if (data.lighthouseResult) return data;
  if (data.result?.lighthouseResult) return data.result;
  if (data.pagespeed?.lighthouseResult) return data.pagespeed;
  if (data.performance !== undefined || data.pagespeed?.performance !== undefined)
    return { __metrics: data.pagespeed || data, strategy };
  throw new Error('Răspuns PageSpeed invalid.');
}

function extractMetrics(psData: any, strategy: string): Metrics {
  if (psData.__metrics) {
    const m = psData.__metrics;
    return {
      strategy,
      performance: Math.round(m.performance || 0),
      seo: Math.round(m.seo || 0),
      accessibility: Math.round(m.accessibility || 0),
      best_practices: Math.round(m.bestPractices || m.best_practices || 0),
      fcp: m.audits?.firstContentfulPaint || m.firstContentfulPaint || '—',
      lcp: m.audits?.largestContentfulPaint || m.largestContentfulPaint || '—',
      tbt: m.audits?.totalBlockingTime || m.totalBlockingTime || '—',
      cls: m.audits?.cumulativeLayoutShift || m.cumulativeLayoutShift || '—',
      speed_index: m.audits?.speedIndex || m.speedIndex || '—',
      title: 'OK', meta_desc: 'OK', robots_txt: 'OK', canonical: 'OK',
      mobile_friendly: 'Da', image_alt: 'OK', https: 'Da', issues: [],
    };
  }
  const cats = psData.lighthouseResult?.categories || {};
  const audits = psData.lighthouseResult?.audits || {};
  return {
    strategy,
    performance: Math.round((cats.performance?.score || 0) * 100),
    seo: Math.round((cats.seo?.score || 0) * 100),
    accessibility: Math.round((cats.accessibility?.score || 0) * 100),
    best_practices: Math.round((cats['best-practices']?.score || 0) * 100),
    fcp: audits['first-contentful-paint']?.displayValue || '—',
    lcp: audits['largest-contentful-paint']?.displayValue || '—',
    tbt: audits['total-blocking-time']?.displayValue || '—',
    cls: audits['cumulative-layout-shift']?.displayValue || '—',
    speed_index: audits['speed-index']?.displayValue || '—',
    title: audits['document-title']?.score === 1 ? 'OK' : 'Problemă',
    meta_desc: audits['meta-description']?.score === 1 ? 'OK' : 'Problemă/Lipsă',
    robots_txt: audits['robots-txt']?.score === 1 ? 'OK' : 'Problemă',
    canonical: audits['canonical']?.score === 1 ? 'OK' : 'Problemă',
    mobile_friendly: audits['viewport']?.score === 1 ? 'Da' : 'Nu',
    image_alt:
      audits['image-alt']?.score === 1
        ? 'OK'
        : `Probleme (${audits['image-alt']?.details?.items?.length || '?'} imagini fără ALT)`,
    https: audits['is-on-https']?.score === 1 ? 'Da' : 'Nu',
    issues: Object.values(audits)
      .filter((a: any) => a.score !== null && a.score < 0.9 && a.details)
      .slice(0, 8)
      .map((a: any) => ({ title: a.title, description: a.description, score: a.score })),
  };
}

function generateFallbackReport(url: string, mobile: Metrics, desktop: Metrics): ReportData {
  const avg = Math.round(
    (mobile.performance + mobile.seo + mobile.accessibility + mobile.best_practices) / 4
  );
  const issues: ReportData['probleme_critice'] = [];
  if (mobile.performance < 70)
    issues.push({
      problema: 'Viteza paginii pe mobil este sub medie',
      impact: 'Utilizatorii pleacă dacă pagina se încarcă lent. Google penalizează site-urile lente.',
      prioritate: 'CRITICĂ',
    });
  if (mobile.seo < 80)
    issues.push({
      problema: 'Scor SEO tehnic scăzut',
      impact: 'Site-ul nu este optimizat pentru motoarele de căutare',
      prioritate: 'CRITICĂ',
    });
  if (mobile.meta_desc !== 'OK')
    issues.push({
      problema: 'Meta description lipsă sau problematică',
      impact: 'Afectează rata de click din Google',
      prioritate: 'MEDIE',
    });
  return {
    scor_general: avg,
    rezumat_executiv: `Site-ul ${url} a obținut un scor general de ${avg}/100. Performance mobil: ${mobile.performance}/100, SEO tehnic: ${mobile.seo}/100. ${avg >= 70 ? 'Fundația este bună, cu optimizări punctuale poate deveni excelent.' : 'Sunt necesare îmbunătățiri semnificative pentru a performa în căutările Google.'}`,
    puncte_forte: [
      mobile.https === 'Da' ? 'Site-ul folosește HTTPS — securitate confirmată' : '',
      mobile.seo >= 80 ? 'SEO tehnic bun — structura paginii este corectă' : '',
      desktop.performance > mobile.performance
        ? `Desktop performant (${desktop.performance}/100)`
        : '',
    ].filter(Boolean),
    probleme_critice: issues,
    recomandari: [
      {
        actiune: 'Optimizează imaginile (compresie + format WebP)',
        motiv: 'Cel mai rapid câștig de viteză',
        dificultate: 'UȘOARĂ',
      },
      {
        actiune: 'Adaugă meta description unice pe fiecare pagină',
        motiv: 'Crește rata de click din Google cu 20-30%',
        dificultate: 'UȘOARĂ',
      },
      {
        actiune: 'Implementează lazy loading pentru imagini',
        motiv: 'Reduce timpul de încărcare inițial',
        dificultate: 'MEDIE',
      },
    ],
    analiza_viteza: `FCP: ${mobile.fcp}, LCP: ${mobile.lcp}. ${mobile.performance >= 70 ? 'Viteza este acceptabilă.' : 'Viteza necesită optimizare urgentă.'}`,
    analiza_mobile: `Site-ul este ${mobile.mobile_friendly === 'Da' ? 'optimizat pentru mobil' : 'neoptimizat pentru mobil'} (scor performance mobil: ${mobile.performance}/100).`,
    cuvinte_cheie_recomandate: ['servicii web', 'web design romania', 'creare site'],
    urmatorii_pasi: [
      'Contactează echipa NEXAS pentru o strategie SEO personalizată',
      'Implementează recomandările cu prioritate CRITICĂ mai întâi',
      'Rulează un nou audit după 30 de zile pentru a măsura progresul',
    ],
  };
}

async function geminiInterpret(url: string, mobile: Metrics, desktop: Metrics): Promise<ReportData> {
  const prompt = `Esti Agentul SEO, expert SEO al agentiei Nexas Digital. Analizeaza datele PageSpeed si genereaza un raport profesional in romana.

SITE: ${url}
MOBILE:
- Performance: ${mobile.performance}/100
- SEO: ${mobile.seo}/100
- Accesibilitate: ${mobile.accessibility}/100
- Best Practices: ${mobile.best_practices}/100
- FCP: ${mobile.fcp} | LCP: ${mobile.lcp} | CLS: ${mobile.cls}
- Titlu: ${mobile.title} | Meta desc: ${mobile.meta_desc} | HTTPS: ${mobile.https}
DESKTOP:
- Performance: ${desktop.performance}/100
- SEO: ${desktop.seo}/100
PROBLEME DETECTATE: ${mobile.issues.map((i) => i.title).join(', ')}

Returneaza DOAR JSON valid:
{
  "scor_general": 72,
  "rezumat_executiv": "2-3 fraze directe despre starea site-ului",
  "puncte_forte": ["lucru bun 1", "lucru bun 2"],
  "probleme_critice": [{"problema": "descriere", "impact": "impact SEO/UX", "prioritate": "CRITICA"}],
  "recomandari": [{"actiune": "ce sa faci", "motiv": "de ce conteaza", "dificultate": "USOARA"}],
  "analiza_viteza": "evaluare viteza in 2 fraze",
  "analiza_mobile": "evaluare mobile in 2 fraze",
  "cuvinte_cheie_recomandate": ["kw1", "kw2", "kw3"],
  "urmatorii_pasi": ["pas 1", "pas 2", "pas 3"]
}`;

  try {
    const resp = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ prompt, url, mobile, desktop }),
    });
    if (!resp.ok) return generateFallbackReport(url, mobile, desktop);
    const data = await resp.json();
    if (data.success === false) return generateFallbackReport(url, mobile, desktop);
    const raw = data.result || data.text || data.response || '';
    try {
      return typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch {
      const m = String(raw).match(/\{[\s\S]*\}/);
      if (m) return JSON.parse(m[0]);
      return generateFallbackReport(url, mobile, desktop);
    }
  } catch {
    return generateFallbackReport(url, mobile, desktop);
  }
}

function scoreColor(n: number) {
  return n >= 70 ? '#22c55e' : n >= 50 ? '#f59e0b' : '#ef4444';
}

// ── Styles ────────────────────────────────────────────────────────────────────

const s = {
  page: {
    fontFamily: "'Geist', 'Inter', sans-serif",
    background: '#07090e',
    color: '#e2e8f0',
    minHeight: '100vh',
    overflowX: 'hidden' as const,
  } as React.CSSProperties,
  gridBg: {
    position: 'fixed',
    inset: 0,
    backgroundImage:
      'linear-gradient(rgba(59,130,246,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,.025) 1px,transparent 1px)',
    backgroundSize: '48px 48px',
    pointerEvents: 'none',
    zIndex: 0,
    maskImage: 'linear-gradient(to bottom,rgba(0,0,0,.6),transparent 80%)',
  } as React.CSSProperties,
  orb1: {
    position: 'fixed',
    width: 600, height: 600,
    borderRadius: '50%',
    filter: 'blur(90px)',
    background: '#3b82f6',
    top: -250, right: -150,
    opacity: 0.08,
    pointerEvents: 'none',
    zIndex: 0,
  } as React.CSSProperties,
  orb2: {
    position: 'fixed',
    width: 400, height: 400,
    borderRadius: '50%',
    filter: 'blur(90px)',
    background: '#1d4ed8',
    bottom: 0, left: -100,
    opacity: 0.07,
    pointerEvents: 'none',
    zIndex: 0,
  } as React.CSSProperties,
  wrap: {
    position: 'relative',
    zIndex: 1,
    maxWidth: 860,
    margin: '0 auto',
    padding: '60px 24px 100px',
  } as React.CSSProperties,
};

// ── Component ─────────────────────────────────────────────────────────────────

export const NeoPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [gdpr, setGdpr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);
  const [mobile, setMobile] = useState<Metrics | null>(null);
  const [desktop, setDesktop] = useState<Metrics | null>(null);
  const [analyzedUrl, setAnalyzedUrl] = useState('');
  const reportRef = useRef<HTMLDivElement>(null);

  const runAudit = useCallback(async () => {
    if (!gdpr) {
      alert('Trebuie să accepți Politica de confidențialitate pentru a rula auditul.');
      return;
    }
    const cleaned = cleanUrl(url);
    if (!cleaned) {
      setError('Introdu un URL valid. Exemplu: https://site-ul-tau.ro');
      return;
    }
    setError('');
    setSuccess(false);
    setReport(null);
    setLoading(true);
    setStepIdx(0);

    try {
      setStepIdx(1);
      const psMobile = await fetchPageSpeed(cleaned, 'mobile');
      setStepIdx(2);
      const psDesktop = await fetchPageSpeed(cleaned, 'desktop');
      setStepIdx(3);
      const mob = extractMetrics(psMobile, 'mobile');
      const desk = extractMetrics(psDesktop, 'desktop');
      setStepIdx(4);
      const rep = await geminiInterpret(cleaned, mob, desk);
      setStepIdx(5);

      // send email fallback
      try {
        const subject = encodeURIComponent(`[Agentul SEO] Audit SEO — ${cleaned}`);
        const body = encodeURIComponent(
          `Site: ${cleaned}\nClient: ${clientName || 'Anonim'} (${clientEmail || '—'})\n\nScor General: ${rep.scor_general}/100\nPerformance Mobil: ${mob.performance}/100\nSEO: ${mob.seo}/100\n\nRezumat:\n${rep.rezumat_executiv}`
        );
        // open mailto silently (won't interrupt user flow in most browsers)
        if (clientEmail) {
          window.open(`mailto:${NEXAS_EMAIL}?subject=${subject}&body=${body}`, '_blank');
        }
      } catch {
        // ignore email errors
      }

      setStepIdx(6);
      setMobile(mob);
      setDesktop(desk);
      setReport(rep);
      setAnalyzedUrl(cleaned);
      setSuccess(true);
      setTimeout(() => reportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch (e: any) {
      setError('Eroare la analiză: ' + e.message + '. Verifică URL-ul și încearcă din nou.');
    } finally {
      setLoading(false);
    }
  }, [url, clientName, clientEmail, gdpr]);

  return (
    <div style={s.page}>
      <div style={s.gridBg} />
      <div style={s.orb1} />
      <div style={s.orb2} />

      {/* ── NAV ── */}
      <nav style={{
        position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 32px', borderBottom: '1px solid rgba(255,255,255,.06)',
      }}>
        <Link to="/" style={{ textDecoration: 'none', fontWeight: 900, fontSize: 20, letterSpacing: '-0.03em', color: '#e2e8f0', textTransform: 'uppercase' }}>
          NE<span style={{ color: '#3b82f6' }}>X</span>AS
        </Link>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Link to="/#projects" style={{ color: 'rgba(226,232,240,.6)', textDecoration: 'none', fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Proiecte
          </Link>
          <Link to="/contact" style={{
            color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
            padding: '8px 20px', borderRadius: 99,
          }}>
            Contact
          </Link>
        </div>
      </nav>

      <div style={s.wrap}>

        {/* ── HEADER ── */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            marginBottom: 28, fontFamily: 'monospace', fontSize: 12,
            color: '#6b7280', letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'rgba(59,130,246,.12)', border: '1px solid rgba(59,130,246,.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" width={20} height={20}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /><path d="M11 8v3l2 2" />
              </svg>
            </div>
            Nexas Digital — Agentul SEO
          </div>
          <h1 style={{
            fontFamily: 'inherit', fontWeight: 900, fontSize: 'clamp(2.2rem,5vw,3.5rem)',
            lineHeight: 1.0, color: '#e2e8f0', marginBottom: 16, letterSpacing: '-0.03em',
          }}>
            Audit SEO<br /><span style={{ color: '#3b82f6' }}>Gratuit</span>
          </h1>
          <p style={{ fontSize: 16, color: '#6b7280', maxWidth: 520, margin: '0 auto 10px', lineHeight: 1.7 }}>
            Introduce URL-ul site-ului tău și Agentul SEO analizează tot — viteză, structură, meta tags, cuvinte cheie, probleme tehnice.
          </p>
          <p style={{ fontFamily: 'monospace', fontSize: 11, color: '#4b5563', letterSpacing: '0.08em' }}>
            Agentul SEO va crea un raport detaliat, cu recomandări personalizate pentru tine.
          </p>
        </div>

        {/* ── INPUT BOX ── */}
        <div style={{
          background: '#0d1117', border: '1px solid rgba(255,255,255,.13)',
          borderRadius: 20, padding: 28, marginBottom: 16,
        }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !loading && runAudit()}
              placeholder="https://site-ul-tau.ro"
              style={{
                flex: 1, background: '#111820', border: '1px solid rgba(255,255,255,.07)',
                borderRadius: 12, padding: '14px 18px', color: '#e2e8f0',
                fontFamily: 'inherit', fontSize: 15, outline: 'none',
              }}
            />
            <button
              onClick={runAudit}
              disabled={loading}
              style={{
                padding: '14px 28px', borderRadius: 12, border: 'none',
                background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)',
                color: '#fff', fontWeight: 700, fontSize: 14,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.45 : 1, whiteSpace: 'nowrap',
              }}
            >
              {loading ? 'Se analizează...' : 'Analizează'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Numele tău (opțional)
              </label>
              <input
                type="text"
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                placeholder="ex: Numele Tău"
                style={{
                  background: '#111820', border: '1px solid rgba(255,255,255,.07)',
                  borderRadius: 10, padding: '10px 14px', color: '#e2e8f0',
                  fontFamily: 'inherit', fontSize: 13, outline: 'none',
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Email tău (opțional)
              </label>
              <input
                type="email"
                value={clientEmail}
                onChange={e => setClientEmail(e.target.value)}
                placeholder="ex: contact@site-ul-tau.ro"
                style={{
                  background: '#111820', border: '1px solid rgba(255,255,255,.07)',
                  borderRadius: 10, padding: '10px 14px', color: '#e2e8f0',
                  fontFamily: 'inherit', fontSize: 13, outline: 'none',
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                <input
                  type="checkbox"
                  id="gdprCheck"
                  checked={gdpr}
                  onChange={e => setGdpr(e.target.checked)}
                  style={{ accentColor: '#3b82f6', cursor: 'pointer' }}
                />
                <label htmlFor="gdprCheck" style={{ fontSize: 11, color: '#6b7280', cursor: 'pointer' }}>
                  Accept{' '}
                  <Link to="/confidentialitate" style={{ color: '#3b82f6', textDecoration: 'underline' }}>
                    Politica de confidențialitate
                  </Link>
                </label>
              </div>
            </div>
          </div>

          <div style={{
            fontSize: 11, color: '#4b5563', lineHeight: 1.6,
            padding: '12px 16px', background: 'rgba(59,130,246,.06)',
            borderRadius: 10, border: '1px solid rgba(59,130,246,.12)',
            marginTop: 16, fontFamily: 'monospace',
          }}>
            Agentul SEO va crea un raport detaliat, cu recomandări personalizate pentru tine.
            Pentru mai multe informații sau întrebări, echipa Nexas îți stă la dispoziție.
          </div>
        </div>

        {/* ── ERROR ── */}
        {error && (
          <div style={{
            padding: '14px 18px', borderRadius: 12,
            background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.25)',
            color: '#fca5a5', fontSize: 13, marginBottom: 12,
          }}>
            {error}
          </div>
        )}

        {/* ── SUCCESS BANNER ── */}
        {success && !loading && (
          <div style={{
            padding: '14px 18px', borderRadius: 12,
            background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.25)',
            color: '#86efac', fontSize: 13, marginBottom: 12, textAlign: 'center',
          }}>
            Raportul a fost generat cu succes! Evaluează-ți singur performanțele și află dacă ai nevoie de expertiza echipei Nexas.
          </div>
        )}

        {/* ── PROGRESS ── */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '48px 20px' }}>
            <svg width={64} height={64} viewBox="0 0 64 64" style={{ margin: '0 auto 20px', display: 'block' }}>
              <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="3" />
              <circle
                cx="32" cy="32" r="28" fill="none" stroke="#3b82f6"
                strokeWidth="3" strokeLinecap="round"
                strokeDasharray="180" strokeDashoffset={180 - (stepIdx / 6) * 160}
                transform="rotate(-90 32 32)"
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            </svg>
            <div style={{ fontWeight: 600, fontSize: 16, color: '#e2e8f0', marginBottom: 8 }}>
              Agentul SEO analizează...
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#3b82f6' }}>
              {STEPS_TEXT[stepIdx] || ''}
            </div>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 360, margin: '20px auto 0' }}>
              {STEPS_TEXT.map((txt, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 14px', borderRadius: 8,
                    background: '#0d1117',
                    border: `1px solid ${i < stepIdx ? 'rgba(34,197,94,.25)' : i === stepIdx ? 'rgba(59,130,246,.3)' : 'rgba(255,255,255,.07)'}`,
                    fontFamily: 'monospace', fontSize: 11,
                    color: i < stepIdx ? '#22c55e' : i === stepIdx ? '#3b82f6' : '#4b5563',
                  }}
                >
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'currentColor', flexShrink: 0,
                  }} />
                  {txt}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── REPORT ── */}
        {report && mobile && desktop && !loading && (
          <div ref={reportRef}>
            {/* Report header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: 24, background: '#0d1117', border: '1px solid rgba(255,255,255,.13)',
              borderRadius: 16, marginBottom: 20, flexWrap: 'wrap', gap: 16,
            }}>
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: 13, color: '#6b7280' }}>
                  Site analizat: <strong style={{ color: '#e2e8f0' }}>{analyzedUrl}</strong>
                </div>
                <div style={{ fontSize: 12, color: '#4b5563', marginTop: 4, fontFamily: 'monospace' }}>
                  Analizat la {new Date().toLocaleString('ro-RO')}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <span style={{
                  fontWeight: 900, fontSize: 52, lineHeight: 1, display: 'block', marginBottom: 4,
                  color: scoreColor(report.scor_general),
                }}>
                  {report.scor_general}
                </span>
                <span style={{ fontSize: 11, color: '#6b7280', fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Scor SEO
                </span>
              </div>
            </div>

            {/* Summary */}
            <div style={{
              padding: '20px 24px', background: '#0d1117', border: '1px solid rgba(255,255,255,.07)',
              borderRadius: 14, marginBottom: 20, fontSize: 14, lineHeight: 1.75, color: '#d1d5db',
            }}>
              {report.rezumat_executiv}
            </div>

            {/* Metrics grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 20 }}>
              {[
                { label: 'Performance Mobil', val: mobile.performance },
                { label: 'SEO Tehnic', val: mobile.seo },
                { label: 'Performance Desktop', val: desktop.performance },
                { label: 'Accesibilitate', val: mobile.accessibility },
              ].map(m => (
                <div key={m.label} style={{
                  background: '#0d1117', border: '1px solid rgba(255,255,255,.07)',
                  borderRadius: 12, padding: 16, textAlign: 'center',
                }}>
                  <span style={{ fontFamily: 'monospace', fontSize: 22, fontWeight: 500, display: 'block', marginBottom: 4, color: scoreColor(m.val) }}>
                    {m.val}<small style={{ fontSize: 13, opacity: 0.6 }}>/100</small>
                  </span>
                  <span style={{ fontSize: 10, color: '#6b7280', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{m.label}</span>
                </div>
              ))}
            </div>

            {/* Puncte forte */}
            {report.puncte_forte.length > 0 && (
              <ReportSection title="Puncte forte" titleColor="#22c55e">
                {report.puncte_forte.map((f, i) => (
                  <div key={i} style={{
                    padding: '10px 14px', borderRadius: 10,
                    background: 'rgba(16,185,129,.06)', border: '1px solid rgba(16,185,129,.15)',
                    fontSize: 13, lineHeight: 1.6, color: '#a7f3d0',
                  }}>
                    {f}
                  </div>
                ))}
              </ReportSection>
            )}

            {/* Probleme */}
            {report.probleme_critice.length > 0 && (
              <ReportSection title="Probleme identificate" titleColor="#ef4444">
                {report.probleme_critice.map((issue, i) => (
                  <div key={i} style={{
                    padding: '10px 14px', borderRadius: 10, fontSize: 13, lineHeight: 1.6,
                    background: issue.prioritate === 'CRITICĂ' || issue.prioritate === 'CRITICA'
                      ? 'rgba(239,68,68,.08)' : 'rgba(245,158,11,.08)',
                    border: issue.prioritate === 'CRITICĂ' || issue.prioritate === 'CRITICA'
                      ? '1px solid rgba(239,68,68,.2)' : '1px solid rgba(245,158,11,.2)',
                    color: issue.prioritate === 'CRITICĂ' || issue.prioritate === 'CRITICA'
                      ? '#fca5a5' : '#fcd34d',
                  }}>
                    <span style={{ fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: 6 }}>
                      {issue.prioritate}
                    </span>
                    {issue.problema}
                    {issue.impact && <><br /><small style={{ opacity: 0.7 }}>{issue.impact}</small></>}
                  </div>
                ))}
              </ReportSection>
            )}

            {/* Recomandări */}
            {report.recomandari.length > 0 && (
              <ReportSection title="Recomandări prioritizate" titleColor="#22c55e">
                {report.recomandari.map((r, i) => (
                  <div key={i} style={{
                    padding: '10px 14px', borderRadius: 10,
                    background: 'rgba(16,185,129,.06)', border: '1px solid rgba(16,185,129,.15)',
                    fontSize: 13, lineHeight: 1.6, color: '#a7f3d0',
                  }}>
                    {r.actiune}
                    <span style={{
                      display: 'inline-block', fontSize: 10, fontFamily: 'monospace',
                      padding: '2px 7px', borderRadius: 4, marginLeft: 6,
                      background: 'rgba(16,185,129,.15)', color: '#22c55e',
                    }}>
                      {r.dificultate}
                    </span>
                    {r.motiv && <><br /><small style={{ opacity: 0.7 }}>{r.motiv}</small></>}
                  </div>
                ))}
              </ReportSection>
            )}

            {/* Analiză tehnică */}
            <ReportSection title="Analiză tehnică" titleColor="#3b82f6" badge="Viteză & Mobile">
              <div style={{ fontSize: 13, color: '#d1d5db', marginBottom: 10, lineHeight: 1.7 }}>{report.analiza_viteza}</div>
              <div style={{ fontSize: 13, color: '#d1d5db', lineHeight: 1.7 }}>{report.analiza_mobile}</div>
              <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, fontFamily: 'monospace', fontSize: 11, color: '#6b7280' }}>
                <div>FCP: <strong style={{ color: '#e2e8f0' }}>{mobile.fcp}</strong></div>
                <div>LCP: <strong style={{ color: '#e2e8f0' }}>{mobile.lcp}</strong></div>
                <div>CLS: <strong style={{ color: '#e2e8f0' }}>{mobile.cls}</strong></div>
              </div>
            </ReportSection>

            {/* Cuvinte cheie */}
            {report.cuvinte_cheie_recomandate.length > 0 && (
              <ReportSection title="Cuvinte cheie recomandate" titleColor="#f59e0b">
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {report.cuvinte_cheie_recomandate.map(kw => (
                    <span key={kw} style={{
                      padding: '5px 12px', borderRadius: 99,
                      background: 'rgba(59,130,246,.12)', border: '1px solid rgba(59,130,246,.2)',
                      color: '#93c5fd', fontFamily: 'monospace', fontSize: 12,
                    }}>
                      {kw}
                    </span>
                  ))}
                </div>
              </ReportSection>
            )}

            {/* Pași următori */}
            {report.urmatorii_pasi.length > 0 && (
              <ReportSection title="Pașii următori" titleColor="#3b82f6">
                <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {report.urmatorii_pasi.map((p, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 13, color: '#d1d5db', lineHeight: 1.6 }}>
                      <span style={{
                        minWidth: 24, height: 24, borderRadius: '50%',
                        background: 'rgba(59,130,246,.12)', border: '1px solid rgba(59,130,246,.25)',
                        color: '#3b82f6', fontFamily: 'monospace', fontSize: 11, fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1,
                      }}>
                        {i + 1}
                      </span>
                      {p}
                    </li>
                  ))}
                </ol>
              </ReportSection>
            )}

            {/* CTA WhatsApp */}
            <div style={{
              marginTop: 28, padding: 28,
              background: 'linear-gradient(135deg,rgba(59,130,246,.1),rgba(29,78,216,.08))',
              border: '1px solid rgba(59,130,246,.2)', borderRadius: 16, textAlign: 'center',
            }}>
              <div style={{ fontWeight: 700, fontSize: '1.4rem', color: '#e2e8f0', marginBottom: 8 }}>
                Vrei raportul complet și o strategie personalizată?
              </div>
              <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 20, lineHeight: 1.6 }}>
                Contactează-ne pe WhatsApp pentru o consultație gratuită.
              </div>
              <a
                href={`https://wa.me/${NEXAS_WA}?text=Salut%2C%20am%20rulat%20auditul%20Agentul%20SEO%20pentru%20site-ul%20meu%20si%20as%20vrea%20sa%20discutam%20strategia%20SEO.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '14px 28px', borderRadius: 12, border: 'none',
                  background: '#25d366', color: '#fff',
                  fontWeight: 700, fontSize: 15, textDecoration: 'none',
                }}
              >
                <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Contactează echipa Nexas
              </a>
            </div>
          </div>
        )}

        {/* ── FOOTER ── */}
        <div style={{
          textAlign: 'center', marginTop: 60, paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,.07)',
          fontSize: 12, color: '#4b5563',
        }}>
          <Link to="/" style={{ color: '#6b7280', textDecoration: 'none' }}>Nexas.ro</Link>
          {' '}|{' '}Agentul SEO — Audit SEO Gratuit
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 14, marginTop: 12 }}>
            {[
              ['/confidentialitate', 'Confidențialitate'],
              ['/cookies', 'Cookies'],
              ['/termeni', 'Termeni și condiții'],
              ['/contact', 'Contact'],
            ].map(([href, label]) => (
              <Link key={href} to={href} style={{ color: '#6b7280', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// ── Helper Component ──────────────────────────────────────────────────────────

const ReportSection: React.FC<{
  title: string;
  titleColor: string;
  badge?: string;
  children: React.ReactNode;
}> = ({ title, titleColor, badge, children }) => (
  <div style={{
    background: '#0d1117', border: '1px solid rgba(255,255,255,.07)',
    borderRadius: 14, padding: '20px 24px', marginBottom: 14,
  }}>
    <div style={{
      fontWeight: 700, fontSize: 14, marginBottom: 14,
      display: 'flex', alignItems: 'center', gap: 8, color: titleColor,
    }}>
      {title}
      {badge && (
        <span style={{
          fontSize: 10, padding: '2px 8px', borderRadius: 5,
          fontFamily: 'monospace', fontWeight: 500,
          background: 'rgba(59,130,246,.12)', color: '#93c5fd',
        }}>
          {badge}
        </span>
      )}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {children}
    </div>
  </div>
);
