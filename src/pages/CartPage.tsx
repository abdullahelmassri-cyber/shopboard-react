import { Link } from "react-router";
import { CartSection } from "../features/cart/components/CartSection";
import { ProductsBoundary } from "../features/products/components/ProductsBoundary";

export default function CartPage() {
  return (
    <>
      <ProductsBoundary loadingMessage="Loading your bag...">
        <CartSection />
      </ProductsBoundary>
      <section className="products" aria-label="Checkout">
        <Link className="button" to="/checkout">
          Continue to checkout
        </Link>
      </section>
    </>
  );
}
