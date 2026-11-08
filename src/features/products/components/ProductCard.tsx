import type { SyntheticEvent } from "react";
import { Link } from "react-router";
import { useCart } from "../../cart/hooks/useCart";
import { PLACEHOLDER_IMAGE } from "../products.images";
import type { DisplayProduct } from "../products.types";

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
      <Link
        className="product-card-link"
        style={{ color: "inherit", textDecoration: "none" }}
        to={`/products/${product.id}`}
      >
        <img
          className="product-image"
          src={product.image}
          alt={product.name}
          onError={handleImageError}
        />
      </Link>
      <div className="product-details">
        <p className="category">{product.category}</p>
        <h3>
          <Link
            className="product-card-link"
            style={{ color: "inherit", textDecoration: "none" }}
            to={`/products/${product.id}`}
          >
            {product.name}
          </Link>
        </h3>
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
