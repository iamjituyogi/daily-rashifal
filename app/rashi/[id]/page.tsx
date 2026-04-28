'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaArrowLeft,
  FaPalette,
  FaHashtag,
  FaSun,
  FaCalendarWeek,
  FaCalendarAlt,
  FaHeart,
  FaBookOpen,
} from 'react-icons/fa';
import HtmlContent from '@/components/HtmlContent';
import ColorSwatches from '@/components/ColorSwatches';
import { stripHtmlTags } from '@/lib/plain-text';

const PRIMARY_COLOR = '#4A90E2';
const PRIMARY_COLOR_LIGHT = '#6BB6FF';
const COSMIC_BG = '#0a1628';

type TabId = 'daily' | 'weekly' | 'prem' | 'monthly';

const TABS: { id: TabId; label: string; icon: typeof FaSun }[] = [
  { id: 'daily', label: 'दैनिक', icon: FaSun },
  { id: 'weekly', label: 'साप्ताहिक', icon: FaCalendarWeek },
  { id: 'prem', label: 'साप्ताहिक प्रेम', icon: FaHeart },
  { id: 'monthly', label: 'मासिक', icon: FaCalendarAlt },
];

type PublicRashiPayload = {
  id: string;
  name: string;
  nameNepali: string | null;
  icon: string | null;
  shortDescription: string | null;
  description: string | null;
};

type PublicDetailPayload = {
  dailyRashifal: string;
  weeklyRashifal: string;
  saptahikPrem: string | null;
  monthlyRashifal: string;
  upay: string;
  favoriteColor: string;
  favoriteNumber: string;
};

function looksLikeHtml(s: string) {
  return /<[a-z][\s\S]*>/i.test(s);
}

