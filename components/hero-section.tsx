"use client";

import { motion } from "motion/react";

const HEADLINE =
  "I design search and AI features that people have to trust with their judgment.";

export function HeroSection() {
  return (
    <section className="hero relative w-full bg-[var(--sand-tint)]">
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-hairline md:block">
        <div className="absolute top-0 h-32 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-px bg-hairline md:block" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-hairline" />

      <div className="mx-auto max-w-[1080px] px-8 py-20 pb-16">
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
          Senior Product Designer. Eight years shipping B2B SaaS for construction, most
          recently natural-language search and onboarding for a project intelligence
          platform. I prototype in code and work closest with engineers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="mt-[26px] flex flex-wrap gap-5 text-[15px]"
        >
          <a href="mailto:YOUR@EMAIL" className="border-b border-sand text-navy">
            Email
          </a>
          <a href="https://www.linkedin.com/in/YOURHANDLE" className="border-b border-sand text-navy">
            LinkedIn
          </a>
          <span className="text-ink-soft">Atlanta · open to remote</span>
        </motion.div>
      </div>
    </section>
  );
}
