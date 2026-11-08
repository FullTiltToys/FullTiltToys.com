import { ChevronDown, ChevronUp } from "lucide-react";

import { ContactSection } from "@/components/contact-section";
import { LogoMarquee } from "@/components/logo-marquee";
import { ProductList } from "@/components/product-list";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SocialSection } from "@/components/social-section";
import { WelcomeVideos } from "@/components/welcome-videos";
import { foundersPhotoSrc } from "@/lib/founders-photo";
const launched = [
  {
    name: "Doodle Disaster | The Art of Miscommunication",
    detail: "our first game, launched July 8, 2025.",
  },
  {
    name: "Bulldozer | It's Time to Play Dirty",
    detail: "launched March 2, 2026.",
  },
] as const;

const upcoming = [
  {
    name: "OTO | Curiously Controllable",
    detail: "a desktop fidget toy, launching in October, 2026.",
  },
  {
    name: "OTO Stainless",
    detail: "an executive desktop fidget toy.",
  },
  {
    name: "NST | Non-Stop Tops",
    detail: "an interactive spinning top that spins as long as you can.",
  },
  {
    name: "NST STEEL | Non-Stop Tops Metal Edition",
    detail: "a metal edition spinning top that spins as long as you can.",
  },
] as const;

function TimelineList({
  items,
}: {
  items: readonly { name: string; detail: string }[];
}) {
  return (
    <ul className="mt-2 space-y-2 text-base leading-7 text-neutral-600">
      {items.map((item) => (
        <li key={item.name}>
          <span className="font-semibold text-neutral-800">{item.name}</span>
          {" - "}
          {item.detail}
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <div id="home" className="min-h-full bg-white">
      <SiteHeader />
      <section className="w-full px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,44%)]">
          <div>
            <h1 className="max-w-full text-left">
              <span className="welcome-kicker block text-[1rem] leading-none sm:text-[1.125rem] lg:text-[1.25rem]">
                Welcome to
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/full-tilt-toys-wordmark.png"
                alt="Full Tilt Toys"
                className="mt-1.5 h-8 w-auto max-w-full sm:h-9 lg:h-10"
              />
            </h1>
            <p className="mt-5 text-base leading-7 text-neutral-600">
              We are a family-owned toys and games company on a simple mission:
              put the play back in toys. We design hands-on, interactive products
              that are easy to pick up, built to last, and fun for years!
            </p>
          </div>
          <div className="self-start">
            <WelcomeVideos />
          </div>
        </div>

        <details className="group mt-6 flex flex-col gap-5 overflow-visible open:mt-3 open:flex-col-reverse">
          <summary className="site-btn flex w-full cursor-pointer list-none items-center justify-center gap-1.5 rounded-md border border-[#325d85] bg-white px-3 py-2.5 text-sm font-semibold text-[#325d85] [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">More about us</span>
            <span className="hidden group-open:inline">Less about us</span>
            <ChevronDown className="size-4 group-open:hidden" />
            <ChevronUp className="hidden size-4 group-open:inline" />
          </summary>

            <div className="space-y-7">
              <p className="text-base leading-7 text-neutral-600">
                Launched in September, 2024 we are a young company who seeks to
                continue to create amazing products and develop our brands: Full
                Tilt Toys & Bulldozer Games. We’re supported by an awesome
                family and friends — and by the customers who make this
                possible.
              </p>

              <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,44%)] lg:gap-12">
                <div className="order-2 space-y-8 lg:order-1">
                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-neutral-900">
                      Organization
                    </h2>
                    <ul className="org-tree mt-3 text-sm leading-6 text-neutral-700 sm:text-base">
                      <li>
                        <span className="font-semibold text-neutral-900">
                          Full Tilt Toys, LLC
                        </span>
                        <ul>
                          <li>
                            <span className="font-semibold text-neutral-900">
                              Full Tilt Toys Toys
                            </span>
                            <ul>
                              <li>
                                <span className="font-semibold text-neutral-800">
                                  OTO | Curiously Controllable
                                </span>
                              </li>
                              <li>
                                <span className="font-semibold text-neutral-800">
                                  OTO Stainless Executive Desktop Toy
                                </span>
                              </li>
                              <li>
                                <span className="italic text-neutral-500">
                                  Future Toys...
                                </span>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <span className="font-semibold text-neutral-900">
                              NST
                            </span>
                            <ul>
                              <li>
                                <span className="font-semibold text-neutral-800">
                                  NST | Non-Stop Tops
                                </span>
                              </li>
                              <li>
                                <span className="font-semibold text-neutral-800">
                                  NST STEEL | Non-Stop Tops Metal Edition
                                </span>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <span className="font-semibold text-neutral-900">
                              Bulldozer Games
                            </span>
                            <ul>
                              <li>
                                Doodle Disaster | The Art of Miscommunication
                              </li>
                              <li>Bulldozer | It's Time to Play Dirty</li>
                              <li>
                                <span className="italic text-neutral-500">
                                  Future Games...
                                </span>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logos/full-tilt-toys.png"
                      alt="Full Tilt Toys"
                      className="h-10 w-auto object-contain sm:h-12"
                    />
                    <p className="mt-3 text-base leading-7 text-neutral-600">
                      Full Tilt Toys is our desktop, fidget, and interactive toy
                      brand. We design for a more hands-on kind of play. The way
                      toys used to be. Curious toys for all ages: easy to pick
                      up, built to last, and made to stay fun. Our goal is
                      simple: put the play back in toys.
                    </p>
                  </div>

                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logos/bulldozer-games.png"
                      alt="Bulldozer Games"
                      className="h-10 w-auto object-contain sm:h-12"
                    />
                    <p className="mt-3 text-base leading-7 text-neutral-600">
                      Bulldozer Games is our tabletop brand. We make games that
                      are easy to learn, quick to get to the table, and fun to
                      come back to. No rulebook mountain. No PhD required. No
                      decision paralysis. Our biggest measure is playability:
                      games so enjoyable you want to play them again.
                    </p>
                  </div>
                </div>

                <div className="order-1 space-y-7 lg:order-2">
                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-neutral-900">
                      Founders
                    </h2>
                    <p className="mt-2 text-base leading-snug text-neutral-800">
                      Lance & Connor
                    </p>
                    <p className="text-sm leading-snug text-neutral-500">
                      (Father & Son)
                    </p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={foundersPhotoSrc}
                      alt="Lance and Connor, founders of Full Tilt Toys"
                      width={800}
                      height={473}
                      className="mt-4 w-full rounded-lg object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-neutral-900">
                      What we’ve launched
                    </h2>
                    <TimelineList items={launched} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-neutral-900">
                      What’s next
                    </h2>
                    <TimelineList items={upcoming} />
                  </div>
                </div>
              </div>
            </div>
        </details>
      </section>
      <LogoMarquee />
      <ProductList />
      <section className="border-t border-neutral-200 bg-white">
        <div className="grid w-full gap-12 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:items-start lg:gap-0 lg:px-10">
          <div className="lg:pr-16 xl:pr-20">
            <SocialSection />
          </div>
          <ContactSection />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
