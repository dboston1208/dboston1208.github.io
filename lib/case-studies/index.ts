import searchAssist from "./search-assist";
import searchStarter from "./search-starter";
import documentViewer from "./document-viewer";
import appliedFilters from "./applied-filters";
import type { CaseStudy } from "./types";

export const caseStudies: Record<string, CaseStudy> = {
  [searchAssist.meta.slug]: searchAssist,
  [searchStarter.meta.slug]: searchStarter,
  [documentViewer.meta.slug]: documentViewer,
  [appliedFilters.meta.slug]: appliedFilters,
};

export type { CaseStudy } from "./types";
