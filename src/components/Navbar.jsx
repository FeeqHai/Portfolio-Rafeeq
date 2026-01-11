import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/academic", label: "Academic" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/resume", label: "Resume" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for enhanced glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl transition-all duration-500 ${
        scrolled ? "top-2" : "top-4"
      }`}
    >
      {/* Glass Container */}
      <div
        className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
          scrolled ? "py-2" : "py-3"
        }`}
        style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0) )",
          backdropFilter: "blur(8px) saturate(500%)",
          WebkitBackdropFilter: "blur(8px) saturate(500%)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            inset 0 -1px 0 rgba(0, 0, 0, 0.05)
          `,
        }}
      >
        {/* Animated edge highlight */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `
              linear-gradient(90deg, 
                transparent 0%, 
                rgba(255,255,255,0.1) 25%, 
                rgba(255,255,255,0.2) 50%, 
                rgba(255,255,255,0.1) 75%, 
                transparent 100%
              )
            `,
            backgroundSize: "200% 100%",
            animation: "shimmer 3s linear infinite",
            opacity: 0.5,
          }}
        />

        <div className="relative px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="group relative">
              <motion.span
                className="text-2xl bg-gradient-to-r from-white to-white bg-clip-text"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                style={{ fontFamily: "'Allura'" }}
              >
                Rafeeq Haiqal
              </motion.span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-white/80 to-transparent group-hover:w-full transition-all duration-300" />
            </NavLink>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <NavLink key={link.to} to={link.to} className="relative group">
                  {({ isActive }) => (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "text-black"
                          : "text-white/70 group-hover:text-white"
                      }`}
                    >
                      {/* Active background */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-xl"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255, 255, 255, 0.71) 100%)",
                            boxShadow: "0 4px 15px rgba(255,255,255,0.3)",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Hover glow - now synced with text via group-hover */}
                      {!isActive && (
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                          }}
                        />
                      )}

                      <span className="relative z-10">{link.label}</span>
                    </motion.div>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 rounded-xl text-white/70 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.1)" }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-2 rounded-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="p-4 space-y-1">
              {navLinks.map((link, index) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                >
                  {({ isActive }) => (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-white/90 text-black"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </motion.div>
                  )}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
