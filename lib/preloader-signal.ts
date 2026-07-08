// Tiny pub/sub so the hero typewriter starts only once the intro preloader has
// cleared (or was skipped for repeat views), without coupling the components.
let done = false;
const listeners = new Set<() => void>();

export function markPreloaderDone(): void {
  if (done) return;
  done = true;
  listeners.forEach((listener) => listener());
  listeners.clear();
}

export function onPreloaderDone(callback: () => void): () => void {
  if (done) {
    // defer so subscribers can safely set state from inside effects
    queueMicrotask(callback);
    return () => {};
  }
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}
