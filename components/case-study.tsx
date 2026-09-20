import type { ReactNode } from "react";

export { CaseImage } from "./case-image";

type Field = { label: string; value: string };

type CaseStudyHeaderProps = {
  title: string;
  subtitle: string;
  stampLabel: string;
  stampValue: string;
  fields: Field[];
};

export function CaseStudyHeader({ title, subtitle, stampLabel, stampValue, fields }: CaseStudyHeaderProps) {
  return (
    <header className="title-block">
      <div className="title-block__top">
        <div className="title-block__name">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="title-block__stamp">
          <span>{stampLabel}</span>
          <strong>{stampValue}</strong>
        </div>
      </div>
      <div className="title-block__fields">
        {fields.map((field) => (
          <div key={field.label}>
            <label>{field.label}</label>
            <strong>{field.value}</strong>
          </div>
        ))}
      </div>
    </header>
  );
}

type CaseSectionProps = {
  num: string;
  label: string;
  children: ReactNode;
};

export function CaseSection({ num, label, children }: CaseSectionProps) {
  return (
    <section className="case-section">
      <div className="case-section__label">
        <span className="num">{num}</span> {label}
      </div>
      {children}
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
