import { motion } from "framer-motion";
import { Download, Eye } from "lucide-react";

import ResumeContent from "../assets/Resume.png";

function Resume() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Resume
          </h1>
          <p className="text-white/60 max-w-xl mx-auto">
            A snapshot of my professional journey and qualifications.
          </p>
        </motion.div>

        {/* Glassy Resume Container */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Outer glow effect */}
          <div
            className="absolute -inset-1 rounded-3xl opacity-50 blur-xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)",
            }}
          />

          {/* Main glass container */}
          <div
            className="relative rounded-3xl p-8 md:p-12 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                inset 0 -1px 0 rgba(0, 0, 0, 0.1)
              `,
            }}
          >
            {/* Shimmer effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(
                    105deg,
                    transparent 40%,
                    rgba(255, 255, 255, 0.05) 45%,
                    rgba(255, 255, 255, 0.1) 50%,
                    rgba(255, 255, 255, 0.05) 55%,
                    transparent 60%
                  )
                `,
                backgroundSize: "200% 100%",
                animation: "shimmer 3s linear infinite",
              }}
            />

            {/* Resume placeholder image area */}
            <div className="relative">
              {/* A4 aspect ratio container for resume preview */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative mx-auto max-w-md rounded-2xl overflow-hidden cursor-pointer group"
                style={{
                  aspectRatio: "1 / 1.414", // A4 aspect ratio
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                }}
              >
                {/* Resume Image */}
                <img
                  src={ResumeContent}
                  alt="Resume"
                  className="w-full h-full object-cover object-top"
                />

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open(ResumeContent, "_blank")}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-black transition-all"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)",
                        boxShadow: "0 4px 15px rgba(255,255,255,0.3)",
                      }}
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </motion.button>
                    <motion.a
                      href={ResumeContent}
                      download="Rafeeq_Haiqal_Resume.png"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-white transition-all"
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom info text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center text-white/40 text-sm mt-8"
            >
              Last updated: January 2026
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Resume;
