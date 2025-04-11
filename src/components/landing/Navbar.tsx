"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useWillChange } from "framer-motion";
import { DiagonalCircularButton } from "../common/Button";

const navItems = ["Home", "Projects", "Services", "About", "Contact"];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const willChange = useWillChange();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    // Set initial scroll state
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside or resizing
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen && 
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize, { passive: true });
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.16, 1, 0.3, 1] // Custom spring curve
        }}
        className={`relative md:max-w-7xl mx-auto ${
          scrolled ? "md:bg-black/20 md:backdrop-blur-sm md:rounded-lg" : ""
        }`}
        style={{ willChange: willChange ? 'transform, opacity' : 'auto' }}
      >
        {/* Mobile-only glass background */}
        <div className="md:hidden absolute inset-0 bg-[#2E2A405C] backdrop-blur-md rounded-full" />

        {/* Content container */}
        <div className="relative flex items-center justify-between py-3 px-5 md:px-8 z-10">
          {/* Logo */}
          <motion.h3
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="text-2xl font-bold text-white"
          >
            Ne<span className="text-primary">un</span>o
          </motion.h3>

          {/* Desktop Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="hidden md:block relative rounded-xl p-[1px]"
          >
            {/* Glass background only */}
            <div className="absolute inset-0 bg-[#2E2A405C] backdrop-blur-md rounded-xl" />

            <ul className="relative flex items-center gap-x-8 py-3 px-10 rounded-xl z-20">
              {navItems.map((item, index) => (
                <motion.li
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.3 + (index * 0.05),
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={{ 
                    color: "#6366f1", 
                    scale: 1.05,
                    transition: { 
                      duration: 0.2,
                      ease: [0.16, 1, 0.3, 1]
                    } 
                  }}
                  className="text-white text-sm font-medium cursor-pointer"
                  key={item}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Desktop CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="hidden md:block"
          >
            <DiagonalCircularButton icon={<ArrowUpRight size={18} />}>
              Get started
            </DiagonalCircularButton>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button 
            ref={buttonRef}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="md:hidden text-white p-2 rounded-full z-20 flex items-center justify-center"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ 
                    duration: 0.2,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ 
                    duration: 0.2,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="fixed inset-0 z-40 md:hidden bg-[#0F0E13]/90 backdrop-blur-sm"
              onClick={closeMenu}
              style={{ willChange: willChange ? 'opacity' : 'auto' }}
            />
            
            {/* Menu Container */}
            <motion.div 
              ref={menuRef}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.16, 1, 0.3, 1]
              }}
              className="fixed top-20 right-4 left-4 z-40 md:hidden rounded-xl p-6 bg-[#2E2A405C] backdrop-blur-md border border-[#48407080] border-opacity-40"
              style={{ willChange: willChange ? 'transform, opacity' : 'auto' }}
            >
              <ul className="flex flex-col space-y-5 mb-6">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.1 + (index * 0.05), 
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    whileHover={{ x: 5 }}
                    className="text-white text-lg font-medium cursor-pointer"
                    onClick={closeMenu}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
              
              {/* Mobile CTA Button */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.3, 
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <DiagonalCircularButton 
                  icon={<ArrowUpRight size={18} />}
                  className="w-full"
                  onClick={closeMenu}
                >
                  Get started
                </DiagonalCircularButton>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;