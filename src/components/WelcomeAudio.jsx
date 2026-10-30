import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import Logo from "../assets/StudioVisualFX.png";
import musicSrc from "../assets/optimized/BackgroundMusic.mp3";
import { markEntered } from "../lib/entrance";
import * as bgAudio from "../lib/bgAudio";
import { track } from "../data/studio";

const ease = [0.16, 1, 0.3, 1];

/*
  Welcome screen shown on every new visit (full page load).
  "Entrance" closes it and starts the background music at a soft 30% volume
  (browsers only allow sound after a click, so the button doubles as consent).
  A round mute/unmute button then sits bottom-left of the site.
*/
export default function WelcomeAudio() {
  const [open, setOpen] = useState(true);
  const [muted, setMuted] = useState(true);
  const enterBtn = useRef(null);

  // keep the button icon in sync with the audio engine
  useEffect(() => bgAudio.subscribe((playing) => setMuted(!playing)), []);

  // start downloading the music while the welcome screen is showing
  useEffect(() => {
    bgAudio.preload(musicSrc);
  }, []);

  const play = () => bgAudio.start(musicSrc); // must run inside the click
  const pause = () => bgAudio.stop();

  const enter = (withSound) => {
    if (withSound) play(); // first, while we are still inside the click
    setOpen(false);
    markEntered();
    track("site_entrance", { sound: withSound ? "on" : "off" });
  };

  const toggle = () => {
    if (muted) play();
    else pause();
    track("sound_toggle", { state: muted ? "unmuted" : "muted" });
  };

  // Lock page scroll while the welcome screen is up; focus the button; Esc = enter silently
  useEffect(() => {
    if (!open) {
      window.lenis?.start();
      document.documentElement.style.overflow = "";
      return;
    }
    window.lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => enterBtn.current?.focus(), 400);
    const onKey = (e) => e.key === "Escape" && enter(false);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Pause when the tab is hidden, resume when the visitor comes back
  useEffect(() => {
    document.addEventListener("visibilitychange", bgAudio.handleVisibility);
    return () => document.removeEventListener("visibilitychange", bgAudio.handleVisibility);
  }, []);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="welcome"
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1, ease } }}
            className="fixed inset-0 z-[10003] flex items-center justify-center bg-black/80 px-6 backdrop-blur-xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease, delay: 0.15 } }}
              exit={{ opacity: 0, scale: 1.06, filter: "blur(6px)", transition: { duration: 0.8, ease } }}
              className="flex w-full max-w-md flex-col items-center text-center text-white"
            >
              <img src={Logo} alt="Studio VisualFX" width="160" height="93" className="mb-8 h-auto w-32 sm:w-40" />

              <p className="mb-3 font-roboto text-[10px] uppercase tracking-[0.4em] text-white/60 sm:text-xs">
                Welcome to
              </p>
              <h2 id="welcome-title" className="mb-3 font-belleza text-4xl sm:text-5xl">
                Studio VisualFX
              </h2>
              <p className="mb-10 font-roboto text-sm text-white/70">We Bring Your Stories to Life!</p>

              <button
                ref={enterBtn}
                type="button"
                onClick={() => enter(true)}
                className="group inline-flex min-h-[52px] cursor-pointer items-center gap-4 rounded-full bg-white py-2 pl-7 pr-2 font-roboto text-sm font-semibold uppercase   text-black transition-all duration-500 hover:bg-black hover:text-white hover:outline hover:outline-white"
              >
                Entrance
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-all duration-500 group-hover:-rotate-45 group-hover:bg-white group-hover:text-black">
                  <FaArrowRight className="text-xs" />
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mute / unmute - bottom left, matches the back-to-top button */}
      {!open && (
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
      )}
    </>
  );
}
