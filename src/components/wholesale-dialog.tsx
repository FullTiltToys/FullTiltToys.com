import {
  WHOLESALE_BUSINESS_TYPES,
  WHOLESALE_HEAR_ABOUT,
  WHOLESALE_PRODUCTS,
} from "@/lib/wholesale";
import { wholesaleFormScript } from "@/lib/wholesale-form";

const fieldClass =
  "h-9 w-full rounded-md border border-neutral-300 bg-white px-2.5 text-sm font-normal outline-none focus-visible:border-[#325d85]";

export function WholesaleDialog() {
  return (
    <>
      <dialog
        id="wholesale-dialog"
        aria-labelledby="wholesale-title"
        className="wholesale-dialog w-[min(46rem,calc(100vw-1.5rem))] rounded-xl border-0 bg-white p-0 text-neutral-900 shadow-xl"
      >
        <div className="px-5 py-5 sm:px-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2
                id="wholesale-title"
                className="text-xl font-bold tracking-tight text-neutral-900"
              >
                Wholesale inquiry
              </h2>
              <p className="mt-1 text-sm leading-6 text-neutral-600">
                Share a few details and we will follow up with catalog and
                pricing information.
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

          <div id="wholesale-panel" className="mt-5">
            <form id="wholesale-form" className="relative" noValidate>
              <div className="sr-only" aria-hidden>
                <label>
                  Fax
                  <input
                    type="text"
                    name="hp_website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
                <div className="space-y-3">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-[#325d85] uppercase">
                    Required
                  </p>
                  <label className="block space-y-1 text-sm font-medium">
                    <span className="block">
                      Full Name{" "}
                      <span className="font-semibold text-[#325d85]">*</span>
                    </span>
                    <input
                      id="wholesale-name"
                      name="fullName"
                      autoComplete="name"
                      required
                      className={fieldClass}
                    />
                  </label>
                  <label className="block space-y-1 text-sm font-medium">
                    <span className="block">
                      Company / Store Name{" "}
                      <span className="font-semibold text-[#325d85]">*</span>
                    </span>
                    <input
                      name="business"
                      autoComplete="organization"
                      required
                      className={fieldClass}
                    />
                  </label>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <label
                        htmlFor="wholesale-email"
                        className="text-sm font-medium"
                      >
                        Email{" "}
                        <span className="font-semibold text-[#325d85]">*</span>
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
                      className={fieldClass}
                    />
                  </div>
                  <fieldset className="space-y-2">
                    <legend className="text-sm font-medium">
                      Business Type{" "}
                      <span className="font-semibold text-[#325d85]">*</span>
                    </legend>
                    <span
                      id="wholesale-type-error"
                      role="alert"
                      hidden
                      className="block text-[11px] font-medium text-red-600"
                    >
                      select at least one
                    </span>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                      {WHOLESALE_BUSINESS_TYPES.map((type) => (
                        <label
                          key={type}
                          className="flex items-center gap-2 text-sm font-normal text-neutral-800"
                        >
                          <input
                            type="checkbox"
                            name="businessType"
                            value={type}
                            className="list-check"
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <label
                        htmlFor="wholesale-hear"
                        className="text-sm font-medium"
                      >
                        How did you hear about us?{" "}
                        <span className="font-semibold text-[#325d85]">*</span>
                      </label>
                      <span
                        id="wholesale-hear-error"
                        role="alert"
                        hidden
                        className="text-[11px] font-medium text-red-600"
                      >
                        please choose an option
                      </span>
                    </div>
                    <select
                      id="wholesale-hear"
                      name="hearAbout"
                      required
                      className={fieldClass}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select one
                      </option>
                      {WHOLESALE_HEAR_ABOUT.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <div id="wholesale-hear-other" className="wholesale-reveal">
                      <div className="wholesale-reveal-inner">
                        <label className="mt-2 block space-y-1 text-sm font-medium">
                          <span className="block">Please specify</span>
                          <input
                            name="hearAboutOther"
                            className={fieldClass}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-neutral-500 uppercase">
                    Optional
                  </p>
                  <fieldset className="space-y-2">
                    <legend className="text-sm font-medium">
                      Product Interest
                    </legend>
                    <div className="space-y-2">
                      {WHOLESALE_PRODUCTS.map((product) => (
                        <div key={product.id}>
                          <label className="flex items-center gap-2 text-sm font-normal text-neutral-800">
                            <input
                              type="checkbox"
                              name="product"
                              value={product.label}
                              data-qty-for={`wholesale-qty-${product.id}`}
                              className="list-check"
                            />
                            {product.label}
                          </label>
                          <div
                            id={`wholesale-qty-${product.id}`}
                            className="wholesale-reveal"
                          >
                            <div className="wholesale-reveal-inner">
                              <label className="mt-1.5 ml-6 flex items-center gap-2 text-xs font-medium text-neutral-600">
                                <span className="shrink-0">
                                  Estimated Quantity
                                </span>
                                <input
                                  type="number"
                                  name={`qty_${product.id}`}
                                  min={1}
                                  step={1}
                                  inputMode="numeric"
                                  className="h-8 w-24 rounded-md border border-neutral-300 bg-white px-2 text-sm font-normal outline-none focus-visible:border-[#325d85]"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                  <label className="block space-y-1 text-sm font-medium">
                    <span className="block">Additional Notes</span>
                    <textarea
                      name="notes"
                      rows={4}
                      className="w-full rounded-md border border-neutral-300 bg-white px-2.5 py-2 text-sm font-normal outline-none focus-visible:border-[#325d85]"
                    />
                  </label>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <label
                        htmlFor="wholesale-website"
                        className="text-sm font-medium"
                      >
                        Website
                      </label>
                      <span
                        id="wholesale-website-error"
                        role="alert"
                        hidden
                        className="text-[11px] font-medium text-red-600"
                      >
                        enter a valid website
                      </span>
                    </div>
                    <input
                      id="wholesale-website"
                      name="website"
                      type="url"
                      inputMode="url"
                      autoComplete="url"
                      placeholder="https://"
                      className={fieldClass}
                    />
                  </div>
                  <label className="block space-y-1 text-sm font-medium">
                    <span className="block">Phone</span>
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={fieldClass}
                    />
                  </label>
                </div>
              </div>

              <span
                id="wholesale-required-error"
                role="alert"
                hidden
                className="mt-4 block text-[11px] font-medium text-red-600"
              >
                please complete the required fields
              </span>
              <span
                id="wholesale-save-error"
                role="alert"
                hidden
                className="mt-4 block text-[11px] font-medium text-red-600"
              >
                could not send, try again
              </span>
              <button
                id="wholesale-submit"
                type="submit"
                className="mt-5 h-10 w-full rounded-md bg-[#325d85] text-sm font-semibold text-white transition-colors hover:bg-[#274a6c]"
              >
                Send inquiry
              </button>
            </form>
          </div>

          <div id="wholesale-thanks" hidden className="mt-8 pb-3 text-center">
            <p className="text-base leading-7 font-semibold text-neutral-900">
              Thank you for your inquiry! We’ll review your information and
              contact you shortly with our current catalog and pricing.
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
