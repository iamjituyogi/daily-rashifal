'use client';

/**
 * Renders trusted admin CMS HTML (TipTap output). Avoid passing untrusted user HTML.
 */
export default function HtmlContent({
  html,
  className = '',
}: {
  html: string;
  className?: string;
}) {
  if (!html?.trim()) {
    return null;
  }
  return (
    <div
      className={`rich-html text-slate-700 text-base md:text-lg leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-4 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-900 [&_p]:my-3 [&_ul]:my-3 [&_ol]:my-3 [&_li]:my-1 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_strong]:font-semibold [&_a]:text-[var(--primary)] [&_a]:underline ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
