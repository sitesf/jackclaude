import React, { useEffect, useState } from 'react';
import { FadeIn } from './FadeIn';

const SOURCES = [
  'https://raw.githubusercontent.com/sitesf/pariuri/main/meciuri.json',
  'https://raw.githubusercontent.com/sitesf/pariuri/main/alte_meciuri.json',
];

interface Match {
  home?: string;
  away?: string;
  data?: string;
  ora?: string;
  liga?: string;
  cota_1?: number;
  cota_x?: number;
  cota_2?: number;
  pronostic?: string;
  cota_pronostic?: number;
  incredere?: number;
  pariu_alternativ?: string;
}

interface FeedState {
  matches: Match[];
  updatedAt: string | null;
  loading: boolean;
  error: boolean;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('ro-RO', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  } catch {
    return dateStr;
  }
}

function odd(value?: number): string {
  return value != null ? Number(value).toFixed(2) : '-';
}

const MatchCard: React.FC<{ match: Match }> = ({ match }) => (
  <div className="rounded-[30px] border border-[#D7E2EA]/30 bg-[#141414] p-5 sm:p-6 flex flex-col gap-4">
    <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#D7E2EA]/50">
      <span>{match.liga || 'Fotbal'}</span>
      <span>
        {formatDate(match.data)}
        {match.ora ? ` · ${match.ora}` : ''}
      </span>
    </div>

    <p className="text-[#D7E2EA] font-black text-lg sm:text-xl leading-tight">
      {match.home} <span className="font-light opacity-50">vs</span> {match.away}
    </p>

    <div className="flex gap-2 text-sm">
      {[
        ['1', match.cota_1],
        ['X', match.cota_x],
        ['2', match.cota_2],
      ].map(([label, value]) => (
        <div
          key={label as string}
          className="flex-1 rounded-2xl border border-[#D7E2EA]/20 py-2 text-center text-[#D7E2EA]/80"
        >
          <span className="opacity-50 mr-1">{label}</span>
          {odd(value as number | undefined)}
        </div>
      ))}
    </div>

    {match.pronostic && (
      <div className="rounded-2xl bg-[#D7E2EA] text-[#0C0C0C] px-4 py-3 flex items-center justify-between gap-3">
        <span className="font-black text-sm uppercase tracking-wide">{match.pronostic}</span>
        <span className="text-sm font-bold whitespace-nowrap">
          {match.cota_pronostic ? `@${odd(match.cota_pronostic)}` : ''}
          {match.incredere ? ` · ${match.incredere}%` : ''}
        </span>
      </div>
    )}

    {match.pariu_alternativ && (
      <p className="text-xs text-[#D7E2EA]/50">Alternativ: {match.pariu_alternativ}</p>
    )}
  </div>
);

export const PredictionsSection: React.FC = () => {
  const [state, setState] = useState<FeedState>({
    matches: [],
    updatedAt: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const results = await Promise.allSettled(
          SOURCES.map((url) => fetch(`${url}?v=${Date.now()}`).then((r) => r.json()))
        );
        const feeds = results
          .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled')
          .map((r) => r.value);

        if (cancelled) return;
        if (!feeds.length) {
          setState((s) => ({ ...s, loading: false, error: true }));
          return;
        }

        const matches = feeds.flatMap((f) => (Array.isArray(f.meciuri) ? f.meciuri : []));
        const updatedAt = feeds.map((f) => f.updated_at).filter(Boolean).sort().pop() || null;
        setState({ matches, updatedAt, loading: false, error: false });
      } catch {
        if (!cancelled) setState((s) => ({ ...s, loading: false, error: true }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="predictions" className="relative bg-[#0C0C0C] z-10 pt-10 pb-24 px-4 sm:px-6">
      <FadeIn
        delay={0}
        duration={0.7}
        y={40}
        as="h2"
        className="hero-heading font-black uppercase text-center text-[clamp(2.5rem,10vw,120px)] leading-none tracking-tight mb-6"
      >
        Predictii
      </FadeIn>

      <FadeIn delay={0.1} duration={0.7} y={20} as="p" className="text-center text-[#D7E2EA]/50 text-sm mb-14">
        Pronosticuri generate automat din sitesf/pariuri
        {state.updatedAt
          ? ` · actualizat ${new Date(state.updatedAt).toLocaleDateString('ro-RO', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
            })}`
          : ''}
      </FadeIn>

      <div className="max-w-6xl mx-auto">
        {state.loading ? (
          <p className="text-center text-[#D7E2EA]/40">Se incarca predictiile...</p>
        ) : state.error ? (
          <p className="text-center text-[#D7E2EA]/40">Predictiile nu pot fi incarcate momentan.</p>
        ) : !state.matches.length ? (
          <div className="rounded-[30px] border border-[#D7E2EA]/20 p-10 text-center text-[#D7E2EA]/50">
            Niciun meci nu trece filtrele momentan. Revino mai tarziu.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {state.matches.map((m, i) => (
              <MatchCard key={`${m.home}-${m.away}-${m.data}-${i}`} match={m} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
