import { useState } from "react";
import { Link } from "react-router";
import { useCart } from "../features/cart/hooks/useCart";
import { CheckoutForm } from "../features/checkout/CheckoutForm";
import { ProductsBoundary } from "../features/products/components/ProductsBoundary";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [orderComplete, setOrderComplete] = useState(false);

  function completeDemoCheckout(): void {
    clearCart();
    setOrderComplete(true);
  }

  return (
    <section className="products checkout-page" aria-labelledby="checkout-heading">
      <p className="eyebrow">Almost there</p>
      <h1 id="checkout-heading">Checkout</h1>
      {orderComplete ? (
        <div className="notice" role="status">
          <p>Thank you. Your demo checkout is complete. No order was placed.</p>
          <Link className="button button--secondary" to="/">
            Return to the shop
          </Link>
        </div>
      ) : items.length === 0 ? (
        <div className="notice" role="status">
          <p>Your bag is empty. Add an item before continuing to checkout.</p>
          <div>
            <Link className="button button--secondary" to="/">
              Return to the shop
            </Link>{" "}
            <Link className="button button--secondary" to="/cart">
              View your bag
            </Link>
          </div>
        </div>
      ) : (
        <ProductsBoundary loadingMessage="Loading your checkout...">
          <CheckoutForm onSuccess={completeDemoCheckout} />
        </ProductsBoundary>
      )}
    </section>
  );
}
