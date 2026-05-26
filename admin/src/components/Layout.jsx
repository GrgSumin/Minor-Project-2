import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FiGrid, FiShoppingBag, FiPackage, FiTag, FiFolder, FiUsers, FiLogOut, FiMenu, FiX,
} from "react-icons/fi";
import { useAuthStore } from "../store/authStore";
import "./Layout.css";

const NAV = [
  { to: "/", label: "Dashboard", icon: FiGrid, end: true },
  { to: "/orders", label: "Orders", icon: FiShoppingBag },
  { to: "/products", label: "Products", icon: FiPackage },
  { to: "/categories", label: "Categories", icon: FiFolder },
  { to: "/brands", label: "Brands", icon: FiTag },
  { to: "/customers", label: "Customers", icon: FiUsers },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="admin-shell">
      <aside className={`admin-side ${open ? "open" : ""}`}>
        <div className="admin-brand">
          Instrument<span>Mania</span>
          <button className="icon-btn side-close" onClick={() => setOpen(false)} aria-label="Close menu">
            <FiX />
          </button>
        </div>
        <nav className="admin-nav">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)}>
              <Icon /> <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="admin-user">
          <div>
            <div className="text-sm" style={{ fontWeight: 500 }}>{user?.name}</div>
            <div className="muted text-xs">{user?.email}</div>
          </div>
          <button className="icon-btn danger" onClick={logout} aria-label="Sign out" title="Sign out">
            <FiLogOut />
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button className="icon-btn side-toggle" onClick={() => setOpen(true)} aria-label="Menu">
            <FiMenu />
          </button>
          <strong>InstrumentMania Admin</strong>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
