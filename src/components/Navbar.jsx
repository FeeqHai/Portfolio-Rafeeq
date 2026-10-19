import { Link, useLocation } from "react-router-dom";
import { Menu, X, Volume2, VolumeX, Pause, Play } from "lucide-react";
import { useRef, useState } from "react";
import { usePreferences } from "../hooks/usePreferences";
const links = [["work", "Work"], ["experience", "Experience"], ["about", "About"]];
export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);
  const { sound, toggleSound, motion, togglePaused, paused, reduced } = usePreferences();
  function close() { setOpen(false); }
  return <header className="site-header" onKeyDown={(event) => {
    if (event.key === "Escape") { close(); toggle.current?.focus(); }
  }}>
    <div className="nav-inner">
      <Link to="/" className="brand" aria-label="Rafeeq Haiqal — home" onClick={close}>
        <span className="monogram">RH</span><span>RAFEEQ HAIQAL</span>
      </Link>
      <nav aria-label="Main navigation" className={open ? "main-nav is-open" : "main-nav"} id="main-nav">
        {links.map(([id, label]) => <Link key={id} to={`/#${id}`} onClick={close} className={location.hash === `#${id}` || location.pathname === `/${id === "work" ? "projects" : id}` ? "active" : ""}>{label}</Link>)}
        <Link to="/resume" onClick={close} aria-current={location.pathname === "/resume" ? "page" : undefined}>Resume</Link>
      </nav>
      <div className="nav-controls">
        <button className="sound-toggle" data-sound-toggle onClick={toggleSound} aria-pressed={sound} aria-label={sound ? "Turn sound off" : "Turn sound on"}>
          {sound ? <Volume2 size={17} /> : <VolumeX size={17} />}<span>Sound {sound ? "on" : "off"}</span>
        </button>
        <button className="icon-button motion-toggle" onClick={togglePaused} disabled={reduced} aria-pressed={paused || reduced} aria-label={reduced ? "Reduced motion enabled" : motion ? "Pause motion" : "Resume motion"} title={reduced ? "Reduced motion enabled" : motion ? "Pause motion" : "Resume motion"}>{motion ? <Pause size={15} /> : <Play size={15} />}</button>
        <button ref={toggle} className="icon-button menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
    </div>
  </header>;
}
