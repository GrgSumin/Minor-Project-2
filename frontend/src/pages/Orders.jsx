import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, imageUrl } from "../api/client";

const STATUS_BADGES = {
  pending: "warning",
  confirmed: "info",
  shipped: "info",
  delivered: "success",
  cancelled: "danger",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/mine")
      .then((r) => setOrders(r.data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container page"><div className="skeleton" style={{ height: 200 }} /></div>;

  if (orders.length === 0) {
    return (
      <div className="container page empty">
        <h2>No orders yet</h2>
        <Link to="/shop" className="btn">Start shopping</Link>
      </div>
    );
  }

  return (
    <div className="container page">
      <h1>Your orders</h1>
      <div className="stack lg">
        {orders.map((o) => (
          <Link key={o._id} to={`/orders/${o._id}`} className="card" style={{ display: "block" }}>
            <div className="row between" style={{ marginBottom: 12 }}>
              <div>
                <strong>Order #{o._id.slice(-8)}</strong>
                <div className="muted text-sm">
                  {new Date(o.createdAt).toLocaleDateString()} · {o.items.length} item{o.items.length === 1 ? "" : "s"}
                </div>
              </div>
              <div className="row">
                <span className={`badge ${STATUS_BADGES[o.status]}`}>{o.status}</span>
                <strong>Rs. {o.total.toLocaleString()}</strong>
              </div>
            </div>
            <div className="row" style={{ gap: 6 }}>
              {o.items.slice(0, 4).map((i, idx) => (
                <img
                  key={idx}
                  src={imageUrl(i.image)}
                  alt={i.title}
                  style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 6, background: "var(--surface-2)" }}
                />
              ))}
              {o.items.length > 4 && <span className="muted text-sm">+{o.items.length - 4} more</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
