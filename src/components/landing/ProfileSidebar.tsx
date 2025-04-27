"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }

    document.documentElement.classList.toggle("dark", isDarkMode);
    document.documentElement.classList.toggle("light", !isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");

    document.documentElement.classList.toggle("dark", newMode);
    document.documentElement.classList.toggle("light", !newMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

interface ProfileSidebarProps {
  delay?: number;
  vibrateInterval?: number;
}

export default function ProfileSidebar({
  delay = 3000,
  vibrateInterval = 5000,
}: ProfileSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldVibrate, setShouldVibrate] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, toggleTheme } = useTheme();

  // Start vibration after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldVibrate(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Handle outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    }

    // Add event listener if panel is expanded
    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <>
      {/* Bar indicator - only visible when popup is closed */}
      {!isExpanded && (
        <motion.div
          className="fixed right-5 top-20 z-40"
          initial={{ x: 0 }}
          animate={
            shouldVibrate
              ? {
                  x: [0, -3, 3, -3, 0],
                  transition: {
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: vibrateInterval / 1000,
                  },
                }
              : {}
          }
        >
          <motion.div
            className="cursor-pointer bg-black/20 backdrop-blur-sm rounded-l-md px-1 py-2 border-l border-t border-b border-green-500/20"
            onClick={() => setIsExpanded(true)}
            whileHover={{ x: -2 }}
          >
            <div className="h-12 w-1 bg-gradient-to-b from-[#B1FDCF] to-[#0BC572] rounded-full" />
          </motion.div>
        </motion.div>
      )}

      {/* Expanded profile panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            ref={popupRef}
            className="fixed right-5 top-20 z-40 bg-black/30 backdrop-blur-md rounded-xl border border-gray-700/30 w-64 p-4 shadow-xl"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-white font-medium text-sm">Profile</h5>
              <button
                className="text-gray-400 hover:text-white rounded-full p-1 hover:bg-white/10 cursor-pointer"
                onClick={() => setIsExpanded(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                </svg>
              </button>
            </div>

            {/* Profile info */}
            <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-3 mb-4">
              <div className="flex gap-x-3 items-center">
                <Image
                  src="https://images.unsplash.com/photo-1557315360-6a350ab4eccd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTF8OTQ1MjQ5NHx8ZW58MHx8fHx8"
                  alt="Profile picture"
                  width={32}
                  height={32}
                  className="object-cover rounded-full aspect-square"
                />

                <div>
                  <h6 className="text-white text-sm font-medium">
                    Marian Akter Suchi
                  </h6>
                  <p className="text-gray-400 text-xs">Designer</p>
                </div>
              </div>
            </div>

            {/* Appearance Mode */}
            <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-lg p-3">
              <p className="text-white text-sm font-medium mb-2">Mode</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-xs">
                  {isDarkMode ? "Dark Mode" : "Light Mode"}
                </span>
                <button
                  onClick={toggleTheme}
                  className="relative cursor-pointer inline-block w-8 h-4 rounded-full bg-green-500/30"
                >
                  <div
                    className="absolute left-0.5 top-0.5 bg-green-400 w-3 h-3 rounded-full transition-transform duration-200"
                    style={{
                      transform: isDarkMode
                        ? "translateX(0)"
                        : "translateX(16px)",
                    }}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
