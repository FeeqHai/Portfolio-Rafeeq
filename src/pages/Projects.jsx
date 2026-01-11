import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardSwap, { Card } from "../components/CardSwap";
import {
  Code,
  Database,
  Factory,
  HospitalIcon,
  ShoppingCart,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  GraduationCap,
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Food Ordering system",
    label: "Food Ordering system",
    description:
      "A web-based food ordering system for Hospital Besut's Dietetics Unit, replacing traditional paper-based filing to streamline patient meal management for nurses and dietitians.",
    technologies: ["PHP", "Bootstrap", "SQL", "XAMPP"],
    link: "#",
    image: "src/assets/Website Hosbes.webp",
    hoverImage: "src/assets/HomePageWad.webp",
    icon: HospitalIcon,
  },
  {
    id: 2,
    title: "Inspection Report System",
    label: "Inspection Report System",
    description:
      "A web-based system for managing and generating inspection reports with Firebase backend.",
    technologies: ["React", "Firebase", "Mantine UI"],
    link: "#",
    image: "src/assets/Ipetro.webp",
    hoverImage: "src/assets/iptroDashboard.webp",
    icon: Factory,
  },
  {
    id: 3,
    title: "IDEAS - E-Business Training",
    label: "IDEAS Platform",
    description:
      "A collaborative project with FSDK Dean from UMK. IDEAS is an entrepreneurship training platform for ASEAN women MSMEs, providing e-business training and capacity building.",
    technologies: ["WordPress", "Elementor", "PHP"],
    link: "https://ideasweli.com/",
    image: "src/assets/ideasWeli.webp",
    hoverImage: "src/assets/ideasWeliAbout.webp",
    icon: GraduationCap,
  },
];

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [showDetails, setShowDetails] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setActiveTab("description");
    setShowDetails(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    setActiveTab("description");
    setShowDetails(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === 1 ? 0 : 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto relative ">
        {/* Two-column layout: Header on left, CardSwap on right */}
        <div className="flex flex-col lg:flex-row gap-16 items-center min-h-[70vh] relative ">
          {/* Left side - Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col items-center lg:items-start justify-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 text-center lg:text-left">
              Projects
            </h1>
            <p className="text-white/60 text-lg max-w-md text-center lg:text-left">
              A collection of projects I've worked on. Click to
              view.
            </p>
          </motion.div>

          {/* Right side - CardSwap - positioned to overflow left */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className={`relative h-90 w-full ${
              isMobile ? "" : "lg:translate-x-20"
            }`}
          >
            <CardSwap
              width={isMobile ? 320 : 640}
              height={isMobile ? 220 : 400}
              cardDistance={isMobile ? 15 : 30}
              verticalDistance={isMobile ? 35 : 70}
              delay={4000}
              skewAmount={2}
              easing="elastic"
            >
              {projects.map((project, index) => {
                const IconComponent = project.icon;
                return (
                  <Card
                    key={project.id}
                    className="overflow-hidden cursor-pointer group"
                    style={{
                      background: "#0a0a0f",
                      border: "1px solid rgba(255, 255, 255, 1)",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Small delay to let GSAP animation complete its frame
                      setTimeout(() => openModal(project), 50);
                    }}
                  >
                    {/* Header bar with icon and label */}
                    <div className="absolute top-0 left-0 right-0 flex items-center bg-black gap-2 px-5 py-4 z-20 border-b">
                      <IconComponent size={18} className="text-white/70" />
                      <span className="text-white/90 text-sm font-medium">
                        {project.label}
                      </span>
                    </div>

                    {/* Hover description - appears on hover */}
                    <div className="absolute top-80 left-0 right-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-black/90 shadow-xl/30 bg-white/80 text-sm p-5 leading-relaxed ">
                        {project.description}
                      </p>
                    </div>

                    {/* Default image - fades out on hover */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute top-13 bottom-0 left-0 right-0 w-full h-[calc(100%-3rem)] object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-0"
                    />
                    {/* Hover image - fades in on hover */}
                    <img
                      src={project.hoverImage}
                      alt={`${project.title} hover`}
                      className="absolute top-13 bottom-0 left-0 right-0 w-full h-[calc(100%-3rem)] object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-80"
                    />
                  </Card>
                );
              })}
            </CardSwap>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={closeModal}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="relative w-full max-w-5xl h-[80vh] overflow-hidden rounded-2xl pointer-events-auto"
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  boxShadow:
                    "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)",
                }}
              >
                {/* Full-size Image */}
                <div className="absolute inset-0">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={
                        currentImageIndex === 0
                          ? selectedProject.image
                          : selectedProject.hoverImage
                      }
                      alt={selectedProject.title}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                </div>

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors cursor-pointer"
                >
                  <X size={20} className="text-white" />
                </button>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors cursor-pointer z-10"
                >
                  <ChevronLeft size={24} className="text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors cursor-pointer z-10"
                >
                  <ChevronRight size={24} className="text-white" />
                </button>

                {/* Dots Indicator */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 flex gap-2 z-10 transition-all duration-300 ${
                    showDetails ? "bottom-[200px]" : "bottom-20"
                  }`}
                >
                  {[0, 1].map((index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                        currentImageIndex === index
                          ? "bg-white w-6"
                          : "bg-white/50 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>

                {/* Overlay Description Section */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-10 transition-all duration-300"
                  style={{
                    background: "rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="p-4">
                    {/* Title with Icon and Toggle */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {(() => {
                          const IconComponent = selectedProject.icon;
                          return (
                            <IconComponent
                              size={22}
                              className="text-white/70"
                            />
                          );
                        })()}
                        <h2 className="text-lg md:text-xl font-semibold text-white">
                          {selectedProject.title}
                        </h2>
                      </div>
                      <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-110"
                        title={showDetails ? "Hide details" : "Show details"}
                      >
                        <motion.div
                          animate={{ rotate: showDetails ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <ChevronDown size={18} className="text-white/70" />
                        </motion.div>
                      </button>
                    </div>

                    {/* Collapsible Description and Technologies */}
                    <AnimatePresence>
                      {showDetails && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3">
                            {/* Description */}
                            <p className="text-white/70 text-sm leading-relaxed mb-3">
                              {selectedProject.description}
                            </p>

                            {/* Technologies */}
                            <div className="mb-3">
                              <h3 className="text-white/50 text-xs uppercase tracking-wider mb-2">
                                Technologies
                              </h3>
                              <div className="flex flex-wrap gap-1.5">
                                {selectedProject.technologies.map(
                                  (tech, index) => (
                                    <span
                                      key={index}
                                      className="px-2.5 py-0.5 rounded-full text-xs text-white/80"
                                      style={{
                                        background: "rgba(255,255,255,0.15)",
                                        border:
                                          "1px solid rgba(255,255,255,0.2)",
                                      }}
                                    >
                                      {tech}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>

                            {/* Action Button */}
                            {selectedProject.link &&
                              selectedProject.link !== "#" && (
                                <a
                                  href={selectedProject.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-black font-medium text-sm transition-all duration-300 hover:scale-105"
                                  style={{
                                    background: "rgba(255,255,255,0.9)",
                                  }}
                                >
                                  <ExternalLink size={16} />
                                  View Project
                                </a>
                              )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Projects;
