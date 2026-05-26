import { Link, useNavigate } from "react-router-dom";
import { FiX, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCartStore } from "../store/cartStore";
import { imageUrl } from "../api/client";
import "./CartDrawer.css";

export default function CartDrawer() {
  const navigate = useNavigate();
  const open = useCartStore((s) => s.drawerOpen);
  const close = useCartStore((s) => s.closeDrawer);
  const items = useCartStore((s) => s.items);
  const setQty = useCartStore((s) => s.setQuantity);
  const remove = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  const goCheckout = () => {
    close();
    navigate("/checkout");
  };

  return (
    <>
      <div className={`drawer-overlay ${open ? "show" : ""}`} onClick={close} />
      <aside className={`drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <header className="drawer-head">
          <h3>Your Cart ({items.length})</h3>
          <button className="icon-btn" onClick={close} aria-label="Close"><FiX /></button>
        </header>

        <div className="drawer-body">
          {items.length === 0 ? (
            <div className="empty">
              <p>Your cart is empty.</p>
              <Link to="/shop" className="btn btn-ghost" onClick={close}>Browse instruments</Link>
            </div>
          ) : (
            items.map((it) => (
              <div key={it.product} className="cart-row">
                <img src={imageUrl(it.image)} alt={it.title} className="cart-img" />
                <div className="cart-info">
                  <div className="cart-title">{it.title}</div>
                  <div className="muted text-sm">Rs. {it.price.toLocaleString()}</div>
                  <div className="qty-row">
                    <button onClick={() => setQty(it.product, it.quantity - 1)} aria-label="Decrease">
                      <FiMinus />
                    </button>
                    <span>{it.quantity}</span>
                    <button onClick={() => setQty(it.product, it.quantity + 1)} aria-label="Increase">
                      <FiPlus />
                    </button>
                    <button className="remove" onClick={() => remove(it.product)} aria-label="Remove">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
                <div className="cart-line">Rs. {(it.price * it.quantity).toLocaleString()}</div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <footer className="drawer-foot">
            <div className="row between">
              <span>Subtotal</span>
              <strong>Rs. {subtotal.toLocaleString()}</strong>
            </div>
            <button className="btn block lg" onClick={goCheckout}>Checkout</button>
            <Link to="/cart" className="btn btn-ghost block" onClick={close}>View cart</Link>
          </footer>
        )}
      </aside>
    </>
  );
}
