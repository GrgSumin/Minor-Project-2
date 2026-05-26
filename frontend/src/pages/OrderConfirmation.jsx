import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import { api, imageUrl } from "../api/client";

const STATUS_BADGES = {
  pending: "warning",
  confirmed: "info",
  shipped: "info",
  delivered: "success",
  cancelled: "danger",
};

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/orders/${id}`)
      .then((r) => setOrder(r.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container page"><div className="skeleton" style={{ height: 200 }} /></div>;
  if (!order) return <div className="container page empty">Order not found</div>;

  return (
    <div className="container page" style={{ maxWidth: 720 }}>
      <div className="card" style={{ textAlign: "center", padding: 32 }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%", background: "#f0fdf4",
          display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--success)", fontSize: 24,
          marginBottom: 12,
        }}>
          <FiCheck />
        </div>
        <h2>Order placed!</h2>
        <p className="muted">
          We've received your order and emailed you a confirmation. We'll call {order.shippingAddress.phone} to
          arrange delivery.
        </p>
        <div className="row" style={{ justifyContent: "center", marginTop: 8 }}>
          <span className="badge">#{order._id.slice(-8)}</span>
          <span className={`badge ${STATUS_BADGES[order.status]}`}>{order.status}</span>
        </div>
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <h3>Items</h3>
        {order.items.map((i, idx) => (
          <div key={idx} className="row" style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
            <img src={imageUrl(i.image)} alt={i.title}
              style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 6, background: "var(--surface-2)" }} />
            <div style={{ flex: 1 }}>
              <div>{i.title}</div>
              <span className="muted text-sm">Qty {i.quantity} × Rs. {i.price.toLocaleString()}</span>
            </div>
            <strong>Rs. {(i.price * i.quantity).toLocaleString()}</strong>
          </div>
        ))}
        <div className="row between" style={{ marginTop: 14 }}><span>Subtotal</span><span>Rs. {order.subtotal.toLocaleString()}</span></div>
        <div className="row between"><span>Shipping</span><span>Rs. {order.shipping.toLocaleString()}</span></div>
        <div className="row between" style={{ fontSize: 17, marginTop: 6 }}><span>Total</span><strong>Rs. {order.total.toLocaleString()}</strong></div>
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <h3>Shipping to</h3>
        <p>
          {order.shippingAddress.fullName}<br />
          {order.shippingAddress.address}, {order.shippingAddress.city}<br />
          {order.shippingAddress.phone}
        </p>
      </div>

      <div className="row" style={{ marginTop: 20, justifyContent: "center" }}>
        <Link to="/shop" className="btn btn-ghost">Continue shopping</Link>
        <Link to="/orders" className="btn">All orders</Link>
      </div>
    </div>
  );
}
