import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import { WorkCard } from "@/components/work-card";
import { ProfileHeader } from "@/components/profile-header";
import { FeaturedTestimonial } from "@/components/featured-testimonial";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/projects";
import { featuredTestimonial } from "@/lib/testimonials";

export default function Home() {
  return (
    <div className="hero-glow">
      <SiteNav current="work" />

      <div className="page-container mx-auto max-w-[1100px] px-8 pb-16">
        <ProfileHeader />

        <main id="work" className="grid grid-cols-1 gap-x-6 gap-y-14 pt-12 sm:pt-20 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.href} delay={(i % 2) * 0.08}>
              <WorkCard {...project} />
            </Reveal>
          ))}
        </main>

        <Reveal>
          <FeaturedTestimonial testimonial={featuredTestimonial} className="mt-[120px]" />
        </Reveal>

        <Footer />
      </div>
    </div>
  );
}
