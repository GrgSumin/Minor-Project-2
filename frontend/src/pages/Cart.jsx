import { Link, useNavigate } from "react-router-dom";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCartStore } from "../store/cartStore";
import { imageUrl } from "../api/client";
import "./Cart.css";

export default function Cart() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const setQty = useCartStore((s) => s.setQuantity);
  const remove = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());
  const shipping = items.length > 0 ? 150 : 0;

  if (items.length === 0) {
    return (
      <div className="container page empty">
        <h2>Your cart is empty</h2>
        <Link to="/shop" className="btn">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="container page">
      <h1>Cart</h1>
      <div className="cart-grid">
        <div className="cart-items">
          {items.map((it) => (
            <div key={it.product} className="cart-line-row">
              <img src={imageUrl(it.image)} alt={it.title} className="cart-line-img" />
              <div className="cart-line-info">
                <Link to={`/product/${it.product}`} className="cart-line-title">{it.title}</Link>
                <div className="muted text-sm">Rs. {it.price.toLocaleString()}</div>
              </div>
              <div className="qty-row">
                <button onClick={() => setQty(it.product, it.quantity - 1)}><FiMinus /></button>
                <span>{it.quantity}</span>
                <button onClick={() => setQty(it.product, it.quantity + 1)}><FiPlus /></button>
              </div>
              <div className="cart-line-total">Rs. {(it.price * it.quantity).toLocaleString()}</div>
              <button className="icon-btn" onClick={() => remove(it.product)} aria-label="Remove">
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>

        <aside className="cart-summary card">
          <h3>Summary</h3>
          <div className="row between"><span>Subtotal</span><span>Rs. {subtotal.toLocaleString()}</span></div>
          <div className="row between"><span>Shipping</span><span>Rs. {shipping.toLocaleString()}</span></div>
          <hr />
          <div className="row between cart-total"><span>Total</span><strong>Rs. {(subtotal + shipping).toLocaleString()}</strong></div>
          <button className="btn block lg" onClick={() => navigate("/checkout")}>Checkout</button>
          <Link to="/shop" className="btn btn-ghost block">Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}
