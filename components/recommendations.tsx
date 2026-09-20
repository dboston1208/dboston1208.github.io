import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const placeholderRecommendations = [
  {
    quote: "LinkedIn recommendation coming soon.",
    name: "Name",
    title: "Title, Company",
  },
  {
    quote: "LinkedIn recommendation coming soon.",
    name: "Name",
    title: "Title, Company",
  },
  {
    quote: "LinkedIn recommendation coming soon.",
    name: "Name",
    title: "Title, Company",
  },
  {
    quote: "LinkedIn recommendation coming soon.",
    name: "Name",
    title: "Title, Company",
  },
];

export function Recommendations() {
  return (
    <section className="recommendations border-t border-hairline py-18">
      <h2 className="how-title mb-8 text-[38px]">What people say</h2>
      <InfiniteMovingCards items={placeholderRecommendations} direction="left" speed="slow" />
    </section>
  );
}
