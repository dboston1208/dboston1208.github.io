import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteNavbar } from "@/components/site-navbar";
import { Footer } from "@/components/footer";
import { CaseStudyHeader } from "@/components/case-study";
import { caseStudies } from "@/lib/case-studies";

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

  return (
    <>
      <SiteNavbar current="work" />
      <div className="page-container mx-auto max-w-[1080px] px-8 pb-16">
        <CaseStudyHeader
          title={meta.title}
          subtitle={meta.subtitle}
          stampLabel={meta.stampLabel}
          stampValue={meta.stampValue}
          fields={meta.fields}
        />
        <main className="case-body">
          <Body />
        </main>
        <Footer />
      </div>
    </>
  );
}
