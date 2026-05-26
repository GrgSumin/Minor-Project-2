import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api, imageUrl } from "../api/client";

export default function ProductForm() {
  const { id } = useParams();
  const editing = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    category: "",
    featured: false,
  });
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([api.get("/brands"), api.get("/categories")]).then(([b, c]) => {
      setBrands(b.data || []);
      setCategories(c.data || []);
    });
  }, []);

  useEffect(() => {
    if (!editing) return;
    api.get(`/products/${id}`).then((r) => {
      const p = r.data;
      setForm({
        title: p.title,
        description: p.description,
        price: p.price,
        stock: p.stock,
        brand: p.brand?._id || p.brand,
        category: p.category?._id || p.category,
        featured: p.featured,
      });
      setCurrentImage(p.image);
    }).finally(() => setLoading(false));
  }, [id, editing]);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (imageFile) fd.append("image", imageFile);
    try {
      if (editing) await api.put(`/products/${id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      else await api.post("/products", fd, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success(editing ? "Updated" : "Created");
      navigate("/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="skeleton" style={{ height: 400 }} />;

  return (
    <div style={{ maxWidth: 720 }}>
      <h1>{editing ? "Edit product" : "New product"}</h1>
      <form className="card" onSubmit={submit}>
        <div className="stack">
          <div>
            <label className="label">Title</label>
            <input className="input" required value={form.title} onChange={set("title")} />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea className="textarea" required value={form.description} onChange={set("description")} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label className="label">Price (Rs.)</label>
              <input className="input" type="number" min="0" required value={form.price} onChange={set("price")} />
            </div>
            <div>
              <label className="label">Stock</label>
              <input className="input" type="number" min="0" required value={form.stock} onChange={set("stock")} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label className="label">Brand</label>
              <select className="select" required value={form.brand} onChange={set("brand")}>
                <option value="">— Select —</option>
                {brands.map((b) => <option key={b._id} value={b._id}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Category</label>
              <select className="select" required value={form.category} onChange={set("category")}>
                <option value="">— Select —</option>
                {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="label">Image</label>
            {currentImage && !imageFile && (
              <img src={imageUrl(currentImage)} alt="" style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 6, marginBottom: 8 }} />
            )}
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
          </div>
          <label className="row" style={{ gap: 8 }}>
            <input type="checkbox" checked={form.featured} onChange={set("featured")} />
            <span>Featured on home page</span>
          </label>
          <div className="row">
            <button type="submit" className="btn lg" disabled={saving}>
              {saving ? "Saving..." : editing ? "Save changes" : "Create product"}
            </button>
            <button type="button" className="btn btn-ghost lg" onClick={() => navigate("/products")}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}
