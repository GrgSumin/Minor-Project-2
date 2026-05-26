import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiMinus, FiPlus, FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import { api, imageUrl } from "../api/client";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { useAuthStore, useIsAuthenticated } from "../store/authStore";
import StarRating from "../components/StarRating";
import ProductCard from "../components/ProductCard";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({ rating: 5, comment: "" });

  const addItem = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const isInWishlist = useWishlistStore((s) => (product ? s.ids.has(product._id) : false));
  const isAuth = useIsAuthenticated();
  const user = useAuthStore((s) => s.user);

  const load = () => {
    setLoading(true);
    Promise.all([
      api.get(`/products/${id}`),
      api.get(`/reviews/product/${id}`),
      api.get(`/products/${id}/related`),
    ])
      .then(([p, r, rel]) => {
        setProduct(p.data);
        setReviews(r.data || []);
        setRelated(rel.data || []);
      })
      .catch(() => toast.error("Couldn't load product"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    load();
  }, [id]);

  if (loading) return <div className="container page"><div className="skeleton" style={{ height: 400 }} /></div>;
  if (!product) return <div className="container page empty">Product not found</div>;

  const inStock = product.stock > 0;

  const handleAdd = () => {
    addItem(product, qty);
    openDrawer();
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    navigate("/checkout");
  };

  const handleWish = async () => {
    if (!isAuth) return toast.info("Sign in to save favorites");
    const added = await toggleWish(product._id);
    toast.success(added ? "Added to wishlist" : "Removed from wishlist");
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!isAuth) return toast.info("Sign in to leave a review");
    try {
      await api.post(`/reviews/product/${id}`, form);
      toast.success("Review submitted");
      setForm({ rating: 5, comment: "" });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <div className="container page">
      <div className="pd-grid">
        <div className="pd-image">
          <img src={imageUrl(product.image)} alt={product.title} />
        </div>
        <div className="pd-info">
          <div className="muted text-sm">{product.brand?.name} · {product.category?.name}</div>
          <h1>{product.title}</h1>
          <StarRating value={product.rating} count={product.numReviews} size={16} />

          <div className="pd-price">Rs. {product.price.toLocaleString()}</div>

          <div className={`pd-stock ${inStock ? "in" : "out"}`}>
            {inStock ? <><FiCheck /> In stock ({product.stock})</> : "Out of stock"}
          </div>

          <p style={{ marginTop: 16 }}>{product.description}</p>

          {inStock && (
            <div className="pd-actions">
              <div className="qty-row">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}><FiMinus /></button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))}><FiPlus /></button>
              </div>
              <button className="btn lg" onClick={handleAdd}><FiShoppingBag /> Add to cart</button>
              <button className="btn btn-ghost lg" onClick={handleBuyNow}>Buy now</button>
              <button className={`btn btn-ghost lg ${isInWishlist ? "active" : ""}`} onClick={handleWish}>
                <FiHeart /> {isInWishlist ? "Saved" : "Save"}
              </button>
            </div>
          )}
        </div>
      </div>

      <section className="reviews">
        <h2>Reviews ({reviews.length})</h2>

        {isAuth ? (
          <form className="review-form" onSubmit={submitReview}>
            <div className="row">
              <label className="label" style={{ margin: 0 }}>Your rating</label>
              <select
                className="select"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                style={{ width: "auto" }}
              >
                {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} star{n === 1 ? "" : "s"}</option>)}
              </select>
            </div>
            <textarea
              className="textarea"
              placeholder="Share your experience..."
              required
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
            />
            <button type="submit" className="btn">Submit review</button>
            <span className="muted text-xs">Signed in as {user?.name}</span>
          </form>
        ) : (
          <p className="muted text-sm">Sign in to leave a review.</p>
        )}

        <div className="review-list">
          {reviews.length === 0 && <p className="muted">No reviews yet — be the first.</p>}
          {reviews.map((r) => (
            <div key={r._id} className="review-item">
              <div className="row between">
                <strong>{r.name}</strong>
                <StarRating value={r.rating} size={12} showCount={false} />
              </div>
              <p style={{ margin: "6px 0 0" }}>{r.comment}</p>
              <span className="muted text-xs">{new Date(r.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="related">
          <h2>You may also like</h2>
          <p className="muted text-sm" style={{ marginTop: -8, marginBottom: 16 }}>
            More {product.category?.name?.toLowerCase()} you might enjoy
          </p>
          <div className="related-grid">
            {related.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
