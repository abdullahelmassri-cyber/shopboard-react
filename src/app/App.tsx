import { CartPanel } from "../features/cart/components/CartPanel";
import { useCart } from "../features/cart/hooks/useCart";
import { buildCartLines, cartCount, cartTotal } from "../features/cart/cart.logic";
import { useProducts } from "../features/products/hooks/useProducts";
import { CatalogPage } from "../features/products/components/CatalogPage";

function App() {
  const { state: productsState, retry } = useProducts();
  const { items } = useCart();
  const products = productsState.status === "success" ? productsState.products : [];
  const lines = buildCartLines(items, products);
  const count = cartCount(items);
  const total = cartTotal(items, products);

  return (
    <>
      <header className="site-header">
        <a className="logo" href="#top">
          ShopBoard
        </a>
        <nav aria-label="Main navigation">
          <ul className="nav-list">
            <li>
              <a href="#products">Shop</a>
            </li>
            <li>
              <a href="#cart">Your bag</a>
            </li>
          </ul>
        </nav>
        <p className="cart" aria-live="polite">
          Bag ({count})
        </p>
      </header>

      <main id="top">
        <CatalogPage productsState={productsState} onRetry={retry} />
        <CartPanel lines={lines} count={count} total={total} productsState={productsState} />
      </main>
      <footer className="site-footer">
        <p>Thoughtful everyday essentials, selected for ShopBoard.</p>
      </footer>
    </>
  );
}

export default App;
