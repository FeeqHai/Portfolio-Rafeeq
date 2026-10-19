import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import OrbitCards from "../components/OrbitCards";
import Intro from "../components/Intro";
import ProjectShowcase from "../components/ProjectShowcase";
import ExperienceTimeline from "../components/ExperienceTimeline";
import SectionLabel from "../components/SectionLabel";
export default function Home() {
  return <div className="page-width home-page">
    <Intro />
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy"><div className="hero-eyebrow mono"><span>RAFEEQ HAIQAL / PORTFOLIO 2026</span><span className="eyebrow-line" /></div>
        <h1 id="hero-title">Thoughtful code.<br />Useful experiences.</h1>
        <p>Computer science student at UTeM,<br className="desktop-break" /> building practical web and mobile applications.</p>
        <div className="button-row"><Link className="button button-primary" to="/#work">Explore work <ArrowRight size={18} /></Link><Link className="button" to="/resume">View resume <FileText size={17} /></Link></div>
      </div>
      <OrbitCards />
    </section>
    <ProjectShowcase />
    <ExperienceTimeline />
    <section className="about-section" id="about">
      <SectionLabel number="03">A little about me</SectionLabel>
      <div className="about-columns"><h2>Curious by nature.<br />Learning by building.</h2><div><p>I’m Rafeeq, a Computer Science student at Universiti Teknikal Malaysia Melaka, specialising in software development and expecting to graduate in 2027.</p><p>My work spans web, mobile and business applications. I’m currently developing the SRS Digital Patrol System for my final year project, and contributed to MasakGramPrompt, a nutrition-analysis dashboard using local language models.</p><div className="text-links"><Link to="/about">More about me <ArrowUpRight size={16} /></Link><Link to="/academic">Education <ArrowUpRight size={16} /></Link><Link to="/experience">Milestones <ArrowUpRight size={16} /></Link></div></div></div>
    </section>
  </div>;
}
