import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Preferences from "./Preferences";
import InvertCursor from "./InvertCursor";
function ScrollToRoute() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "instant" });
      else window.scrollTo({ top: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}
export default function Layout() {
  const { pathname } = useLocation();
  return <Preferences><div className="portfolio-shell">
    <a className="skip-link" href="#main-content" onClick={(event) => { event.preventDefault(); document.getElementById("main-content")?.focus(); }}>Skip to content</a>
    <ScrollToRoute />
    <Navbar key={pathname} />
    <main id="main-content" tabIndex={-1}><Outlet /></main>
    <Footer />
    <InvertCursor />
  </div></Preferences>;
}
