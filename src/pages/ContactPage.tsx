import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { PageLayout } from '../components/PageLayout';

const CONTACT_EMAIL = 'fopreaa@gmail.com';

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
  { icon: MapPin, label: 'Location', value: 'Romania — working worldwide' },
  { icon: Clock, label: 'Response time', value: 'Usually within 24 hours' },
];

const inputClasses =
  'w-full rounded-2xl bg-[#141414] border border-[rgba(215,226,234,0.15)] px-5 py-4 text-[#D7E2EA] font-light placeholder:text-[#D7E2EA] placeholder:opacity-40 focus:outline-none focus:border-[#B600A8] transition-colors duration-200';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || `New project inquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
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
          Have a project in mind? Tell me about it. Every collaboration starts with a
          simple conversation &mdash; no commitment, no pressure.
        </FadeIn>
      </section>

      <section className="px-5 sm:px-8 md:px-10 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {contactInfo.map((item, idx) => (
              <FadeIn key={item.label} delay={idx * 0.12} duration={0.7} y={30} as="div">
                <div className="rounded-[28px] bg-[#141414] border border-[rgba(215,226,234,0.12)] p-7 flex items-start gap-5">
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
                <h3 className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm mb-3">How it works</h3>
                <ol className="text-[#D7E2EA] font-light opacity-70 leading-relaxed text-sm sm:text-base list-decimal list-inside flex flex-col gap-2">
                  <li>You send me a short message about your project.</li>
                  <li>We discuss goals, timeline, and budget &mdash; free of charge.</li>
                  <li>You receive a clear offer with a fixed price.</li>
                  <li>I design, build, and launch your website.</li>
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
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClasses}
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
              <select name="subject" value={form.subject} onChange={handleChange} className={inputClasses}>
                <option value="">What do you need?</option>
                <option value="Landing Page">Landing Page</option>
                <option value="Business Website">Business Website</option>
                <option value="Online Store">Online Store</option>
                <option value="3D / Motion Design">3D / Motion Design</option>
                <option value="Branding">Branding</option>
                <option value="Something else">Something else</option>
              </select>
              <textarea
                name="message"
                required
                rows={7}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={handleChange}
                className={`${inputClasses} resize-none`}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="self-start rounded-full px-10 py-4 text-sm md:text-base font-medium uppercase tracking-widest text-white"
                style={gradientButtonStyle}
              >
                Send message
              </motion.button>
            </form>
          </FadeIn>
        </div>
      </section>
    </PageLayout>
  );
};
