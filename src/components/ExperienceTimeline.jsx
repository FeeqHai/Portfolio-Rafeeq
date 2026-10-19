import { useEffect, useRef } from "react";
import { experiences } from "../data/portfolio";
import { usePreferences } from "../hooks/usePreferences";
import SectionLabel from "./SectionLabel";
export default function ExperienceTimeline() {
  const root = useRef(null);
  const { motion } = usePreferences();
  useEffect(() => {
    const element = root.current;
    let frame = 0;
    function update() {
      const bounds = element.getBoundingClientRect();
      const progress = motion ? Math.min(1, Math.max(0, (window.innerHeight * 0.65 - bounds.top) / bounds.height)) : 1;
      element.style.setProperty("--progress", progress);
      element.querySelectorAll(".timeline-entry").forEach((entry) => {
        entry.classList.toggle("is-reached", !motion || entry.getBoundingClientRect().top < window.innerHeight * 0.7);
      });
      frame = 0;
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", schedule);
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [motion]);
  return <section className="experience-section" id="experience" aria-label="Experience">
    <SectionLabel number="02">Experience</SectionLabel>
    <div className={motion ? "timeline" : "timeline motion-off"} ref={root}>
      <div className="timeline-axis" aria-hidden="true"><div className="timeline-progress" /><span className="timeline-cursor" /></div>
      {experiences.map((entry, index) => <article className="timeline-entry" key={entry.title}>
        <span className="timeline-node" aria-hidden="true" />
        <div className="experience-card"><span className="entry-number mono">{String(index + 1).padStart(2, "0")}</span><div>
          <p className="mono entry-date">{entry.date}</p><h3>{entry.title}</h3>
          <p className="entry-organisation">{entry.organisation}</p><p>{entry.description}</p>
          <details><summary>More about this role</summary><p>{entry.detail}</p></details>
          <p className="mono entry-tools">{entry.tools}</p>
        </div></div>
      </article>)}
    </div>
  </section>;
}
