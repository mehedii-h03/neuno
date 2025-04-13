"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useWillChange } from "framer-motion";
import { DiagonalCircularButton } from "../common/Button";

const navItems = ["Home", "Projects", "Services", "About", "Contact"];

// Gradient border component to reduce repetition
const GradientBorder = memo(({ className = "" }: { className?: string }) => (
  <div
    className={`absolute inset-0 rounded-xl border border-[#48407080] opacity-40 ${className}`}
  />
));

GradientBorder.displayName = "GradientBorder";

// NavLink component for better separation of concerns
const NavLink = memo(
  ({
    item,
    isActive,
    onClick,
    index,
    scrolled,
  }: {
    item: string;
    isActive: boolean;
    onClick: () => void;
    index: number;
    scrolled: boolean;
  }) => (
    <motion.li
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.2 + index * 0.06,
        type: "spring",
        stiffness: 130,
        damping: 20,
        mass: 0.85,
      }}
      whileHover={{
        color: "#6366f1",
        scale: 1.01,
      }}
      className={`text-sm cursor-pointer relative ${
        isActive ? "text-primary font-medium" : "text-white"
      }`}
      onClick={onClick}
    >
      {item}
      {/* Active indicator bar that connects with the border */}
      {isActive && !scrolled && (
        <motion.div
          layoutId="desktopActiveIndicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          style={{
            bottom: "-12px",
            background: "linear-gradient(90deg, #8A7AD6, #AF9EFF)", // Gradient matching theme
          }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.li>
  )
);

NavLink.displayName = "NavLink";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const willChange = useWillChange();

  // Handle scroll effect with throttling for performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Set initial scroll state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside or resizing
  useEffect(() => {
    if (!isMenuOpen) return; // Skip if menu isn't open for performance

    const handleClickOutside = (event: MouseEvent) => {
      if (
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
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleItemClick = useCallback(
    (item: string) => {
      setActiveItem(item);
      closeMenu();
    },
    [closeMenu]
  );

  // Enhanced spring animation settings for smoother feel
  const springTransition = {
    type: "spring",
    stiffness: 130,
    damping: 20,
    mass: 0.85,
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="flex justify-center w-full">
        {/* Desktop Navbar */}
        <motion.nav
          initial={{ opacity: 0, y: -15, scale: 0.97 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            width: scrolled ? "950px" : "1280px",
          }}
          transition={{
            opacity: { duration: 0.5 },
            y: { duration: 0.5, ...springTransition },
            scale: { duration: 0.6, ...springTransition },
            width: {
              duration: 0.5,
              ...springTransition,
            },
          }}
          className="relative overflow-hidden"
          style={{
            willChange,
          }}
        >
          {/* Desktop-only glass background that appears when scrolled */}
          <motion.div
            className="hidden md:block absolute inset-0 bg-[#2E2A405C] backdrop-blur-md rounded-xl"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{
              opacity: scrolled ? 1 : 0,
              backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
            }}
            transition={{
              opacity: { duration: 0.4 },
              backdropFilter: { duration: 0.5 },
              ...springTransition,
            }}
          />

          {/* Gradient Borders */}
          {scrolled && <GradientBorder />}

          {/* Mobile-only glass background - fixed size */}
          <div className="md:hidden absolute inset-0 bg-[#2E2A405C] backdrop-blur-md rounded-xl" />
          <div className="md:hidden">
            <GradientBorder />
          </div>

          {/* Content container */}
          <div className="relative flex items-center justify-between py-1.5 px-5 md:px-8 z-10">
            {/* Logo */}
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: 1,
                x: 0,
                scale: [1, 1.03, 1],
              }}
              transition={{
                opacity: { duration: 0.4, delay: 0.1 },
                x: { duration: 0.5, delay: 0.1 },
                scale: {
                  times: [0, 0.5, 1],
                  duration: 1.2,
                  delay: 0.7,
                  ease: "easeInOut",
                },
              }}
              className="text-2xl font-bold text-white"
            >
              Ne<span className="text-primary">un</span>o
            </motion.h3>

            {/* Desktop Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.2,
              }}
              className="hidden md:block relative rounded-xl p-[1px]"
            >
              {/* Links background - only visible when not scrolled */}
              <motion.div
                className="absolute inset-0 bg-[#2E2A405C] backdrop-blur-md rounded-xl opacity-80"
                initial={{ opacity: 1 }}
                animate={{
                  opacity: scrolled ? 0 : 1,
                  scale: scrolled ? 0.95 : 1,
                }}
                transition={{
                  duration: 0.3,
                  ...springTransition,
                }}
              />

              <div className="relative">
                {!scrolled && <GradientBorder />}
                <ul className="relative flex items-center gap-x-8 py-3 px-10 rounded-xl z-20">
                  {navItems.map((item, index) => (
                    <NavLink
                      key={item}
                      item={item}
                      isActive={activeItem === item}
                      onClick={() => handleItemClick(item)}
                      index={index}
                      scrolled={scrolled}
                    />
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Desktop CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -3, 0],
              }}
              transition={{
                opacity: { duration: 0.4, delay: 0.3 },
                scale: { duration: 0.5, delay: 0.3, ...springTransition },
                y: {
                  times: [0, 0.5, 1],
                  duration: 1.5,
                  delay: 1,
                  ease: "easeInOut",
                },
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.1,
              }}
              className="md:hidden text-white p-2 rounded-xl z-50 flex items-center justify-center"
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
                    }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu - Positioned below hamburger */}
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
              }}
              className="fixed inset-0 z-40 md:hidden bg-[#0F0E13]/90 backdrop-blur-sm"
              onClick={closeMenu}
              style={{ willChange: willChange ? "opacity" : "auto" }}
            />

            {/* Menu Container */}
            <motion.div
              ref={menuRef}
              initial={{
                opacity: 0,
                y: -20,
                scaleY: 0,
                transformOrigin: "top right",
              }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -10, scaleY: 0 }}
              transition={{
                duration: 0.3,
              }}
              className="fixed top-16 right-4 z-40 md:hidden rounded-xl px-5 py-4 w-64 relative"
              style={{
                willChange: willChange ? "transform, opacity" : "auto",
                background: `
                  linear-gradient(#2E2A405C, #2E2A405C) padding-box, 
                  linear-gradient(135deg, #48407080, #8A7AD680) border-box
                `,
                border: "1.5px solid transparent",
                backdropFilter: "blur(12px)",
              }}
            >
              <ul className="flex flex-col space-y-5 mb-6">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + index * 0.05,
                      duration: 0.3,
                    }}
                    className={`text-lg cursor-pointer relative pl-4 ${
                      activeItem === item
                        ? "text-primary font-medium"
                        : "text-white"
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    {/* Active indicator bar */}
                    {activeItem === item && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="absolute bg-gradient-to-r from-[#8A7AD6] to-[#AF9EFF] w-0.5 my-auto"
                        style={{
                          left: "-21px",
                          top: 0,
                          bottom: 0,
                        }}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "80%" }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    {item}
                  </motion.li>
                ))}
              </ul>

              {/* Mobile CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.3,
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
