import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import { Recommendations } from "@/components/recommendations";
import { resumeTestimonials } from "@/lib/testimonials";
import { experience, LINKEDIN_URL, RESUME_PDF, resumeSummary } from "@/lib/experience";

export const metadata: Metadata = {
  title: "Resume | David Boston",
  description: "Experience, roles and recommendations for David Boston, Senior Product Designer.",
};

export default function ResumePage() {
  return (
    <div className="hero-glow">
      <SiteNav current="resume" />

      <div className="page-container mx-auto max-w-[1100px] px-8 pb-16">
        <header data-nav-hero className="pt-8 pb-4 sm:pt-12">
          <h1 className="text-[42px] leading-[1.05] text-navy sm:text-[56px]">Resume</h1>
          <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.55] text-balance text-ink-soft">{resumeSummary}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={RESUME_PDF}
              className="rounded-full bg-navy px-5 py-2.5 text-[15px] text-page transition-opacity hover:opacity-90"
            >
              Download PDF
            </a>
            <a
              href={LINKEDIN_URL}
              className="rounded-full border border-hairline bg-white px-5 py-2.5 text-[15px] text-navy transition-colors hover:border-sand"
            >
              LinkedIn
            </a>
          </div>
        </header>

        <section aria-labelledby="experience-heading" className="mt-16 max-w-[900px] sm:mt-20">
          <h2 id="experience-heading" className="text-[15px] font-medium tracking-normal text-gold">
            Experience
          </h2>

          <ol className="mt-5 list-none p-0">
            {experience.map((company) => (
              <li key={company.name} className="border-t border-hairline py-7 first:border-t-0 first:pt-2">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="text-[22px] text-navy">{company.name}</h3>
                  <span className="text-[14px] text-ink-soft">
                    {company.location} · {company.dates}
                  </span>
                </div>
                {company.description ? (
                  <p className="mt-1 text-[14px] text-ink-soft">{company.description}</p>
                ) : null}

                <ul className="mt-4 grid list-none gap-2 p-0">
                  {company.roles.map((role) => (
                    <li
                      key={role.title}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 text-[15px]"
                    >
                      <span className="text-ink">{role.title}</span>
                      <span className="text-[14px] text-ink-soft tabular-nums">{role.dates}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <Recommendations items={resumeTestimonials} className="mt-[120px]" />

        <Footer />
      </div>
    </div>
  );
}
