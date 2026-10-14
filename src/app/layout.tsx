import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteChromeScript } from "@/components/site-chrome-script";
import { WholesaleDialog } from "@/components/wholesale-dialog";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Full Tilt Toys",
  description:
    "Family-owned toy and game company. Doodle Disaster, Bulldozer, and OTO.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full pr-6">
        {children}
        <div
          id="right-bar-top"
          aria-hidden
          className="pointer-events-none fixed top-0 right-0 z-40 w-6 bg-[#325d85]"
        />
        <div
          id="right-bar-bottom"
          aria-hidden
          className="pointer-events-none fixed right-0 z-40 w-6 bg-[#325d85]"
        />
        <WholesaleDialog />
        <SiteChromeScript />
      </body>
    </html>
  );
}
