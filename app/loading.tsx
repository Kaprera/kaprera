/** Route-transition fallback: branded pulse while a slow connection fetches the page. */
export default function Loading() {
  return (
    <div role="status" aria-label="loading" className="grid min-h-svh place-items-center bg-surface">
      <div className="flex flex-col items-center gap-4">
        <span aria-hidden className="hero-mark-mask block aspect-[913/793] w-12 animate-pulse" />
        <span className="font-mono text-[13px] lowercase text-muted">loading…</span>
      </div>
    </div>
  );
}
