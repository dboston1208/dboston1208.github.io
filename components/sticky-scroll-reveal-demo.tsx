"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";


const content = [
  {
    title: "2024",
    description:
      "Built and launched Aceternity UI and Aceternity UI Pro from scratch.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="https://assets.aceternity.com/templates/startup-1.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="startup template"
        />
      </div>
    ),
  },
  {
    title: "Early 2023",
    description:
      "I usually run out of copy, but when I see content this big, I try to integrate lorem ipsum. Here are some more examples of beautiful designs I built.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="https://assets.aceternity.com/pro/hero-sections.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="hero template"
        />
      </div>
    ),
  },
  {
    title: "Changelog",
    description: "Deployed 5 new components on Aceternity today.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="https://assets.aceternity.com/features-section.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="feature template"
        />
      </div>
    ),
  },
];
export default function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}
