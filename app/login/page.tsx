'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const COSMIC_BG = '#0a1628';
const DEEP_PANEL = '#060d18';
const ACCENT_LINE = '#3b82f6';
const PRIMARY = '#4A90E2';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/dashboard');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left — brand (matches app identity) */}
      <div
        className="relative flex flex-1 flex-col justify-center px-8 py-14 lg:px-14 lg:py-16 overflow-hidden text-white"
        style={{
          background: `linear-gradient(165deg, ${DEEP_PANEL} 0%, ${COSMIC_BG} 38%, #132a47 100%)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 20% 10%, rgba(59,130,246,0.25), transparent 55%), radial-gradient(ellipse 60% 50% at 80% 90%, rgba(74,144,226,0.15), transparent 50%)',
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.03)_0%,transparent_45%)]" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative z-10 mx-auto w-full max-w-lg text-center lg:text-left"
        >
          <Link href="/" className="inline-flex rounded-2xl bg-white/5 p-3 ring-1 ring-white/15 backdrop-blur-sm mb-10 shadow-[0_0_40px_-10px_rgba(59,130,246,0.35)]">
            <Image
              src="/logo.png"
              alt="हिंदी दैनिक राशिफल"
              width={180}
              height={54}
              className="h-14 w-auto object-contain md:h-16"
              priority
            />
          </Link>

          <h1 className="text-3xl md:text-4xl lg:text-[2.35rem] font-bold tracking-tight leading-tight mb-4">
            हिंदी दैनिक राशिफल
          </h1>
          <p className="text-lg md:text-xl font-medium text-slate-300 mb-3 leading-relaxed">
            दैनिक, साप्ताहिक व मासिक राशिफल — हिंदी में
          </p>
          <div
            className="mx-auto lg:mx-0 h-px w-24 rounded-full mb-6"
            style={{
              background: `linear-gradient(90deg, transparent, ${ACCENT_LINE}, transparent)`,
              boxShadow: `0 0 20px ${ACCENT_LINE}66`,
            }}
          />
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md mx-auto lg:mx-0">
            प्रबंधक क्षेत्र में प्रवेश करें। राशिफल सामग्री और सेटिंग्स को अपडेट करने के लिए अपना खाता उपयोग करें।
          </p>

          <Link
            href="/"
            className="inline-flex mt-10 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            ← मुख पृष्ठ पर लौटें
          </Link>
        </motion.div>
      </div>

      {/* Right — form */}
      <div
        className="relative flex flex-1 items-center justify-center px-6 py-12 lg:px-12 lg:py-16 min-h-[50vh]"
        style={{
          background: `linear-gradient(180deg, #0f172a 0%, ${COSMIC_BG} 45%, #0c1424 100%)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.12), transparent 60%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative z-10 w-full max-w-md"
        >
          <div
            className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 md:p-10 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.06)]"
            style={{
              boxShadow: `0 24px 80px -24px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(59,130,246,0.08)`,
            }}
          >
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-2">
                Admin
              </p>
              <h2 className="text-2xl font-bold text-white tracking-tight">लॉग इन</h2>
              <p className="text-slate-400 text-sm mt-1">अपना उपयोगकर्ता नाम और पासवर्ड दर्ज करें</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                  उपयोगकर्ता नाम
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white placeholder:text-slate-500 outline-none transition focus:border-[color-mix(in_srgb,var(--primary)_55%,transparent)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_25%,transparent)]"
                  placeholder="Username"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  पासवर्ड
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white placeholder:text-slate-500 outline-none transition focus:border-[color-mix(in_srgb,var(--primary)_55%,transparent)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_25%,transparent)]"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl py-3.5 font-semibold text-white shadow-lg transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: PRIMARY,
                  boxShadow: `0 12px 40px -12px ${PRIMARY}aa`,
                }}
              >
                {loading ? 'प्रतीक्षा करें…' : 'लॉग इन करें'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
