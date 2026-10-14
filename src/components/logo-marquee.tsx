const logos = [
  { src: "/logos/full-tilt-toys.png", alt: "Full Tilt Toys" },
  { src: "/logos/bulldozer-games.png", alt: "Bulldozer Games" },
  { src: "/logos/oto.png", alt: "OTO" },
  { src: "/logos/nst.png", alt: "NST" },
] as const;

function LogoRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-52 px-24 sm:gap-72 sm:px-36"
      aria-hidden={ariaHidden || undefined}
    >
      {Array.from({ length: 4 }, (_, set) =>
        logos.map((logo) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${logo.src}-${set}`}
            src={logo.src}
            alt={ariaHidden ? "" : logo.alt}
            className="h-16 w-auto object-contain sm:h-20"
          />
        )),
      )}
    </div>
  );
}

export function LogoMarquee() {
  return (
    <div
      className="overflow-hidden bg-white py-6"
      aria-label="Full Tilt Toys, Bulldozer Games, OTO, and NST"
    >
      <div className="logo-marquee-track flex w-max">
        <LogoRow />
        <LogoRow ariaHidden />
      </div>
    </div>
  );
}
