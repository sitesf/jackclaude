import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, Users, TrendingUp } from 'lucide-react';
import { CountUp } from './CountUp';
import axios from 'axios';

interface Metrics {
  agentsCreated: number;
  hoursSaved: number;
  estimatedSavings: number;
  activeClients: number;
  lastUpdated: string;
}

const API_URL = process.env.REACT_APP_API_URL || 'https://api.nexas.ro';

const metricCards = [
  {
    icon: Zap,
    label: 'Agenți creați',
    key: 'agentsCreated',
    color: 'from-[#B600A8] to-[#7621B0]',
    suffix: '+',
  },
  {
    icon: Clock,
    label: 'Ore economite',
    key: 'hoursSaved',
    color: 'from-emerald-500 to-teal-500',
    suffix: 'h',
  },
  {
    icon: TrendingUp,
    label: 'Economii estimate',
    key: 'estimatedSavings',
    color: 'from-amber-400 to-orange-500',
    prefix: '€',
    divide: 1000,
    suffix: 'k',
  },
  {
    icon: Users,
    label: 'Clienți activi',
    key: 'activeClients',
    color: 'from-blue-400 to-cyan-500',
    suffix: '+',
  },
];

export const MetricsDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    agentsCreated: 127,
    hoursSaved: 8940,
    estimatedSavings: 2300000,
    activeClients: 43,
    lastUpdated: new Date().toISOString(),
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/metrics`);
        setMetrics(response.data);
      } catch (error) {
        // Keep default values
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    // Refresh every 5 minutes
    const interval = setInterval(fetchMetrics, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#D7E2EA] mb-2">
          NEXAS în numere reale
        </h2>
        <p className="text-[#96AFD2]">Proiecte livrate, ore economite, clienți mulțumiți</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          const value = metrics[card.key as keyof Metrics] as number;
          const displayValue = card.divide ? Math.round(value / card.divide) : value;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`rounded-2xl bg-gradient-to-br ${card.color} p-0.5 cursor-pointer`}
            >
              <div className="rounded-2xl bg-[#0C0C0C] p-6 h-full">
                <Icon className="w-8 h-8 text-[#B600A8] mb-4" />
                <p className="text-sm text-[#96AFD2] mb-3">{card.label}</p>
                <div className="flex items-baseline gap-1">
                  {card.prefix && <span className="text-2xl font-bold text-[#D7E2EA]">{card.prefix}</span>}
                  <CountUp
                    end={displayValue}
                    duration={2}
                    className="text-4xl font-bold text-[#D7E2EA]"
                  />
                  <span className="text-xl font-bold text-[#96AFD2]">{card.suffix}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Last updated */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center text-xs text-[#96AFD2] opacity-60"
        >
          Actualizat: {new Date(metrics.lastUpdated).toLocaleString('ro-RO')}
        </motion.div>
      )}
    </motion.div>
  );
};
