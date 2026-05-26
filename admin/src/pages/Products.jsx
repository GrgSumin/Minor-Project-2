import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { api, imageUrl } from "../api/client";

export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const load = () => {
    setLoading(true);
    api.get("/products", { params: { limit: 50, q } })
      .then((r) => setItems(r.data.items || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [q]);

  const remove = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success("Deleted");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="row between" style={{ marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ margin: 0 }}>Products</h1>
        <div className="row">
          <input
            className="input"
            type="search"
            placeholder="Search..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ width: 200 }}
          />
          <Link to="/products/new" className="btn"><FiPlus /> Add product</Link>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div className="skeleton" style={{ height: 300 }} />
        ) : items.length === 0 ? (
          <div className="empty">No products yet.</div>
        ) : (
          <table>
            <thead>
              <tr><th></th><th>Title</th><th>Brand</th><th>Category</th><th>Price</th><th>Stock</th><th>Featured</th><th></th></tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p._id}>
                  <td><img src={imageUrl(p.image)} alt="" style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 6 }} /></td>
                  <td>{p.title}</td>
                  <td>{p.brand?.name}</td>
                  <td>{p.category?.name}</td>
                  <td>Rs. {p.price.toLocaleString()}</td>
                  <td>{p.stock}</td>
                  <td>{p.featured ? <span className="badge success">Yes</span> : <span className="muted text-xs">No</span>}</td>
                  <td>
                    <div className="row" style={{ justifyContent: "flex-end" }}>
                      <Link to={`/products/${p._id}/edit`} className="icon-btn" title="Edit"><FiEdit2 /></Link>
                      <button className="icon-btn danger" onClick={() => remove(p._id)} title="Delete"><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
