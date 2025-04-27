"use client";
import { useState, useEffect } from "react";
import HeroImage from "@/assets/landing/images/heroImage.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto"
      >
        <motion.h1
          className="text-center tracking-[0%] text-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl md:text-5xl block"
          >
            Your Smart,
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.5,
              type: "spring",
              stiffness: 100,
            }}
            className="text-5xl md:text-7xl font-semibold bg-gradient-to-r from-[#B1FDCF] to-[#0BC572] inline-block text-transparent bg-clip-text transition-colors my-2 block"
          >
            Personalized
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-5xl md:text-7xl font-semibold block"
          >
            Dashboard
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <motion.p className="max-w-[60ch] mx-auto mt-8 md:mt-10 text-center text-base md:text-lg">
            <motion.span
              initial={{ color: "#B1FDCF" }}
              animate={{ color: "#01C671" }}
              transition={{
                duration: 1.5,
                delay: 1.1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="font-semibold transition-colors"
            >
              Neuno
            </motion.span>{" "}
            <span className="text-text-secondary font-extralight tracking-tighter transition-colors">
              brings everything you need — weather, tasks, news, calendar, and
              more into a refined, AI-enhanced space that intuitively adapts to
              your life.
            </span>
          </motion.p>

          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-[#017340] to-[#0BC572] text-white rounded-lg font-medium flex items-center gap-2 relative overflow-hidden group"
            >
              <span>Get Started</span>
              <motion.div
                initial={{ x: -5 }}
                animate={{ x: 0 }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              >
                <ArrowRight size={18} />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                whileHover={{ opacity: 0.15 }}
              />
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mt-12 md:mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.7,
            type: "spring",
            stiffness: 50,
          }}
        >
          <motion.div
            className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#01734050] to-[#B1FDCF50] opacity-50 blur-md"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
          <motion.div
            className="relative mx-auto max-w-4xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={HeroImage}
              width={636}
              alt="Hero Image"
              className="mx-auto rounded-lg shadow-lg"
            />
            <motion.div
              className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[#01734030] to-[#B1FDCF30] opacity-0"
              animate={{
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror",
                delay: 1,
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
