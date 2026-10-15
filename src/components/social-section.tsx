import { socialLinks } from "@/lib/site";

function SocialIcon({ name }: { name: (typeof socialLinks)[number]["label"] }) {
  if (name === "YouTube") {
    return (
      <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden>
        <rect width="24" height="24" rx="6" fill="#FF0000" />
        <path d="M10 8.5v7l6-3.5-6-3.5z" fill="#fff" />
      </svg>
    );
  }

  if (name === "TikTok") {
    return (
      <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden>
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
      <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden>
        <defs>
          <linearGradient id="ig" x1="0" y1="24" x2="24" y2="0">
            <stop offset="0" stopColor="#f58529" />
            <stop offset="0.5" stopColor="#dd2a7b" />
            <stop offset="1" stopColor="#515bd4" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="url(#ig)" />
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
      <svg viewBox="0 0 24 24" className="size-5 shrink-0" aria-hidden>
        <rect width="24" height="24" rx="6" fill="#1877F2" />
        <path
          d="M13.7 20v-6.4h2.2l.3-2.5h-2.5V9.6c0-.7.2-1.2 1.3-1.2h1.3V6.1c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.1-3.2 3.2v1.8H9.1v2.5h2.1V20h2.5z"
          fill="#fff"
        />
      </svg>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logos/amazon.png"
      alt=""
      className="size-5 shrink-0 object-contain"
    />
  );
}

export function SocialSection() {
  const first = socialLinks[0];

  return (
    <section
      id="social"
      className="scroll-mt-24 border-t border-neutral-200 bg-white"
    >
      <div className="flex w-full justify-end px-5 py-12 sm:px-8 lg:px-10">
        <div
          id="social-frame"
          className="w-full max-w-4xl rounded-tl-[3rem] rounded-bl-[3rem] border-y-[1.5rem] border-l-[1.5rem] border-[#325d85] bg-white py-6 pl-5 pr-8 text-right sm:pl-6 sm:pr-10"
        >
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Social Media
          </h2>
          <p className="mt-3 text-base leading-7 text-neutral-600">
          Join our community! Follow us on{" "}
          <a
            id="social-platform"
            href={first.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#3d6d93] underline-offset-4 hover:underline"
          >
            {first.label}
          </a>{" "}
          for new arrivals, how-to videos, special deals, updates,
            behind-the-scenes looks, and more.
          </p>
          <ul className="mt-6 flex flex-nowrap items-center justify-end gap-x-6">
            {socialLinks.map((link) => (
              <li key={link.href} className="shrink-0">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 whitespace-nowrap text-lg font-semibold text-[#3d6d93] underline-offset-4 hover:underline"
                >
                  <SocialIcon name={link.label} />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <script
            dangerouslySetInnerHTML={{
              __html: `
(function () {
  var platforms = ${JSON.stringify(socialLinks.map(({ label, href }) => ({ label, href })))};
  var link = document.getElementById("social-platform");
  if (!link || platforms.length < 2) return;
  var index = 0;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var delay = reduce ? 8000 : 2500;
  setInterval(function () {
    index = (index + 1) % platforms.length;
    var next = platforms[index];
    link.textContent = next.label;
    link.setAttribute("href", next.href);
  }, delay);
})();
`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
