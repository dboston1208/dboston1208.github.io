import { isValidElement, type ReactNode } from "react";
import type { CaseStudyAnchor } from "@/lib/case-studies/types";

export const SLIDES = [
  { id: "overview", label: "Overview", title: "Overview" },
  { id: "problem", label: "Problem", title: "Problem" },
  { id: "research", label: "Research", title: "Research & solutions" },
  { id: "results", label: "Results", title: "Results" },
  { id: "impact", label: "Impact", title: "Impact" },
] as const;

export type SlideId = (typeof SLIDES)[number]["id"];

export const slideAnchors: CaseStudyAnchor[] = SLIDES.map(({ id, label }) => ({ id, label }));

// ~15 lines at 17px in the 680px prose column: what fits on one 1440x900
// screen alongside the slide header and a single image.
export const DEFAULT_WORD_BUDGET = 180;

function words(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// Counts rendered copy, including image captions (they take slide space too).
export function countWords(node: ReactNode): number {
  if (node == null || typeof node === "boolean") return 0;
  if (typeof node === "string" || typeof node === "number") return words(String(node));
  if (Array.isArray(node)) return node.reduce<number>((n, child) => n + countWords(child), 0);
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode; caption?: unknown };
    const caption = typeof props.caption === "string" ? words(props.caption) : 0;
    return caption + countWords(props.children);
  }
  return 0;
}

type CaseSlideProps = {
  slide: SlideId;
  budget?: number;
  children: ReactNode;
};

export function CaseSlide({ slide, budget = DEFAULT_WORD_BUDGET, children }: CaseSlideProps) {
  const index = SLIDES.findIndex((s) => s.id === slide);
  const { title } = SLIDES[index];
  const wordCount = countWords(children);
  const over = wordCount > budget;
  const showMarker = over && process.env.NODE_ENV === "development";

  return (
    <section
      id={slide}
      className="case-slide"
      data-words={wordCount}
      data-word-budget={budget}
      data-over-length={showMarker || undefined}
    >
      <div className="case-prose case-slide__body">
        <header className="case-slide__header">
          <p className="case-slide__num">
            {String(index + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </p>
          <h2>{title}</h2>
          {showMarker ? (
            <p className="case-slide__over" role="note">
              Over length: {wordCount} words against a {budget}-word slide budget ({Math.round((wordCount / budget) * 100)}%)
            </p>
          ) : null}
        </header>

        {children}
      </div>
    </section>
  );
}
