export function Footer() {
  return (
    <footer className="site-footer mt-14 flex flex-wrap justify-between gap-5 border-t border-hairline pt-6 text-[15px] text-ink-soft">
      <nav className="flex gap-[22px]">
        <a href="mailto:YOUR@EMAIL" className="border-b border-transparent text-navy hover:border-sand">
          Email
        </a>
        <a href="https://www.linkedin.com/in/YOURHANDLE" className="border-b border-transparent text-navy hover:border-sand">
          LinkedIn
        </a>
        <a href="/resume.pdf" className="border-b border-transparent text-navy hover:border-sand">
          Resume
        </a>
      </nav>
      <span>© 2026 David Boston</span>
    </footer>
  );
}
