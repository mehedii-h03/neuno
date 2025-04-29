"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import HeroBgImage from "@/assets/landing/images/hero/heroBgImage.webp";
import HeroImage from "@/assets/landing/images/hero/heroImage.png";
import HeroBgGradient from "@/assets/landing/images/hero/HeroBgGradient.webp";

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
          className="text-center font-normal tracking-tight leading-none mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl block mb-[-0.1em]"
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-semibold bg-gradient-to-r from-[#B1FDCF] to-[#0BC572] inline-block text-transparent bg-clip-text transition-colors mb-[-0.1em]"
          >
            Personalized
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-semibold block"
          >
            Dashboard
          </motion.span>
        </motion.h1>

        <div className="relative flex flex-col justify-between h-[370px] sm:h-[500px] md:h-[530px] md:mt-8">
          {/* Background image */}
          <div
            className="absolute inset-0 w-screen bg-center bg-cover bg-no-repeat -z-10 left-1/2 transform -translate-x-1/2"
            style={{
              backgroundImage: `url(${HeroBgImage.src})`,
              backgroundColor: "black",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.p className="max-w-[60ch] mx-auto text-center text-base md:text-lg pt-[18px]">
              <motion.span
                initial={{ color: "#B1FDCF" }}
                animate={{ color: "#01C671" }}
                transition={{
                  duration: 1.5,
                  delay: 1.1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="font-semibold transition-colors "
              >
                Neuno
              </motion.span>{" "}
              <span className="text-text-secondary font-extralight tracking-tighter transition-colors">
                brings everything you need — weather, tasks, news, calendar, and
                more into a refined, AI-enhanced space that intuitively adapts
                to your life.
              </span>
            </motion.p>
          </motion.div>

          <motion.div
            className="relative"
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
              className=""
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
            </motion.div>
          </motion.div>
          <div
            className="absolute inset-0 w-screen bg-center bg-cover bg-no-repeat left-1/2 transform -translate-x-1/2 bottom-0"
            style={{
              backgroundImage: `url(${HeroBgGradient.src})`,
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
