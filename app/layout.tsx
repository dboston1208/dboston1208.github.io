import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { MotionConfig } from "motion/react";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "David Boston, Senior Product Designer",
  description:
    "Senior Product Designer. Eight years shipping B2B SaaS for construction, most recently natural-language search and onboarding for a project intelligence platform.",
  icons: {
    icon: "/assets/logo-mark.png",
    shortcut: "/assets/logo-mark.png",
    apple: "/assets/logo-mark.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} font-sans`}>
      <body>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
