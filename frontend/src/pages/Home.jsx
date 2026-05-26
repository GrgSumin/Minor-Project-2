import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";
import { api } from "../api/client";
import ProductCard from "../components/ProductCard";
import "./Home.css";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/products", { params: { featured: "true", limit: 8 } }),
      api.get("/categories"),
    ])
      .then(([p, c]) => {
        setFeatured(p.data.items || []);
        setCategories(c.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="hero-pill">Curated instruments since 2024</span>
            <h1>Sound that moves you. Built to last.</h1>
            <p className="muted">
              Hand-picked guitars, keyboards, drums, and more — sourced from the brands musicians
              trust. Free pickup in Kathmandu, ship anywhere in Nepal.
            </p>
            <div className="row">
              <Link to="/shop" className="btn lg">Shop now <FiArrowRight /></Link>
              <Link to="/shop?featured=true" className="btn btn-ghost lg">Featured picks</Link>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-circle" />
          </div>
        </div>
      </section>

      <section className="container value-row">
        <div><FiTruck /><div><strong>Free local delivery</strong><span>Within Kathmandu valley</span></div></div>
        <div><FiShield /><div><strong>1-year warranty</strong><span>On all new instruments</span></div></div>
        <div><FiRefreshCw /><div><strong>7-day returns</strong><span>If it doesn't feel right</span></div></div>
      </section>

      {categories.length > 0 && (
        <section className="container page">
          <div className="section-title">
            <h2>Shop by category</h2>
            <Link to="/shop" className="muted text-sm">All →</Link>
          </div>
          <div className="cat-grid">
            {categories.slice(0, 6).map((c) => (
              <Link key={c._id} to={`/shop?category=${c._id}`} className="cat-tile">
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="container page">
        <div className="section-title">
          <h2>Featured</h2>
          <Link to="/shop?featured=true" className="muted text-sm">View all →</Link>
        </div>
        {loading ? (
          <div className="product-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ aspectRatio: "1 / 1.3" }} />
            ))}
          </div>
        ) : featured.length === 0 ? (
          <div className="empty">No featured products yet.</div>
        ) : (
          <div className="product-grid">
            {featured.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}
