import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'nexas_cookie_consent';
const CONSENT_VERSION = 2;

interface ConsentData {
  v: number;
  analytics: boolean;
  ts: string;
}

function readConsent(): ConsentData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    if (raw === 'accepted') return { v: 1, analytics: true, ts: '' };
    if (raw === 'rejected') return { v: 1, analytics: false, ts: '' };
    const data = JSON.parse(raw);
    if (data && typeof data.analytics === 'boolean') return data;
  } catch {
    return null;
  }
  return null;
}

function saveConsent(analytics: boolean) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ v: CONSENT_VERSION, analytics, ts: new Date().toISOString() })
    );
  } catch {
    /* localStorage indisponibil — bannerul va reapărea */
  }
}

export const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!readConsent()) setVisible(true);
  }, []);

  const decide = (analytics: boolean) => {
    saveConsent(analytics);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[100] rounded-[24px] border border-[rgba(215,226,234,0.15)] bg-[#141414]/95 backdrop-blur-md p-6 shadow-2xl"
        >
          <h3 className="text-[#D7E2EA] font-bold text-sm uppercase tracking-wider mb-2">
            Respectăm confidențialitatea ta
          </h3>
          <p className="text-[#D7E2EA]/60 font-light text-xs sm:text-sm leading-relaxed mb-4">
            Folosim cookie-uri esențiale pentru funcționarea site-ului și, doar cu acordul tău,
            cookie-uri de analiză a traficului. Detalii în{' '}
            <a href="#/cookies" className="underline hover:text-[#D7E2EA]">Politica de Cookies</a>.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => decide(true)}
              className="rounded-full px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-white"
              style={{
                background: 'rgba(255, 255, 255, 0.10)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(255, 255, 255, 0.20)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}
            >
              Accept
            </button>
            <button
              onClick={() => decide(false)}
              className="rounded-full px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] border border-[rgba(215,226,234,0.3)] hover:bg-white/5 transition-colors"
            >
              Doar esențiale
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
