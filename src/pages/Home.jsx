import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import BounceCards from "../components/BounceCards";

const images = [
  "src/assets/intern.webp",
  "src/assets/handsome.webp",
  "src/assets/profile-pic-ws.webp",
  "src/assets/cool-pose.webp",
  "src/assets/ProfilePicture.webp",
];

function Home() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Responsive transform styles
  const mobileTransforms = [
    "rotate(-10deg) translate(-60px, -25px)",
    "rotate(-5deg) translate(-30px, -32px)",
    "rotate(0deg) translate(0px, -35px)",
    "rotate(5deg) translate(30px, -32px)",
    "rotate(10deg) translate(60px, -25px)",
  ];

  const desktopTransforms = [
    "rotate(-12deg) translate(-140px, -35px)",
    "rotate(-6deg) translate(-70px, -46px)",
    "rotate(0deg) translate(0px, -50px)",
    "rotate(6deg) translate(70px, -46px)",
    "rotate(12deg) translate(140px, -35px)",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center max-w-3xl"
      >
        {/* Bounce Cards above name */}
        <div className="flex justify-center mb-8">
          <BounceCards
            images={images}
            containerWidth={isMobile ? 280 : 500}
            containerHeight={isMobile ? 180 : 250}
            animationDelay={1}
            animationStagger={0.08}
            easeType="elastic.out(1, 0.5)"
            enableHover={true}
            transformStyles={isMobile ? mobileTransforms : desktopTransforms}
          />
        </div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold text-white mb-6"
        >
          Mohd Rafeeq Haiqal Bin Mazri
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl md:text-xl text-white/70 mb-8"
        >
          "No man was ever wise by chance" <br />
          -Lucius Annaeus Seneca
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => navigate("/about")}
            className="px-8 py-3 rounded-xl text-black font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)",
              boxShadow: "0 4px 15px rgba(255,255,255,0.3)",
            }}
          >
            About Me
          </button>
          <button
            onClick={() => navigate("/projects")}
            className="px-8 py-3 rounded-xl text-white/90 font-medium transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            View Projects
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
