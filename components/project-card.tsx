"use client";

import { motion } from "motion/react";

type ProjectCardProps = {
  href: string;
  kicker: string;
  title: string;
  tags: string[];
  image: { src: string; alt: string };
};

export function ProjectCard({ href, kicker, title, tags, image }: ProjectCardProps) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="work-card group flex flex-col gap-6 rounded-[24px] bg-[#F5F6F7] p-6 text-inherit transition-shadow duration-150 hover:shadow-md md:flex-row md:items-stretch"
    >
      <div className="flex min-w-0 flex-[35] flex-col gap-4">
        <div className="flex flex-1 flex-col justify-between rounded-2xl bg-white p-8 shadow-[0_0.6px_0.6px_-1.25px_rgba(0,0,0,0.07),0_2.29px_2.29px_-2.5px_rgba(0,0,0,0.063),0_10px_10px_-3.75px_rgba(0,0,0,0.024)]">
          <div>
            <h2 className="text-[32px] leading-tight font-bold text-navy transition-colors duration-150 group-hover:text-gold">
              {title}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{kicker}</p>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2 list-none p-0">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-[#F5F6F7] px-3 py-1 text-xs font-medium text-navy"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between px-1 text-sm font-medium text-navy">
          Case study
          <span aria-hidden="true" className="inline-block transition-transform duration-150 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>

      <div className="aspect-[16/10] min-w-0 overflow-hidden rounded-2xl bg-white shadow-[0_0.6px_0.6px_-1.25px_rgba(0,0,0,0.07),0_2.29px_2.29px_-2.5px_rgba(0,0,0,0.063),0_10px_10px_-3.75px_rgba(0,0,0,0.024)] md:aspect-auto md:flex-[60]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          className="h-full w-full bg-[#fff] object-cover object-top transition-transform duration-[400ms] ease-out group-hover:scale-[1.02]"
        />
      </div>
    </motion.a>
  );
}
