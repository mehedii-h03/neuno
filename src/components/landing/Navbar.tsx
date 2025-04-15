"use client";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DiagonalCircularButton } from "../common/Button";

// Types
type GradientBorderProps = {
  className?: string;
};

type NavLinkProps = {
  item: string;
  isActive: boolean;
  onClick: () => void;
  index: number;
  scrolled: boolean;
};

const navItems = ["Home", "Projects", "Services", "About", "Contact"];

const GradientBorder = memo(({ className = "" }: GradientBorderProps) => (
  <div
    className={`absolute inset-0 rounded-lg border border-[#48407080] opacity-40 ${className}`}
  />
));
GradientBorder.displayName = "GradientBorder";

const NavLink = memo(
  ({ item, isActive, onClick, index, scrolled }: NavLinkProps) => (
    <motion.li
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        delay: 0.1 + index * 0.04,
        type: "tween",
      }}
      whileTap={{ scale: 0.98 }}
      className={`text-sm cursor-pointer relative ${
        isActive ? "text-primary font-medium" : "text-white"
      }`}
      onClick={onClick}
    >
      {item}
      {isActive && !scrolled && (
        <motion.div
          layoutId="desktopActiveIndicator"
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{
            bottom: "-15px",
            background: "linear-gradient(90deg, #06B6D4, #22D3EE)",
          }}
          transition={{ duration: 0.15 }}
        />
      )}
    </motion.li>
  ),
  (prev, next) =>
    prev.isActive === next.isActive && prev.scrolled === next.scrolled
);
NavLink.displayName = "NavLink";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [mounted, setMounted] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Avoid hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let ticking = false;
    let lastScrollY = 0;
    const scrollThreshold = 20;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!ticking && Math.abs(currentScrollY - lastScrollY) > 5) {
        window.requestAnimationFrame(() => {
          const shouldBeScrolled = currentScrollY > scrollThreshold;
          if (shouldBeScrolled !== scrolled) {
            setScrolled(shouldBeScrolled);
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    setScrolled(window.scrollY > scrollThreshold);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled, mounted]);

  useEffect(() => {
    if (!isMenuOpen) return;

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

  const lightTransition = {
    type: "tween" as const,
    duration: 0.2,
  };

  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="flex justify-center w-full">
        <motion.nav
          initial={false}
          animate={{
            opacity: 1,
            y: 0,
            width: scrolled ? "950px" : "1280px",
          }}
          transition={{
            opacity: { duration: 0.3 },
            y: { duration: 0.3 },
            width: { duration: 0.3 },
          }}
          className="relative overflow-hidden"
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        >
          <motion.div
            className="hidden md:block absolute inset-0 bg-[#2E2A405C] backdrop-blur-md rounded-lg"
            initial={false}
            animate={{ opacity: scrolled ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ willChange: "opacity" }}
          />

          {scrolled && <GradientBorder />}
          <div className="md:hidden absolute inset-0 bg-[#2E2A405C] backdrop-blur-md rounded-lg" />
          <div className="md:hidden">
            <GradientBorder />
          </div>

          <div className="relative flex items-center justify-between py-1.5 px-5 md:px-8 z-10">
            <motion.h3
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-white"
              style={{ transform: "translateZ(0)" }}
            >
              Ne<span className="text-primary">un</span>o
            </motion.h3>

            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="hidden md:block relative rounded-lg p-[1px]"
            >
              <motion.div
                className="absolute inset-0 bg-[#2E2A405C] backdrop-blur-md rounded-lg opacity-80"
                animate={{ opacity: scrolled ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <div className="relative">
                {!scrolled && <GradientBorder />}
                <ul className="relative flex items-center gap-x-8 py-4 px-10 rounded-lg z-20">
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

            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="hidden md:block"
              style={{ transform: "translateZ(0)" }}
            >
              <DiagonalCircularButton icon={<ArrowUpRight size={18} />}>
                Get started
              </DiagonalCircularButton>
            </motion.div>

            <motion.button
              ref={buttonRef}
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="md:hidden text-white p-2 rounded-lg z-50 flex items-center justify-center"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              whileTap={{ scale: 0.95 }}
              style={{ transform: "translateZ(0)" }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={lightTransition}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={lightTransition}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 md:hidden bg-[#0F0E13]/90 backdrop-blur-sm"
              onClick={closeMenu}
              style={{ transform: "translateZ(0)" }}
            />

            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 right-4 z-40 md:hidden rounded-lg px-5 py-4 w-64"
              style={{
                transform: "translateZ(0)",
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
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + index * 0.03,
                      duration: 0.2,
                    }}
                    className={`text-lg cursor-pointer relative pl-4 ${
                      activeItem === item
                        ? "text-primary font-medium"
                        : "text-white"
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    {activeItem === item && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="absolute bg-gradient-to-r from-[#8A7AD6] to-[#AF9EFF] w-0.5 my-auto"
                        style={{
                          left: "-21px",
                          top: 0,
                          bottom: 0,
                        }}
                        transition={{ duration: 0.15 }}
                      />
                    )}
                    {item}
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.1,
                  duration: 0.2,
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
