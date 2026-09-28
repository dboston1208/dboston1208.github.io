import { CaseImage, CaseSection, MetricRow } from "@/components/case-study";
import type { CaseStudy } from "./types";

const meta: CaseStudy["meta"] = {
  slug: "document-viewer",
  title: "Document Viewer",
  subtitle: 'Epic PM-1534: "One Document Viewer to Rule Them All"',
  stampLabel: "Case study 02",
  stampValue: "Released Nov 2024",
  description: "Rebuilding a scanned-plan viewer that was costing contractors bids.",
  fields: [
    { label: "Role", value: "Sr. UI Designer" },
    { label: "Squad", value: "Unassigned (floater)" },
    { label: "Timeline", value: "Jan 2024 – Jul 2025" },
    { label: "Released", value: "Nov 2024" },
  ],
  eyebrow: "ConstructConnect · 2024",
  summary: "Rebuilding a scanned-plan viewer that was costing contractors bids.",
  hero: {
    src: "/assets/cover-document-viewer.png",
    alt: "Document Viewer with in-document search and keyword highlighting",
  },
  anchors: [
    { id: "overview", label: "Overview" },
    { id: "decisions", label: "Decisions" },
    { id: "outcome", label: "Outcome" },
    { id: "reflection", label: "Reflection" },
  ],
};

