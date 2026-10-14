import { ProductProfile } from "@/components/product-profile";
import { products } from "@/lib/site";

export function ProductList() {
  return (
    <section id="products" className="border-t border-neutral-200 bg-white">
      <div className="w-full py-12">
        <h2 className="flex items-center gap-3 px-5 text-2xl font-bold tracking-tight text-neutral-900 sm:gap-4 sm:px-8 lg:px-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logos/full-tilt-toys-wordmark.png"
            alt="Full Tilt Toys"
            className="h-6 w-auto sm:h-8"
          />
          <span>Product Line</span>
        </h2>
        <ul className="mt-8 space-y-10">
          {products.map((product) => (
            <ProductProfile key={product.slug} product={product} />
          ))}
        </ul>
      </div>
    </section>
  );
}
