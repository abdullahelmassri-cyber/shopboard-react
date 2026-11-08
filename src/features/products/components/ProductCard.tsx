import type { SyntheticEvent } from "react";
import { useCart } from "../../cart/hooks/useCart";
import type { DisplayProduct } from "../hooks/useProducts";
import { PLACEHOLDER_IMAGE } from "../hooks/useProducts";

export interface Props {
  product: DisplayProduct;
}

export function ProductCard({ product }: Props) {
  const { addItem } = useCart();

  function handleImageError(event: SyntheticEvent<HTMLImageElement>): void {
    if (event.currentTarget.src !== PLACEHOLDER_IMAGE) {
      event.currentTarget.src = PLACEHOLDER_IMAGE;
    }
  }

  return (
    <article>
      <img
        className="product-image"
        src={product.image}
        alt={product.name}
        onError={handleImageError}
      />
      <div className="product-details">
        <p className="category">{product.category}</p>
        <h3>{product.name}</h3>
        <div className="product-purchase">
          <p className="price">${product.price.toFixed(2)}</p>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => addItem(product.id)}
            aria-label={`Add ${product.name} to cart`}
          >
            {product.inStock ? "Add to bag" : "Out of stock"}
          </button>
        </div>
      </div>
    </article>
  );
}
