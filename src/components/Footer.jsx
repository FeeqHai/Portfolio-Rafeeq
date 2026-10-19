import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { social } from "../data/portfolio";
export default function Footer() {
  return <footer className="site-footer page-width" id="contact">
    <div className="contact-row"><h2>Let’s build something useful.</h2><div className="button-row">
      <a className="button button-primary" href={`mailto:${social.email}`}>Email me <ArrowUpRight size={17} /></a>
      <Link className="button" to="/resume">View resume <ArrowUpRight size={17} /></Link>
    </div></div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Rafeeq Haiqal</p><span>Built with care, in Malaysia.</span><div className="social-links">
      <a href={social.github} target="_blank" rel="noreferrer" aria-label="GitHub (opens in new tab)"><Github size={18} /></a>
      <a href={social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in new tab)"><Linkedin size={18} /></a>
    </div></div>
  </footer>;
}
