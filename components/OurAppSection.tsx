'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

const PRIMARY = '#4A90E2';
const PRIMARY_LIGHT = '#6BB6FF';

const SCREEN_IMG = '/app-home-screen.png';

const bullets = [
  'दैनिक हिंदी राशिफल — स्पष्ट और विश्वसनीय',
  'बारहों राशियों के लिए ताज़ा भविष्यवाणियाँ',
  'सूचनाएँ और शांत, सुंदर अनुभव के लिए डिज़ाइन',
];

export default function OurAppSection() {
  return (
    <section
      id="our-app"
      className="relative overflow-hidden border-y border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[min(100%,56rem)] -translate-x-1/2 opacity-40"
        style={{
          background: `radial-gradient(ellipse 70% 100% at 50% 0%, ${PRIMARY}22, transparent 65%)`,
        }}
      />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-block rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm"
          >
            Our App
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem]"
          >
            Daily Hindi Rashifall
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-600 md:text-xl"
          >
            Google Play पर उपलब्ध — अपनी राशि का हिंदी राशिफल कभी भी, कहीं भी।
          </motion.p>
        </div>

        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            className="order-2 lg:order-1"
          >
            <ul className="space-y-4 mb-10">
              {bullets.map((text, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * i }}
                  className="flex gap-3 text-slate-700 md:text-lg"
                >
                  <FaCheckCircle className="mt-1 shrink-0 text-[1.1rem]" style={{ color: PRIMARY }} />
                  <span>{text}</span>
                </motion.li>
              ))}
            </ul>

            <p className="mb-6 text-sm font-medium uppercase tracking-wider text-slate-500">
              Available on
            </p>
            <Link
              href="#"
              className="inline-flex rounded-xl ring-1 ring-slate-200/90 bg-white p-3 shadow-lg transition hover:shadow-xl hover:ring-[color-mix(in_srgb,var(--primary)_35%,transparent)]"
              aria-label="Get it on Google Play"
            >
              <Image
                src="https://framerusercontent.com/images/3P1ckGuQQEInpODdTv3kJOEgnYQ.png"
                alt="Get it on Google Play"
                width={220}
                height={64}
                className="h-14 w-auto md:h-[4.25rem]"
              />
            </Link>
            <p className="mt-6 max-w-md text-sm text-slate-500">
              जल्द ही और प्लेटफ़ॉर्म पर। अभी Play Store से ऐप इंस्टॉल करें और सूचना अपडेट चालू रखें।
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            className="relative order-1 flex justify-center lg:order-2 lg:justify-end"
          >
            <div
              className="pointer-events-none absolute inset-0 -z-10 blur-3xl opacity-40"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${PRIMARY}44, transparent 62%)`,
              }}
            />

            {/* Animated phone showcase */}
            <motion.div
              className="relative w-[min(100%,300px)] sm:w-[320px]"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div
                className="relative rounded-[2.75rem] p-[3px]"
                style={{
                  background: `linear-gradient(160deg, white, ${PRIMARY_LIGHT}55, ${PRIMARY}66)`,
                }}
                animate={{
                  boxShadow: [
                    `0 40px 100px -35px ${PRIMARY}55`,
                    `0 48px 110px -30px ${PRIMARY_LIGHT}66`,
                    `0 40px 100px -35px ${PRIMARY}55`,
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <div className="overflow-hidden rounded-[2.65rem] bg-gradient-to-b from-slate-900 via-slate-950 to-black p-2 shadow-2xl ring-1 ring-black/40">
                  <div className="relative aspect-[9/17.8] overflow-hidden rounded-[2.15rem] bg-[#060b14]">
                    <Image
                      src={SCREEN_IMG}
                      alt="हिंदी दैनिक राशिफल — ऐप होम स्क्रीन"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 300px, 320px"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-[2.15rem] ring-1 ring-inset ring-white/10 shadow-[inset_0_0_50px_rgba(0,0,0,0.12)]" />
                    {/* Light shine pass — subtle, keeps premium feel without hiding UI */}
                    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden rounded-[2.15rem] opacity-40">
                      <motion.div
                        className="absolute inset-y-0 w-[38%]"
                        style={{
                          background:
                            'linear-gradient(115deg, transparent 36%, rgba(255,255,255,0.12) 50%, transparent 64%)',
                        }}
                        initial={{ x: '-40%' }}
                        animate={{ x: ['-40%', '220%'] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          repeatDelay: 5,
                          ease: 'easeInOut',
                        }}
                      />
                    </div>

                    <div className="absolute left-1/2 top-3 z-10 h-6 w-[5.5rem] -translate-x-1/2 rounded-full bg-black/90 shadow-inner ring-1 ring-white/10" />
                  </div>
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                className="absolute -right-2 top-16 z-20 rounded-xl border border-white/20 bg-white/95 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-700 shadow-xl backdrop-blur md:-right-4"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                Play Store
              </motion.div>
              <motion.div
                className="absolute -left-2 bottom-24 z-20 rounded-xl border border-white/15 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-white shadow-lg backdrop-blur-md md:-left-5"
                style={{ backgroundColor: `${PRIMARY}ee` }}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                Premium UI
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
