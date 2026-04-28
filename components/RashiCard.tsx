'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';
import type { PublicRashiCard } from '@/types/public-rashi';
import { stripHtmlTags } from '@/lib/plain-text';

interface RashiCardProps {
  rashi: PublicRashiCard;
  index: number;
}

export default function RashiCard({ rashi, index }: RashiCardProps) {
  const imgSrc = rashi.icon?.trim() ? `/${rashi.icon.trim()}` : '/logo.png';
  const blurb = rashi.shortDescription
    ? stripHtmlTags(rashi.shortDescription).slice(0, 220)
    : 'Open for daily, weekly, and monthly Rashifal from our team.';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: Math.min(index * 0.04, 0.35), duration: 0.45 }}
      className="group h-full"
    >
      <Link href={`/rashi/${rashi.id}`} className="block h-full">
        <article
          className="
            relative h-full flex flex-col rounded-2xl overflow-hidden
            bg-white border border-slate-200/90
            shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-4px_rgba(15,23,42,0.06)]
            transition-all duration-300 ease-out
            hover:border-[color-mix(in_srgb,var(--primary)_35%,transparent)]
            hover:shadow-[0_12px_40px_-8px_color-mix(in_srgb,var(--primary)_28%,transparent)]
            hover:-translate-y-0.5
          "
        >
          <div
            className="h-[3px] w-full shrink-0 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-90 group-hover:opacity-100 transition-opacity"
            aria-hidden
          />

          <div className="p-6 pt-5 flex flex-col flex-1 text-center">
            <div className="relative mx-auto mb-5">
              <div
                className="
                  absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  bg-[radial-gradient(circle_at_50%_50%,color-mix(in_srgb,var(--primary)_22%,transparent),transparent_70%)]
                "
              />
              <div
                className="
                  relative w-[5.5rem] h-[5.5rem] mx-auto rounded-full p-[3px]
                  bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_45%,white)] to-[color-mix(in_srgb,var(--primary-light)_25%,white)]
                "
              >
                <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-50 ring-1 ring-slate-100 flex items-center justify-center">
                  <Image
                    src={imgSrc}
                    alt={rashi.name}
                    fill
                    className={
                      rashi.icon?.trim()
                        ? 'object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                        : 'object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]'
                    }
                    sizes="88px"
                  />
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold tracking-tight text-slate-900 mb-1 group-hover:text-[var(--primary)] transition-colors">
              {rashi.name}
            </h3>
            {rashi.nameNepali && (
              <p className="text-xs font-medium text-slate-500 mb-4 tracking-wide">{rashi.nameNepali}</p>
            )}

            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1 mb-5">{blurb}</p>

            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Lucky numbers
              </span>
              <span className="text-sm font-semibold tabular-nums text-[var(--primary)] text-right line-clamp-2">
                {rashi.favoriteNumber?.trim() || '—'}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-center gap-1 text-sm font-medium text-[var(--primary)] opacity-90 group-hover:opacity-100">
              <span>View predictions</span>
              <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
