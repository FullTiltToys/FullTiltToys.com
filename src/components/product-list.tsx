import { ProductGridScript } from "@/components/product-grid-script";
import { ProductCard, ProductDialog } from "@/components/product-profile";
import { products } from "@/lib/site";

export function ProductList() {
  return (
    <section
      id="products"
      className="scroll-mt-24 border-t border-neutral-200 bg-neutral-50"
    >
      <div className="w-full px-5 py-14 sm:px-8 lg:px-10">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
          Product Line
        </h2>
        <ul className="mt-8 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </ul>
      </div>
      {products
        .filter((product) => !product.card.cta.disabled)
        .map((product) => (
          <ProductDialog key={`${product.slug}-dialog`} product={product} />
        ))}
      <ProductGridScript />
    </section>
  );
}