function Body() {
  return (
    <>
      <CaseSection num="01" label="Overview" id="overview">
        <p>
          Not squad-assigned during this project. UX and UI both worked as floaters across multiple concurrent
          projects and apps. I paired with a UX design partner who led discovery and journey mapping, while I owned
          interaction and visual design across the download and search experiences through multiple rounds of user
          testing.
        </p>
        <p>
          All three phases released: View &amp; Download, Search Within Viewer, then sharing and takeoff
          integration. It reached Project Intelligence Pro users in November 2024 with every target metric hit, and
          stayed in daily use until July 2025, when it was rolled back at full exposure for reasons that had nothing
          to do with the design. More on that in the outcome.
        </p>
      </CaseSection>

      <CaseSection num="02" label="The Problem">
        <p>
          Customers wanted to qualify projects faster. The existing document viewer worked against that goal at
          nearly every step: large documents sometimes took minutes to load, scrolling and zooming were clunky,
          there was no multi-page PDF export, and the document tree only went two digits deep on CSI codes, forcing
          users to download an entire division to find one spec.
        </p>
        <p>
          Users had built workarounds instead of reporting the problem as broken. Some downloaded from Project
          Intelligence and re-uploaded into Bluebeam just to annotate. Others downloaded to a phone, then uploaded to
          SharePoint, because the desktop viewer was too unreliable to trust. In VOC interviews, multiple users
          independently described the experience as chaotic and unorganized.
        </p>
        <p>
          The trigger to rebuild was infrastructure: a move to Elastic Search exposed use cases, like NOT/NEAR/AND
          keyword operators, the old viewer couldn&rsquo;t support. But the opportunity was bigger than a technical
          migration.
        </p>
        <blockquote>
          The document viewer wasn&rsquo;t a standalone feature. It was the connecting app between the qualification
          workflow and the estimation workflow, and the surface Building Product Manufacturer accounts would need
          before they could migrate off the legacy platform onto Project Intelligence. Fixing it had leverage across
          two initiatives, not one.
        </blockquote>
      </CaseSection>

      <CaseSection num="03" label="My Role">
        <p>
          Paired with a UX design partner who led discovery interviews and journey mapping. I owned interaction and
          visual design end to end across the search and download experiences, running multiple rounds of user
          testing on both.
        </p>
      </CaseSection>

      <CaseSection num="04" label="Discovery & Research">
        <p>
          My UX partner led VOC interviews and journey mapping; I sat in on sessions and worked from the output. The
          most useful finding wasn&rsquo;t anything users said directly. It was what they&rsquo;d built around the
          problem.
        </p>
        <p>
          Nobody had filed the viewer as broken. That mattered more than any single complaint. Workarounds as
          elaborate as the ones above tell you what the problem actually costs, because you can measure it in what
          people are willing to do to avoid it.
        </p>
        <p>
          Journey mapping placed the viewer at the seam between qualification and estimation, the point where a user
          decides whether a project is worth pursuing. That reframed the work from &ldquo;make the viewer
          faster&rdquo; to &ldquo;stop breaking the handoff between two workflows.&rdquo;
        </p>
      </CaseSection>

      <CaseSection num="05" label="Process">
        <p>
          Design went through four rounds of search-design iteration and two rounds on the download experience, each
          round tested before the next began rather than batched into a single validation at the end.
        </p>
        <p>
          The two tracks needed different things. Search was a comprehension problem. Could users tell which
          documents matched, and why? Each round tested whether people could read the result set correctly. Download
          was the opposite kind of work. Once export moved beyond one file at a time, the button had to account for
          every condition it could be in: default, hover, focus, disabled, dropdown open, multiple documents
          selected, and the combinations of those. Specifying all of it is less exploratory than search design, and
          it is exactly the detail that decides whether the build matches the spec.
        </p>
      </CaseSection>

      <CaseImage
        src="/assets/dv-download-spec.png"
        alt="Download button spec sheet showing default, selected with counts, hover, tooltip hover, focus, disabled, mobile, and dropdown-active states, including the multi-page PDF versus zipped PDFs format choice"
        caption="The download button, specified across every condition it can be in. The counts matter: a user selecting 2 documents and a user selecting 2,000 need the same control to behave sensibly."
      />
      <CaseImage
        src="/assets/dv-progress.png"
        alt="Progress bar component spec showing default, active with megabytes transferred, complete, and error states with cancel and retry actions"
        caption="Large document sets take real time to download, so progress needed its own states. The error state carries a retry rather than dead-ending the user."
      />

      <CaseSection num="06" label="Key Design Decisions" id="decisions">
        <h2>Tab layout won testing, but didn&rsquo;t ship</h2>
        <p>
          Three layout directions were tested, including a tab layout, which won. It wasn&rsquo;t implemented; the
          shipped version was a single-document view, cut before ship due to technical feasibility constraints given
          the build timeline. Everything else validated in testing shipped intact.
        </p>

        <h2>Purple over yellow: an accessibility fix nobody asked for</h2>
        <p>
          Testing early let the team nail down the overall design as well as the keyword-highlight accessibility
          problem before shipping something that would draw complaints, or worse, go unused. Users had complained
          about the previous document viewer&rsquo;s yellow-on-white keyword highlighting for a long time.
          It&rsquo;s incredibly hard to see for people without any visual disabilities, let alone people with them.
        </p>
        <p>
          Several web-accessible color combinations were tested with users who had typical color vision as well as
          users with color vision deficiencies. Purple won. The reaction, internally and externally, exceeded
          expectations for what looked like a minor detail from the outside.
        </p>
      </CaseSection>

      <CaseImage
        src="/assets/dv-highlight.png"
        alt="Document viewer showing keyword matches for the term facility highlighted in purple across the results list and the document body, with desktop and mobile views side by side"
        caption="The shipped purple highlight, tested against several web-accessible combinations with both typical and color-deficient vision. Matches stay legible in the results list and inside the document itself."
      />

      <CaseSection num="07" label="The Solution">
        <p>
          The rebuilt viewer opens large construction document sets in under three seconds, searches inside them with
          real keyword operators, and exports any combination of pages without leaving the app. Search results can be
          filtered to matching documents only, with per-document match counts, so a user scanning a hundred-file
          project sees where the answer is instead of hunting for it.
        </p>
        <p>
          The parts users noticed most weren&rsquo;t the big ones. Purple highlighting instead of yellow. A document
          tree that goes deep enough to reach a single spec instead of an entire CSI division. Multi-page export
          where there had been none. Individually minor, collectively the difference between a tool people worked
          around and one they worked in.
        </p>
      </CaseSection>

      <CaseImage
        src="/assets/dv-matching-toggle.png"
        alt="Document viewer search results showing matching-only toggle with per-document match counts"
        caption="Search within the viewer, toggling between all documents and matching-only results, with per-document match counts."
      />

      <CaseSection num="08" label="Outcome" id="outcome">
        <p>Released to Project Intelligence Pro users in November 2024. All three target metrics were hit.</p>
        <MetricRow
          metrics={[
            { value: "25%", label: "Smaller downloads" },
            { value: "10%+", label: "Faster performance" },
            { value: "<3s", label: "Time to first document view" },
          ]}
        />
        <p>
          Then, in July 2025, after eight months at full exposure, the viewer was rolled back, not for anything in
          the design, but for networking and security failures in the underlying infrastructure.
        </p>
        <blockquote>
          Shipping isn&rsquo;t the finish line, and hitting your metrics doesn&rsquo;t make the work permanent. A
          design can be validated, adopted, and still get pulled by a layer you don&rsquo;t own.
        </blockquote>
        <p>
          I&rsquo;m including it anyway. The eight months it was live are real, the metrics held, and the
          accessibility work in particular outlived the rollback. Portfolios that only show work still standing
          aren&rsquo;t showing the job.
        </p>
      </CaseSection>

      <CaseSection num="09" label="Reflection" id="reflection">
        <p>
          <strong>What worked:</strong> Early testing caught the highlight-color problem before ship, avoiding a
          repeat of years of user complaints about the old viewer.
        </p>
        <p>
          <strong>What I&rsquo;d do differently:</strong> Push harder for research-validated features to ship as
          designed, like the tab layout, or secure a committed fast-follow rather than an open-ended
          &ldquo;later&rdquo; that risks never happening.
        </p>
        <p>
          <strong>What this unlocked:</strong> A credible surface for Building Product Manufacturer accounts, the
          foundation for the Ask Documents AI panel, and the migration effort off the legacy platform. Ask Documents
          later became the internal proof that conversational AI worked for this user base, the argument that made
          Search Assist fundable.
        </p>
      </CaseSection>
    </>
  );
}

const caseStudy: CaseStudy = { meta, Body };
export default caseStudy;
