import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { DevSlot } from "@/components/dev-slot";
import { hasQuote, type Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

export function Recommendations({ items, className }: { items: Testimonial[]; className?: string }) {
  const ready = items.filter(hasQuote);

  if (ready.length === 0) {
    return (
      <DevSlot
        className={cn("min-h-32", className)}
        label="Recommendations: none added yet. Add LinkedIn recommendations to resumeTestimonials in lib/testimonials.ts"
      />
    );
  }

  return (
    <section className={className}>
      <h2 className="mb-8 text-[30px]">What people say</h2>
      <InfiniteMovingCards
        direction="left"
        speed="slow"
        items={ready.map((t) => ({
          quote: t.quote,
          name: t.name,
          title: t.title ? `${t.title}, ${t.company}` : t.company,
        }))}
      />
    </section>
  );
}
