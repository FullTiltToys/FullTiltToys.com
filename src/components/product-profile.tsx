import { ArrowUpRight } from "lucide-react";

import { products } from "@/lib/site";

type Product = (typeof products)[number];

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

function paragraphs(product: Product) {
  return Array.isArray(product.description)
    ? product.description
    : [product.description];
}

export function ProductCard({ product }: { product: Product }) {
  const { card } = product;
  const shop = Boolean(card.cta.href);

  return (
    <li id={product.slug} className="h-full scroll-mt-24">
      <article className="product-card flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
        <button
          type="button"
          data-product-open={product.slug}
          className="group/photo relative w-full cursor-pointer text-left"
        >
          <span
            className={`absolute top-3 left-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase ${
              shop
                ? "bg-[#325d85] text-white"
                : "border border-[#325d85] bg-white text-[#325d85]"
            }`}
          >
            {card.badge}
          </span>
          <span className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-neutral-50 p-4">
            {product.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.photo.src}
                alt={product.photo.alt}
                className="product-photo h-full w-full object-contain"
              />
            ) : (
              <span className="sr-only">{product.name} photo coming soon</span>
            )}
          </span>
        </button>
        <h3 className="mt-4 text-lg font-bold tracking-tight text-neutral-900">
          <button
            type="button"
            data-product-open={product.slug}
            className="cursor-pointer text-left hover:text-[#325d85]"
          >
            {card.title}
          </button>
        </h3>
        <p className="mt-1 text-sm leading-6 text-neutral-600">{card.tagline}</p>
        <p className="mt-3 text-xs tracking-wide text-neutral-500">
          {card.specs.join(" · ")}
        </p>
        {shop && card.cta.href ? (
          <a
            href={card.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="product-card-btn mt-auto pt-5 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-md bg-[#325d85] text-sm font-semibold text-white"
          >
            {card.cta.label}
            <ArrowUpRight className="size-4" />
          </a>
        ) : (
          <button
            type="button"
            data-product-open={product.slug}
            className="product-card-btn mt-auto pt-5 inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-[#325d85] bg-white text-sm font-semibold text-[#325d85]"
          >
            {card.cta.label}
          </button>
        )}
      </article>
    </li>
  );
}

export function ProductDialog({ product }: { product: Product }) {
  const more = product.more;
  const { card } = product;

  return (
    <dialog
      id={`product-dialog-${product.slug}`}
      aria-labelledby={`product-dialog-title-${product.slug}`}
      className="product-dialog wholesale-dialog w-[min(44rem,calc(100vw-1.5rem))] rounded-xl border-0 bg-white p-0 text-neutral-900 shadow-xl"
    >
      <div className="px-5 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p
              className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase ${
                card.cta.href
                  ? "bg-[#325d85] text-white"
                  : "border border-[#325d85] text-[#325d85]"
              }`}
            >
              {card.badge}
            </p>
            <h2
              id={`product-dialog-title-${product.slug}`}
              className="mt-2 text-xl font-bold tracking-tight text-neutral-900"
            >
              {product.name}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {card.specs.join(" · ")}
            </p>
          </div>
          <button
            type="button"
            data-product-close
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
            aria-label={`Close ${card.title} details`}
          >
            ×
          </button>
        </div>

        {product.photo ? (
          <div className="mt-5 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-lg bg-neutral-50 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.photo.src}
              alt={product.photo.alt}
              className="h-full w-full object-contain"
            />
          </div>
        ) : null}

        <div className="mt-5 space-y-4">
          {paragraphs(product).map((paragraph) => (
            <p key={paragraph} className="text-sm leading-6 text-neutral-600">
              {paragraph}
            </p>
          ))}
        </div>

        {more ? (
          <div className="mt-6 space-y-6">
            {more.highlights.length > 0 ? (
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  Highlights
                </h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-600">
                  {more.highlights.map((highlight) => (
                    <li key={highlight.title}>
                      <span className="font-semibold text-neutral-900">
                        {highlight.title}:
                      </span>{" "}
                      {highlight.text}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {more.video ? (
              <video
                src={more.video.src}
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                controls={false}
                aria-label={more.video.label}
                className="w-full rounded-lg bg-neutral-50 object-contain"
              />
            ) : null}
            {more.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={more.image.src}
                alt={more.image.alt}
                className="w-full rounded-lg object-contain"
              />
            ) : null}
            {more.thanks ? (
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  Special thanks
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  {more.thanks}
                </p>
              </div>
            ) : null}
            {more.links.length > 0 ? (
              <div>
                <h3 className="text-base font-bold text-neutral-900">Links</h3>
                <ul className="mt-3 space-y-2">
                  {more.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#325d85] underline-offset-4 hover:underline"
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

        <div className="mt-6 flex flex-wrap gap-2">
          {product.cta.href ? (
            <a
              href={product.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-[#325d85] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#274a6c]"
            >
              {product.cta.label === "Get It" ? "Shop" : product.cta.label}
              <ArrowUpRight className="size-4" />
            </a>
          ) : null}
          <button
            type="button"
            data-product-close
            className="inline-flex h-10 items-center justify-center rounded-md border border-neutral-300 px-4 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
