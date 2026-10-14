"use client";

import { useEffect } from "react";
import { Home, Mail, Share2, Store } from "lucide-react";

import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    updateSiteChrome?: () => void;
  }
}

const menu = [
  { id: "home", label: "Home", href: "#home", icon: Home },
  { id: "social", label: "Social", href: "#social", icon: Share2 },
  { id: "mail", label: "Mail", href: "#contact", icon: Mail },
];

const sections = [
  { id: "now", label: "Now", href: "#doodle-disaster", tone: "now" },
  { id: "ongoing", label: "Ongoing", href: "#bulldozer", tone: "ongoing" },
  { id: "upcoming", label: "Upcoming", href: "#oto", tone: "upcoming" },
];

export function SiteHeader() {
  useEffect(() => {
    const run = () => {
      window.updateSiteChrome?.();
    };
    run();
    window.addEventListener("scroll", run, { passive: true, capture: true });
    window.addEventListener("resize", run);
    document.addEventListener("scroll", run, { passive: true, capture: true });
    return () => {
      window.removeEventListener("scroll", run, true);
      window.removeEventListener("resize", run);
      document.removeEventListener("scroll", run, true);
    };
  }, []);

  return (
    <header id="site-header" className="border-b border-neutral-200 bg-white">
      <div className="flex min-h-[6.75rem] w-full items-center pl-5 sm:min-h-[7.25rem] sm:pl-8 lg:pl-10">
        <a href="#home" className="shrink-0" aria-label="Full Tilt Toys home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/full-tilt-toys.png"
            alt="Full Tilt Toys"
            className="h-16 w-auto sm:h-[4.5rem]"
          />
        </a>
      </div>
      <nav
        id="site-nav"
        aria-label="Site"
        className="site-nav"
        suppressHydrationWarning
      >
        <div className="site-nav-links">
          {menu.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="site-nav-button h-10 gap-2 px-2 text-sm font-semibold text-white hover:bg-white/15 hover:text-white sm:px-3"
              render={<a href={item.href} />}
            >
              <item.icon className="size-4" />
              <span className="nav-label hidden sm:inline">{item.label}</span>
              <span className="sr-only sm:hidden">{item.label}</span>
            </Button>
          ))}
          <Button
            type="button"
            data-wholesale-open
            variant="ghost"
            className="site-nav-button h-10 gap-2 px-2 text-sm font-semibold text-white hover:bg-white/15 hover:text-white sm:px-3"
          >
            <Store className="size-4" />
            <span className="nav-label hidden sm:inline">Wholesale</span>
            <span className="sr-only sm:hidden">Wholesale</span>
          </Button>
        </div>
        <div className="site-status" aria-label="Product status">
          {sections.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`status-bar status-bar-${item.tone}`}
            >
              <span className="status-bar-label">{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
