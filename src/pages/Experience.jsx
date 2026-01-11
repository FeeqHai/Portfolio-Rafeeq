import { motion } from "framer-motion";
import HoverGallery from "../components/HoverGallery";

// Import experience-related images

import innex from "../assets/innexaward.webp";
import tvetAward from "../assets/tvetAward.webp";
import pispaCommissioning from "../assets/pispaGroup.webp";
import polyskill from "../assets/2022- Polyskills.jpeg";
import mpp from "../assets/mpp.jpeg";

// Gallery items for HoverGallery (with image + text)
const galleryItems = [

  {
    id: 1,
    title: "PROGRAM INNOVATION EXHIBITION 2024 (INNEX'24)",
    subtitle: "INNEX'24 • 2024",
    year: "2024",
    image: innex,
    description:
      "My beloved lecturer(Puan Elis), told me to challenge myself to join Program Innovation Exhibition 2024 in Mydin Mall, Tanjung ",
  },
  {
    id: 2,
    title: "TVET Award",
    subtitle: "Achievement • 2024",
    year: "2024",
    image: tvetAward,
    description:
      "Received recognition for excellence in Technical and Vocational Education.",
  },
  {
    id: 3,
    title: "Pispa Commissioning",
    subtitle: "Commisioning • 2023",
    year: "2023",
    image: pispaCommissioning,
    description:
      "For the past 3 years, training under Malaysia Civil Defence Force really teach me how to discipline myself and how to be a team player. ",
  },
  {
    id: 4,
    title: "Silver in Polyskills",
    subtitle: "Achievement • 2022",
    year: "2022",
    image: polyskill,
    description:
      "First time winning a competition an it was a great experience.",
  },
    {
    id: 5,
    title: "MPP",
    subtitle: "Leading • 2022",
    year: "2022",
    image: mpp,
    description:
      "Cultural exchange program representing UTeM in Seoul, South Korea.",
  },
      
];

function Experience() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Experience
          </h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Hover over each item to see more. A journey through my professional
            and personal milestones.
          </p>
        </motion.div>

        {/* Hover Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="min-h-[60vh]"
        >
          <HoverGallery items={galleryItems} />
        </motion.div>
      </div>
    </div>
  );
}

export default Experience;
