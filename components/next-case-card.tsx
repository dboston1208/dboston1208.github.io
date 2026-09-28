import Link from "next/link";
import { CaseThumbnail } from "@/components/case-thumbnail";

type NextCaseCardProps = {
  href: string;
  outcome: string;
  client: string;
  year: string;
  image: { src: string; alt: string };
};

export function NextCaseCard({ href, outcome, client, year, image }: NextCaseCardProps) {
  return (
    <section className="case-shell border-t border-hairline pt-14">
      <h2 className="text-[17px] text-navy">What&rsquo;s next</h2>

      <Link href={href} className="group mt-6 block max-w-[440px] text-inherit">
        <CaseThumbnail src={image.src} alt={image.alt} />
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-[15px] text-ink-soft">
          <span className="transition-colors group-hover:text-navy">{outcome}</span>
          <span className="shrink-0">
            {client} · {year}
          </span>
        </div>
      </Link>
    </section>
  );
}
