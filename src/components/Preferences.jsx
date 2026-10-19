import { useEffect, useRef, useState } from "react";
import { PreferencesContext } from "../hooks/usePreferences";
import useMediaQuery from "../hooks/useMediaQuery";
function readPreference(key) {
  try { return localStorage.getItem(key) === "true"; } catch { return false; }
}
export default function Preferences({ children }) {
  const [sound, setSound] = useState(() => readPreference("portfolio:sound"));
  const [paused, setPaused] = useState(() => readPreference("portfolio:paused"));
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const audioRef = useRef(null);
  const lastHover = useRef(0);
  useEffect(() => {
    try {
      localStorage.setItem("portfolio:sound", String(sound));
      localStorage.setItem("portfolio:paused", String(paused));
    } catch { /* In-memory settings still work with blocked storage. */ }
  }, [sound, paused]);
  useEffect(() => () => { audioRef.current?.close().catch(() => {}); audioRef.current = null; }, []);
  function playSound(kind, force = false) {
    if (!sound && !force) return;
    if (kind === "hover" && performance.now() - lastHover.current < 100) return;
    if (kind === "hover") lastHover.current = performance.now();
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    try {
      // Only an explicit click unlocks audio; restoring a preference never autoplays.
      if (!audioRef.current && kind === "hover") return;
      const context = audioRef.current || (audioRef.current = new Audio());
      if (context.state === "suspended") {
        if (kind === "hover") return;
        context.resume().catch(() => {});
      }
      const oscillator = context.createOscillator(), gain = context.createGain();
      const now = context.currentTime;
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(kind === "hover" ? 680 : 420, now);
      oscillator.frequency.exponentialRampToValueAtTime(220, now + 0.065);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(kind === "hover" ? 0.018 : 0.035, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);
      oscillator.connect(gain); gain.connect(context.destination);
      oscillator.start(); oscillator.stop(now + 0.08);
      oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
    } catch { /* Audio must never interrupt navigation. */ }
  }
  function toggleSound() {
    if (!sound) playSound("click", true);
    setSound(!sound);
  }
  return <PreferencesContext.Provider value={{ sound, toggleSound, paused, togglePaused: () => setPaused(!paused), motion: !reduced && !paused, reduced }}>
    <div data-motion={!reduced && !paused} onPointerOver={(event) => {
      const control = event.target.closest("a,button,summary");
      if (control && !control.contains(event.relatedTarget)) playSound("hover");
    }} onClick={(event) => {
      if (event.target.closest("a,button,summary") && !event.target.closest("[data-sound-toggle]")) playSound("click");
    }}>{children}</div>
  </PreferencesContext.Provider>;
}
