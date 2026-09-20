import type { ComponentType } from "react";

export type CaseStudyField = { label: string; value: string };

export type CaseStudyMeta = {
  slug: string;
  title: string;
  subtitle: string;
  stampLabel: string;
  stampValue: string;
  description: string;
  fields: CaseStudyField[];
};

export type CaseStudy = {
  meta: CaseStudyMeta;
  Body: ComponentType;
};
