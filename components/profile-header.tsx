import { EMAIL } from "@/lib/experience";

export function ProfileHeader() {
  return (
    <header data-nav-hero className="pt-8 pb-4 sm:pt-12">
      <h1 className="text-[42px] leading-[1.05] text-navy sm:text-[56px]">David Boston</h1>

      {/* Balanced wrapping keeps the role line from leaving a one- or
          two-word orphan when it has to break on narrow screens. */}
      <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.55] text-ink-soft">
        <span className="block text-balance">I design for what people will do next.</span>
        <span className="block text-balance">
          Senior Product Designer · 8 years designing B2B products people rely on every day
        </span>
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <a
          href="#work"
          className="rounded-full bg-navy px-5 py-2.5 text-[15px] text-page transition-opacity hover:opacity-90"
        >
          See my work
        </a>
        <a
          href={`mailto:${EMAIL}`}
          className="rounded-full border border-hairline bg-white px-5 py-2.5 text-[15px] text-navy transition-colors hover:border-sand"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
