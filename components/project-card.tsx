"use client";

import { motion } from "motion/react";

type Stat = {
  value: string;
  label: string;
};

type ProjectCardProps = {
  href: string;
  kicker: string;
  title: string;
  tags: string[];
  stats: Stat[];
  image: { src: string; alt: string };
};

export function ProjectCard({ href, kicker, title, tags, stats, image }: ProjectCardProps) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className="work-card group grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-center gap-10 border-t border-hairline py-12 text-inherit first:border-t-0 first:pt-0"
    >
      <div className="aspect-[16/10] overflow-hidden border border-sand bg-white p-3.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover object-top transition-transform duration-[400ms] ease-out group-hover:scale-[1.02]"
        />
      </div>

      <div className="min-w-0">
        <p className="mb-2 text-sm text-ink-soft">{kicker}</p>
        <h2 className="work-card-title text-[32px] leading-[1.15] transition-colors duration-150 group-hover:text-gold">
          {title}
        </h2>

        <ul className="mt-3.5 flex flex-wrap gap-2 list-none p-0">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-sand bg-white px-[11px] py-[3px] text-[12.5px] text-navy"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="work-card-stats mt-5 flex flex-wrap gap-7 border-t border-hairline pt-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <b className="work-card-stat-value block font-serif text-[30px] leading-none font-normal text-navy">
                {stat.value}
              </b>
              <span className="text-[13px] text-ink-soft">{stat.label}</span>
            </div>
          ))}
        </div>

        <span className="mt-[18px] inline-block text-sm font-medium text-navy">
          Read case study{" "}
          <span aria-hidden="true" className="inline-block transition-transform duration-150 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </motion.a>
  );
}
