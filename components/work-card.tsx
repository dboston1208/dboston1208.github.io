import Link from "next/link";

type WorkCardProps = {
  href: string;
  outcome: string;
  client: string;
  year: string;
  metric: string;
  image: { src: string; alt: string };
};

export function WorkCard({ href, outcome, client, year, metric, image }: WorkCardProps) {
  return (
    <Link href={href} className="group block text-inherit">
      <div className="overflow-hidden rounded-[16px] bg-sand-tint p-5 sm:p-7">
        <div className="overflow-hidden rounded-[10px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.alt}
            className="aspect-[16/10] w-full bg-white object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 text-[15px] text-ink-soft sm:flex-nowrap">
        <span className="min-w-0 transition-colors group-hover:text-navy">{outcome}</span>
        <span className="shrink-0">
          {client} · {year}
        </span>
      </div>

      <p className="mt-1.5 text-[13.5px] text-gold">{metric}</p>
    </Link>
  );
}
