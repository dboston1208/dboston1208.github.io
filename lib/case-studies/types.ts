import type { ComponentType } from "react";

export type CaseStudyField = { label: string; value: string };

export type CaseStudyAnchor = { id: string; label: string };

export type CaseStudyMeta = {
  slug: string;
  title: string;
  subtitle: string;
  stampLabel: string;
  stampValue: string;
  description: string;
  fields: CaseStudyField[];
  eyebrow?: string;
  summary?: string;
  hero?: { src: string; alt: string };
  anchors?: CaseStudyAnchor[];
};

export type CaseStudy = {
  meta: CaseStudyMeta;
  Body: ComponentType;
};
