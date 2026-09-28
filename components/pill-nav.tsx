import Link from "next/link";

type PillNavProps = {
  current?: "work" | "about" | "resume";
};

const items = [
  { name: "Work", href: "/", key: "work" as const },
  { name: "About", href: "/about.html", key: "about" as const },
  { name: "Resume", href: "/resume.pdf", key: "resume" as const },
];

export function PillNav({ current }: PillNavProps) {
  return (
    <nav className="flex justify-center pt-7">
      <div className="flex items-center gap-1 rounded-full border border-hairline/70 bg-white/55 p-1 backdrop-blur-sm">
        {items.map((item) => {
          const active = current === item.key;
          const className = active
            ? "rounded-full bg-white px-4 py-1.5 text-[14px] text-navy shadow-[0_1px_2px_rgba(43,55,72,0.06)]"
            : "rounded-full px-4 py-1.5 text-[14px] text-ink-soft transition-colors hover:text-navy";

          return item.href.startsWith("/") && !item.href.includes(".") ? (
            <Link key={item.key} href={item.href} aria-current={active ? "page" : undefined} className={className}>
              {item.name}
            </Link>
          ) : (
            <a key={item.key} href={item.href} aria-current={active ? "page" : undefined} className={className}>
              {item.name}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
