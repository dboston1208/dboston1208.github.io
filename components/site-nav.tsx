import Link from "next/link";

type SiteNavProps = {
  current?: "work" | "about" | "resume";
};

const items = [
  { name: "Work", href: "/", key: "work" as const },
  { name: "About", href: "/about", key: "about" as const },
  { name: "Resume", href: "/resume", key: "resume" as const },
];

// App routes get client-side navigation; static files like /about.html and
// /resume.pdf live in public/ outside the router and need a real request.
export const isRoute = (href: string) => href.startsWith("/") && !href.includes(".");

const linkClass =
  "border-b border-transparent pb-0.5 text-[14px] text-ink-soft transition-colors hover:border-sand hover:text-navy aria-[current=page]:border-sand aria-[current=page]:text-navy";

export function SiteNav({ current }: SiteNavProps) {
  return (
    <nav className="site-nav mx-auto flex max-w-[1100px] items-center justify-between px-8 pt-7">
      <Link href="/" aria-label="David Boston, home" className="shrink-0">
        {/* The mark is an opaque PNG with a white face; multiply lets that
            face take on the page tone so the nav stays transparent. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/logo-mark.png" alt="" className="h-8 w-auto mix-blend-multiply" />
      </Link>

      <div className="flex items-center gap-6">
        {items.map((item) =>
          isRoute(item.href) ? (
            <Link
              key={item.key}
              href={item.href}
              aria-current={current === item.key ? "page" : undefined}
              className={linkClass}
            >
              {item.name}
            </Link>
          ) : (
            <a
              key={item.key}
              href={item.href}
              aria-current={current === item.key ? "page" : undefined}
              className={linkClass}
            >
              {item.name}
            </a>
          ),
        )}
      </div>
    </nav>
  );
}
