export type Project = {
  slug: string;
  href: string;
  outcome: string;
  client: string;
  year: string;
  metric: string;
  // `screen` means the cover is a card mockup with its screen knocked out
  // (scripts/knockout-screen.mjs) and this clip plays behind it.
  image: { src: string; alt: string; screen?: { src: string; poster: string } };
  // Let this cover fill the whole thumbnail frame instead of sitting inset.
  fill?: boolean;
};

export const projects: Project[] = [
  {
    slug: "search-assist",
    href: "/work/search-assist",
    outcome: "Designing an AI search feature users would actually trust with their judgment",
    client: "ConstructConnect",
    year: "2026",
    metric: "In expanded beta",
    image: {
      src: "/assets/thumbs/search-assist.png",
      alt: "Search Assist panel open beside the search results page",
    },
    fill: true,
  },
  {
    slug: "search-starter",
    href: "/work/search-starter",
    outcome: "Getting new users to a useful search before they gave up",
    client: "ConstructConnect",
    year: "2026",
    metric: "85.3% completed onboarding",
    image: {
      src: "/assets/thumbs/search-starter-thumb.png",
      alt: "Guided onboarding wizard confirmation screen",
    },
    fill: true,
  },
  {
    slug: "document-viewer",
    href: "/work/document-viewer",
    outcome: "Getting contractors to the one page that decides a bid",
    client: "ConstructConnect",
    year: "2024",
    metric: "Under 3s to first document view",
    image: {
      src: "/assets/thumbs/document-viewer-thumb.png",
      alt: "Document Viewer with in-document search and keyword highlighting",
    },
    fill: true,
  },
  {
    slug: "applied-filters",
    href: "/work/applied-filters",
    outcome: "Auditing a shipped filter component against its spec, then triaging what actually mattered",
    client: "ConstructConnect",
    year: "2026",
    metric: "8 gaps found, 3 functional",
    image: {
      src: "/assets/thumbs/applied-filters-thumb.png",
      alt: "Applied filter pills showing project value, category, and location",
    },
    fill: true,
  },
];

export function nextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
