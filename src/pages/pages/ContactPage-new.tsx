import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Phone, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { FadeIn } from '../../components/FadeIn';
import { PageLayout } from '../../components/PageLayout';
import { Spotlight } from '../../components/Spotlight';
import { SpotlightCursor } from '../../components/SpotlightCursor';
import { Head } from '../../components/Head';
import axios from 'axios';

const RobotVisual = React.lazy(() =>
  import('../components/RobotVisual').then((m) => ({ default: m.RobotVisual })),
);

const CONTACT_EMAIL = 'contact@nexas.ro';
const CONTACT_PHONE = '+40 730 858 640';
const WHATSAPP_URL =
  'https://wa.me/40730858640?text=Salut%2C%20vreau%20sa%20discutam%20despre%20un%20proiect%20NEXAS';

const API_URL = process.env.REACT_APP_API_URL || 'https://api.nexas.ro';

const gradientButtonStyle: React.CSSProperties = {
  background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
  boxShadow: `
    0px 4px 4px rgba(181, 1, 167, 0.25),
    inset 4px 4px 12px #7721B1,
    inset -2px -2px 4px rgba(181, 1, 167, 0.2)
  `,
  outline: '2px solid white',
  outlineOffset: '-3px',
};

const contactInfo = [
  { icon: Mail, label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { icon: Phone, label: 'Telefon', value: CONTACT_PHONE, href: 'tel:+40730858640' },
  { icon: MapPin, label: 'Locație', value: 'București, România — lucrăm cu clienți de oriunde' },
  { icon: Clock, label: 'Timp de răspuns', value: 'De obicei în câteva ore' },
];

const inputClasses =
  'w-full rounded-2xl bg-[#141414] border border-[rgba(215,226,234,0.15)] px-5 py-4 text-[#D7E2EA] font-light placeholder:text-[#D7E2EA] placeholder:opacity-40 focus:outline-none focus:border-[#B600A8] transition-colors duration-200';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [gdpr, setGdpr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gdpr) {
      setStatus('error');
      setStatusMessage('Trebuie să accepți GDPR.');
      return;
    }

    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      setStatusMessage('Completeaza nume, email și mesaj.');
      return;
    }

    setLoading(true);
    setStatus('idle');

    try {
      const response = await axios.post(`${API_URL}/api/contact`, form, {
        headers: { 'Content-Type': 'application/json' },
      });

      setStatus('success');
      setStatusMessage(response.data.message || 'Mesajul a fost trimis! Mulțumim.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setGdpr(false);

      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: any) {
      setStatus('error');
      setStatusMessage(
        error.response?.data?.error || 'Ceva s-a întâmplat. Incearcă din nou.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head
        title="Contact NEXAS — Agenți AI, Automatizări, Web Design"
        description="Contactează NEXAS pentru agenți AI, automatizări și soluții digitale. Răspundem în câteva ore."
        url="https://jackclaude.nexas.ro/contact"
      />
      <PageLayout>
        <div className="relative min-h-screen overflow-hidden">
          <Spotlight />
          <SpotlightCursor />

          {/* Robot visual lazy-loaded */}
          <div className="absolute inset-0 -z-10">
            <Suspense fallback={<div className="w-full h-full bg-[#070708]" />}>
              <RobotVisual />
            </Suspense>
          </div>

          <FadeIn>
            <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 md:py-32">
              {/* Heading */}
              <div className="mb-16 text-center">
                <h1 className="hero-heading text-5xl md:text-6xl font-bold mb-6">
                  Contactează-ne
                </h1>
                <p className="text-[#D7E2EA] text-lg opacity-75 max-w-2xl mx-auto">
                  Discutăm despre proiectul tău. Nu e vânzare agresivă — vorbim strategie.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {contactInfo.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="group rounded-2xl border border-[rgba(215,226,234,0.15)] bg-[#141414] p-6 hover:border-[#B600A8] transition-all duration-300 cursor-pointer"
                    >
                      <Icon className="w-8 h-8 text-[#B600A8] mb-3" />
                      <h3 className="text-[#D7E2EA] font-semibold mb-2">{item.label}</h3>
                      {item.href ? (
                        <a href={item.href} className="text-[#96AFD2] hover:text-[#B600A8] transition">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[#96AFD2]">{item.value}</p>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-[rgba(215,226,234,0.15)] bg-[#0C0C0C] bg-opacity-50 backdrop-blur-sm p-8 md:p-12"
              >
                <h2 className="text-2xl font-bold text-[#D7E2EA] mb-8">Trimite un mesaj</h2>

                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 flex items-center gap-3 rounded-xl bg-green-500/20 border border-green-500/50 px-4 py-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <p className="text-green-300">{statusMessage}</p>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 flex items-center gap-3 rounded-xl bg-red-500/20 border border-red-500/50 px-4 py-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <p className="text-red-300">{statusMessage}</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Numele tău *"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email *"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  {/* Phone & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Telefon (opțional)"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subiect (de ex: NEXAS HR)"
                      value={form.subject}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  {/* Message */}
                  <textarea
                    name="message"
                    required
                    placeholder="Mesajul tău *"
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClasses} resize-none`}
                  />

                  {/* GDPR Checkbox */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={gdpr}
                      onChange={(e) => setGdpr(e.target.checked)}
                      className="w-5 h-5 rounded accent-[#B600A8]"
                    />
                    <span className="text-sm text-[#96AFD2]">
                      Sunt de acord cu{' '}
                      <a href="/confidentialitate" className="text-[#B600A8] hover:underline">
                        politica de confidențialitate
                      </a>
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={!loading ? gradientButtonStyle : {}}
                    className="mt-4 rounded-xl py-3 px-8 font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Se trimite...' : 'Trimite mesaj'}
                  </button>
                </form>

                {/* WhatsApp CTA */}
                <div className="mt-8 pt-8 border-t border-[rgba(215,226,234,0.15)] text-center">
                  <p className="text-[#96AFD2] mb-4">Preferă chat instant?</p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba5a] transition-all duration-300 font-semibold"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat pe WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </PageLayout>
    </>
  );
};
