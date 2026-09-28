import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import { Recommendations } from "@/components/recommendations";
import { resumeTestimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Resume | David Boston",
  description: "Experience, roles and recommendations for David Boston, Senior Product Designer.",
};

export default function ResumePage() {
  return (
    <div className="hero-glow">
      <SiteNav current="resume" />

      <div className="page-container mx-auto max-w-[1100px] px-8 pb-16">
        <header className="pt-8 pb-4 sm:pt-12">
          <h1 className="text-[42px] leading-[1.05] text-navy sm:text-[56px]">Resume</h1>
        </header>

        <Recommendations items={resumeTestimonials} className="mt-[120px]" />

        <Footer />
      </div>
    </div>
  );
}
