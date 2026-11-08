import { use } from "react";
import type { SyntheticEvent } from "react";
import { Link } from "react-router";
import { useCart } from "../../cart/hooks/useCart";
import { PLACEHOLDER_IMAGE } from "../products.images";
import { getProductsResource } from "../products.resource";

export interface Props {
  productId: number;
}

export function ProductDetails({ productId }: Props) {
  const products = use(getProductsResource());
  const product = products.find((item) => item.id === productId);
  const { addItem } = useCart();

  if (product === undefined) {
    return (
      <section className="products" aria-labelledby="product-not-found-heading">
        <h1 id="product-not-found-heading">Product not found</h1>
        <p>This product is not available in the collection.</p>
        <Link className="button button--secondary" to="/">
          Back to the shop
        </Link>
      </section>
    );
  }

  function handleImageError(event: SyntheticEvent<HTMLImageElement>): void {
    if (event.currentTarget.src !== PLACEHOLDER_IMAGE) {
      event.currentTarget.src = PLACEHOLDER_IMAGE;
    }
  }

  return (
    <section className="hero" aria-labelledby="product-heading">
      <div className="hero-copy">
        <p className="eyebrow">{product.category}</p>
        <h1 id="product-heading">{product.name}</h1>
        <p className="price">${product.price.toFixed(2)}</p>
        <p>{product.inStock ? "In stock" : "Currently out of stock"}</p>
        <button type="button" disabled={!product.inStock} onClick={() => addItem(product.id)}>
          {product.inStock ? "Add to bag" : "Out of stock"}
        </button>
        <p>
          <Link to="/">Back to the shop</Link>
        </p>
      </div>
      <img
        className="hero-image"
        src={product.image}
        alt={product.name}
        onError={handleImageError}
      />
    </section>
  );
}