export default function RashiDetailPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : params.id?.[0] ?? '';
  const [activeTab, setActiveTab] = useState<TabId>('daily');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rashi, setRashi] = useState<PublicRashiPayload | null>(null);
  const [detail, setDetail] = useState<PublicDetailPayload | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/public/rashi/${id}`);
        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.error || 'Not found');
        }
        if (!cancelled) {
          setRashi(json.data.rashi);
          setDetail(json.data.detail);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setRashi(null);
          setDetail(null);
          setError(e instanceof Error ? e.message : 'Failed to load');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"
          style={{ borderColor: PRIMARY_COLOR, borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  if (error || !rashi) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
        <div className="text-center rounded-2xl border border-slate-200 bg-white p-10 shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">राशि नहीं मिली</h2>
          <p className="text-slate-600 mb-8">{error || 'यह राशि उपलब्ध नहीं है।'}</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-white font-semibold shadow-md transition hover:brightness-105"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            मुख पृष्ठ पर जाएँ
          </Link>
        </div>
      </div>
    );
  }

  const imgSrc = rashi.icon?.trim() ? `/${rashi.icon.trim()}` : '/logo.png';
  const heroBlurb = rashi.shortDescription
    ? looksLikeHtml(rashi.shortDescription)
      ? null
      : stripHtmlTags(rashi.shortDescription)
    : null;

  const tabHtml: Record<TabId, string | null> = {
    daily: detail?.dailyRashifal ?? null,
    weekly: detail?.weeklyRashifal ?? null,
    prem: detail?.saptahikPrem ?? null,
    monthly: detail?.monthlyRashifal ?? null,
  };

  const activeHtml = tabHtml[activeTab];
  const emptyMsg =
    'जब आपकी टीम डैशबोर्ड में सामग्री प्रकाशित करेगी तो यहाँ विवरण दिखाई देगा।';

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col">
      <header className="sticky top-0 z-50 border-b border-[color-mix(in_srgb,var(--primary)_22%,transparent)] bg-white/90 backdrop-blur-md shadow-sm">
        <nav className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-600 hover:text-[var(--primary)] font-medium text-sm transition-colors shrink-0"
            >
              <FaArrowLeft className="text-[0.85rem]" />
              <span className="hidden sm:inline">सभी राशियाँ</span>
            </Link>
            <Link href="/" className="flex items-center gap-2 min-w-0">
              <Image
                src="/logo.png"
                alt="RashiNow"
                width={140}
                height={42}
                className="h-7 sm:h-9 w-auto max-w-[120px] sm:max-w-none object-contain object-left"
                priority
              />
            </Link>
          </div>

          <Link
            href="/login"
            className="shrink-0 px-4 md:px-5 py-2 rounded-lg font-semibold text-sm text-white shadow-md hover:shadow-lg transition-all hover:brightness-105"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            लॉग इन
          </Link>
        </nav>
      </header>

      <main className="flex-1">
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
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(10,22,40,0.88)_100%)]" />

          <div className="container relative mx-auto px-4 py-12 md:py-16 lg:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-4">
                वैदिक राशि
              </p>

              <div className="relative inline-block mb-8">
                <div
                  className="absolute -inset-3 rounded-full opacity-50 blur-2xl"
                  style={{ background: `color-mix(in srgb, ${PRIMARY_COLOR} 45%, transparent)` }}
                />
                <div className="relative mx-auto w-36 h-36 md:w-44 md:h-44 rounded-full p-[4px] bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_50%,white)] to-[color-mix(in_srgb,var(--primary-light)_30%,white)]">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-900/20 ring-1 ring-white/20 flex items-center justify-center">
                    <Image
                      src={imgSrc}
                      alt={rashi.name}
                      fill
                      className={
                        rashi.icon?.trim()
                          ? 'object-cover'
                          : 'object-contain p-6 scale-90'
                      }
                      priority
                      sizes="176px"
                    />
                  </div>
                </div>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-3"
              >
                {rashi.name}
              </motion.h1>
              {rashi.nameNepali && (
                <p className="text-xl md:text-2xl font-medium mb-6" style={{ color: PRIMARY_COLOR_LIGHT }}>
                  {rashi.nameNepali}
                </p>
              )}
              <div className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed border-t border-white/10 pt-8">
                {rashi.shortDescription ? (
                  looksLikeHtml(rashi.shortDescription) ? (
                    <div className="text-left prose-headings:text-white prose-p:text-slate-300">
                      <HtmlContent html={rashi.shortDescription} className="!text-slate-300 [&_h2]:!text-white [&_h3]:!text-white" />
                    </div>
                  ) : (
                    <p>{heroBlurb}</p>
                  )
                ) : (
                  <p>पूरा राशिफल पढ़ने के लिए नीचे कोई भी अवधि टैब चुनें।</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="relative -mt-10 md:-mt-12 z-10 pb-16 md:pb-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-12">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 md:p-7 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)]"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-md"
                    style={{ backgroundColor: PRIMARY_COLOR }}
                  >
                    <FaPalette className="text-lg" aria-hidden />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">पसंदीदा रंग</h2>
                    <p className="text-sm text-slate-500 mt-0.5">राशिफल विवरण से</p>
                  </div>
                </div>
                {detail?.favoriteColor?.trim() ? (
                  <ColorSwatches value={detail.favoriteColor} />
                ) : (
                  <p className="text-slate-500 text-sm">—</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-2xl border border-slate-200/90 bg-white p-6 md:p-7 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)]"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-md"
                    style={{ backgroundColor: PRIMARY_COLOR }}
                  >
                    <FaHashtag className="text-lg" aria-hidden />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">भाग्यशाली संख्याएँ</h2>
                    <p className="text-sm text-slate-500 mt-0.5">इस राशि के लिए प्रकाशित</p>
                  </div>
                </div>
                <p
                  className="text-2xl md:text-3xl font-bold tracking-tight break-words"
                  style={{ color: PRIMARY_COLOR }}
                >
                  {detail?.favoriteNumber?.trim() || '—'}
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl border border-slate-200/90 bg-white shadow-[0_20px_50px_-24px_rgba(15,23,42,0.15)] overflow-hidden"
            >
              <div
                className="h-1 w-full bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-90"
                aria-hidden
              />

              <div className="p-6 md:p-10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)] mb-2">
                      राशिफल
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                      {rashi.name} — राशिफल भविष्यवाणी
                    </h2>
                    <p className="text-slate-600 mt-2 max-w-xl text-sm md:text-base">
                      दैनिक, साप्ताहिक, प्रेम व मासिक विवरण आपके प्रशासन डैशबोर्ड से प्रबंधित होते हैं।
                    </p>
                  </div>
                </div>

                {!detail ? (
                  <p className="rounded-2xl bg-amber-50 border border-amber-100 px-4 py-4 text-amber-900 text-sm">
                    इस राशि का विस्तृत राशिफल अभी प्रकाशित नहीं है। कृपया डैशबोर्ड में{' '}
                    <strong>राशि विवरण</strong> जोड़ें।
                  </p>
                ) : (
                  <>
                    <div
                      role="tablist"
                      aria-label="राशिफल अवधि"
                      className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/80 mb-8"
                    >
                      {TABS.map(({ id: tabId, label, icon: Icon }) => {
                        const selected = activeTab === tabId;
                        return (
                          <button
                            key={tabId}
                            type="button"
                            role="tab"
                            aria-selected={selected}
                            id={`tab-${tabId}`}
                            aria-controls={`panel-${tabId}`}
                            onClick={() => setActiveTab(tabId)}
                            className={`
                          relative flex flex-1 min-w-[calc(50%-4px)] sm:min-w-0 sm:flex-none items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200
                          ${selected ? 'text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'}
                        `}
                            style={
                              selected
                                ? {
                                    backgroundColor: PRIMARY_COLOR,
                                    boxShadow: `0 8px 24px -6px ${PRIMARY_COLOR}66`,
                                  }
                                : undefined
                            }
                          >
                            <Icon className="text-[0.95rem] opacity-90" aria-hidden />
                            {label}
                          </button>
                        );
                      })}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        role="tabpanel"
                        id={`panel-${activeTab}`}
                        aria-labelledby={`tab-${activeTab}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-2xl bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_6%,white)] to-slate-50/80 border border-slate-100 px-6 py-8 md:px-10 md:py-10 min-h-[200px]"
                      >
                        {activeHtml?.trim() ? (
                          <HtmlContent html={activeHtml} />
                        ) : (
                          <p className="text-slate-600">{emptyMsg}</p>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </>
                )}
              </div>
            </motion.div>

            {detail?.upay?.trim() && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-10 md:mt-12 rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm"
              >
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--primary)_12%,white)] text-lg" aria-hidden>
                    🕉
                  </span>
                  उपाय
                </h2>
                <HtmlContent html={detail.upay} />
              </motion.section>
            )}

            {rashi.description?.trim() && (
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-10 md:mt-14 rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm"
              >
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--primary)_12%,white)]">
                    <FaBookOpen className="text-[var(--primary)]" aria-hidden />
                  </span>
                  इस राशि के बारे में
                </h2>
                {looksLikeHtml(rashi.description) ? (
                  <HtmlContent html={rashi.description} />
                ) : (
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed whitespace-pre-line">
                    {rashi.description}
                  </p>
                )}
              </motion.article>
            )}
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-slate-200/80 py-10" style={{ backgroundColor: COSMIC_BG }}>
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/" className="rounded-lg bg-white/10 p-2 ring-1 ring-white/15">
            <Image src="/logo.png" alt="RashiNow" width={120} height={36} className="h-8 w-auto object-contain" />
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link href="/privacy-policy" className="text-slate-300 hover:text-white transition-colors">
              गोपनीयता नीति
            </Link>
            <span className="hidden sm:inline text-slate-600">|</span>
            <p className="text-slate-400">
              राशिनाउ © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
