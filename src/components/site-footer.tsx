export function SiteFooter() {
  return (
    <footer className="relative z-50 bg-[#325d85]">
      <div className="flex items-center justify-end py-2 pr-5 pl-5">
        <a href="#home" className="relative z-50 shrink-0" aria-label="Full Tilt Toys home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/full-tilt-toys-white.png"
            alt="Full Tilt Toys"
            className="h-8 w-auto sm:h-9"
          />
        </a>
      </div>
    </footer>
  );
}
