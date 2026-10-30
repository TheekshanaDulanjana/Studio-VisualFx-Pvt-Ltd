// Tiny shared flag: has the visitor passed the welcome screen yet?
// The hero intro waits for it so the animation isn't hidden behind the popup.
let entered = false;
const listeners = new Set();

export const hasEntered = () => entered;

export function markEntered() {
  if (entered) return;
  entered = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

// Runs `fn` once the visitor has entered (immediately if they already have).
// Returns an unsubscribe function.
export function onEntered(fn) {
  if (entered) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}
