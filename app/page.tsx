import { SiteNavbar } from "@/components/site-navbar";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { HeroSection } from "@/components/hero-section";
import { Recommendations } from "@/components/recommendations";

const projects = [
  {
    href: "/work/search-assist",
    kicker: "Search Assist · 2026 · Expanded beta",
    title: "Designing an AI search feature users would actually trust with their judgment",
    tags: ["AI feature", "B2B SaaS", "0 → 1"],
    stats: [
      { value: "+10%", label: "lift target vs control" },
      { value: "≤5%", label: "thumbs-down ceiling" },
    ],
    image: {
      src: "/assets/cover-search-assist.png",
      alt: "Search Assist panel open beside the search results page",
    },
  },
  {
    href: "/work/search-starter",
    kicker: "Guided Onboarding · 2026 · Shipped",
    title: "Getting new users to a useful search before they gave up",
    tags: ["Onboarding", "B2B SaaS", "Usability tested"],
    stats: [
      { value: "85.3%", label: "onboarding completion" },
      { value: "25.8%", label: "reached a curated match" },
    ],
    image: {
      src: "/assets/cover-onboarding.png",
      alt: "Guided onboarding wizard confirmation screen",
    },
  },
  {
    href: "/work/document-viewer",
    kicker: "Document Viewer · 2024 · Shipped",
    title: "Rebuilding a scanned-plan viewer that was costing contractors bids",
    tags: ["Performance", "Accessibility", "Redesign"],
    stats: [
      { value: "25%", label: "smaller downloads" },
      { value: "<3s", label: "to first document view" },
      { value: "10%+", label: "faster performance" },
    ],
    image: {
      src: "/assets/cover-document-viewer.png",
      alt: "Document Viewer with in-document search and keyword highlighting",
    },
  },
  {
    href: "/work/applied-filters",
    kicker: "Applied Filters · 2026 · Audit complete, in triage",
    title: "Auditing a shipped filter component against its spec, then triaging what actually mattered",
    tags: ["Design QA", "Spec audit", "Cross-functional"],
    stats: [
      { value: "8", label: "gaps found" },
      { value: "3 of 8", label: "were functional, not cosmetic" },
      { value: "4", label: "screen sizes audited" },
    ],
    image: {
      src: "/assets/cover-applied-filters.png",
      alt: "Applied filter pills showing project value, category, and location",
    },
  },
];

const howIWork = [
  {
    title: "Validate before building",
    body: "Every case study here starts with what users did, not what the team assumed. Early testing is cheaper than a wrong sprint.",
  },
  {
    title: "Degrade gracefully, don't hide features",
    body: "When a user lacks access, the feature should still explain itself. Empty and disabled states are design, not edge cases.",
  },
  {
    title: "Make AI explain itself",
    body: "An AI feature people can't audit is one they won't use twice. Show the interpretation and let them correct it.",
  },
];

export default function Home() {
  return (
    <>
      <SiteNavbar current="work" />

      <HeroSection />

      <div className="page-container mx-auto max-w-[1080px] px-8 pb-16">
        <main className="grid grid-cols-1">
          {projects.map((project) => (
            <ProjectCard key={project.href} {...project} />
          ))}
        </main>
      </div>

      {/*
        Reference quote. Uncomment once Susan's quote is in hand.
        Keep it to two sentences; wrap one phrase in <em> for the sand accent.

        <section className="bg-navy text-page mt-6 py-18">
          <div className="mx-auto max-w-[1080px] px-8">
            <blockquote className="max-w-[820px] font-serif text-[32px] leading-[1.3]">
              “QUOTE SENTENCE ONE. <em className="text-sand not-italic">Emphasized phrase</em> in sentence two.”
              <cite className="mt-[22px] block font-sans text-[15px] not-italic text-sand">
                Susan LASTNAME, TITLE at Global Payments ·{" "}
                <a href="https://www.linkedin.com/in/HANDLE" className="border-b border-sand/50">LinkedIn</a>
              </cite>
            </blockquote>
          </div>
        </section>
      */}

      <div className="page-container mx-auto max-w-[1080px] px-8 pb-16">
        <section className="how-section grid grid-cols-[1fr_2fr] gap-10 border-t border-hairline py-18">
          <h2 className="how-title text-[38px]">How I work</h2>
          <ol className="grid list-none gap-[26px] p-0">
            {howIWork.map((item, i) => (
              <li key={item.title} className="grid grid-cols-[auto_1fr] items-baseline gap-[18px]">
                <b className="font-serif text-[30px] leading-none font-normal text-gold">{i + 1}</b>
                <div>
                  <strong className="mb-1 block font-medium text-navy">{item.title}</strong>
                  <p className="m-0 text-[15.5px]">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <Recommendations />

        {/*
          Experience timeline. Fill in exact months from the resume, then uncomment.

          <section className="timeline">...</section>
        */}

        <Footer />
      </div>
    </>
  );
}
