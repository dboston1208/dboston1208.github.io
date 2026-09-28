const SUBLINE = [
  "I design for what people will do next.",
  "Senior Product Designer · 8 years designing B2B products people rely on every day",
];

export function ProfileHeader() {
  return (
    <header className="pt-14 pb-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logo-mark.png"
        alt=""
        className="h-14 w-14 rounded-[14px] border border-hairline bg-white object-contain p-2"
      />

      <h1 className="mt-7 text-[42px] leading-[1.05] text-navy sm:text-[56px]">David Boston</h1>

      <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.55] text-ink-soft">
        {SUBLINE[0]}
        <br />
        {SUBLINE[1]}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="#work"
          className="rounded-full bg-navy px-5 py-2.5 text-[15px] text-page transition-opacity hover:opacity-90"
        >
          See my work
        </a>
        <a
          href="mailto:YOUR@EMAIL"
          className="rounded-full border border-hairline bg-white px-5 py-2.5 text-[15px] text-navy transition-colors hover:border-sand"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
