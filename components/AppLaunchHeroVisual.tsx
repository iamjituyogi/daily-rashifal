'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const PRIMARY = '#4A90E2';
const PRIMARY_LIGHT = '#6BB6FF';

const SCREEN_IMG = '/app-home-screen.png';

/** Animated premium visual — phone frame with real app home screenshot inside the display. */
export default function AppLaunchHeroVisual() {
  return (
    <div className="relative mx-auto flex h-[min(520px,70vh)] w-full max-w-[420px] items-center justify-center lg:max-w-[480px]">
      {/* Soft glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(420px,55vw)] w-[min(420px,55vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.35]"
        style={{
          background: `radial-gradient(circle, ${PRIMARY}55 0%, transparent 68%)`,
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.28, 0.42, 0.28] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orbit ring 1 */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[85%] max-w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
      />
      {/* Orbit ring 2 */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[72%] max-w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 64, repeat: Infinity, ease: 'linear' }}
      />

      {/* Floating orb dots */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-2 w-2 rounded-full"
          style={{
            background: i === 1 ? PRIMARY_LIGHT : PRIMARY,
            boxShadow: `0 0 12px ${PRIMARY}99`,
            left: `${28 + i * 22}%`,
            top: `${18 + i * 12}%`,
          }}
          animate={{
            y: [0, -14, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}

      <motion.div
        className="relative z-10 w-[min(100%,280px)] sm:w-[300px]"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="relative rounded-[2.35rem] p-[3px] shadow-[0_32px_80px_-24px_rgba(0,0,0,0.65)]"
            style={{
              background: `linear-gradient(145deg, rgba(255,255,255,0.35) 0%, ${PRIMARY}44 45%, rgba(255,255,255,0.08) 100%)`,
            }}
          >
            <div className="rounded-[2.25rem] bg-gradient-to-b from-slate-900 via-slate-950 to-black p-2 ring-1 ring-white/10">
              <div className="relative overflow-hidden rounded-[1.85rem] bg-[#070d18] aspect-[9/17.5] shadow-inner">
                <Image
                  src={SCREEN_IMG}
                  alt="हिंदी दैनिक राशिफल — ऐप होम स्क्रीन"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 280px, 300px"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 rounded-[1.85rem] ring-1 ring-inset ring-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.15)]" />
                {/* Dynamic island / notch */}
                <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black/85 ring-1 ring-white/10" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
