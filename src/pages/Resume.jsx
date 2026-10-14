import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download, ExternalLink, FileText, ZoomIn, ZoomOut } from "lucide-react";
import resumePdf from "../assets/Mohamad_Rafeeq_Haiqal_Resume.pdf?url";
import resumePreview from "../assets/resume-preview.webp";

function Resume() {
  const [zoomed, setZoomed] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);
  const reduceMotion = useReducedMotion();
  const focusStyle = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Resume</h1>
          <p className="text-white/60 max-w-xl mx-auto">
            A snapshot of my professional journey and qualifications.
          </p>
        </motion.div>

        <section aria-labelledby="resume-preview-heading" className="relative rounded-2xl border border-white/15 bg-white/5 shadow-2xl overflow-hidden backdrop-blur-xl">
          <div className="flex flex-col gap-4 p-4 sm:p-6 border-b border-white/10">
            <div className="flex items-center gap-3 text-white">
              <FileText className="w-5 h-5 shrink-0 text-white/60" aria-hidden="true" />
              <div>
                <h2 id="resume-preview-heading" className="font-semibold">Resume preview</h2>
                <p className="text-sm text-white/60">Mohamad Rafeeq Haiqal · 1 page · PDF</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                aria-pressed={zoomed}
                aria-controls="resume-preview-window"
                disabled={previewFailed}
                onClick={() => setZoomed((current) => !current)}
                className={`inline-flex items-center justify-center gap-2 min-h-11 px-4 rounded-xl border border-white/20 text-white hover:bg-white/10 disabled:opacity-50 ${focusStyle}`}
              >
                {zoomed ? <ZoomOut size={18} aria-hidden="true" /> : <ZoomIn size={18} aria-hidden="true" />}
                {zoomed ? "Fit to width" : "Zoom in"}
              </button>
              <a href={resumePdf} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center gap-2 min-h-11 px-4 rounded-xl border border-white/20 text-white hover:bg-white/10 ${focusStyle}`}>
                <ExternalLink size={18} aria-hidden="true" />
                Open PDF<span className="sr-only"> in a new tab</span>
              </a>
              <a href={resumePdf} download="Mohamad_Rafeeq_Haiqal_Resume.pdf" className={`inline-flex items-center justify-center gap-2 min-h-11 px-4 rounded-xl bg-white text-black font-medium hover:bg-white/90 ${focusStyle}`}>
                <Download size={18} aria-hidden="true" />
                Download PDF
              </a>
            </div>
          </div>

          <p id="resume-preview-help" className="px-4 sm:px-6 py-3 text-sm text-white/60">
            Scroll inside the preview to read the full resume. Zoom in for a closer look, or open the PDF for selectable text.
          </p>
          <div
            id="resume-preview-window"
            role="region"
            aria-label="Scrollable resume preview"
            aria-describedby="resume-preview-help"
            tabIndex={0}
            className="h-[65svh] min-h-80 max-h-[850px] overflow-auto bg-black/30 p-3 sm:p-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
          >
            {previewFailed ? (
              <p role="status" className="text-white text-center py-12">
                The preview could not load. You can still open or download the PDF using the buttons above.
              </p>
            ) : (
              <img
                src={resumePreview}
                alt="Page 1 of Mohamad Rafeeq Haiqal's resume. Open the PDF above to read the document text."
                width={1072}
                height={1516}
                onError={() => setPreviewFailed(true)}
                className="block mx-auto h-auto bg-white shadow-xl"
                style={{ width: zoomed ? "1072px" : "100%", maxWidth: zoomed ? "none" : "1072px" }}
              />
            )}
          </div>
          <p className="text-center text-white/50 text-sm p-4">Updated October 2026</p>
        </section>
      </div>
    </div>
  );
}

export default Resume;
