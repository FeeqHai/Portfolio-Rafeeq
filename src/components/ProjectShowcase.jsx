import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { projects } from "../data/portfolio";
import { usePreferences } from "../hooks/usePreferences";
import useMediaQuery from "../hooks/useMediaQuery";
import ProjectDialog from "./ProjectDialog";
import SectionLabel from "./SectionLabel";
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function ProjectShowcase() {
  const root = useRef(null), stage = useRef(null), cards = useRef([]);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const { motion } = usePreferences();
  const desktop = useMediaQuery("(min-width: 900px) and (min-height: 650px)");
  const enhanced = desktop && motion;
  useEffect(() => {
    if (!enhanced) return;
    const nodes = cards.current;
    let frame = 0;
    function update() {
      const top = root.current.getBoundingClientRect().top;
      const step = window.innerHeight * 0.85;
      const progress = clamp((100 - top) / step, 0, projects.length - 1);
      const current = Math.min(projects.length - 1, Math.floor(progress + 0.5));
      setActive((previous) => previous === current ? previous : current);
      nodes.forEach((card, index) => {
        const difference = index - progress;
        const behind = Math.max(difference, 0);
        const outgoing = Math.max(-difference, 0);
        card.style.transform = `translate3d(0, ${-behind * 52 - outgoing * stage.current.clientHeight * 1.15}px, 0) scale(${1 - Math.min(behind, 3) * 0.065})`;
        card.style.opacity = String(clamp(1 - outgoing * 1.6, 0, 1));
      });
      frame = 0;
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule);
      nodes.forEach((card) => { if (card) { card.style.transform = ""; card.style.opacity = ""; } });
    };
  }, [enhanced]);
  function goTo(index) {
    if (!enhanced) return;
    const top = window.scrollY + root.current.getBoundingClientRect().top;
    window.scrollTo({ top: top - 100 + index * window.innerHeight * 0.85, behavior: "smooth" });
  }
  return <section className={enhanced ? "work-section enhanced" : "work-section"} id="work" aria-label="Selected work">
    <SectionLabel number="01" aside={<span className="scroll-hint">Scroll to explore <ArrowDown size={15} /></span>}>Selected work</SectionLabel>
    <div ref={root} className="showcase-track" style={enhanced ? { height: `calc(100svh - 130px + ${(projects.length - 1) * 85}vh)` } : undefined}>
      <div className="showcase-stage" ref={stage}>
        {enhanced && <div className="project-meta">
          <div key={active} className="meta-copy"><p className="mono">{projects[active].year}</p><h3>{projects[active].title}</h3><p>{projects[active].category}</p></div>
          <div className="project-index" aria-label="Choose a project">{projects.map((project, index) => <button key={project.id} onClick={() => goTo(index)} aria-label={`Show ${project.title}`} aria-pressed={active === index}>{String(index + 1).padStart(2, "0")}</button>)}</div>
        </div>}
        <div className="project-stack">
          {projects.map((project, index) => <article ref={(node) => { cards.current[index] = node; }} key={project.id} className={`project-cover tone-${project.tone}`} style={{ zIndex: projects.length - index }} inert={enhanced && index !== active ? true : undefined}>
            {!enhanced && <div className="mobile-project-meta"><p className="mono">{project.year} / {project.category}</p><h3>{project.title}</h3></div>}
            <button className="cover-button" onClick={() => setSelected(project)} aria-label={`View project: ${project.title}`}>
              <img src={project.cover} alt={`${project.title} interface`} width={1850} height={925} loading="lazy" />
              <span className="view-project">View project <ArrowUpRight size={15} /></span>
              <span className="cover-caption">{project.title}<span>{project.category}</span></span>
            </button>
          </article>)}
        </div>
      </div>
    </div>
    {selected && <ProjectDialog key={selected.id} project={selected} onClose={() => setSelected(null)} />}
  </section>;
}
