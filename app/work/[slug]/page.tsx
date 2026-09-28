import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { CaseStudyHeader } from "@/components/case-study";
import { CaseStudyNav } from "@/components/case-study-nav";
import { NextCaseCard } from "@/components/next-case-card";
import { caseStudies } from "@/lib/case-studies";
import { nextProject } from "@/lib/projects";

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return {};
  return {
    title: `${study.meta.title} | David Boston`,
    description: study.meta.description,
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) notFound();

  const { meta, Body } = study;
  const next = nextProject(slug);

  return (
    <div className="hero-glow">
      <CaseStudyNav anchors={meta.anchors ?? []} />

      <div className="page-container mx-auto max-w-[1100px] px-8 pb-16">
        <CaseStudyHeader
          eyebrow={meta.eyebrow ?? meta.stampValue}
          title={meta.title}
          summary={meta.summary ?? meta.description}
          hero={meta.hero}
          fields={meta.fields}
        />

        <main className="case-body">
          <Body />
        </main>

        <div className="mt-[120px]">
          <NextCaseCard
            href={next.href}
            outcome={next.outcome}
            client={next.client}
            year={next.year}
            image={next.image}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}
