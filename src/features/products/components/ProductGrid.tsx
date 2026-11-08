import type { DisplayProduct } from "../hooks/useProducts";
import { ProductCard } from "./ProductCard";

export interface Props {
  products: readonly DisplayProduct[];
}

export function ProductGrid({ products }: Props) {
  return (
    <ul className="grid">
      {products.map((product) => (
        <li className="card" key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
