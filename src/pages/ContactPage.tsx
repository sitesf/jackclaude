import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Phone, MessageCircle } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { PageLayout } from '../components/PageLayout';

const CONTACT_EMAIL = 'contact@nexas.ro';
const CONTACT_PHONE = '+40 730 858 640';
const WHATSAPP_URL =
  'https://wa.me/40730858640?text=Salut%2C%20vreau%20sa%20discutam%20despre%20un%20proiect%20NEXAS';

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdpr) return;
    const subject = encodeURIComponent(form.subject || `Cerere proiect nou de la ${form.name}`);
    const body = encodeURIComponent(
      `Nume: ${form.name}\nEmail: ${form.email}\nTelefon: ${form.phone || '—'}\n\n${form.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <PageLayout>
      {/* Header */}
      <section className="px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 md:pt-24 pb-12 text-center">
        <FadeIn delay={0} duration={0.7} y={40} as="h1" className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]">
          Contact
        </FadeIn>
        <FadeIn delay={0.2} duration={0.7} y={20} as="p" className="text-[#D7E2EA] font-light max-w-2xl mx-auto mt-8 leading-relaxed text-[clamp(1rem,2vw,1.25rem)]">
          Hai să construim ceva memorabil. Spune-ne ce vrei să lansezi și îți răspundem cu o
          idee clară pentru structură, design și pașii următori &mdash; discuția inițială e gratuită.
        </FadeIn>
        <FadeIn delay={0.3} duration={0.7} y={20} as="div" className="mt-8">
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2.5 rounded-full bg-[#25d366] px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-white"
            style={{ boxShadow: '0 10px 35px rgba(37,211,102,.3)' }}
          >
            <MessageCircle className="w-4 h-4" /> Scrie-ne pe WhatsApp
          </motion.a>
        </FadeIn>
      </section>

      <section className="px-5 sm:px-8 md:px-10 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {contactInfo.map((item, idx) => (
              <FadeIn key={item.label} delay={idx * 0.1} duration={0.7} y={30} as="div">
                <div className="rounded-[28px] bg-[#141414] border border-[rgba(215,226,234,0.12)] p-6 flex items-start gap-5">
                  <span className="rounded-full p-3" style={gradientButtonStyle}>
                    <item.icon className="w-5 h-5 text-white" />
                  </span>
                  <div>
                    <h3 className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm">{item.label}</h3>
                    {item.href ? (
                      <a href={item.href} className="text-[#D7E2EA] font-light opacity-70 hover:opacity-100 transition-opacity duration-200 break-all">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-[#D7E2EA] font-light opacity-70">{item.value}</p>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}

            <FadeIn delay={0.4} duration={0.7} y={30} as="div">
              <div className="rounded-[28px] border border-[rgba(215,226,234,0.12)] p-7">
                <h3 className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm mb-3">Cum funcționează</h3>
                <ol className="text-[#D7E2EA] font-light opacity-70 leading-relaxed text-sm sm:text-base list-decimal list-inside flex flex-col gap-2">
                  <li>Ne trimiți un mesaj scurt despre proiectul tău.</li>
                  <li>Discutăm obiective, termene și buget &mdash; gratuit.</li>
                  <li>Primești o ofertă clară, valabilă 14 zile.</li>
                  <li>Proiectăm, construim și lansăm proiectul tău.</li>
                </ol>
              </div>
            </FadeIn>
          </div>

          {/* Form */}
          <FadeIn delay={0.2} duration={0.7} y={30} as="div" className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                  placeholder="Emailul tău *"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Telefon (opțional)"
                value={form.phone}
                onChange={handleChange}
                className={inputClasses}
              />
              <select name="subject" value={form.subject} onChange={handleChange} className={inputClasses}>
                <option value="">De ce ai nevoie?</option>
                <option value="Landing Page">Landing Page</option>
                <option value="Site de prezentare">Site de prezentare</option>
                <option value="Magazin online">Magazin online</option>
                <option value="Agent AI / Automatizare">Agent AI / Automatizare</option>
                <option value="Optimizare SEO">Optimizare SEO</option>
                <option value="Altceva">Altceva</option>
              </select>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Povestește-ne despre proiectul tău... *"
                value={form.message}
                onChange={handleChange}
                className={`${inputClasses} resize-none`}
              />
              <label className="flex items-start gap-3 text-[#D7E2EA]/60 font-light text-xs sm:text-sm leading-relaxed cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={gdpr}
                  onChange={(e) => setGdpr(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[#B600A8] flex-shrink-0"
                />
                <span>
                  Accept prelucrarea datelor de către NEXAS conform{' '}
                  <a href="#/confidentialitate" className="underline hover:text-[#D7E2EA]">
                    Politicii de confidențialitate
                  </a>
                  . *
                </span>
              </label>
              <p className="text-[#D7E2EA]/35 font-light text-xs">
                Nu introduce date sensibile (CNP, date bancare, parole) în formular.
              </p>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="self-start rounded-full px-10 py-4 text-sm md:text-base font-medium uppercase tracking-widest text-white"
                style={gradientButtonStyle}
              >
                Trimite mesajul
              </motion.button>
            </form>
          </FadeIn>
        </div>
      </section>
    </PageLayout>
  );
};
