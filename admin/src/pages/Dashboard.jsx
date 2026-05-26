import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiPackage, FiUsers, FiTrendingUp } from "react-icons/fi";
import { api } from "../api/client";

const STATUS_BADGES = { pending: "warning", confirmed: "info", shipped: "info", delivered: "success", cancelled: "danger" };

export default function Dashboard() {
  const [data, setData] = useState({ orders: [], products: 0, customers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/orders"), api.get("/products?limit=1"), api.get("/users")])
      .then(([o, p, u]) => {
        setData({ orders: o.data || [], products: p.data.total || 0, customers: (u.data || []).length });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="skeleton" style={{ height: 200 }} />;

  const orders = data.orders;
  const revenue = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status === "pending").length;

  const kpis = [
    { label: "Revenue", value: `Rs. ${revenue.toLocaleString()}`, icon: FiTrendingUp },
    { label: "Orders", value: orders.length, icon: FiShoppingBag, sub: `${pending} pending` },
    { label: "Products", value: data.products, icon: FiPackage },
    { label: "Customers", value: data.customers, icon: FiUsers },
  ];

  const recent = orders.slice(0, 8);

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="kpi-grid">
        {kpis.map((k) => (
          <div key={k.label} className="card kpi">
            <div className="kpi-icon"><k.icon /></div>
            <div>
              <div className="muted text-xs">{k.label}</div>
              <div className="kpi-value">{k.value}</div>
              {k.sub && <div className="muted text-xs">{k.sub}</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <div className="row between" style={{ marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Recent orders</h2>
          <Link to="/orders" className="text-sm muted">View all →</Link>
        </div>
        {recent.length === 0 ? (
          <div className="empty">No orders yet.</div>
        ) : (
          <table>
            <thead>
              <tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th><th>Date</th></tr>
            </thead>
            <tbody>
              {recent.map((o) => (
                <tr key={o._id}>
                  <td>#{o._id.slice(-8)}</td>
                  <td>{o.user?.name || "—"}</td>
                  <td>Rs. {o.total.toLocaleString()}</td>
                  <td><span className={`badge ${STATUS_BADGES[o.status]}`}>{o.status}</span></td>
                  <td className="muted">{new Date(o.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 16px; }
        .kpi { display: flex; align-items: center; gap: 14px; }
        .kpi-icon {
          width: 44px; height: 44px; border-radius: 10px;
          background: var(--surface-2); display: flex; align-items: center; justify-content: center;
          font-size: 20px;
        }
        .kpi-value { font-size: 22px; font-weight: 700; margin-top: 2px; }
        @media (max-width: 700px) { .kpi-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
}
