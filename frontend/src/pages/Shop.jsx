import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FiFilter, FiX } from "react-icons/fi";
import { api } from "../api/client";
import ProductCard from "../components/ProductCard";
import "./Shop.css";

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Top rated" },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({ items: [], total: 0, pages: 1, page: 1 });
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filters = useMemo(
    () => ({
      q: params.get("q") || "",
      brand: params.get("brand") || "",
      category: params.get("category") || "",
      minPrice: params.get("minPrice") || "",
      maxPrice: params.get("maxPrice") || "",
      sort: params.get("sort") || "newest",
      page: Number(params.get("page") || 1),
      featured: params.get("featured") || "",
    }),
    [params]
  );

  useEffect(() => {
    Promise.all([api.get("/brands"), api.get("/categories")]).then(([b, c]) => {
      setBrands(b.data || []);
      setCategories(c.data || []);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    api
      .get("/products", { params: { ...filters, limit: 12 } })
      .then((r) => setData(r.data))
      .finally(() => setLoading(false));
  }, [filters]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value === "" || value == null) next.delete(key);
    else next.set(key, String(value));
    if (key !== "page") next.delete("page");
    setParams(next, { replace: true });
  };

  const clearFilters = () => setParams({});

  const activeFilterCount = ["q", "brand", "category", "minPrice", "maxPrice", "featured"]
    .filter((k) => params.get(k)).length;

  return (
    <div className="container page shop-page">
      <div className="shop-head">
        <div>
          <h1>Shop</h1>
          <span className="muted text-sm">{data.total} product{data.total === 1 ? "" : "s"}</span>
        </div>
        <div className="row">
          <button
            className="btn btn-ghost shop-filter-toggle"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <FiFilter /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
          <select
            className="select"
            value={filters.sort}
            onChange={(e) => updateParam("sort", e.target.value)}
            style={{ width: "auto" }}
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="shop-grid">
        <aside className={`shop-sidebar ${mobileFiltersOpen ? "mobile-open" : ""}`}>
          <div className="sidebar-head">
            <h3>Filters</h3>
            <div className="row">
              {activeFilterCount > 0 && (
                <button className="link-btn" onClick={clearFilters}>Clear all</button>
              )}
              <button
                className="icon-btn shop-filter-close"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
              >
                <FiX />
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label className="label">Search</label>
            <input
              className="input"
              type="search"
              placeholder="Search..."
              value={filters.q}
              onChange={(e) => updateParam("q", e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label className="label">Category</label>
            <div className="filter-list">
              <button
                className={`filter-item ${!filters.category ? "active" : ""}`}
                onClick={() => updateParam("category", "")}
              >All</button>
              {categories.map((c) => (
                <button
                  key={c._id}
                  className={`filter-item ${filters.category === c._id ? "active" : ""}`}
                  onClick={() => updateParam("category", c._id)}
                >{c.name}</button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="label">Brand</label>
            <div className="filter-list">
              <button
                className={`filter-item ${!filters.brand ? "active" : ""}`}
                onClick={() => updateParam("brand", "")}
              >All</button>
              {brands.map((b) => (
                <button
                  key={b._id}
                  className={`filter-item ${filters.brand === b._id ? "active" : ""}`}
                  onClick={() => updateParam("brand", b._id)}
                >{b.name}</button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="label">Price (Rs.)</label>
            <div className="row">
              <input
                className="input"
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => updateParam("minPrice", e.target.value)}
              />
              <input
                className="input"
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => updateParam("maxPrice", e.target.value)}
              />
            </div>
          </div>
        </aside>

        <section className="shop-results">
          {loading ? (
            <div className="product-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="skeleton" style={{ aspectRatio: "1 / 1.3" }} />
              ))}
            </div>
          ) : data.items.length === 0 ? (
            <div className="empty">
              <h3>No products match your filters</h3>
              <button className="btn btn-ghost" onClick={clearFilters}>Clear filters</button>
            </div>
          ) : (
            <>
              <div className="product-grid">
                {data.items.map((p) => <ProductCard key={p._id} product={p} />)}
              </div>
              {data.pages > 1 && (
                <div className="pagination">
                  {Array.from({ length: data.pages }).map((_, i) => (
                    <button
                      key={i}
                      className={`page-btn ${data.page === i + 1 ? "active" : ""}`}
                      onClick={() => updateParam("page", i + 1)}
                    >{i + 1}</button>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
