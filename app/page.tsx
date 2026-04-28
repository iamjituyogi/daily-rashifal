'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import RashiCard from '@/components/RashiCard';
import AppLaunchHeroVisual from '@/components/AppLaunchHeroVisual';
import OurAppSection from '@/components/OurAppSection';
import type { PublicRashiCard } from '@/types/public-rashi';

const APP_NAME = 'Daily Hindi Rashifall';

const PRIMARY_COLOR = '#4A90E2';
const PRIMARY_COLOR_LIGHT = '#6BB6FF';
const COSMIC_BG = '#0a1628';

export default function Home() {
  const [rashis, setRashis] = useState<PublicRashiCard[]>([]);
  const [rashisLoading, setRashisLoading] = useState(true);
  const [rashisError, setRashisError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/public/rashis');
        const json = await res.json();
        if (!json.success) {
          throw new Error(json.error || 'Could not load rashis');
        }
        if (!cancelled) setRashis(json.data ?? []);
      } catch (e) {
        if (!cancelled) setRashisError(e instanceof Error ? e.message : 'Failed to load rashis');
      } finally {
        if (!cancelled) setRashisLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const testimonials = [
    { name: 'Kirti', location: 'Sector 56', text: "I'd say it was great value for money. The urgency was handled well, without compromising quality. Really satisfied with the experience.", avatar: 'K' },
    { name: 'Neha', location: 'Sector 57', text: 'The service was simple and effective. It met my expectations without any hassle. Good overall experience.', avatar: 'N' },
    { name: 'Pradnyesh', location: 'Suncity', text: 'Great work, my home was left spotless and fresh. The cleaning was thorough, and I appreciated the attention to detail. I\'ll recommend it. 👍🏼', avatar: 'P' },
    { name: 'Ridhi Saluja', location: 'Sector 56', text: 'The services have definitely improved from the first time. Preferences are kept as top priority. Thank you for making our lives easier with RashiNow!', avatar: 'R' },
    { name: 'Ritika', location: 'Sector 57', text: 'Seamless experience from booking to completion. The staff was courteous, punctual, and did a fantastic job.', avatar: 'R' },
    { name: 'Sameer', location: 'Sector 57', text: 'Really liked your service, it was smooth, efficient, and just what I needed. Would definitely recommend to others. 🌟', avatar: 'S' },
    { name: 'Karishma', location: 'Suncity', text: 'Absolutely excellent service! The team was prompt and professional throughout. Would love to use it again.', avatar: 'K' },
    { name: 'Rabia', location: 'Suncity', text: 'Really impressive compared to other platforms. The service was reliable and professional. Communication was clear and fast—very pleased!', avatar: 'R' },
    { name: 'Kirti', location: 'Sector 56', text: "I'd say it was great value for money. The urgency was handled well, without compromising quality. Really satisfied with the experience.", avatar: 'K' },
    { name: 'Neha', location: 'Sector 57', text: 'The service was simple and effective. It met my expectations without any hassle. Good overall experience.', avatar: 'N' },
    { name: 'Pradnyesh', location: 'Suncity', text: 'Great work, my home was left spotless and fresh. The cleaning was thorough, and I appreciated the attention to detail. I\'ll recommend it. 👍🏼', avatar: 'P' },
    { name: 'Ridhi Saluja', location: 'Sector 56', text: 'The services have definitely improved from the first time. Preferences are kept as top priority. Thank you for making our lives easier with RashiNow!', avatar: 'R' },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-50 border-b border-[color-mix(in_srgb,var(--primary)_22%,transparent)] bg-white/90 backdrop-blur-md shadow-sm">
        <nav className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/logo.png"
                alt={APP_NAME}
                width={160}
                height={48}
                className="h-9 w-auto md:h-11 object-contain"
                priority
              />
              <span className="hidden sm:inline max-w-[14rem] truncate md:max-w-none text-base md:text-lg font-semibold tracking-tight text-[var(--primary)] group-hover:text-[var(--primary-light)] transition-colors">
                {APP_NAME}
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#our-app" className="text-slate-600 hover:text-[var(--primary)] font-medium transition-colors">
                Our App
              </a>
              <a href="#why-us" className="text-slate-600 hover:text-[var(--primary)] font-medium transition-colors">
                Why us
              </a>
              <a href="#services" className="text-slate-600 hover:text-[var(--primary)] font-medium transition-colors">
                Services
              </a>
              <a href="#how-it-works" className="text-slate-600 hover:text-[var(--primary)] font-medium transition-colors">
                How it works
              </a>
            </div>
            <Link
              href="/login"
              className="shrink-0 px-5 py-2.5 rounded-lg font-semibold text-sm md:text-base text-white shadow-md hover:shadow-lg transition-all hover:brightness-105"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              Login
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section
          className="relative overflow-hidden text-white"
          style={{
            background: `linear-gradient(165deg, ${COSMIC_BG} 0%, #132a47 42%, #1e3a5f 100%)`,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              background: `radial-gradient(ellipse 80% 55% at 50% -10%, ${PRIMARY_COLOR_LIGHT}, transparent 55%)`,
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(10,22,40,0.85)_100%)]" />

          <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="flex justify-center mb-10 md:mb-14"
            >
              <Image
                src="/logo.png"
                alt={APP_NAME}
                width={220}
                height={66}
                className="h-16 md:h-[4.5rem] w-auto object-contain drop-shadow-[0_12px_40px_rgba(74,144,226,0.35)]"
                priority
              />
            </motion.div>

            <div className="grid lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] gap-12 lg:gap-14 xl:gap-16 items-center max-w-6xl mx-auto">
              <div className="text-center lg:text-left order-2 lg:order-1">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-xs md:text-sm uppercase tracking-[0.28em] font-semibold mb-4"
                  style={{ color: PRIMARY_COLOR_LIGHT }}
                >
                  App launch · वैदिक राशिफल
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08 }}
                  className="text-4xl sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem] font-bold leading-[1.12] mb-5"
                >
                  <span className="bg-gradient-to-br from-white via-white to-[#9dc8ff] bg-clip-text text-transparent">
                    {APP_NAME}
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-base md:text-lg text-slate-300 mb-3 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                >
                  रोज़ाना हिंदी में राशिफल — स्पष्ट, विश्वासयोग्य, और आपके फोन पर एक टैप दूर।
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="text-sm md:text-base text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                >
                  Tradition-backed insights for Delhi NCR, Bengaluru, Mumbai, Hyderabad, Chennai, Pune &amp; Kolkata —
                  and everywhere you go.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 mb-10"
                >
                  <a
                    href="#our-app"
                    className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 hover:shadow-xl"
                    style={{ backgroundColor: PRIMARY_COLOR }}
                  >
                    ऐप देखें
                  </a>
                  <a
                    href="#services"
                    className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
                  >
                    राशियाँ ब्राउज़ करें
                  </a>
                </motion.div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-slate-400 border-t border-white/10 pt-8">
                  <div>
                    <span className="block text-2xl font-bold text-white">
                      {rashisLoading ? '…' : rashis.length}
                    </span>
                    Rashis covered
                  </div>
                  <div className="hidden sm:block w-px bg-white/15 self-stretch min-h-[2.5rem]" />
                  <div>
                    <span className="block text-2xl font-bold text-white">Daily</span>
                    Fresh predictions
                  </div>
                  <div className="hidden sm:block w-px bg-white/15 self-stretch min-h-[2.5rem]" />
                  <div>
                    <span className="block text-2xl font-bold text-white">Vedic</span>
                    Tradition-led
                  </div>
                </div>
              </div>

              <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end w-full min-h-[420px] lg:min-h-[480px]">
                <AppLaunchHeroVisual />
              </div>
            </div>
          </div>
        </section>

        <OurAppSection />

        <section id="why-us" className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                On-demand professional Rashifal predictions
              </h2>
              <p className="text-lg md:text-xl text-slate-600">
                No more generic horoscope blurbs. Verified Vedic insight, tuned for real schedules and real choices.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  value: rashisLoading ? '…' : String(rashis.length),
                  label: 'Rashis',
                  sub: 'Listed in our system',
                },
                { value: '365', label: 'Daily Predictions', sub: 'Fresh insights every day' },
                { value: '100%', label: 'Authentic', sub: 'Vedic astrology based' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl p-8 text-center border border-slate-100 shadow-sm bg-slate-50/80 hover:shadow-md transition-shadow"
                >
                  <div className="text-5xl font-bold mb-2" style={{ color: PRIMARY_COLOR }}>
                    {item.value}
                  </div>
                  <div className="text-xl font-bold text-slate-900 mb-2">{item.label}</div>
                  <div className="text-slate-600">{item.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="services"
          className="relative py-16 md:py-24 overflow-hidden border-y border-slate-200/70"
          style={{
            background:
              'linear-gradient(180deg, #f8fafc 0%, color-mix(in srgb, var(--primary) 6%, white) 45%, #f1f5f9 100%)',
          }}
        >
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[min(100%,72rem)] h-64 opacity-[0.45]"
            style={{
              background:
                'radial-gradient(ellipse 70% 80% at 50% 0%, color-mix(in srgb, var(--primary) 18%, transparent), transparent 65%)',
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.5)_50%,transparent_100%)] opacity-40" />

          <div className="container relative mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-14 md:mb-16 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/80 backdrop-blur-sm px-4 py-1.5 mb-6 shadow-sm">
                <FaStar className="text-[length:0.85rem]" style={{ color: PRIMARY_COLOR }} />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-600">
                  Our services
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[2.35rem] font-bold text-slate-900 tracking-tight mb-4">
                Book trusted Rashifal predictions
              </h2>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                {rashisLoading
                  ? 'Loading signs from the server…'
                  : rashis.length
                    ? 'Every sign below is loaded from our database — open a card for guidance aligned with your Rashi.'
                    : 'Rashis will appear here once they are added in the admin dashboard.'}
              </p>
            </div>

            {rashisError && (
              <div className="max-w-2xl mx-auto mb-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-red-800 text-sm">
                {rashisError}
              </div>
            )}

            {rashisLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-7 max-w-7xl mx-auto">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[340px] rounded-2xl border border-slate-200 bg-slate-100/80 animate-pulse"
                  />
                ))}
              </div>
            ) : rashis.length === 0 ? (
              <p className="text-center text-slate-600 py-12">
                No rashis published yet. Sign in to the dashboard to add Rashi names and details.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-7 max-w-7xl mx-auto">
                {rashis.map((rashi, index) => (
                  <RashiCard key={rashi.id} rashi={rashi} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section id="how-it-works" className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <span className="text-2xl">❓</span>
              <span className="font-semibold" style={{ color: PRIMARY_COLOR }}>
                How it works
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
              Simple steps to discover your destiny
            </h2>
            <p className="text-lg md:text-xl text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Follow these steps for authentic Vedic astrology predictions
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { step: 'STEP 1', title: 'Choose Your Rashi', desc: 'Select from 12 authentic Vedic Rashis' },
                { step: 'STEP 2', title: 'View Predictions', desc: 'Get daily, weekly, and monthly insights' },
                { step: 'STEP 3', title: 'Plan Your Day', desc: 'Use predictions to guide your decisions' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div
                    className="rounded-2xl p-8 text-center h-full border border-slate-100 shadow-sm"
                    style={{
                      background: `color-mix(in srgb, ${PRIMARY_COLOR} 12%, white)`,
                    }}
                  >
                    <div
                      className="text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mb-4 mx-auto shadow-md"
                      style={{ backgroundColor: PRIMARY_COLOR }}
                    >
                      {index + 1}
                    </div>
                    <div className="font-semibold mb-2" style={{ color: PRIMARY_COLOR }}>
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-200/80">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <span className="text-2xl">💬</span>
              <span className="font-semibold" style={{ color: PRIMARY_COLOR }}>
                Our Testimonials
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4">
              User reviews and feedback
            </h2>
            <p className="text-lg md:text-xl text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              See how RashiNow has helped users through their own words
            </p>

            <div className="max-w-6xl mx-auto">
              <TestimonialsSlider testimonials={testimonials} />
            </div>
          </div>
        </section>

        <section
          className="py-16 md:py-20 text-white relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${COSMIC_BG} 0%, #152a45 50%, ${PRIMARY_COLOR}cc 100%)`,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              background: `radial-gradient(circle at 30% 20%, ${PRIMARY_COLOR_LIGHT}, transparent 45%)`,
            }}
          />
          <div className="container relative mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
              Get authentic Rashifal predictions in minutes.
              <br />
              Discover RashiNow!
            </h2>
            <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto">
              Thousands already trust us for clear, tradition-backed guidance.
            </p>
            <div className="flex justify-center mb-10">
              <a href="#" className="inline-block rounded-xl ring-1 ring-white/20 bg-white/10 p-3 hover:bg-white/15 transition-colors">
                <Image
                  src="https://framerusercontent.com/images/3P1ckGuQQEInpODdTv3kJOEgnYQ.png"
                  alt="Get it on Google Play"
                  width={200}
                  height={60}
                  className="h-14 w-auto"
                />
              </a>
            </div>
            <p className="text-slate-300">
              Questions?{' '}
              <a href="mailto:help@rashinow.com" className="font-semibold underline decoration-white/40 hover:decoration-white" style={{ color: PRIMARY_COLOR_LIGHT }}>
                help@rashinow.com
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer className="text-white py-12" style={{ backgroundColor: COSMIC_BG }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-10 pb-10 border-b border-white/10">
            <Link href="/" className="flex items-center gap-3 w-fit rounded-lg bg-white/10 p-2 ring-1 ring-white/15">
              <Image src="/logo.png" alt="RashiNow" width={140} height={42} className="h-9 w-auto object-contain" />
            </Link>
            <p className="text-slate-400 text-sm max-w-md">
              Daily Rashifal and Vedic insights for modern life — structured, respectful, and easy to use.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4 text-slate-200">SUPPORT</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Delete Account
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-slate-200">COMPANY</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="mailto:careers@rashinow.com" className="hover:text-white transition-colors">
                    careers@rashinow.com
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Become a RashiNow Astrologer
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-slate-200">LEGAL</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-slate-500">RashiNow © {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
