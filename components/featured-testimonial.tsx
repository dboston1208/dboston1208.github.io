import { DevSlot } from "@/components/dev-slot";
import { hasQuote, type Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

function withEmphasis(quote: string, emphasis?: string) {
  if (!emphasis || !quote.includes(emphasis)) return quote;
  const [before, after] = quote.split(emphasis, 2);
  return (
    <>
      {before}
      <em className="text-sand not-italic">{emphasis}</em>
      {after}
    </>
  );
}

export function FeaturedTestimonial({ testimonial, className }: { testimonial: Testimonial; className?: string }) {
  if (!hasQuote(testimonial)) {
    return (
      <DevSlot
        className={cn("min-h-40", className)}
        label={`Featured testimonial: ${testimonial.name}, ${testimonial.company}. Add quote, title and LinkedIn in lib/testimonials.ts`}
      />
    );
  }

  const byline = [testimonial.name, testimonial.title && `${testimonial.title} at ${testimonial.company}`]
    .filter(Boolean)
    .join(", ");

  return (
    <section className={cn("rounded-[16px] bg-navy px-8 py-14 text-page sm:px-14 sm:py-18", className)}>
      <blockquote className="max-w-[820px]">
        <p className="text-[24px] leading-[1.35] font-light sm:text-[32px]">
          &ldquo;{withEmphasis(testimonial.quote, testimonial.emphasis)}&rdquo;
        </p>
        <footer className="mt-6 text-[15px] text-sand">
          {byline}
          {testimonial.linkedin ? (
            <>
              {" · "}
              <a href={testimonial.linkedin} className="border-b border-sand/50 text-sand hover:border-sand">
                LinkedIn
              </a>
            </>
          ) : null}
        </footer>
      </blockquote>
    </section>
  );
}
