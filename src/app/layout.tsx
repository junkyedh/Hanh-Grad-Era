import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans } from "next/font/google";
import { siteContent } from "@/data/content";
import "./globals.css";

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const displayFont = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: siteContent.title,
  description: siteContent.description,
  referrer: "no-referrer",
  robots: { index: false, follow: false },
  openGraph: {
    title: siteContent.title,
    description: siteContent.description,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
