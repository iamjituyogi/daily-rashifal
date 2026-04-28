'use client';

/** Split admin “favourite colour” text on commas, semicolons, slashes, और / and. */
export function splitColorParts(raw: string): string[] {
  const s = raw.trim();
  if (!s) return [];
  const parts = s
    .split(/\s*(?:[,;，|／/]|(?:\s+और\s+)|(?:\s+and\s+))\s*/i)
    .map((p) => p.trim())
    .filter(Boolean);
  return [...new Set(parts)];
}

function isHexColor(p: string): boolean {
  return /^#([0-9a-f]{3}|[0-9a-f]{8}|[0-9a-f]{6})$/i.test(p.trim());
}

function isCssColorFunction(p: string): boolean {
  return /^(rgb|rgba|hsl|hsla)\(/i.test(p.trim());
}

/** True if we should only show a label (not use string as CSS color). */
function isLikelyNonCssLabel(p: string): boolean {
  return /[\u0900-\u097F]/.test(p);
}

export default function ColorSwatches({ value }: { value: string }) {
  const parts = splitColorParts(value);
  if (parts.length === 0) {
    return <p className="text-slate-500 text-sm">—</p>;
  }

  return (
    <div className="flex flex-wrap items-stretch gap-3">
      {parts.map((p, i) => {
        const hex = isHexColor(p);
        const fn = isCssColorFunction(p);
        const devanagari = isLikelyNonCssLabel(p);
        const cssDirect = hex || fn;
        const tryNamedOrPhrase =
          !cssDirect && !devanagari && p.length > 0 && p.length < 80;

        return (
          <div
            key={`${p}-${i}`}
            className="flex min-w-0 max-w-full items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
          >
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 shadow-inner">
              {cssDirect || tryNamedOrPhrase ? (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: p.trim(),
                  }}
                  title={p}
                />
              ) : (
                <span
                  className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-500"
                  aria-hidden
                >
                  ◆
                </span>
              )}
            </div>
            <span className="min-w-0 break-words font-mono text-sm font-semibold leading-snug text-slate-800">
              {p}
            </span>
          </div>
        );
      })}
    </div>
  );
}
