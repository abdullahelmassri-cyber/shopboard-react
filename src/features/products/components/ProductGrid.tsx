import type { DisplayProduct } from "../hooks/useProducts";
import { ProductCard } from "./ProductCard";

export interface Props {
  products: readonly DisplayProduct[];
  onAddToCart: (productId: number) => void;
}

export function ProductGrid({ products, onAddToCart }: Props) {
  return (
    <ul className="grid">
      {products.map((product) => (
        <li className="card" key={product.id}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </li>
      ))}
    </ul>
  );
}
