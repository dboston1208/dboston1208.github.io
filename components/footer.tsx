import Link from "next/link";
import { isRoute } from "@/components/site-nav";

const links = [
  { name: "Work", href: "/" },
  { name: "About", href: "/about.html" },
  { name: "Resume", href: "/resume" },
];

const contact = [
  { name: "YOUR@EMAIL", href: "mailto:YOUR@EMAIL" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/YOURHANDLE" },
];

export function Footer() {
  return (
    <footer className="site-footer mt-[120px] grid gap-12 border-t border-hairline pt-14 pb-6 text-[15px] sm:grid-cols-[1.4fr_1fr_1fr]">
      <div>
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-mark.png"
            alt=""
            className="h-8 w-8 rounded-[9px] border border-hairline bg-white object-contain p-1"
          />
          <span className="text-[17px] text-navy">David Boston</span>
        </div>
        <p className="mt-4 max-w-[36ch] text-ink-soft">
          Senior Product Designer · 8 years designing B2B products people rely on every day
        </p>
        <p className="mt-5 text-[13px] text-ink-soft/80">© 2026 David Boston</p>
      </div>

      <nav>
        <h2 className="text-[15px] font-normal text-navy">Links</h2>
        <ul className="mt-4 grid list-none gap-2.5 p-0">
          {links.map((link) => (
            <li key={link.href}>
              {isRoute(link.href) ? (
                <Link href={link.href} className="text-ink-soft transition-colors hover:text-navy">
                  {link.name}
                </Link>
              ) : (
                <a href={link.href} className="text-ink-soft transition-colors hover:text-navy">
                  {link.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <h2 className="text-[15px] font-normal text-navy">Contact</h2>
        <ul className="mt-4 grid list-none gap-2.5 p-0">
          {contact.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-ink-soft transition-colors hover:text-navy">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
