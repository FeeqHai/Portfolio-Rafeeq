import { useEffect, useState } from "react";
import { usePreferences } from "../hooks/usePreferences";
function alreadySeen() {
  try { return sessionStorage.getItem("portfolio:intro") === "seen"; } catch { return false; }
}
export default function Intro() {
  const { motion } = usePreferences();
  const [seen, setSeen] = useState(alreadySeen);
  useEffect(() => {
    if (seen) return;
    const timer = setTimeout(() => setSeen(true), 1150);
    try { sessionStorage.setItem("portfolio:intro", "seen"); } catch { /* Optional. */ }
    return () => clearTimeout(timer);
  }, [seen]);
  if (seen || !motion) return null;
  return <div className="intro-screen">
    <div className="intro-name"><span>RAFEEQ HAIQAL</span><span className="intro-rule" /><span>PORTFOLIO / 2026</span></div>
    <button className="intro-skip" onClick={() => setSeen(true)}>Skip intro</button>
  </div>;
}
