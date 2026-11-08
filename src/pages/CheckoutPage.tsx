import { Link } from "react-router";

export default function CheckoutPage() {
  return (
    <section className="products" aria-labelledby="checkout-heading">
      <p className="eyebrow">Almost there</p>
      <h1 id="checkout-heading">Checkout</h1>
      <p>Checkout will be available soon.</p>
      <Link className="button button--secondary" to="/cart">
        Return to your bag
      </Link>
    </section>
  );
}
