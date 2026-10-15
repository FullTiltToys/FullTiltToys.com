import { Home, Mail, Share2, Store } from "lucide-react";

import { Button } from "@/components/ui/button";

const menu = [
  { id: "home", label: "Home", href: "#home", icon: Home },
  { id: "social", label: "Social", href: "#social", icon: Share2 },
  { id: "mail", label: "Mail", href: "#contact", icon: Mail },
];

export function SiteHeader() {
  return (
    <header id="site-header" className="bg-[#325d85]">
      <div className="flex min-h-[3.75rem] w-full items-center justify-between gap-3 pl-5 pr-3 sm:min-h-[4.15rem] sm:pl-8 sm:pr-4 lg:pl-10">
        <a href="#home" className="shrink-0" aria-label="Full Tilt Toys home">
          <span className="relative block aspect-[1909/332] h-9 overflow-hidden sm:h-[2.625rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logos/full-tilt-toys-white.png"
              alt="Full Tilt Toys"
              className="absolute top-0 left-0 w-full max-w-none"
            />
          </span>
        </a>
        <nav id="site-nav" aria-label="Site" className="flex items-center">
          {menu.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="h-10 gap-2 px-2 text-sm font-semibold text-white hover:bg-white/15 hover:text-white sm:px-3"
              render={<a href={item.href} />}
            >
              <item.icon className="size-4" />
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sr-only sm:hidden">{item.label}</span>
            </Button>
          ))}
          <Button
            type="button"
            data-wholesale-open
            variant="ghost"
            className="h-10 gap-2 px-2 text-sm font-semibold text-white hover:bg-white/15 hover:text-white sm:px-3"
          >
            <Store className="size-4" />
            <span className="hidden sm:inline">Wholesale</span>
            <span className="sr-only sm:hidden">Wholesale</span>
          </Button>
        </nav>
      </div>
    </header>
  );
}
