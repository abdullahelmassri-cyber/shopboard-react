import { CartPanel } from "./components/CartPanel";
import { CatalogPage } from "./components/CatalogPage";
import { useCart } from "./hooks/useCart";

function App() {
  const cart = useCart();

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
          Bag ({cart.count})
        </p>
      </header>

      <main id="top">
        <CatalogPage onAddToCart={cart.addProduct} />
        <CartPanel
          lines={cart.lines}
          count={cart.count}
          total={cart.total}
          onChangeQuantity={cart.changeQuantity}
          onRemove={cart.removeProduct}
          onClear={cart.clear}
        />
      </main>
      <footer className="site-footer">
        <p>Thoughtful everyday essentials, selected for ShopBoard.</p>
      </footer>
    </>
  );
}

export default App;
