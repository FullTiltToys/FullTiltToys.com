import { wholesaleFormScript } from "@/lib/wholesale-form";

export function WholesaleDialog() {
  return (
    <>
      <dialog
        id="wholesale-dialog"
        aria-labelledby="wholesale-title"
        className="wholesale-dialog w-[min(28rem,calc(100vw-1.5rem))] rounded-xl border-0 bg-white p-0 text-neutral-900 shadow-xl"
      >
        <div className="px-5 py-5 sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2
                id="wholesale-title"
                className="text-xl font-bold tracking-tight text-neutral-900"
              >
                Wholesale
              </h2>
              <p className="mt-1 text-sm leading-6 text-neutral-600">
                Tell us about your shop and we will follow up by email.
              </p>
            </div>
            <button
              type="button"
              data-wholesale-close
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
              aria-label="Close wholesale form"
            >
              ×
            </button>
          </div>

          <div id="wholesale-panel" className="mt-4">
            <form id="wholesale-form" className="relative space-y-3" noValidate>
              <div className="sr-only" aria-hidden>
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
              <label className="block space-y-1 text-sm font-medium">
                <span className="block">Name</span>
                <input
                  name="fullName"
                  autoComplete="name"
                  required
                  className="h-9 w-full rounded-md border border-neutral-300 bg-white px-2.5 text-sm font-normal outline-none focus-visible:border-neutral-500"
                />
              </label>
              <label className="block space-y-1 text-sm font-medium">
                <span className="block">Store or company</span>
                <input
                  name="business"
                  autoComplete="organization"
                  required
                  className="h-9 w-full rounded-md border border-neutral-300 bg-white px-2.5 text-sm font-normal outline-none focus-visible:border-neutral-500"
                />
              </label>
              <div className="space-y-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <label htmlFor="wholesale-email" className="text-sm font-medium">
                    Email
                  </label>
                  <span
                    id="wholesale-email-error"
                    role="alert"
                    hidden
                    className="text-[11px] font-medium text-red-600"
                  >
                    enter a valid email
                  </span>
                </div>
                <input
                  id="wholesale-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="h-9 w-full rounded-md border border-neutral-300 bg-white px-2.5 text-sm outline-none focus-visible:border-neutral-500"
                />
              </div>
              <label className="block space-y-1 text-sm font-medium">
                <span className="block">Phone (optional)</span>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="h-9 w-full rounded-md border border-neutral-300 bg-white px-2.5 text-sm font-normal outline-none focus-visible:border-neutral-500"
                />
              </label>
              <label className="block space-y-1 text-sm font-medium">
                <span className="block">What are you looking for?</span>
                <textarea
                  name="message"
                  rows={3}
                  className="w-full rounded-md border border-neutral-300 bg-white px-2.5 py-2 text-sm font-normal outline-none focus-visible:border-neutral-500"
                />
              </label>
              <span
                id="wholesale-save-error"
                role="alert"
                hidden
                className="block text-[11px] font-medium text-red-600"
              >
                could not send, try again
              </span>
              <button
                id="wholesale-submit"
                type="submit"
                className="site-btn h-9 w-full rounded-md border border-neutral-900 bg-neutral-900 text-sm font-semibold text-white"
              >
                Send
              </button>
            </form>
          </div>

          <div id="wholesale-thanks" hidden className="mt-6 pb-2 text-center">
            <p className="text-base font-semibold text-neutral-900">
              Thanks for reaching out.
            </p>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              We received your wholesale inquiry and will email you soon.
            </p>
          </div>
        </div>
      </dialog>
      <script
        id="wholesale-form-script"
        dangerouslySetInnerHTML={{ __html: wholesaleFormScript }}
      />
    </>
  );
}
