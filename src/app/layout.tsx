import type { Metadata } from "next";
import { Barlow_Condensed, Geist, Geist_Mono } from "next/font/google";

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

const wordmark = Barlow_Condensed({
  variable: "--font-wordmark",
  subsets: ["latin"],
  weight: ["800"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "Full Tilt Toys",
  description:
    "Family-owned toy and game company. Doodle Disaster, Bulldozer, and OTO.",
  icons: {
    icon: [
      { url: "/icon", type: "image/png", sizes: "64x64" },
      { url: "/favicon.ico", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${wordmark.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        <WholesaleDialog />
        <SiteChromeScript />
      </body>
    </html>
  );
}
