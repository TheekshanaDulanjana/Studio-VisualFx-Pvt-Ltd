// Background music engine.
//
// Why this is more than `new Audio().play()`:
//  - First visit: the file isn't cached yet. We start downloading it while the
//    welcome screen is showing (preload), so Entrance has data ready.
//  - The play() call must happen synchronously inside the click, otherwise
//    browsers block sound. start() is designed to be called from the click.
//  - iPhone/iPad ignore audio.volume (always 100%). There we route the sound
//    through a Web Audio gain node so 30% really is 30%.
//  - If the browser still refuses or stalls, we retry on the visitor's next
//    tap / key / wheel, which counts as a new user gesture.

const TARGET = 0.3;
const FADE_IN = 1.8; // seconds
const FADE_OUT = 0.5;

let audio = null;
let ctx = null;
let gain = null;
let useGain = false;
let wantPlaying = false;
let fadeRaf = 0;
let retryArmed = false;
const subscribers = new Set();

const notify = () => subscribers.forEach((fn) => fn(wantPlaying));

export function subscribe(fn) {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}

function volumeIsReadOnly(a) {
  const before = a.volume;
  a.volume = 0.5;
  const ro = a.volume !== 0.5;
  a.volume = before;
  return ro;
}

export function preload(src) {
  if (audio || typeof window === "undefined") return;
  audio = new Audio();
  audio.src = src;
  audio.loop = true;
  audio.preload = "auto";
  audio.volume = 0;
  audio.setAttribute("playsinline", "");
  useGain = volumeIsReadOnly(audio);
  try {
    audio.load(); // start downloading now, while the welcome screen is up
  } catch {
    /* ignore */
  }
}

function setLevel(to, seconds, done) {
  cancelAnimationFrame(fadeRaf);
  if (useGain && gain && ctx) {
    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(to, now + seconds);
    if (done) setTimeout(done, seconds * 1000);
    return;
  }
  const from = audio.volume;
  const start = performance.now();
  const step = (t) => {
    const k = Math.min(1, (t - start) / (seconds * 1000));
    audio.volume = Math.max(0, Math.min(1, from + (to - from) * k));
    if (k < 1) fadeRaf = requestAnimationFrame(step);
    else done?.();
  };
  fadeRaf = requestAnimationFrame(step);
}

function ensureGraph() {
  if (!useGain || ctx) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) {
    useGain = false;
    return;
  }
  try {
    ctx = new AC();
    const node = ctx.createMediaElementSource(audio);
    gain = ctx.createGain();
    gain.gain.value = 0;
    node.connect(gain).connect(ctx.destination);
    audio.volume = 1;
  } catch {
    useGain = false;
    ctx = null;
  }
}

function armRetry() {
  if (retryArmed) return;
  retryArmed = true;
  const events = ["pointerdown", "keydown", "touchstart", "wheel"];
  const handler = () => {
    events.forEach((e) => window.removeEventListener(e, handler, true));
    retryArmed = false;
    if (wantPlaying) start();
  };
  events.forEach((e) => window.addEventListener(e, handler, { capture: true, passive: true }));
}

// Call this directly inside a click handler.
export function start(src) {
  if (!audio && src) preload(src);
  if (!audio) return;
  wantPlaying = true;
  notify();

  ensureGraph();
  if (ctx && ctx.state !== "running") ctx.resume().catch(() => {});

  if (!useGain) audio.volume = 0;
  const p = audio.play();

  // Fade in once sound is actually coming out (first visit may still be buffering)
  const fadeIn = () => wantPlaying && setLevel(TARGET, FADE_IN);
  if (audio.readyState >= 3) fadeIn();
  else audio.addEventListener("playing", fadeIn, { once: true });

  if (p && typeof p.catch === "function") {
    p.catch((err) => {
      // AbortError = interrupted by a later pause/play; not a real failure
      if (err && err.name === "AbortError") return;
      armRetry();
    });
  }

  // Stall guard: if nothing is actually playing after a few seconds, retry on next gesture
  setTimeout(() => {
    if (wantPlaying && audio && (audio.paused || (ctx && ctx.state !== "running"))) armRetry();
  }, 4000);
}

export function stop() {
  wantPlaying = false;
  notify();
  if (!audio) return;
  setLevel(0, FADE_OUT, () => {
    if (!wantPlaying) audio.pause();
  });
}

// Tab hidden -> pause; visible again -> resume (only if the visitor wanted music)
export function handleVisibility() {
  if (!audio || !wantPlaying) return;
  if (document.hidden) {
    audio.pause();
  } else {
    if (ctx && ctx.state !== "running") ctx.resume().catch(() => {});
    audio.play().catch(() => armRetry());
  }
}

export const isPlaying = () => wantPlaying;
