import { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  AnimatePresence,
} from "framer-motion";

const springConfig = { damping: 25, stiffness: 300 };

const HoverGallery = ({ items = [], className = "" }) => {
  const [activeItem, setActiveItem] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring-based position
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Velocity for skew effect
  const velocityX = useVelocity(springX);
  const velocityY = useVelocity(springY);

  // Transform velocity to skew
  const skewX = useTransform(
    velocityY,
    [-1000, 0, 1000],
    ["-10deg", "0deg", "10deg"]
  );
  const skewY = useTransform(
    velocityX,
    [-1000, 0, 1000],
    ["10deg", "0deg", "-10deg"]
  );

  const handleMouseMove = (e) => {
    if (isMobile) return; // Disable on mobile
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  // Handle tap/click
  const handleClick = (item) => {
    if (isMobile) {
      // Mobile: toggle expand/collapse
      setExpandedItem(expandedItem?.id === item.id ? null : item);
    }
    // Desktop: clicking also expands (optional behavior)
  };

  // Handle hover (desktop only)
  const handleMouseEnter = (item) => {
    if (!isMobile) {
      setActiveItem(item);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveItem(null);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Gallery Items List */}
      <div className="flex flex-col gap-4 p-4 md:p-8">
        {items.map((item, index) => (
          <motion.div
            key={item.id || index}
            className="group cursor-pointer border-b border-white/10 pb-4"
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(item)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-xl md:text-4xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-white/50 text-xs md:text-base mt-1">
                  {item.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <motion.span
                  className="text-white/30 text-3xl md:text-6xl font-bold"
                  whileHover={{ scale: 1.1, color: "rgba(34, 211, 238, 0.5)" }}
                >
                  {String(item.year)}
                </motion.span>
                {/* Mobile expand indicator */}
                {isMobile && (
                  <motion.span
                    animate={{ rotate: expandedItem?.id === item.id ? 180 : 0 }}
                    className="text-white/40 text-xl"
                  >
                    ▼
                  </motion.span>
                )}
              </div>
            </div>

            {/* Mobile droppable/expanded content */}
            <AnimatePresence>
              {isMobile && expandedItem?.id === item.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 flex flex-col gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <p className="text-white/70 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Floating Image + Text Preview (Desktop only) */}
      <AnimatePresence>
        {!isMobile && activeItem && (
          <motion.div
            className="pointer-events-none fixed z-50"
            style={{
              left: 0,
              top: 0,
              x: springX,
              y: springY,
              skewX,
              skewY,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <div className="relative w-64 md:w-80">
              {/* Image */}
              <motion.img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-48 md:h-56 object-cover rounded-xl shadow-2xl"
                layoutId={`image-${activeItem.id}`}
              />
              {/* Text Overlay */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/100 to-transparent p-4 rounded-b-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <p className="text-white/70 text-sm ">
                  {activeItem.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HoverGallery;
