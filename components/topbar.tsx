import Link from "next/link";

type TopbarProps = {
  current?: "work" | "about";
};

export function Topbar({ current = "work" }: TopbarProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-hairline bg-white/92 backdrop-blur-[6px]">
      <div className="topbar-inner mx-auto flex max-w-[1320px] items-center justify-between gap-8 px-8 py-[22px]">
        <Link className="flex items-center gap-3" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo-mark.png" alt="" className="brand-logo h-[30px] w-auto" />
          <span className="text-[13px] tracking-[0.22em] text-navy uppercase">
            DAVID<b className="font-medium">BOSTON</b>
          </span>
        </Link>
        <nav className="topnav flex gap-6">
          <Link
            href="/"
            aria-current={current === "work" ? "page" : undefined}
            className="border-b-2 border-transparent pb-[3px] text-sm text-ink hover:text-gold aria-[current=page]:border-sand aria-[current=page]:text-navy"
          >
            Work
          </Link>
          <a
            href="/about.html"
            aria-current={current === "about" ? "page" : undefined}
            className="border-b-2 border-transparent pb-[3px] text-sm text-ink hover:text-gold aria-[current=page]:border-sand aria-[current=page]:text-navy"
          >
            About
          </a>
          <a href="/resume.pdf" className="border-b-2 border-transparent pb-[3px] text-sm font-medium text-gold">
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
