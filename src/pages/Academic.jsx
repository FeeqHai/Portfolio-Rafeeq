import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagicBento from "../components/MagicBento"; // Import the new component

gsap.registerPlugin(ScrollTrigger);

const academicHistory = [
  {
    id: 1,
    institution: "Universiti Teknikal Malaysia Melaka (UTeM)",
    degree: "Bachelor of Information Technology",
    yearStart: "2024",
    yearEnd: "Present",
    result: "Current CGPA: 3.49",
    images: [
      "src/assets/FTMK.webp",
      "src/assets/budiPenyayang.webp",
      "src/assets/utemSeoul.webp",
    ],
    story:
      "This is where my journey in software engineering truly began. At UTeM, I've been diving deep into programming, web development, and building real-world applications.",
  },
  {
    id: 2,
    institution: "Politeknik Besut Terengganu",
    degree: "Diploma in Information Technology (Digital Technology)",
    yearStart: "2022",
    yearEnd: "2024",
    result: "CGPA: 3.92",
    images: [
      "src/assets/PBT.webp",
      "src/assets/tvetAward.webp",
      "src/assets/hensemPoli.webp",
    ],
    story:
      "A pivotal year of preparation and growth. Completing Diploma in Information Technology (Technology Digital) with distinction built the foundation for my analytical thinking.",
  },
  {
    id: 3,
    institution: "SMK Zainab 2",
    degree: "Sijil Pelajaran Malaysia (SPM)",
    yearStart: "2016",
    yearEnd: "2020",
    result: "Result: 2 A-, 2 B+, 2 B, 1 C+, 1 D, 1 E",
    images: [
      "src/assets/smkzainab2.webp",
      "src/assets/smkIMG.webp",
      "src/assets/smkIMG2.webp",
    ],
    story:
      "Five formative years that shaped who I am today. From discovering my passion for computers to excelling in the Science and Technology Stream.",
  },
];

function Academic() {
  const containerRef = useRef(null);
  const slidesRef = useRef([]);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // Use gsap.context for proper cleanup of ScrollTrigger and animations
    const ctx = gsap.context(() => {
      const slides = slidesRef.current;
      const progressBar = progressBarRef.current;

      // Filter out nulls to be safe
      const validSlides = slides.filter((slide) => slide !== null);
      const numTransitions = validSlides.length - 1;

      if (numTransitions <= 0) return;

      // Pin the container and animate slides on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${numTransitions * 140}%`,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / numTransitions,
            duration: { min: 0.15, max: 0.2 },
            ease: "power2.inOut",
          },
        },
      });

      // Animate content and progress bar for each transition
      validSlides.forEach((slide, i) => {
        if (i < numTransitions) {
          // Slide Animation - Fade In/Out with Subtle Motion

          // EXIT Current Slide
          const currentText = slide.querySelector(".academic-content");
          const currentBento = slide.querySelector(".academic-bento");

          if (currentText) {
            tl.to(
              currentText,
              { y: -20, opacity: 0, duration: 1, ease: "power2.inOut" },
              i
            );
          }
          if (currentBento) {
            tl.to(
              currentBento,
              { y: -40, opacity: 0, duration: 1, ease: "power2.inOut" },
              i
            );
          }

          // Fallback for Hero or other non-split slides
          if (!currentText && !currentBento) {
            tl.to(
              slide,
              { yPercent: -50, opacity: 0, duration: 1, ease: "power2.inOut" },
              i
            );
          }

          // ENTER Next Slide
          const nextSlide = validSlides[i + 1];
          const nextText = nextSlide.querySelector(".academic-content");
          const nextBento = nextSlide.querySelector(".academic-bento");

          if (nextText || nextBento) {
            // Ensure the parent container is visible so children animations are seen
            tl.set(nextSlide, { opacity: 1 }, i);
          }

          if (nextText) {
            tl.fromTo(
              nextText,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, ease: "power2.inOut" },
              i
            );
          }
          if (nextBento) {
            tl.fromTo(
              nextBento,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, ease: "power2.inOut" },
              i
            );
          }

          // Fallback for Next Slide
          if (!nextText && !nextBento) {
            tl.fromTo(
              nextSlide,
              { yPercent: 50, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 1, ease: "power2.inOut" },
              i
            );
          }

          // Progress Bar Animation (Per Section)
          if (progressBar) {
            tl.fromTo(
              progressBar,
              { width: "0%" },
              {
                width: "100%",
                duration: 1,
                ease: "none",
              },
              i
            );
          }
        }
      });
    }, containerRef); // Scope to container

    return () => {
      ctx.revert(); // Safely revert all GSAP changes on unmount
    };
  }, []);

  return (
    <div className="relative w-full">
      {" "}
      {/* Stable wrapper for React to control */}
      {/* Pinned Scroll Container */}
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        {/* Loading Style Scroll Bar (Bottom, Fixed, Per-Section) */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-white/10 z-[100]">
          <div
            ref={progressBarRef}
            className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            style={{ width: "0%" }}
          />
        </div>

        {/* Hero Slide (index 0) */}
        <div
          ref={(el) => (slidesRef.current[0] = el)}
          className="absolute inset-0 flex items-center justify-center pb-52"
          style={{ opacity: 1 }}
        >
          <div className="text-center px-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4"
            >
              Academic
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-white/50 text-lg max-w-md mx-auto mb-6"
            >
              Scroll to explore my educational journey
            </motion.p>

            {/* Timeline preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-12"
            >
              {academicHistory.map((item) => (
                <span
                  key={item.id}
                  className="text-2xl font-medium text-white/20"
                >
                  {item.yearStart}
                </span>
              ))}
            </motion.div>

            {/* Mouse Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-68 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-white/30 text-xs uppercase tracking-widest">
                  Scroll
                </span>
                <div className="w-5 h-8 rounded-full border border-white/30 flex justify-center pt-1">
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-1 h-1 rounded-full bg-white/50"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Academic Year Slides (index 1, 2, 3) */}
        {academicHistory.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (slidesRef.current[index + 1] = el)}
            className="absolute inset-0 flex items-center justify-center px-6"
            style={{ opacity: 0 }}
          >
            <div className="w-full max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  {/* Year */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl md:text-6xl font-bold text-white">
                      {item.yearStart} — {item.yearEnd}
                    </span>
                  </div>

                  {/* Institution */}
                  <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 leading-tight">
                    {item.institution}
                  </h2>

                  {/* Degree */}
                  <p className="text-lg text-white/60 mb-2">{item.degree}</p>

                  {/* Result */}
                  <p className="text-lg font-semibold text-white/90 mb-4 bg-white/5 inline-block px-3 py-1 rounded-lg border border-white/10">
                    {item.result}
                  </p>

                  {/* Story */}
                  <p className="text-white/40 leading-relaxed max-w-lg">
                    {item.story}
                  </p>
                </div>

                {/* Magic Bento Grid */}
                <div
                  className={`${
                    index % 2 === 1 ? "lg:order-1" : ""
                  } h-[300px] md:h-[500px] w-full`}
                >
                  <MagicBento images={item.images} spotlightRadius={310} />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* End of Timeline Slide */}
        <div
          ref={(el) => (slidesRef.current[academicHistory.length + 1] = el)}
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0 }}
        >
          <div className="text-center px-6">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              — End of Timeline —
            </h2>
            <p className="text-white/40 text-lg max-w-md mx-auto mb-8">
              The journey continues...
            </p>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <span className="text-[20rem] md:text-[30rem] font-bold text-white/[0.02] leading-none">
            EDU
          </span>
        </div>
      </div>
    </div>
  );
}

export default Academic;
