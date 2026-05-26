import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../api/client";
import { useAuthStore } from "../store/authStore";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await api.post("/auth/login", form);
      setAuth(data.user, data.token);
      toast.success(`Welcome back, ${data.user.name}`);
      navigate(location.state?.from || "/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h1>Sign in</h1>
        <p className="muted">Welcome back to InstrumentMania.</p>
        <div className="stack">
          <div>
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          <button type="submit" className="btn block lg" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </div>
        <p className="muted text-sm" style={{ marginTop: 16, textAlign: "center" }}>
          No account yet? <Link to="/register">Create one</Link>
        </p>
      </form>
    </div>
  );
}
