// Mirrors public/resume.pdf. Update both together.

export const RESUME_PDF = "/resume.pdf";
export const LINKEDIN_URL = "https://www.linkedin.com/in/david-boston-jr";
export const EMAIL = "dboston1208@gmail.com";

export const resumeSummary =
  "Senior Product Designer with 10+ years in digital product design and 8 years in B2B SaaS for construction.";

export type Role = { title: string; dates: string };

export type Company = {
  name: string;
  description?: string;
  location: string;
  dates: string;
  roles: Role[];
};

export const experience: Company[] = [
  {
    name: "ConstructConnect",
    description: "Construction project intelligence and bid management software",
    location: "Atlanta, GA",
    dates: "Jun 2018 – Present",
    roles: [
      { title: "Senior Product Designer", dates: "Jun 2025 – Present" },
      { title: "Senior UI Designer", dates: "Sep 2021 – Jun 2025" },
      { title: "User Experience Designer", dates: "Jun 2018 – Sep 2021" },
    ],
  },
  {
    name: "Global Payments",
    description: "Payment technology and software solutions",
    location: "Atlanta, GA",
    dates: "Mar 2016 – Jun 2018",
    roles: [{ title: "Associate User Experience Designer", dates: "Mar 2016 – Jun 2018" }],
  },
  {
    name: "WXIA-TV 11Alive",
    location: "Atlanta, GA",
    dates: "Dec 2014 – Mar 2016",
    roles: [{ title: "Multimedia Video Producer", dates: "Dec 2014 – Mar 2016" }],
  },
];
