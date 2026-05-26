import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api, imageUrl } from "../api/client";

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
const STATUS_BADGES = { pending: "warning", confirmed: "info", shipped: "info", delivered: "success", cancelled: "danger" };

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState("all");

  const load = () => {
    setLoading(true);
    api.get("/orders").then((r) => setOrders(r.data || [])).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      toast.success("Status updated");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  if (loading) return <div className="skeleton" style={{ height: 300 }} />;

  return (
    <div>
      <div className="row between" style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Orders</h1>
        <select className="select" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ width: "auto" }}>
          <option value="all">All ({orders.length})</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s} ({orders.filter((o) => o.status === s).length})</option>
          ))}
        </select>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {filtered.length === 0 ? (
          <div className="empty">No orders.</div>
        ) : (
          <table>
            <thead>
              <tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th><th></th></tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <Fragment key={o._id}>
                  <tr>
                    <td>#{o._id.slice(-8)}</td>
                    <td>
                      <div>{o.user?.name || "—"}</div>
                      <div className="muted text-xs">{o.user?.email}</div>
                    </td>
                    <td>{o.items.length}</td>
                    <td>Rs. {o.total.toLocaleString()}</td>
                    <td>
                      <select
                        className="select"
                        value={o.status}
                        onChange={(e) => updateStatus(o._id, e.target.value)}
                        style={{ width: 120 }}
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="muted">{new Date(o.createdAt).toLocaleString()}</td>
                    <td>
                      <button className="btn-sm btn btn-ghost" onClick={() => setExpanded(expanded === o._id ? null : o._id)}>
                        {expanded === o._id ? "Hide" : "View"}
                      </button>
                    </td>
                  </tr>
                  {expanded === o._id && (
                    <tr>
                      <td colSpan={7} style={{ background: "var(--surface-2)" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, padding: 8 }}>
                          <div>
                            <strong>Items</strong>
                            {o.items.map((i, idx) => (
                              <div key={idx} className="row" style={{ marginTop: 8 }}>
                                <img src={imageUrl(i.image)} alt={i.title}
                                  style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 4 }} />
                                <div style={{ flex: 1 }}>
                                  <div className="text-sm">{i.title}</div>
                                  <div className="muted text-xs">Qty {i.quantity} × Rs. {i.price.toLocaleString()}</div>
                                </div>
                                <div className="text-sm">Rs. {(i.price * i.quantity).toLocaleString()}</div>
                              </div>
                            ))}
                          </div>
                          <div>
                            <strong>Shipping</strong>
                            <p className="text-sm" style={{ marginTop: 8 }}>
                              {o.shippingAddress.fullName}<br />
                              {o.shippingAddress.address}, {o.shippingAddress.city}<br />
                              {o.shippingAddress.phone}
                              {o.shippingAddress.notes && (<><br /><span className="muted">Notes: {o.shippingAddress.notes}</span></>)}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
