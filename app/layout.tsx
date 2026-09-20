import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { MotionConfig } from "motion/react";
import "./globals.css";
import { cn } from "@/lib/utils";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "David Boston, Senior Product Designer",
  description:
    "Senior Product Designer. Eight years shipping B2B SaaS for construction, most recently natural-language search and onboarding for a project intelligence platform.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn(instrumentSerif.variable, inter.variable, "font-sans")}>
      <body>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
