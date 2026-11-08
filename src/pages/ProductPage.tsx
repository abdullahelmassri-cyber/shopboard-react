import { Link, useParams } from "react-router";
import { ProductsBoundary } from "../features/products/components/ProductsBoundary";
import { ProductDetails } from "../features/products/components/ProductDetails";

export default function ProductPage() {
  const { id } = useParams();
  const productId = id === undefined ? Number.NaN : Number(id);
  const isValidId = id !== undefined && /^[1-9]\d*$/.test(id) && Number.isSafeInteger(productId);

  if (!isValidId) {
    return (
      <section className="products" aria-labelledby="product-not-found-heading">
        <h1 id="product-not-found-heading">Invalid product ID</h1>
        <p>Please choose a product from the collection.</p>
        <Link className="button button--secondary" to="/">
          Back to the shop
        </Link>
      </section>
    );
  }

  return (
    <ProductsBoundary loadingMessage="Loading product details...">
      <ProductDetails productId={productId} />
    </ProductsBoundary>
  );
}
