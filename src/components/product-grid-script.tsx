import { productGridScript } from "@/lib/product-grid";

export function ProductGridScript() {
  return (
    <script
      id="product-grid-script"
      dangerouslySetInnerHTML={{ __html: productGridScript }}
    />
  );
}
