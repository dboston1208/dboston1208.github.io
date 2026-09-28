"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Navbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

type SiteNavbarProps = {
  current?: "work" | "about";
};

const navLinks = [{ name: "Work", href: "/", current: "work" as const }];

const linkClass =
  "border-b-2 border-transparent pb-[3px] text-sm text-ink hover:text-gold aria-[current=page]:border-navy aria-[current=page]:text-navy";

function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`relative z-20 flex items-center gap-3 ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/logo-mark.png" alt="" className="h-[26px] w-auto" />
      <span className="text-[13px] tracking-[0.22em] text-navy uppercase">
        DAVID<b className="font-medium">BOSTON</b>
      </span>
    </Link>
  );
}

export function SiteNavbar({ current = "work" }: SiteNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Navbar className="top-0">
      <NavBody className="max-w-none">
        <Logo />

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={current === link.current ? "page" : undefined}
              className={linkClass}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="/about.html"
            aria-current={current === "about" ? "page" : undefined}
            className={linkClass}
          >
            About
          </a>
          <a
            href="/resume.pdf"
            className="border-b-2 border-transparent pb-[3px] text-sm font-medium text-gold"
          >
            Resume
          </a>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <Logo />
          <MobileNavToggle isOpen={mobileOpen} onClick={() => setMobileOpen((v) => !v)} />
        </MobileNavHeader>

        <MobileNavMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-ink"
            >
              {link.name}
            </Link>
          ))}
          <a href="/about.html" onClick={() => setMobileOpen(false)} className="text-ink">
            About
          </a>
          <a href="/resume.pdf" onClick={() => setMobileOpen(false)} className="font-medium text-gold">
            Resume
          </a>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
