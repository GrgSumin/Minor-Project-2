import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../api/client";
import { useAuthStore } from "../store/authStore";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error("Password must be at least 6 characters");
    setSubmitting(true);
    try {
      const { data } = await api.post("/auth/register", form);
      setAuth(data.user, data.token);
      toast.success("Account created");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h1>Create account</h1>
        <p className="muted">Join InstrumentMania.</p>
        <div className="stack">
          <div>
            <label className="label">Name</label>
            <input className="input" required value={form.name} onChange={set("name")} />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" required value={form.email} onChange={set("email")} />
          </div>
          <div>
            <label className="label">Phone (optional)</label>
            <input className="input" value={form.phone} onChange={set("phone")} />
          </div>
          <div>
            <label className="label">Password</label>
            <input className="input" type="password" minLength={6} required value={form.password} onChange={set("password")} />
          </div>
          <button type="submit" className="btn block lg" disabled={submitting}>
            {submitting ? "Creating..." : "Create account"}
          </button>
        </div>
        <p className="muted text-sm" style={{ marginTop: 16, textAlign: "center" }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
