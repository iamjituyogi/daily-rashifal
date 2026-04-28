'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FaSignOutAlt, FaUser, FaChevronRight } from 'react-icons/fa';

const PRIMARY = '#4A90E2';
const PRIMARY_LIGHT = '#6BB6FF';
const COSMIC_BG = '#0a1628';

const nav = [
  { href: '/dashboard/rashi', label: 'Rashi' },
  { href: '/dashboard/rashi-detail', label: 'Rashi detail' },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
      return;
    }
    try {
      const raw = localStorage.getItem('user');
      if (raw) {
        const u = JSON.parse(raw) as { username?: string };
        setUsername(u.username ?? null);
      }
    } catch {
      setUsername(null);
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.replace('/login');
  };

  const NavLinks = ({ mobile }: { mobile?: boolean }) => (
    <nav className={mobile ? 'flex md:hidden gap-2 overflow-x-auto pb-3 -mb-px px-4 border-b border-white/10' : 'hidden md:flex flex-col gap-1 px-3 py-6'}>
      {nav.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors
              ${mobile ? 'whitespace-nowrap shrink-0 rounded-lg px-4 py-2' : ''}
              ${
                active
                  ? mobile
                    ? 'text-white shadow-md'
                    : 'bg-white/10 text-white border border-white/15'
                  : mobile
                    ? 'text-slate-400 hover:text-white bg-white/5'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }
            `}
            style={active && mobile ? { backgroundColor: PRIMARY } : undefined}
          >
            <span className={mobile ? '' : 'flex-1 text-left'}>{item.label}</span>
            {!mobile && (
              <FaChevronRight
                className={`text-[10px] shrink-0 ${active ? 'text-white/70' : 'opacity-0'}`}
                aria-hidden
              />
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen flex bg-[var(--background)]">
      <aside
        className="hidden md:flex w-64 shrink-0 flex-col border-r border-white/10"
        style={{ backgroundColor: COSMIC_BG }}
      >
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="rounded-lg bg-white/10 p-1.5 ring-1 ring-white/15">
              <Image src="/logo.png" alt="RashiNow" width={120} height={36} className="h-8 w-auto object-contain" />
            </div>
          </Link>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em]" style={{ color: PRIMARY_LIGHT }}>
            Admin
          </p>
        </div>
        <NavLinks />
        <div className="mt-auto p-4 text-xs text-slate-500 border-t border-white/10">
          RashiNow dashboard
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header
          className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md"
          style={{ boxShadow: '0 1px 0 color-mix(in srgb, var(--primary) 12%, transparent)' }}
        >
          <div className="flex items-center justify-between gap-4 px-4 md:px-8 py-3 md:py-4">
            <div className="flex items-center gap-3 min-w-0 md:hidden">
              <div className="rounded-md bg-[var(--primary)]/10 p-1.5">
                <Image src="/logo.png" alt="" width={100} height={28} className="h-7 w-auto object-contain" />
              </div>
            </div>
            <h1 className="hidden md:block text-lg font-semibold text-slate-800 truncate">
              Dashboard
            </h1>
            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
              <div
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 max-w-[200px]"
                title={username ?? 'Profile'}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: PRIMARY }}
                >
                  <FaUser className="text-sm" aria-hidden />
                </span>
                <span className="truncate font-medium">{username ?? 'Admin'}</span>
              </div>
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 transition-colors"
              >
                <FaSignOutAlt aria-hidden />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
          <NavLinks mobile />
        </header>

        <main className="flex-1 p-4 md:p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
