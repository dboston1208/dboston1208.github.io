import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import { WorkCard } from "@/components/work-card";
import { ProfileHeader } from "@/components/profile-header";
import { Recommendations } from "@/components/recommendations";
import StickyScrollRevealDemo from "@/components/sticky-scroll-reveal-demo";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/projects";

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

        {/*
          Reference quote. Uncomment once Susan's quote is in hand.
          Keep it to two sentences; wrap one phrase in <em> for the sand accent.

          <section className="mt-[120px] bg-navy px-8 py-18 text-page">
            <blockquote className="max-w-[820px] text-[32px] leading-[1.3]">
              “QUOTE SENTENCE ONE. <em className="text-sand not-italic">Emphasized phrase</em> in sentence two.”
              <cite className="mt-[22px] block text-[15px] not-italic text-sand">
                Susan LASTNAME, TITLE at Global Payments ·{" "}
                <a href="https://www.linkedin.com/in/HANDLE" className="border-b border-sand/50">LinkedIn</a>
              </cite>
            </blockquote>
          </section>
        */}

        <Reveal>
          <section className="section-gap grid grid-cols-1 gap-10 pt-[120px] md:grid-cols-[1fr_2fr]">
            <h2 className="text-[38px]">How I work</h2>
            <ol className="grid list-none gap-8 p-0">
              {howIWork.map((item, i) => (
                <li key={item.title} className="grid grid-cols-[auto_1fr] items-baseline gap-[18px]">
                  <b className="text-[30px] leading-none font-light text-gold">{i + 1}</b>
                  <div>
                    <strong className="mb-1 block font-normal text-navy">{item.title}</strong>
                    <p className="m-0 text-[15.5px]">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        <Reveal>
          <section className="section-gap pt-[120px]">
            <Recommendations />
          </section>
        </Reveal>

        <Reveal>
          <section className="section-gap pt-[120px]">
            <StickyScrollRevealDemo />
          </section>
        </Reveal>

        <Footer />
      </div>
    </div>
  );
}
