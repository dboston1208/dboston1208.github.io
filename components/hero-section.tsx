"use client";

import { motion } from "motion/react";

const HEADLINE = "I design for what people will do next.";

export function HeroSection() {
  return (
    <section className="hero relative flex min-h-[33vh] w-full items-center bg-white">
      <div className="mx-auto w-full max-w-[1320px] px-8 py-10">
        <h1 className="hero-h1 relative mb-[22px] max-w-4xl text-[58px] leading-[1.1] tracking-[-0.01em]">
          {HEADLINE.split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03, ease: "easeInOut" }}
              className="mr-[0.28em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="hero-sub max-w-[68ch] text-xl leading-[1.5] text-ink"
        >
          Senior Product Designer · 8 years designing B2B products people rely on every day
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="mt-[26px] flex flex-wrap gap-5 text-[15px]"
        >
          <a href="mailto:YOUR@EMAIL" className="border-b border-navy text-navy">
            Email
          </a>
          <a href="https://www.linkedin.com/in/YOURHANDLE" className="border-b border-navy text-navy">
            LinkedIn
          </a>
          <span className="text-ink-soft">Atlanta · open to remote</span>
        </motion.div>
      </div>
    </section>
  );
}
