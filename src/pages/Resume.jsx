import { useState } from "react";
import { Download, ExternalLink, ZoomIn, ZoomOut } from "lucide-react";
import resumePdf from "../assets/Mohamad_Rafeeq_Haiqal_Resume.pdf?url";
import resumePreview from "../assets/resume-preview.webp";
export default function Resume() {
  const [zoomed, setZoomed] = useState(false), [failed, setFailed] = useState(false);
  return <div className="page-width resume-page"><div className="resume-intro"><h1 className="page-title">Resume.</h1><p>A snapshot of my professional journey and qualifications.</p></div>
    <section className="resume-panel" aria-labelledby="resume-heading">
      <div className="resume-toolbar"><h2 id="resume-heading">Resume preview</h2><p>Mohamad Rafeeq Haiqal · 1 page · PDF</p><div className="button-row">
        <button className="button" aria-pressed={zoomed} aria-controls="resume-preview-window" disabled={failed} onClick={() => setZoomed(!zoomed)}>{zoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}{zoomed ? "Fit to width" : "Zoom in"}</button>
        <a className="button" href={resumePdf} target="_blank" rel="noreferrer"><ExternalLink size={16} />Open PDF<span className="sr-only"> in a new tab</span></a>
        <a className="button button-primary" href={resumePdf} download="Mohamad_Rafeeq_Haiqal_Resume.pdf"><Download size={16} />Download PDF</a>
      </div></div>
      <p className="resume-help" id="resume-help">Scroll inside the preview to read the full resume. Zoom in for a closer look, or open the PDF for selectable text.</p>
      <div id="resume-preview-window" className="resume-window" role="region" aria-label="Scrollable resume preview" aria-describedby="resume-help" tabIndex={0}>
        {failed ? <p role="status">The preview could not load. You can still open or download the PDF using the buttons above.</p> : <img src={resumePreview} alt="Page 1 of Mohamad Rafeeq Haiqal's resume. Open the PDF above to read the document text." width={1072} height={1516} onError={() => setFailed(true)} style={{ width: zoomed ? "1072px" : "100%", maxWidth: zoomed ? "none" : "1072px" }} />}
      </div><p className="resume-date">Updated October 2026</p>
    </section>
  </div>;
}
