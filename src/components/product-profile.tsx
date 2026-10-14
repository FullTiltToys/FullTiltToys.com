import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Battery,
  ChevronDown,
  ChevronUp,
  Clock,
  Timer,
  Unplug,
  UserRound,
  Users,
} from "lucide-react";

import { products } from "@/lib/site";

function KickstarterIcon({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logos/kickstarter.png"
      alt=""
      className={`${className ?? ""} object-contain`}
    />
  );
}

const factIcons = {
  timer: Timer,
  clock: Clock,
  users: Users,
  user: UserRound,
  battery: Battery,
  plug: Unplug,
  kickstarter: KickstarterIcon,
} as const;

type Product = (typeof products)[number];

function ProductSquare({
  children,
  compact = false,
}: {
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex w-full items-center justify-center overflow-visible bg-white ${compact ? "" : "aspect-square"}`}
    >
      {children}
    </div>
  );
}

function LinkIcon({ name }: { name: "bgg" | "youtube" | "amazon" }) {
  if (name === "amazon") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/logos/amazon.png"
        alt=""
        className="size-5 shrink-0 object-contain"
      />
    );
  }

  if (name === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden>
        <rect width="24" height="24" rx="6" fill="#FF0000" />
        <path d="M10 8.5v7l6-3.5-6-3.5z" fill="#fff" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden>
      <rect width="24" height="24" rx="4" fill="#FF5100" />
      <path
        d="M12 3.8c1.4 0 2.5 1.1 2.5 2.5 0 1-.6 1.9-1.4 2.3.3.3.5.7.5 1.1v.7c1.5.5 3.4 1.6 3.4 3.6v5.2H7V12c0-2 1.9-3.1 3.4-3.6v-.7c0-.4.2-.8.5-1.1-.8-.4-1.4-1.3-1.4-2.3 0-1.4 1.1-2.5 2.5-2.5z"
        fill="#fff"
      />
    </svg>
  );
}

function ActionButton({
  label,
  href,
  icon,
}: {
  label: string;
  href: string | null;
  icon: string;
}) {
  const inner = (
    <>
      {label}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} alt="" className="h-5 w-auto" />
    </>
  );

  if (!href) {
    return (
      <span
        className="inline-flex h-10 shrink-0 cursor-not-allowed items-center gap-1 whitespace-nowrap rounded-md bg-neutral-400 px-2 text-[11px] font-semibold text-white"
        aria-disabled="true"
      >
        {label}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt="" className="h-4 w-auto" />
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="site-btn inline-flex h-10 items-center gap-2 rounded-md bg-neutral-900 px-3 text-sm font-semibold text-white"
    >
      {inner}
      <ArrowUpRight className="size-4" />
    </a>
  );
}

export function ProductProfile({ product }: { product: Product }) {
  const more = product.more;
  const wideMedia = product.slug === "oto";

  return (
    <li id={product.slug} className="group/profile relative scroll-mt-24">
      <p
        className={`flex min-h-10 w-full items-center px-5 text-sm font-bold tracking-wide uppercase sm:min-h-12 sm:px-8 sm:text-base lg:px-10 ${product.bannerClass}`}
      >
        {product.banner}
      </p>
      {product.facts.length > 0 ? (
        <div className="flex items-center gap-3 px-5 pt-3 sm:gap-4 sm:px-8 lg:px-10">
          {product.factsLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.factsLogo.src}
              alt={product.factsLogo.alt}
              className="h-10 w-auto shrink-0 sm:h-12"
            />
          ) : null}
          <ul className="flex min-w-0 flex-nowrap items-center gap-x-4 overflow-x-auto sm:gap-x-6">
            {product.facts.map((fact) => {
              const Icon = factIcons[fact.icon];
              return (
                <li
                  key={fact.label}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap text-base font-bold text-neutral-900 sm:text-lg"
                >
                  <Icon className="size-5 shrink-0" aria-hidden />
                  {fact.label}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      <div
        className={`grid w-full items-start gap-x-6 overflow-visible pt-4 sm:gap-x-8 ${
          wideMedia
            ? "grid-cols-[minmax(0,1fr)_min(38vw,26rem)]"
            : "grid-cols-[minmax(0,1fr)_min(29.4vw,19.6rem)]"
        }`}
      >
        <div className="min-w-0">
          <div className="px-5 pt-1 sm:px-8 lg:px-10">
            <h3 className="text-2xl font-bold text-neutral-900">
              {product.name}
            </h3>
            {(Array.isArray(product.description)
              ? product.description
              : [product.description]
            ).map((paragraph, index) => (
              <p
                key={paragraph}
                className={`text-base leading-7 text-neutral-600 ${index === 0 ? "mt-2" : "mt-4"}`}
              >
                {paragraph}
              </p>
            ))}
            {more ? (
              <div id={`${product.slug}-more`} className="mt-6">
                {more.highlights.length > 0 ? (
                  <div className="relative">
                    <div className="max-h-40 overflow-hidden group-has-[.product-more-toggle:checked]/profile:max-h-none">
                      <h4 className="text-lg font-bold text-neutral-900">
                        Highlights
                      </h4>
                      <ul className="mt-3 list-disc space-y-3 pl-5 text-base leading-7 text-neutral-600">
                        {more.highlights.map((highlight) => (
                          <li key={highlight.title}>
                            <span className="font-bold text-neutral-900">
                              {highlight.title}:
                            </span>{" "}
                            {highlight.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-white/70 to-white group-has-[.product-more-toggle:checked]/profile:hidden"
                    />
                  </div>
                ) : null}
                {more.thanks ? (
                  <div className="hidden group-has-[.product-more-toggle:checked]/profile:block">
                    <h4 className="mt-8 text-lg font-bold text-neutral-900">
                      Special thanks
                    </h4>
                    <p className="mt-3 text-base leading-7 text-neutral-600">
                      {more.thanks}
                    </p>
                  </div>
                ) : null}
                {more.links.length > 0 ? (
                  <div className="hidden group-has-[.product-more-toggle:checked]/profile:block">
                    <h4 className="mt-8 text-lg font-bold text-neutral-900">
                      Links:
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {more.links.map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-base font-semibold text-[#3d6d93] underline-offset-4 hover:underline"
                          >
                            <LinkIcon name={link.icon} />
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
        <div
          className={`flex flex-col overflow-visible ${
            product.slug === "bulldozer" || product.slug === "oto"
              ? "pr-4 sm:pr-6"
              : ""
          }`}
        >
          {product.photo ? (
            <ProductSquare compact={product.slug === "oto"}>
              {more ? (
                <label
                  htmlFor={`${product.slug}-more-toggle`}
                  className="product-photo-btn flex w-full cursor-pointer items-center justify-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.photo.src}
                    alt={product.photo.alt}
                    className={`product-photo ${
                      product.slug === "oto"
                        ? "h-auto w-full object-contain"
                        : `${product.photo.sizeClass} object-contain`
                    }`}
                  />
                </label>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.photo.src}
                  alt={product.photo.alt}
                  className={`${product.photo.sizeClass} object-contain`}
                />
              )}
            </ProductSquare>
          ) : (
            <div
              aria-label={`${product.name} photo coming soon`}
              className="aspect-square w-full bg-neutral-100"
            />
          )}
          {more ? (
            <div
              className={
                product.slug === "oto"
                  ? "mt-2 hidden space-y-2 group-has-[.product-more-toggle:checked]/profile:block"
                  : "mt-10 hidden space-y-10 group-has-[.product-more-toggle:checked]/profile:block"
              }
            >
              <ProductSquare compact={product.slug === "oto"}>
                <video
                  src={more.video.src}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  controls={false}
                  aria-label={more.video.label}
                  className={
                    product.slug === "oto"
                      ? "h-auto w-full object-contain"
                      : `${product.photo?.sizeClass ?? "h-[82%] w-[82%]"} object-contain`
                  }
                />
              </ProductSquare>
              <ProductSquare compact={product.slug === "oto"}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={more.image.src}
                  alt={more.image.alt}
                  className={
                    product.slug === "oto"
                      ? "h-auto w-full object-contain"
                      : `${product.photo?.sizeClass ?? "h-[82%] w-[82%]"} object-contain`
                  }
                />
              </ProductSquare>
            </div>
          ) : null}
          <div className="mt-3 flex flex-nowrap items-center justify-center gap-2">
            {more ? (
              <label
                htmlFor={`${product.slug}-more-toggle`}
                className="site-btn relative inline-flex h-10 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-md border border-[#2a4d32] bg-white px-2.5 text-sm font-semibold text-[#2a4d32]"
              >
                <input
                  type="checkbox"
                  id={`${product.slug}-more-toggle`}
                  tabIndex={-1}
                  className="product-more-toggle"
                />
                <span className="inline-flex items-center gap-1.5 group-has-[.product-more-toggle:checked]/profile:hidden">
                  Learn more
                  <ChevronDown className="size-4" />
                </span>
                <span className="hidden items-center gap-1.5 group-has-[.product-more-toggle:checked]/profile:inline-flex">
                  Learn Less
                  <ChevronUp className="size-4" />
                </span>
              </label>
            ) : null}
            <ActionButton
              label={product.cta.label}
              href={product.cta.href}
              icon={product.cta.icon}
            />
          </div>
        </div>
      </div>
    </li>
  );
}
