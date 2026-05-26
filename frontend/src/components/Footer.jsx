import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="logo">Instrument<span>Mania</span></div>
          <p className="muted text-sm">
            Quality instruments for every musician. Curated for tone, built to last.
          </p>
        </div>
        <div>
          <h4>Shop</h4>
          <Link to="/shop">All instruments</Link>
          <Link to="/shop?featured=true">Featured</Link>
        </div>
        <div>
          <h4>Account</h4>
          <Link to="/login">Sign in</Link>
          <Link to="/register">Create account</Link>
          <Link to="/orders">Orders</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <a href="mailto:hello@instrumentmania.com">hello@instrumentmania.com</a>
          <span className="muted text-sm">Kathmandu, Nepal</span>
        </div>
      </div>
      <div className="footer-bottom container">
        <span className="muted text-sm">© {new Date().getFullYear()} InstrumentMania</span>
      </div>
    </footer>
  );
}
