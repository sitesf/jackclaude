import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  role: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: string;
  metrics: {
    label: string;
    value: string;
  }[];
  image?: string;
  color: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: '1',
    title: 'NEXAS HR — 100+ CV-uri/săpt →  8h saved/week',
    client: 'Auto Service București',
    role: 'Manager HR',
    challenge: 'Analizau 100+ CV-uri pe săptămână manual. Pierdeau timp calificat la screening.',
    solution: 'Implementare NEXAS HR cu scoring AI, clasificare automată candidații, pipeline gestionat.',
    results: [
      '100 CV-uri analizate în <2h vs 40h manual',
      'Timp de hire: de la 3 săpt la 1 săpt',
      '€8,000/lună economii (recurente)',
    ],
    testimonial:
      'Cu NEXAS HR, am redus screening time-ul de la 40 ore/săptămână la 2 ore. Am angajat mai repede și mai bine.',
    metrics: [
      { label: 'Timp redus', value: '95%' },
      { label: 'Cost/hire', value: '-60%' },
      { label: 'Calitate hire', value: '+40%' },
    ],
    color: 'from-[#B600A8] to-[#7621B0]',
  },
  {
    id: '2',
    title: 'NEXAS WhatsApp Bot — 98% instant reply rate',
    client: 'Salon Frumusețe Cluj',
    role: 'Manager Operațiuni',
    challenge: 'Pierdeau clienți din cauza răspunsurilor lente la programări.',
    solution: 'Bot WhatsApp care primește cereri, confirmă disponibilitate, trimite reminder.',
    results: [
      'Răspuns instant la 98% din mesaje',
      'Clienti happy: +85% rating Google',
      'Reducere no-shows: de la 20% la 4%',
    ],
    testimonial:
      'Oamenii nu-si mai inchid programarea pentru ca raspundem instant. Reveniturile cresc și nici nu mai stres sa raspund la SMS-uri.',
    metrics: [
      { label: 'Răspunsuri instant', value: '98%' },
      { label: 'No-shows reduse', value: '-80%' },
      { label: 'Rating Google', value: '+4.8★' },
    ],
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: '3',
    title: 'NEO Audit SEO — +120% organic traffic (6 luni)',
    client: 'E-commerce Haine Timișoara',
    role: 'Proprietar',
    challenge: 'Site-ul era invizibil în Google. 0 organis traffic din SEO.',
    solution: 'Audit SEO complet, restructurare site, content strategy cu AI, backlinks.',
    results: [
      '+120% organic traffic',
      '+45% conversii din search',
      'Position #1 pe 15+ keywords țintă',
    ],
    testimonial:
      'Cu NEO, site-ul nostru a apărut în Google. Vânzările din SEO au crescut de 2.5 ori. Profitabil din luna 2.',
    metrics: [
      { label: 'Trafic organic', value: '+120%' },
      { label: 'Conversii', value: '+45%' },
      { label: 'Keyword rankings', value: '#1 → 15+' },
    ],
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: '4',
    title: 'Custom Automation — Invoice Processing Bot',
    client: 'Accounting Firm Brașov',
    role: 'CFO',
    challenge: 'Entry datelor din invoice-uri = 60 ore/lună. Erori humane pe document verificare.',
    solution: 'Bot AI care extrage date din invoice-uri PDF, încarc automat în ERP.',
    results: [
      '60 ore/lună → 2 ore verificare',
      'Erori scad de la 8% la <0.5%',
      '€15k/an savings (staff redus)',
    ],
    testimonial:
      'Botul citește invoicele mai rapid si mai corect decat oamenii. E scapare de acum.',
    metrics: [
      { label: 'Ore reduse', value: '97%' },
      { label: 'Acuratețe', value: '99.5%' },
      { label: 'Savings/an', value: '€15k' },
    ],
    color: 'from-blue-400 to-cyan-500',
  },
];

export const CaseStudies: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#D7E2EA] mb-3">
          Cazuri de succes reale
        </h2>
        <p className="text-[#96AFD2] max-w-2xl mx-auto">
          Clienți RON care au văzut ROI imediat cu agenții NEXAS
        </p>
      </div>

      <div className="space-y-8">
        {caseStudies.map((study, idx) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-[rgba(215,226,234,0.15)] bg-[#141414] overflow-hidden hover:border-[#B600A8] transition-all duration-300"
          >
            <div className={`h-1 bg-gradient-to-r ${study.color}`} />

            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#D7E2EA] mb-2">{study.title}</h3>
                <p className="text-sm text-[#96AFD2]">
                  <strong>{study.client}</strong> • {study.role}
                </p>
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-sm font-semibold text-[#B600A8] mb-3 uppercase tracking-wider">
                    Challenge
                  </h4>
                  <p className="text-[#96AFD2] leading-relaxed">{study.challenge}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-emerald-400 mb-3 uppercase tracking-wider">
                    Soluție
                  </h4>
                  <p className="text-[#96AFD2] leading-relaxed">{study.solution}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {study.metrics.map((metric, midx) => (
                  <motion.div
                    key={midx}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-xl bg-[#0f0f0f] border border-[rgba(215,226,234,0.1)] p-4 text-center"
                  >
                    <p className="text-xs text-[#96AFD2] mb-2">{metric.label}</p>
                    <p className="text-xl md:text-2xl font-bold text-[#D7E2EA]">{metric.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Results List */}
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-[#D7E2EA] mb-4 uppercase tracking-wider">
                  Rezultate
                </h4>
                <ul className="space-y-2">
                  {study.results.map((result, ridx) => (
                    <li key={ridx} className="flex items-start gap-3 text-[#96AFD2]">
                      <span className="text-[#B600A8] font-bold mt-1">✓</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testimonial */}
              <div className="rounded-2xl bg-[#0f0f0f] border border-[rgba(215,226,234,0.1)] p-6 flex gap-4">
                <Quote className="w-5 h-5 text-[#B600A8] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-[#96AFD2] italic mb-3">{study.testimonial}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-[#96AFD2]">5/5</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <button
          onClick={() => (window.location.hash = '#/contact')}
          className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-[#B600A8] to-[#7621B0] text-white font-semibold hover:shadow-lg hover:shadow-[#B600A8]/50 transition-all duration-300"
        >
          Vreau și eu un caz de succes
        </button>
      </motion.div>
    </motion.div>
  );
};
