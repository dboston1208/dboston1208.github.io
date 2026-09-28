import type { ReactNode } from "react";
import { CaseThumbnail } from "@/components/case-thumbnail";

export { CaseImage } from "./case-image";

type Field = { label: string; value: string };

type CaseStudyHeaderProps = {
  eyebrow: string;
  title: string;
  summary: string;
  hero?: { src: string; alt: string };
  fields: Field[];
};

export function CaseStudyHeader({ eyebrow, title, summary, hero, fields }: CaseStudyHeaderProps) {
  return (
    <header className="case-shell pt-8">
      <p className="text-[15px] text-ink-soft">{eyebrow}</p>
      <h1 className="mt-3 max-w-[20ch] text-[36px] leading-[1.06] text-navy sm:text-[52px]">{title}</h1>
      <p className="mt-5 max-w-[68ch] text-[17px] text-ink-soft">{summary}</p>

      {hero ? (
        <CaseThumbnail src={hero.src} alt={hero.alt} className="mt-12" />
      ) : null}

      <dl className="case-meta mt-12 grid grid-cols-2 gap-8 border-b border-hairline pb-12 sm:grid-cols-4">
        {fields.map((field) => (
          <div key={field.label}>
            <dt className="text-[15px] text-navy">{field.label}</dt>
            <dd className="mt-1.5 text-[15px] text-ink-soft">{field.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

type CaseSectionProps = {
  num: string;
  label: string;
  id?: string;
  children: ReactNode;
};

export function CaseSection({ num, label, id, children }: CaseSectionProps) {
  return (
    <section className="case-section" id={id}>
      <div className="case-section__inner case-prose">
        <p className="case-section__label">
          <span className="num">{num}</span>
          {label}
        </p>
        {children}
      </div>
    </section>
  );
}

type Metric = { value: string; label: string };

export function MetricRow({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="metric-row">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </div>
      ))}
    </div>
  );
}

export function DecisionTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <table className="decision-table">
      <tbody>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
