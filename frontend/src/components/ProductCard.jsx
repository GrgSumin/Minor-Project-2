import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { useIsAuthenticated } from "../store/authStore";
import { imageUrl } from "../api/client";
import StarRating from "./StarRating";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem);
  const openDrawer = useCartStore((s) => s.openDrawer);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const isInWishlist = useWishlistStore((s) => s.ids.has(product._id));
  const isAuth = useIsAuthenticated();

  const handleAdd = (e) => {
    e.preventDefault();
    if (product.stock <= 0) return toast.error("Out of stock");
    addItem(product);
    openDrawer();
  };

  const handleWish = async (e) => {
    e.preventDefault();
    if (!isAuth) return toast.info("Sign in to save favorites");
    try {
      const added = await toggleWish(product._id);
      toast.success(added ? "Added to wishlist" : "Removed from wishlist");
    } catch {
      toast.error("Failed to update wishlist");
    }
  };

  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <div className="product-img">
        <img src={imageUrl(product.image)} alt={product.title} loading="lazy" />
        <button
          className={`wish-btn ${isInWishlist ? "on" : ""}`}
          onClick={handleWish}
          aria-label="Toggle wishlist"
        >
          <FiHeart />
        </button>
        {product.stock <= 0 && <span className="oos-badge">Out of stock</span>}
      </div>
      <div className="product-meta">
        <div className="muted text-xs">{product.brand?.name}</div>
        <div className="product-title">{product.title}</div>
        <StarRating value={product.rating} count={product.numReviews} size={12} />
        <div className="row between" style={{ marginTop: 8 }}>
          <span className="price">Rs. {product.price.toLocaleString()}</span>
          <button
            className="add-btn"
            onClick={handleAdd}
            disabled={product.stock <= 0}
            aria-label="Add to cart"
          >
            <FiShoppingBag />
          </button>
        </div>
      </div>
    </Link>
  );
}
