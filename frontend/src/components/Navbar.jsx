import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingBag, FiHeart, FiUser, FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { useAuthStore, useIsAuthenticated } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const isAuth = useIsAuthenticated();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const openCart = useCartStore((s) => s.openDrawer);
  const cartCount = useCartStore((s) => s.count());

  const submit = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    setOpen(false);
  };

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="logo">
          Instrument<span>Mania</span>
        </Link>

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/shop" onClick={() => setOpen(false)}>Shop</NavLink>
          {isAuth && <NavLink to="/orders" onClick={() => setOpen(false)}>Orders</NavLink>}
        </nav>

        <form className="nav-search" onSubmit={submit}>
          <FiSearch />
          <input
            type="text"
            placeholder="Search instruments..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <div className="nav-actions">
          {isAuth ? (
            <>
              <Link to="/wishlist" className="icon-btn" aria-label="Wishlist"><FiHeart /></Link>
              <button className="icon-btn" onClick={openCart} aria-label="Cart">
                <FiShoppingBag />
                {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
              </button>
              <div className="user-menu">
                <Link to="/profile" className="icon-btn" aria-label="Profile" title={user?.name}>
                  <FiUser />
                </Link>
                <button className="icon-btn" onClick={logout} aria-label="Logout" title="Logout">
                  <FiLogOut />
                </button>
              </div>
            </>
          ) : (
            <>
              <button className="icon-btn" onClick={openCart} aria-label="Cart">
                <FiShoppingBag />
                {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
              </button>
              <Link to="/login" className="btn btn-ghost">Sign in</Link>
            </>
          )}

          <button className="icon-btn mobile-toggle" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}
