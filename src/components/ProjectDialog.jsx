import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";
export default function ProjectDialog({ project, onClose }) {
  const dialog = useRef(null);
  const [image, setImage] = useState(0);
  useEffect(() => {
    const node = dialog.current;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    node.showModal(); document.body.style.overflow = "hidden";
    return () => { node.close(); document.body.style.overflow = overflow; previous?.focus({ preventScroll: true }); };
  }, []);
  return <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={onClose} onClick={(event) => {
    if (event.target === event.currentTarget) {
      const box = event.currentTarget.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) onClose();
    }
  }}>
    <div className="dialog-heading"><span className="mono">PROJECT NOTES / {project.year}</span><button className="icon-button" onClick={onClose} aria-label="Close project" autoFocus><X size={22} /></button></div>
    <div className="dialog-content">
      <h2 id="project-dialog-title">{project.title}</h2><p className="project-summary">{project.summary}</p>
      <div className="project-gallery"><img src={project.images[image]} alt={`${project.title} — screenshot ${image + 1} of ${project.images.length}`} />
        <div className="gallery-controls"><button className="icon-button" onClick={() => setImage((image + project.images.length - 1) % project.images.length)} aria-label="Previous screenshot"><ChevronLeft size={20} /></button><span className="mono" aria-live="polite">{image + 1} / {project.images.length}</span><button className="icon-button" onClick={() => setImage((image + 1) % project.images.length)} aria-label="Next screenshot"><ChevronRight size={20} /></button></div>
      </div>
      <div className="project-notes"><div><h3>The project</h3><p>{project.description}</p></div><div><h3>My contribution</h3><p>{project.contribution}</p></div></div>
      <ul className="technology-list" aria-label="Technologies">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
      {project.link && <a className="button button-primary" href={project.link} target="_blank" rel="noreferrer">Visit website <ArrowUpRight size={17} /><span className="sr-only"> (opens in new tab)</span></a>}
    </div>
  </dialog>;
}
