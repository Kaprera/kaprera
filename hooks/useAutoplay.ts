"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function useDocumentHidden(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      document.addEventListener("visibilitychange", onChange);
      return () => document.removeEventListener("visibilitychange", onChange);
    },
    () => document.hidden,
    () => false,
  );
}

interface Autoplay {
  /** True while autoplay is suspended (keyboard focus inside, hover, or hidden tab). */
  paused: boolean;
  /** Bumps on every manual navigation — restart timers and dot-fill animations off it. */
  epoch: number;
  reset: () => void;
  pause: () => void;
  resume: () => void;
}

/**
 * Shared autoplay engine for the three sliders: ticks every `intervalMs`,
 * pauses while the tab is hidden or `pause()` is held (focus/hover), and
 * restarts cleanly when `reset()` is called after manual navigation.
 * `reset()` also releases an interaction pause — clicking an arrow/dot focuses
 * it, and without this the slider would stay frozen until focus left it.
 */
export function useAutoplay(intervalMs: number, onAdvance: () => void, enabled = true): Autoplay {
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const hidden = useDocumentHidden();

  const advanceRef = useRef(onAdvance);
  useEffect(() => {
    advanceRef.current = onAdvance;
  });

  const paused = interactionPaused || hidden;
  const active = enabled && !paused;

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => advanceRef.current(), intervalMs);
    return () => clearInterval(id);
  }, [active, intervalMs, epoch]);

  const reset = useCallback(() => {
    setInteractionPaused(false);
    setEpoch((value) => value + 1);
  }, []);
  const pause = useCallback(() => setInteractionPaused(true), []);
  const resume = useCallback(() => setInteractionPaused(false), []);

  return { paused, epoch, reset, pause, resume };
}
