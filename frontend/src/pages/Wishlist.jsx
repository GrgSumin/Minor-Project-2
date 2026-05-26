import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useWishlistStore } from "../store/wishlistStore";

export default function Wishlist() {
  const items = useWishlistStore((s) => s.items);
  const loading = useWishlistStore((s) => s.loading);
  const fetch = useWishlistStore((s) => s.fetch);

  useEffect(() => { fetch(); }, [fetch]);

  if (loading) {
    return (
      <div className="container page">
        <h1>Wishlist</h1>
        <div className="skeleton" style={{ height: 240 }} />
      </div>
    );
  }

  const products = items.map((w) => w.product).filter(Boolean);

  if (products.length === 0) {
    return (
      <div className="container page empty">
        <h2>Your wishlist is empty</h2>
        <Link to="/shop" className="btn">Find something you love</Link>
      </div>
    );
  }

  return (
    <div className="container page">
      <h1>Wishlist</h1>
      <div className="product-grid">
        {products.map((p) => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}
