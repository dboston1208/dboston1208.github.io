import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import { BentoGrid, BentoSlot } from "@/components/bento";

export const metadata: Metadata = {
  title: "About | David Boston",
  description: "About David Boston, Senior Product Designer.",
};

export default function AboutPage() {
  return (
    <div className="hero-glow">
      <SiteNav current="about" />

      <div className="page-container mx-auto max-w-[1100px] px-8 pb-16">
        <header className="pt-8 pb-4 sm:pt-12">
          <h1 className="text-[42px] leading-[1.05] text-navy sm:text-[56px]">About</h1>
        </header>

        {/* Desktop is a 4-column grid on 180px rows; spans below place each tile.
            Tablet collapses to 2 columns, mobile to a single stack. */}
        <BentoGrid className="mt-12 sm:mt-16">
          <BentoSlot
            name="Portrait"
            hint="headshot or working photo, square crop"
            className="md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2"
          />
          <BentoSlot
            name="Bio"
            hint="2–3 sentence introduction"
            className="md:col-span-2 lg:col-span-2"
          />
          <BentoSlot name="Now" hint="current role and what you're working on" />
          <BentoSlot name="Location" hint="where you're based and availability" />
          <BentoSlot
            name="Approach"
            hint="how you work, in a sentence or two"
            className="md:col-span-2 lg:col-span-2"
          />
          <BentoSlot
            name="Outside work"
            hint="photo from life outside design, portrait crop"
            className="md:row-span-2 lg:row-span-2"
          />
          <BentoSlot name="Contact" hint="email or a call-to-action" />
          <BentoSlot
            name="Background"
            hint="path into design: education, earlier roles"
            className="md:col-span-2 lg:col-span-2"
          />
          <BentoSlot name="Elsewhere" hint="LinkedIn, resume, other profiles" />
        </BentoGrid>

        <Footer />
      </div>
    </div>
  );
}
