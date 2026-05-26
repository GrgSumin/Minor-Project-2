import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { api, imageUrl } from "../api/client";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clear);
  const user = useAuthStore((s) => s.user);

  const [form, setForm] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const shipping = items.length > 0 ? 150 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container page empty">
        <h2>Your cart is empty</h2>
        <Link to="/shop" className="btn">Browse instruments</Link>
      </div>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await api.post("/orders", {
        items: items.map((i) => ({ product: i.product, quantity: i.quantity })),
        shippingAddress: form,
        shipping,
      });
      clearCart();
      toast.success("Order placed!");
      navigate(`/orders/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Order failed");
    } finally {
      setSubmitting(false);
    }
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="container page">
      <h1>Checkout</h1>
      <form className="checkout-grid" onSubmit={submit}>
        <div className="card">
          <h3>Shipping details</h3>
          <div className="stack">
            <div>
              <label className="label">Full name</label>
              <input className="input" required value={form.fullName} onChange={set("fullName")} />
            </div>
            <div>
              <label className="label">Phone</label>
              <input className="input" required value={form.phone} onChange={set("phone")} />
            </div>
            <div>
              <label className="label">Address</label>
              <input className="input" required value={form.address} onChange={set("address")} />
            </div>
            <div>
              <label className="label">City</label>
              <input className="input" required value={form.city} onChange={set("city")} />
            </div>
            <div>
              <label className="label">Notes (optional)</label>
              <textarea className="textarea" value={form.notes} onChange={set("notes")} />
            </div>
          </div>
        </div>

        <aside className="card checkout-summary">
          <h3>Order summary</h3>
          <div className="checkout-items">
            {items.map((it) => (
              <div key={it.product} className="checkout-item">
                <img src={imageUrl(it.image)} alt={it.title} />
                <div className="checkout-item-info">
                  <div className="text-sm">{it.title}</div>
                  <span className="muted text-xs">Qty {it.quantity}</span>
                </div>
                <span className="text-sm">Rs. {(it.price * it.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <hr />
          <div className="row between"><span>Subtotal</span><span>Rs. {subtotal.toLocaleString()}</span></div>
          <div className="row between"><span>Shipping</span><span>Rs. {shipping.toLocaleString()}</span></div>
          <div className="row between cart-total"><span>Total</span><strong>Rs. {total.toLocaleString()}</strong></div>
          <button className="btn block lg" disabled={submitting}>
            {submitting ? "Placing order..." : "Place order"}
          </button>
          <p className="muted text-xs" style={{ textAlign: "center", marginTop: 10 }}>
            Cash on delivery. We'll call to confirm.
          </p>
        </aside>
      </form>
    </div>
  );
}
