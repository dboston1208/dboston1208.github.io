import { CaseImage, CaseSection, MetricRow, DecisionTable } from "@/components/case-study";
import type { CaseStudy } from "./types";

const meta: CaseStudy["meta"] = {
  slug: "search-starter",
  title: "Guided Onboarding",
  subtitle: "Onboarding wizard, Activation squad",
  stampLabel: "Case study 01",
  stampValue: "Shipped June 2026",
  description: "Getting new users to a useful search before they gave up.",
  fields: [
    { label: "Role", value: "Sr. Product Designer" },
    { label: "Squad", value: "Activation squad" },
    { label: "Timeline", value: "Dec 2025 – Jun 2026" },
    { label: "Shipped", value: "June 2026" },
  ],
};

function Body() {
  return (
    <>
      <CaseSection num="01" label="Overview">
        <p>
          New Project Intelligence users were struggling to get started on their own. The product&rsquo;s search and
          filtering capabilities are powerful, but only once you understand how to use them. Without guidance, new
          users either leaned heavily on ConstructConnect reps to set up their first saved searches, or they left
          before finding value.
        </p>
        <p>
          I owned the design for Guided Onboarding, a 7-screen guided onboarding wizard with role- and
          entitlement-based branching logic, in partnership with the Activation squad, outside my usual home base on
          the search squad.
        </p>
      </CaseSection>

      <CaseSection num="02" label="The Problem">
        <p>
          This created two problems. On the user side, a confusing first experience eroded trust before the product
          could prove its worth. On the business side, activation that depended on human intervention wasn&rsquo;t
          scalable.
        </p>
        <p>
          The pattern was well established going in, surfaced through both support ticket volume and user
          interviews, not just anecdote.
        </p>
        <blockquote>
          Project Intelligence&rsquo;s value only becomes visible once a user successfully completes a meaningful
          search. Everything in onboarding needed to move them toward that moment faster.
        </blockquote>
      </CaseSection>

      <CaseSection num="03" label="My Role">
        <p>
          I owned the design end-to-end, including logic spanning 7 user roles and 6 entitlement tiers. My
          responsibilities included running usability testing to validate the flow before build, coordinating with
          engineering on the conditional logic driving what each user sees and where they land after onboarding, and
          partnering with the PM throughout.
        </p>
        <p>
          I also co-ran usability testing with a fellow designer. The team had run studies in Maze before this, but
          the newer UserTesting platform let us run unmoderated think-aloud sessions with real contractors, which is
          what the branching logic needed to be tested against.
        </p>
      </CaseSection>

      <CaseImage
        src="/assets/ss-company-type.png"
        alt="Guided Onboarding onboarding wizard, first screen: company type selection"
        caption="Screen 1 of 7, company type confirmation. Sets the branching path for the rest of the wizard."
      />

      <CaseSection num="04" label="Discovery & Research">
        <p>
          The dependency on reps for search setup was identified through a combination of support ticket volume and
          user interviews. Evidence, not assumption, that new users were getting stuck.
        </p>
        <p>Rather than relying on discovery alone, the design was tested through structured usability testing before launch.</p>
        <ul>
          <li>
            <strong>Method:</strong> Unmoderated, think-aloud sessions via UserTesting
          </li>
          <li>
            <strong>Participants:</strong> 10, spanning 3 to 30+ years of construction industry experience across
            general contractors, plumbing, HVAC, and roofing trades
          </li>
          <li>
            <strong>Task:</strong> &ldquo;You&rsquo;re a plumbing specialist in Atlanta looking for new projects to
            bid on. Complete the onboarding to set up your search.&rdquo;
          </li>
        </ul>
      </CaseSection>

      <CaseImage
        src="/assets/ss-trades.png"
        alt="Trade and specialty selection screen"
        caption="Trade selection, with specialties pulled from CSI codes."
      />

      <CaseSection num="05" label="Process">
        <p>
          The role and entitlement logic was mapped across 7 roles and 6 entitlement tiers, a matrix of 42
          combinations, each with different landing pages, auto-email behavior, and search scope.
        </p>
        <p>
          The flow itself moves through 7 screens: Company Role, Trade Selection, Project Stage Preferences, Service
          Area, Project Category, Keywords, and Confirmation.
        </p>

        <MetricRow
          metrics={[
            { value: "100%", label: "Task completion" },
            { value: "4.6/5", label: "Ease rating" },
            { value: "0", label: "Critical errors" },
            { value: "80%", label: "Would use it" },
          ]}
        />

        <DecisionTable
          headers={["Metric", "Target", "Actual"]}
          rows={[
            ["Recall search steps", "60%", "100%"],
            ["Predicted results as next step", "75%", "90%"],
            ["Confidence conducting search", "75%", "90%"],
            ["Understood input → output link", "75%", "100%"],
          ]}
        />

        <p>
          What testing surfaced went beyond pass/fail. Six of ten participants explicitly praised the
          natural-language summary screen, unprompted, calling it a &ldquo;mad lib&rdquo; and a &ldquo;mission
          statement.&rdquo; One participant fundamentally misunderstood the flow&rsquo;s purpose, flagged and
          addressed before launch. A meaningful minority expected onboarding to set up a persistent profile, not a
          per-search configuration, which became the project&rsquo;s central design decision. Twenty percent wanted
          multi-role selection, and a trade-dropdown edit bug was caught in testing before it reached production.
        </p>
      </CaseSection>

      <CaseImage
        src="/assets/ss-keywords.png"
        alt="Keyword selection screen with AI-suggested keywords"
        caption="Keywords screen, AI-suggested terms capped at roughly 15, an explicit cost-versus-comprehensiveness tradeoff."
      />

      <CaseSection num="06" label="Key Design Decisions">
        <h2>Resolving the &ldquo;profile vs. search&rdquo; mental model gap</h2>
        <p>
          Testing surfaced a real split in how users understood the flow. Most correctly treated it as configuring
          one saved search. A meaningful minority expected onboarding to set up a persistent company profile
          they&rsquo;d never have to re-enter. This wasn&rsquo;t a copy problem, it was a genuine fork in product
          strategy: rebuild onboarding as a true profile, fix it through messaging alone, or land somewhere in
          between.
        </p>
        <p>
          We shipped both, cheaply. The wizard updates the user&rsquo;s actual profile and creates a default saved
          search literally named &ldquo;My Profile.&rdquo; Users get the language and mental model they expected
          while the underlying object stays a fully editable, reusable search. It&rsquo;s the hybrid the research
          pointed to, solved through naming rather than a heavier rebuild.
        </p>

        <h2>Progressive reduction for low-fit roles</h2>
        <p>
          Users who select &ldquo;Other&rdquo; as their role skip all 5 middle screens, moving straight from Company
          Role to Confirmation with no searches created. Rather than forcing irrelevant steps, the wizard still shows
          a consistent start and end, so the completion pattern stays uniform across every role.
        </p>

        <h2>Caught our own assumption mid-build</h2>
        <p>
          General Contractors were originally excluded from the Trade Selection screen. We caught that restriction
          ourselves during build and corrected it before it ever shipped, the kind of check that&rsquo;s easy to skip
          under deadline pressure.
        </p>

        <h2>Entitlement-gated document search, not feature-hidden</h2>
        <p>
          Project Intelligence Starter users don&rsquo;t get Documents in keyword search results, but they still see
          the Keywords screen and get a working search, just narrower in scope. The design choice was to degrade
          gracefully rather than hide the step entirely.
        </p>
      </CaseSection>

      <CaseImage
        src="/assets/ss-confirmation.png"
        alt="Confirmation screen showing My Profile Search and My Keywords saved searches"
        caption='Confirmation screen. "My Profile Search" is the naming decision that resolved the mental model gap without an architecture change.'
      />

      <CaseSection num="07" label="The Solution">
        <p>
          Guided Onboarding walks new users through a 7-screen guided wizard covering role, trade, project stage,
          location, category, and optional keywords, then closes with a natural-language summary of the search
          it&rsquo;s about to create. Every field in that summary is directly editable before confirming, so the
          &ldquo;black box&rdquo; feeling of an AI-assisted flow never sets in.
        </p>
      </CaseSection>

      <CaseImage
        src="/assets/ss-mobile.png"
        alt="Mobile version of the onboarding wizard"
        caption="The same flow, adapted for mobile."
        className="mx-auto block max-w-[320px]"
      />

      <CaseSection num="08" label="Outcome">
        <p>Shipped June 2026. Early results from Pendo, roughly two weeks post-launch based on 286 users:</p>
        <MetricRow
          metrics={[
            { value: "85.3%", label: "Completed" },
            { value: "25.8%", label: "Reached a match" },
            { value: "12 min", label: "Median time" },
            { value: "38%", label: "Within 5 minutes" },
          ]}
        />
        <p>
          25.8% of users who completed onboarding went on to view a curated project match afterward, the clearest
          signal that onboarding led to real value, not just flow completion. Sample size is still small, worth
          another pull once more time has passed post-launch for a sturdier read.
        </p>
      </CaseSection>

      <CaseSection num="09" label="Reflection">
        <p>
          <strong>What worked:</strong> Partnering outside my usual squad forced a cleaner handoff discipline than
          I&rsquo;m used to. Nothing could depend on context that only my own squad had. The usability testing
          investment paid for itself directly: it surfaced the profile-vs-search tension before launch, not after,
          and gave us a cheap way to resolve it through naming instead of a rebuild.
        </p>
        <p>
          <strong>What I&rsquo;d do differently:</strong> Instrument before you replace, not after. When I went
          looking for a baseline to measure Guided Onboarding against, the old onboarding page had never been tagged
          in Pendo. There was no historical funnel to compare to. That&rsquo;s an easy trap: the moment you know
          something&rsquo;s getting replaced is exactly the moment to make sure you can still measure what it used to
          do.
        </p>
        <p>
          <strong>What this unlocked:</strong> A repeatable template for testing onboarding work before it ships
          rather than after, and a case for unmoderated think-aloud testing as a standard step rather than an
          occasional one.
        </p>
      </CaseSection>
    </>
  );
}

const caseStudy: CaseStudy = { meta, Body };
export default caseStudy;
