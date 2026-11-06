import type { SyntheticEvent } from "react";
import { PLACEHOLDER_IMAGE, type DisplayProduct } from "../hooks/useProducts";

export interface Props {
  product: DisplayProduct;
  onAddToCart: (productId: number) => void;
}

export function ProductCard({ product, onAddToCart }: Props) {
  function usePlaceholderOnError(event: SyntheticEvent<HTMLImageElement>): void {
    if (event.currentTarget.src !== PLACEHOLDER_IMAGE) {
      event.currentTarget.src = PLACEHOLDER_IMAGE;
    }
  }

  const canAddToCart = product.inStock && product.cartSupported;

  return (
    <article>
      <img
        className="product-image"
        src={product.image}
        alt={product.name}
        onError={usePlaceholderOnError}
      />
      <div className="product-details">
        <p className="category">{product.category}</p>
        <h3>{product.name}</h3>
        <div className="product-purchase">
          <p className="price">${product.price.toFixed(2)}</p>
          <button
            type="button"
            disabled={!canAddToCart}
            onClick={() => onAddToCart(product.id)}
            aria-label={`Add ${product.name} to cart`}
          >
            {!product.inStock
              ? "Out of stock"
              : product.cartSupported
                ? "Add to bag"
                : "Unavailable"}
          </button>
        </div>
      </div>
    </article>
  );
}
