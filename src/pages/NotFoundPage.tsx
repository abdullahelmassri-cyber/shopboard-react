import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <section className="products" aria-labelledby="not-found-heading">
      <p className="eyebrow">Page not found</p>
      <h1 id="not-found-heading">We could not find that page.</h1>
      <p>Check the address or return to the ShopBoard collection.</p>
      <Link className="button button--secondary" to="/">
        Back to the shop
      </Link>
    </section>
  );
}
