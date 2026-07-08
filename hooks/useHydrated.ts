"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * False during SSR and the first client render, true once hydrated.
 * Lets entrance animations hide content only after the JS has actually
 * arrived — on slow connections the server HTML stays visible.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
