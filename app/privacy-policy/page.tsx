import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

const PRIMARY_COLOR = '#4A90E2';
const COSMIC_BG = '#0a1628';

const CONTACT_EMAIL = 'buildwithjitendra@gmail.com';
const CONTACT_PHONE_DISPLAY = '+91 8875831146';
const CONTACT_PHONE_TEL = '+918875831146';

export const metadata: Metadata = {
  title: 'Privacy Policy | गोपनीयता नीति',
  description:
    'Privacy policy for Daily Hindi Rashifal — how we collect, use, and protect your information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <header className="sticky top-0 z-50 border-b border-[color-mix(in_srgb,var(--primary)_22%,transparent)] bg-white/90 backdrop-blur-md shadow-sm">
        <nav className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <Image
              src="/logo.png"
              alt="Daily Hindi Rashifall"
              width={140}
              height={42}
              className="h-8 sm:h-9 w-auto object-contain object-left shrink-0"
              priority
            />
          </Link>
          <Link
            href="/"
            className="shrink-0 text-sm font-semibold text-slate-600 hover:text-[var(--primary)] transition-colors"
          >
            ← मुख पृष्ठ
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <div
          className="border-b border-white/10 py-10 md:py-14 text-white"
          style={{
            background: `linear-gradient(165deg, ${COSMIC_BG} 0%, #132a47 42%, #1e3a5f 100%)`,
          }}
        >
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2">
              Legal
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              गोपनीयता नीति
            </h1>
            <p className="mt-2 text-lg text-slate-300">Privacy Policy</p>
            <p className="mt-4 text-sm text-slate-400">
              Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        <article className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
          <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-li:text-slate-600">
            <section className="mb-10">
              <h2 className="text-xl text-slate-900">1. Introduction</h2>
              <p>
                Daily Hindi Rashifal (“we”, “our”, or “us”) respects your privacy. This Privacy Policy explains how we
                collect, use, disclose, and safeguard information when you use our website and related services. By using
                our services, you agree to this policy.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl text-slate-900">2. Information we collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Account data:</strong> when you register or log in (for example, username and credentials you
                  provide).
                </li>
                <li>
                  <strong>Usage data:</strong> pages viewed, approximate region (via standard server logs), device/browser
                  type, and similar analytics needed to run and improve the site.
                </li>
                <li>
                  <strong>Content you submit:</strong> text or media you send through forms or the admin dashboard,
                  where applicable.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl text-slate-900">3. How we use information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide rashifal content, authentication, and customer support.</li>
                <li>To maintain security, prevent abuse, and comply with legal obligations.</li>
                <li>To improve our products and user experience.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl text-slate-900">4. Cookies & similar technologies</h2>
              <p>
                We may use cookies or local storage for session/login tokens and preferences. You can control cookies
                through your browser settings; disabling them may limit some features.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl text-slate-900">5. Sharing of information</h2>
              <p>
                We do not sell your personal information. We may share data with hosting or infrastructure providers who
                process it on our behalf under appropriate safeguards, or when required by law.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl text-slate-900">6. Data retention & security</h2>
              <p>
                We retain information only as long as needed for the purposes above. We use reasonable technical and
                organisational measures to protect data; no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl text-slate-900">7. Your rights</h2>
              <p>
                Depending on applicable law, you may request access, correction, or deletion of your personal data.
                Contact us using the details below; we will respond within a reasonable time.
              </p>
            </section>

            <section className="mb-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
              <h2 className="text-xl text-slate-900 mt-0">8. Contact us</h2>
              <p className="mb-4">
                For privacy-related questions, requests, or complaints:
              </p>
              <ul className="list-none pl-0 space-y-3">
                <li>
                  <span className="font-semibold text-slate-800">Email: </span>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-medium underline decoration-[color-mix(in_srgb,var(--primary)_40%,transparent)] hover:decoration-[var(--primary)]"
                    style={{ color: PRIMARY_COLOR }}
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <span className="font-semibold text-slate-800">Phone: </span>
                  <a
                    href={`tel:${CONTACT_PHONE_TEL}`}
                    className="font-medium underline decoration-[color-mix(in_srgb,var(--primary)_40%,transparent)] hover:decoration-[var(--primary)]"
                    style={{ color: PRIMARY_COLOR }}
                  >
                    {CONTACT_PHONE_DISPLAY}
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl text-slate-900">9. Changes</h2>
              <p>
                We may update this Privacy Policy from time to time. The “Last updated” date at the top will change when
                we do; continued use of the service after changes means you accept the revised policy.
              </p>
            </section>
          </div>
        </article>
      </main>

      <footer className="mt-auto border-t border-white/10 py-8 text-center text-slate-400 text-sm" style={{ backgroundColor: COSMIC_BG }}>
        <div className="container mx-auto px-4">
          <Link href="/privacy-policy" className="text-slate-300 hover:text-white transition-colors">
            गोपनीयता नीति
          </Link>
          <span className="mx-3 text-slate-600">·</span>
          <span>© {new Date().getFullYear()} Daily Hindi Rashifall</span>
        </div>
      </footer>
    </div>
  );
}
