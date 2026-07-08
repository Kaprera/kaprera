"use client";

import { useLinkStatus } from "next/link";

/**
 * Tiny spinner that appears inside a <Link> while its navigation is pending —
 * the only feedback a slow connection gets before the next page's payload
 * arrives (loading.tsx fallbacks travel with the prefetch, so they can't help).
 * Must be rendered as a child of the Link it reports on.
 */
export function LinkPending() {
  const { pending } = useLinkStatus();
  if (!pending) return null;
  return (
    <span
      role="status"
      aria-label="loading"
      className="ms-1.5 inline-block size-3 animate-spin rounded-full border-2 border-current border-t-transparent align-middle opacity-70 motion-reduce:animate-pulse"
    />
  );
}
