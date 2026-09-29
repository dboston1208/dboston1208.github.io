"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type CaseStudyAnchor = { id: string; label: string };

export function CaseStudyNav({ anchors }: { anchors: CaseStudyAnchor[] }) {
  const [active, setActive] = useState(anchors[0]?.id);

  useEffect(() => {
    const sections = anchors
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    // rootMargin pulls the trigger line below the sticky nav, so a section
    // counts as active once its heading clears the pill bar.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [anchors]);

  return (
    <div className="case-study-nav sticky z-20 pt-5 pb-4">
      {/* Scrolls instead of widening the page: the full anchor set is
          ~450px, wider than a phone viewport. */}
      <div className="no-scrollbar overflow-x-auto px-5">
        <div className="mx-auto flex w-max items-center gap-1 rounded-full border border-hairline/70 bg-white/80 p-1 backdrop-blur-md">
          <Link
            href="/"
            className="rounded-full px-3.5 py-1.5 text-[14px] text-ink-soft transition-colors hover:text-navy"
          >
            ← Work
          </Link>
          <span aria-hidden="true" className="h-4 w-px bg-hairline" />
          {anchors.map((anchor) => (
            <a
              key={anchor.id}
              href={`#${anchor.id}`}
              aria-current={active === anchor.id ? "true" : undefined}
              className={
                active === anchor.id
                  ? "rounded-full bg-white px-3.5 py-1.5 text-[14px] text-navy shadow-[0_1px_2px_rgba(43,55,72,0.06)]"
                  : "rounded-full px-3.5 py-1.5 text-[14px] text-ink-soft transition-colors hover:text-navy"
              }
            >
              {anchor.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
