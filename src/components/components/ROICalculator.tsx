import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Clock, Zap } from 'lucide-react';

interface ROIConfig {
  cvPerWeek: number;
  hoursPerCv: number;
  hourlyRate: number;
  agentType: 'hr' | 'whatsapp' | 'automation';
}

const AGENT_CONFIGS = {
  hr: {
    name: 'NEXAS HR',
    baseCost: 2500,
    hoursPerCv: 0.5,
    efficiency: 0.3, // Reduce 30% of manual work
  },
  whatsapp: {
    name: 'NEXAS WhatsApp Bot',
    baseCost: 1800,
    hoursPerMessage: 0.1,
    efficiency: 0.85, // 85% automation
  },
  automation: {
    name: 'Custom Automation',
    baseCost: 3000,
    hoursPerTask: 0.25,
    efficiency: 0.7, // 70% automation
  },
};

export const ROICalculator: React.FC = () => {
  const [config, setConfig] = useState<ROIConfig>({
    cvPerWeek: 50,
    hoursPerCv: 0.5,
    hourlyRate: 25,
    agentType: 'hr',
  });

  const roi = useMemo(() => {
    const hoursPerWeek = config.cvPerWeek * config.hoursPerCv;
    const monthlySavings = hoursPerWeek * 4 * config.hourlyRate;
    const yearlySavings = monthlySavings * 12;
    const agent = AGENT_CONFIGS[config.agentType];
    const paybackMonths = agent.baseCost / (monthlySavings || 1);
    const yearlyROI = ((yearlySavings - agent.baseCost) / agent.baseCost) * 100;

    return {
      hoursPerWeek: Math.round(hoursPerWeek * 100) / 100,
      monthlySavings: Math.round(monthlySavings),
      yearlySavings: Math.round(yearlySavings),
      paybackMonths: Math.max(1, Math.round(paybackMonths * 10) / 10),
      yearlyROI: Math.round(yearlyROI),
      agentName: agent.name,
      agentCost: agent.baseCost,
    };
  }, [config]);

  const handleChange = (key: keyof ROIConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-[rgba(182,0,168,0.3)] bg-gradient-to-br from-[#141414] to-[#0f0f0f] p-8 md:p-12 shadow-2xl"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#D7E2EA] flex items-center gap-3 mb-2">
          <TrendingUp className="w-8 h-8 text-[#B600A8]" />
          Calculator ROI
        </h2>
        <p className="text-[#96AFD2]">Estimează economiile tale cu NEXAS</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Agent Type */}
          <div>
            <label className="block text-sm font-semibold text-[#D7E2EA] mb-3">
              Tip de agent *
            </label>
            <select
              value={config.agentType}
              onChange={(e) => handleChange('agentType', e.target.value as ROIConfig['agentType'])}
              className="w-full rounded-xl bg-[#1a1a1a] border border-[rgba(215,226,234,0.2)] px-4 py-3 text-[#D7E2EA] focus:border-[#B600A8] focus:outline-none transition"
            >
              <option value="hr">NEXAS HR (CV Analysis)</option>
              <option value="whatsapp">NEXAS WhatsApp (Booking Agent)</option>
              <option value="automation">Custom Automation</option>
            </select>
          </div>

          {/* CV per week / Tasks */}
          <div>
            <label className="block text-sm font-semibold text-[#D7E2EA] mb-3">
              {config.agentType === 'hr'
                ? 'CV-uri pe săptămână'
                : 'Taskuri pe săptămână'}
              : <span className="text-[#B600A8] ml-2">{config.cvPerWeek}</span>
            </label>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={config.cvPerWeek}
              onChange={(e) => handleChange('cvPerWeek', parseInt(e.target.value))}
              className="w-full accent-[#B600A8]"
            />
            <div className="flex justify-between text-xs text-[#96AFD2] mt-2">
              <span>10</span>
              <span>500+</span>
            </div>
          </div>

          {/* Hours per unit */}
          <div>
            <label className="block text-sm font-semibold text-[#D7E2EA] mb-3">
              Ore/{config.agentType === 'hr' ? 'CV' : 'task'}:{' '}
              <span className="text-[#B600A8]">{config.hoursPerCv}</span>
            </label>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={config.hoursPerCv}
              onChange={(e) => handleChange('hoursPerCv', parseFloat(e.target.value))}
              className="w-full accent-[#B600A8]"
            />
            <div className="flex justify-between text-xs text-[#96AFD2] mt-2">
              <span>0.1h</span>
              <span>5h</span>
            </div>
          </div>

          {/* Hourly Rate */}
          <div>
            <label className="block text-sm font-semibold text-[#D7E2EA] mb-3">
              Tarif orar (€): <span className="text-[#B600A8]">{config.hourlyRate}€</span>
            </label>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={config.hourlyRate}
              onChange={(e) => handleChange('hourlyRate', parseInt(e.target.value))}
              className="w-full accent-[#B600A8]"
            />
            <div className="flex justify-between text-xs text-[#96AFD2] mt-2">
              <span>5€</span>
              <span>100€</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Hours saved per week */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl bg-[#1a1a1a] border border-[#B600A8]/30 p-6 text-center"
            >
              <Clock className="w-6 h-6 text-[#B600A8] mx-auto mb-2" />
              <p className="text-sm text-[#96AFD2] mb-1">Ore/săptămână</p>
              <p className="text-3xl font-bold text-[#D7E2EA]">{roi.hoursPerWeek}h</p>
              <p className="text-xs text-[#96AFD2] mt-2">
                ≈ {Math.round(roi.hoursPerWeek / 8)} zile/lună
              </p>
            </motion.div>

            {/* Monthly savings */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl bg-[#1a1a1a] border border-green-500/30 p-6 text-center"
            >
              <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-sm text-[#96AFD2] mb-1">Economii/lună</p>
              <p className="text-3xl font-bold text-green-400">€{roi.monthlySavings}</p>
            </motion.div>

            {/* Yearly savings */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl bg-[#1a1a1a] border border-[#B600A8]/30 p-6 text-center sm:col-span-2"
            >
              <TrendingUp className="w-6 h-6 text-[#B600A8] mx-auto mb-2" />
              <p className="text-sm text-[#96AFD2] mb-1">Economii/an</p>
              <p className="text-4xl font-bold text-[#D7E2EA]">€{roi.yearlySavings}</p>
            </motion.div>
          </div>

          {/* Payback & ROI */}
          <div className="rounded-2xl bg-gradient-to-r from-[#B600A8]/20 to-[#7621B0]/20 border border-[#B600A8]/50 p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-[#96AFD2] mb-1">Recuperare investiție</p>
                <p className="text-2xl font-bold text-[#D7E2EA]">{roi.paybackMonths} luni</p>
              </div>
              <div>
                <p className="text-xs text-[#96AFD2] mb-1">ROI/an</p>
                <p className="text-2xl font-bold text-green-400">{roi.yearlyROI}%</p>
              </div>
            </div>
            <p className="text-xs text-[#96AFD2]">
              Investiție: €{roi.agentCost} ({roi.agentName})
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => window.location.hash = '#/contact'}
            className="w-full rounded-xl bg-gradient-to-r from-[#B600A8] to-[#7621B0] py-3 font-semibold text-white hover:shadow-lg hover:shadow-[#B600A8]/50 transition-all duration-300"
          >
            Discută cu NEXAS
          </button>
        </div>
      </div>
    </motion.div>
  );
};
