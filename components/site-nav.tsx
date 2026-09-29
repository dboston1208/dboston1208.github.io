"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isRoute } from "@/lib/routes";

type SiteNavProps = {
  current?: "work" | "about" | "resume";
};

const items = [
  { name: "Work", href: "/", key: "work" as const },
  { name: "About", href: "/about", key: "about" as const },
  { name: "Resume", href: "/resume", key: "resume" as const },
  { name: "Contact", href: "#contact", key: "contact" as const },
];

const PILL_AFTER = 60;
// Ignore scroll jitter smaller than this before flipping hide/reveal.
const DIRECTION_THRESHOLD = 8;

export function SiteNav({ current }: SiteNavProps) {
  const [pill, setPill] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      // Pages mark their hero with data-nav-hero; the nav only hides once
      // the reader is past it.
      const hero = document.querySelector("[data-nav-hero]");
      const heroEnd = hero ? hero.getBoundingClientRect().bottom + y : 400;

      setPill(y > PILL_AFTER);

      if (y <= heroEnd) {
        setHidden(false);
        lastY = y;
      } else if (Math.abs(y - lastY) >= DIRECTION_THRESHOLD) {
        setHidden(y > lastY);
        lastY = y;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    // Enable transitions only after the first measured state, so reloading
    // mid-page doesn't animate from the top state.
    const enable = requestAnimationFrame(() => setReady(true));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(enable);
    };
  }, []);

  // Lets the sticky case-study section nav tuck up when the main nav hides.
  useEffect(() => {
    document.documentElement.toggleAttribute("data-nav-hidden", hidden);
    return () => document.documentElement.removeAttribute("data-nav-hidden");
  }, [hidden]);

  return (
    <>
      <header
        className="site-nav"
        data-pill={pill || undefined}
        data-hidden={hidden || undefined}
        data-ready={ready || undefined}
      >
        <nav aria-label="Main" className="site-nav__bar">
          <Link href="/" aria-label="David Boston, home" className="site-nav__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo-mark-navy.png" alt="" className="site-nav__logo" />
            <span className="site-nav__name" aria-hidden="true">
              DAVID<b>BOSTON</b>
            </span>
          </Link>

          <ul className="site-nav__links">
            {items.map((item) => {
              const props = {
                href: item.href,
                className: "site-nav__link",
                "aria-current": current === item.key ? ("page" as const) : undefined,
              };
              return (
                <li key={item.key}>
                  {isRoute(item.href) ? <Link {...props}>{item.name}</Link> : <a {...props}>{item.name}</a>}
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {/* Holds the nav's top-state height in flow; the nav itself is fixed. */}
      <div aria-hidden="true" className="site-nav__spacer" />
    </>
  );
}
