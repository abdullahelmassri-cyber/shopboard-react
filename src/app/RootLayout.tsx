import { Link, Outlet } from "react-router";
import { cartCount } from "../features/cart/cart.logic";
import { useCart } from "../features/cart/hooks/useCart";

export function RootLayout() {
  const { items } = useCart();
  const count = cartCount(items);

  return (
    <>
      <header className="site-header">
        <Link className="logo" to="/">
          ShopBoard
        </Link>
        <nav aria-label="Main navigation">
          <ul className="nav-list">
            <li>
              <Link to="/">Shop</Link>
            </li>
            <li>
              <Link to="/cart">Your bag</Link>
            </li>
          </ul>
        </nav>
        <p className="cart" aria-live="polite">
          Bag ({count})
        </p>
      </header>
      <main id="top">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>Thoughtful everyday essentials, selected for ShopBoard.</p>
      </footer>
    </>
  );
}
