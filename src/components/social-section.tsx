import { socialLinks } from "@/lib/site";

function SocialIcon({ name }: { name: (typeof socialLinks)[number]["label"] }) {
  if (name === "YouTube") {
    return (
      <svg viewBox="0 0 24 24" className="size-11" aria-hidden>
        <rect width="24" height="24" rx="6" fill="#FF0000" />
        <path d="M10 8.5v7l6-3.5-6-3.5z" fill="#fff" />
      </svg>
    );
  }

  if (name === "TikTok") {
    return (
      <svg viewBox="0 0 24 24" className="size-11" aria-hidden>
        <rect width="24" height="24" rx="6" fill="#111" />
        <path
          d="M14.6 6.2c.7.8 1.6 1.3 2.6 1.5v2.1c-1.1 0-2.1-.3-3-1v5.4c0 2.4-1.9 4.3-4.3 4.3S5.6 16.6 5.6 14.2c0-2.3 1.8-4.2 4.1-4.3v2.2c-1.1.1-2 1-2 2.1 0 1.2 1 2.1 2.2 2.1s2.2-1 2.2-2.1V6.2h2.5z"
          fill="#fff"
        />
      </svg>
    );
  }

  if (name === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className="size-11" aria-hidden>
        <defs>
          <linearGradient id="ig-social" x1="0" y1="24" x2="24" y2="0">
            <stop offset="0" stopColor="#f58529" />
            <stop offset="0.5" stopColor="#dd2a7b" />
            <stop offset="1" stopColor="#515bd4" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="url(#ig-social)" />
        <rect
          x="6.5"
          y="6.5"
          width="11"
          height="11"
          rx="3.2"
          fill="none"
          stroke="#fff"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="12" r="2.6" fill="none" stroke="#fff" strokeWidth="1.6" />
        <circle cx="16.1" cy="7.9" r="0.8" fill="#fff" />
      </svg>
    );
  }

  if (name === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" className="size-11" aria-hidden>
        <rect width="24" height="24" rx="6" fill="#1877F2" />
        <path
          d="M13.7 20v-6.4h2.2l.3-2.5h-2.5V9.6c0-.7.2-1.2 1.3-1.2h1.3V6.1c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.1-3.2 3.2v1.8H9.1v2.5h2.1V20h2.5z"
          fill="#fff"
        />
      </svg>
    );
  }

  return (
    <span className="flex size-11 items-center justify-center overflow-hidden rounded-xl bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logos/amazon.png"
        alt=""
        className="size-11 object-cover"
      />
    </span>
  );
}

export function SocialSection() {
  return (
    <div id="social" className="scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-tight text-[#325d85]">
        Social Media
      </h2>
      <p className="mt-3 max-w-md text-base leading-7 text-neutral-600">
        Follow along for new arrivals, how-to videos, special deals, and
        behind-the-scenes looks.
      </p>
      <ul className="mt-6 flex flex-wrap items-start gap-x-5 gap-y-4 sm:gap-x-6">
        {socialLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link group flex flex-col items-center gap-2"
            >
              <span className="overflow-hidden rounded-xl shadow-sm ring-1 ring-black/5">
                <SocialIcon name={link.label} />
              </span>
              <span className="text-[11px] font-medium tracking-wide text-neutral-500 group-hover:text-[#325d85]">
                {link.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
