export type Testimonial = {
  id: string;
  quote: string | null;
  emphasis?: string;
  name: string;
  title: string | null;
  company: string;
  linkedin: string | null;
};

export function hasQuote(t: Testimonial): t is Testimonial & { quote: string } {
  return t.quote !== null && t.quote.trim() !== "";
}

// Homepage. Keep it to two sentences; `emphasis` must be an exact substring
// of `quote` and renders in sand.
export const featuredTestimonial: Testimonial = {
  id: "susan",
  quote: null,
  name: "Susan",
  title: null,
  company: "Global Payments",
  linkedin: null,
};

// Resume page. LinkedIn recommendations go here as they arrive.
export const resumeTestimonials: Testimonial[] = [];
