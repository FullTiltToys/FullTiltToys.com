import { mailingLists, showSubscribeForm, site } from "@/lib/site";
import { subscribeDozerScript } from "@/lib/subscribe-dozer";

export function ContactSection() {
  return (
    <div
      id="contact"
      className="scroll-mt-24 border-t border-neutral-200 pt-12 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16 xl:pl-20"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-[#325d85]">
          Contact us
        </h2>
        <p className="mt-3 max-w-md text-base leading-7 text-neutral-600">
          We’d love to hear from you. Questions, orders, or anything else —
          send us a note and we’ll get back to you.
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-5 inline-flex text-lg font-semibold text-[#325d85] underline-offset-4 hover:underline"
        >
          {site.email}
        </a>
      </div>

        {showSubscribeForm ? (
        <div id="subscribe" className="mt-6 border-t border-neutral-200 pt-6">
          <div id="subscribe-scene" className="subscribe-scene">
            <div
              id="subscribe-panel"
              className="subscribe-panel max-w-3xl"
            >
              <h2 className="text-xl font-bold tracking-tight text-neutral-900">
                Subscribe to our email list
              </h2>

              <p
                id="subscribe-thanks"
                hidden
                className="mt-4 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-700"
              >
                Thanks for joining.
              </p>

              <form id="subscribe-form" className="relative mt-3 space-y-3" noValidate>
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                  <label>
                    Website
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>
                <div className="grid gap-2.5 sm:grid-cols-3">
                  <label className="min-w-0 space-y-1 text-sm font-medium">
                    <span className="block">First name</span>
                    <input
                      name="firstName"
                      autoComplete="given-name"
                      className="h-9 w-full rounded-md border border-neutral-300 bg-white px-2.5 text-sm font-normal outline-none focus-visible:border-neutral-500"
                    />
                  </label>
                  <label className="min-w-0 space-y-1 text-sm font-medium">
                    <span className="block">Last name</span>
                    <input
                      name="lastName"
                      autoComplete="family-name"
                      className="h-9 w-full rounded-md border border-neutral-300 bg-white px-2.5 text-sm font-normal outline-none focus-visible:border-neutral-500"
                    />
                  </label>
                  <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <span
                        id="email-error"
                        role="alert"
                        hidden
                        className="text-[11px] font-medium text-red-600"
                      >
                        must enter valid email
                      </span>
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="h-9 w-full rounded-md border border-neutral-300 bg-white px-2.5 text-sm outline-none focus-visible:border-neutral-500"
                    />
                  </div>
                </div>

                <fieldset aria-label="Lists">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-sm font-medium text-neutral-900">
                      Lists
                    </span>
                    <span
                      id="list-error"
                      role="alert"
                      hidden
                      className="text-[11px] font-medium text-red-600"
                    >
                      must check one
                    </span>
                  </div>
                  <div className="mt-1.5 flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-1.5">
                    {mailingLists.map((list) => (
                      <label
                        key={list.id}
                        className="inline-flex cursor-pointer items-center gap-2 py-0.5 text-sm font-normal text-neutral-700"
                      >
                        <input
                          type="radio"
                          name="mailing-list"
                          value={list.id}
                          className="list-check"
                        />
                        <span>{list.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="space-y-1.5">
                  <span
                    id="subscribe-save-error"
                    role="alert"
                    hidden
                    className="text-[11px] font-medium text-red-600"
                  >
                    could not save, try again
                  </span>
                  <button
                    id="subscribe-btn"
                    type="submit"
                    className="subscribe-btn h-9 w-full rounded-md text-sm font-semibold"
                  >
                    Subscribe
                  </button>
                </div>
              </form>

              <ul className="mt-4 list-disc space-y-1 pl-5 text-xs leading-5 text-neutral-500">
                <li>
                  We will only email you for major updates, new releases, and
                  new products!
                </li>
                <li>We will never share your email.</li>
                <li>
                  We will never send deals, marketing gimmicks, or junk emails.
                </li>
              </ul>
            </div>

            <div
              id="dozer-out"
              className="subscribe-dozer subscribe-dozer-out"
              aria-hidden="true"
            >
              <div className="dozer-banner">
                <span className="dozer-banner-flag">thanks for joining</span>
                <span className="dozer-banner-pole" aria-hidden />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/bulldozer.png" alt="" />
            </div>
            <div
              id="dozer-back"
              className="subscribe-dozer subscribe-dozer-back"
              aria-hidden="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/bulldozer.png" alt="" />
            </div>
          </div>

          <script
            dangerouslySetInnerHTML={{ __html: subscribeDozerScript }}
          />
        </div>
        ) : null}
    </div>
  );
}
