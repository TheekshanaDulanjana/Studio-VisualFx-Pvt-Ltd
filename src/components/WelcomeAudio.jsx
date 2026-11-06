import React, { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import musicSrc from "../assets/optimized/BackgroundMusic.mp3";
import { markEntered } from "../lib/entrance";
import * as bgAudio from "../lib/bgAudio";
import { track } from "../data/studio";

/*
  Welcome screen + background music.

  The welcome screen itself is plain HTML in index.html (#welcome-static), so
  it appears instantly - before any JavaScript has loaded. That keeps the
  first paint very fast (PageSpeed / Core Web Vitals). This component just
  wires it up:
    - "Entrance" closes it and starts the music at a soft 30% volume
      (browsers only allow sound after a click, so the button is the consent)
    - Esc closes it without sound
    - afterwards a round mute/unmute button sits bottom-left of the site
  To change the welcome text/design, edit #welcome-static in index.html.
*/
export default function WelcomeAudio() {
  // already closed if the visitor tapped Entrance before the scripts finished loading
  const [open, setOpen] = useState(
    () => !window.__svfxEnter && !!document.getElementById("welcome-static")
  );
  const [muted, setMuted] = useState(true);

  // keep the button icon in sync with the audio engine
  useEffect(() => bgAudio.subscribe((playing) => setMuted(!playing)), []);

  // Start downloading the music once the page itself has finished loading
  // (so it never competes with the first paint), while the welcome screen
  // is still up - by the time Entrance is tapped the music is ready.
  useEffect(() => {
    let idle;
    const go = () => {
      const ric = window.requestIdleCallback || ((fn) => setTimeout(fn, 1200));
      idle = ric(() => bgAudio.preload(musicSrc));
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      (window.cancelIdleCallback || clearTimeout)(idle);
    };
  }, []);

  // Wire up the plain-HTML welcome screen
  useEffect(() => {
    const el = document.getElementById("welcome-static");
    if (!el) {
      markEntered();
      return;
    }

    const close = () => {
      el.classList.add("is-leaving");
      setTimeout(() => el.remove(), 900);
    };

    const enter = (withSound) => {
      if (withSound) bgAudio.start(musicSrc); // first, while still inside the click
      close();
      setOpen(false);
      markEntered();
      track("site_entrance", { sound: withSound ? "on" : "off" });
    };

    // Tapped before React loaded: honour it (the next tap starts music if this one is too late)
    if (window.__svfxEnter) {
      bgAudio.start(musicSrc);
      close();
      markEntered();
      track("site_entrance", { sound: "on", early: true });
      return;
    }

    const btn = el.querySelector("[data-enter]");
    const onClick = () => enter(true);
    const onKey = (e) => e.key === "Escape" && enter(false);
    btn?.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    btn?.focus({ preventScroll: true });

    return () => {
      btn?.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Lock page scroll while the welcome screen is up
  useEffect(() => {
    if (!open) {
      window.lenis?.start();
      document.documentElement.style.overflow = "";
      return;
    }
    window.lenis?.stop();
    document.documentElement.style.overflow = "hidden";
  }, [open]);

  // Pause when the tab is hidden, resume when the visitor comes back
  useEffect(() => {
    document.addEventListener("visibilitychange", bgAudio.handleVisibility);
    return () => document.removeEventListener("visibilitychange", bgAudio.handleVisibility);
  }, []);

  const toggle = () => {
    if (muted) bgAudio.start(musicSrc);
    else bgAudio.stop();
    track("sound_toggle", { state: muted ? "unmuted" : "muted" });
  };

  if (open) return null;

  // Mute / unmute - bottom left, matches the back-to-top button
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={muted ? "Play background music" : "Mute background music"}
      aria-pressed={!muted}
      title={muted ? "Sound on" : "Sound off"}
      className="fixed bottom-6 left-4 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow-xl transition-all duration-300 hover:scale-110 md:bottom-8 md:left-10"
    >
      {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
    </button>
  );
}
