import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FlipCard from "../components/FlipCard";
import CardStack from "../components/CardStack";
import FluidGlass from "../components/FluidGlass";
import ProfilePicture from "../assets/ProfilePicture.webp";

// Import images for card stack
import coolPose from "../assets/cool-pose.webp";
import handsome from "../assets/handsome.webp";
import intern from "../assets/intern.webp";
import utemSeoul from "../assets/utemSeoul.webp";
import selfPort from "../assets/profile-pic-ws.webp";
import gym from "../assets/gym.webp";

function About() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Contact info for FlipCard back
  const contacts = [
    { icon: "📧", value: "oxbbn123@gmail.com" },
    { icon: "📱", value: "+60 16-460 5842" },
    { icon: "📍", value: "Kelantan, Malaysia" },
  ];

  const socials = {
    github: "https://github.com/FeeqHai",
    linkedin: "www.linkedin.com/in/rafeeq-haiqal-a187a624b",
  };

  // Images for CardStack (with dimensions based on aspect ratios, scaled to ~260px base)
  // Landscape images scaled 150% (260 * 1.5 = 390px width)
  const stackImages = [
    {
      id: 1,
      src: coolPose,
      alt: "Cool Pose",
      label: "Photography",
      width: 260,
      height: 260,
    }, // Square
    {
      id: 2,
      src: handsome,
      alt: "Handsome",
      label: "Style",
      width: 260,
      height: 260,
    }, // Square
    {
      id: 3,
      src: intern,
      alt: "Internship",
      label: "Work Experience",
      width: 390,
      height: 260,
    }, // 3:2 Landscape (390x260)
    {
      id: 4,
      src: gym,
      alt: "Gym",
      label: "Hobby",
      width: 390,
      height: 219,
    }, // 16:9 Landscape (390x219)
    {
      id: 5,
      src: selfPort,
      alt: "self Protrait",
      label: "Potrait",
      width: 260,
      height: 260,
    }, // Square
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Me
          </h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Get to know more about who I am and what drives me.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          {/* Left: FlipCard (spans 2 rows) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:row-span-2 min-h-[400px] lg:min-h-[500px]"
          >
            <FlipCard
              frontImage={ProfilePicture}
              frontAlt="Rafeeq Haiqal"
              name="Rafeeq Haiqal"
              role="Software Engineer & UI/UX Enthusiast"
              contacts={contacts}
              socials={socials}
              className="w-full h-full"
            />
          </motion.div>

          {/* Top-Right: About Me Text Card */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <FluidGlass className="h-full p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Hello, I'm Rafeeq! 👋
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  I'm a passionate IT student at{" "}
                  <span className="text-white font-medium">
                    Universiti Teknikal Malaysia Melaka (UTeM)
                  </span>{" "}
                  with a deep love for building digital experiences.
                </p>
                <p>
                  My journey started with simple curiosity about how the web
                  works, leading me to dive deep into{" "}
                  <span className="text-cyan-400">React</span>,{" "}
                  <span className="text-purple-400">UX Design</span>, and{" "}
                  <span className="text-emerald-400">Interactive UI</span>. I
                  love turning complex problems into simple, beautiful
                  interfaces.
                </p>
                <p>
                  When I'm not coding, I'm exploring new tech,understanding new
                  concept, and refining my design skills.
                </p>
              </div>
            </FluidGlass>
          </motion.div>

          {/* Bottom-Right: CardStack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 min-h-[300px] flex flex-col"
          >
            <div className="flex-1 relative">
              <CardStack
                images={stackImages}
                cardWidth={isMobile ? 280 : 400}
                cardHeight={isMobile ? 280 : 400}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;
