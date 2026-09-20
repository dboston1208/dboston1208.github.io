"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

type Stat = { value: string; label: string };

export type WorkStep = {
  href: string;
  kicker: string;
  title: string;
  tags: string[];
  stats: Stat[];
  image: { src: string; alt: string };
};

export function WorkStickyScroll({ steps }: { steps: WorkStep[] }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);
  const visible = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const els = stepRefs.current.filter((el): el is HTMLElement => el !== null);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = els.indexOf(entry.target as HTMLElement);
          if (index < 0) continue;
          if (entry.isIntersecting) {
            visible.current.add(index);
          } else {
            visible.current.delete(index);
          }
        }
        if (visible.current.size > 0) {
          setActive(Math.min(...visible.current));
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [steps.length]);

  return (
    <section className="work-scroll bg-white pt-4 pb-24">
      <div className="page-container mx-auto max-w-[1080px] px-8">
        <div className="work-scroll-grid grid grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-start gap-12">
          <div className="work-steps">
            {steps.map((step, index) => (
              <article
                key={step.href}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className="work-step group flex min-h-[70vh] scroll-mt-[180px] flex-col justify-center border-t border-hairline py-16 first:border-t-0"
              >
                <div className="work-step-media hidden aspect-[16/10] overflow-hidden border border-sand bg-white p-3.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={step.image.src}
                    alt={step.image.alt}
                    width={1600}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top"
                  />
                </div>

                <div
                  className={`work-step-text relative min-w-0 before:absolute before:inset-y-0 before:-left-6 before:w-px before:transition-colors before:duration-200 ${
                    active === index ? "before:bg-sand" : "before:bg-hairline"
                  }`}
                >
                  <p
                    className={`mb-2 text-sm transition-colors duration-200 ${
                      active === index ? "text-gold" : "text-ink-soft"
                    }`}
                  >
                    {step.kicker}
                  </p>
                  <h2 className="work-step-title text-[32px] leading-[1.15]">
                    <a
                      href={step.href}
                      className={`after:absolute after:inset-0 after:content-[''] transition-colors duration-200 group-hover:text-gold ${
                        active === index ? "text-navy" : "text-ink-soft"
                      }`}
                    >
                      {step.title}
                    </a>
                  </h2>

                  <ul className="mt-3.5 flex flex-wrap gap-2 list-none p-0">
                    {step.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-sand bg-white px-[11px] py-[3px] text-[12.5px] text-navy"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="work-step-stats mt-5 flex flex-wrap gap-7 border-t border-hairline pt-4">
                    {step.stats.map((stat) => (
                      <div key={stat.label}>
                        <b className="work-step-stat-value block font-serif text-[30px] leading-none font-normal text-navy">
                          {stat.value}
                        </b>
                        <span className="text-[13px] text-ink-soft">{stat.label}</span>
                      </div>
                    ))}
                  </div>

                  <span className="mt-[18px] inline-block text-sm font-medium text-navy">
                    Read case study{" "}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-150 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div aria-hidden="true" className="work-media sticky">
            <div className="border border-sand bg-white p-3.5">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                {steps.map((step, index) => (
                  <motion.img
                    key={step.href}
                    src={step.image.src}
                    alt=""
                    width={1600}
                    height={1000}
                    loading="eager"
                    decoding="async"
                    animate={{ opacity: active === index ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                ))}
              </div>
            </div>
            <p className="mt-3 text-[13px] text-ink-soft tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
