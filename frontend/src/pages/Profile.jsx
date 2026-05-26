import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../api/client";
import { useAuthStore } from "../store/authStore";

export default function Profile() {
  const user = useAuthStore((s) => s.user);
  const updateUser = useAuthStore((s) => s.updateUser);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  const [saving, setSaving] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put("/auth/me", form);
      updateUser(data.user);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container page" style={{ maxWidth: 560 }}>
      <h1>Profile</h1>
      <form className="card" onSubmit={save}>
        <div className="stack">
          <div>
            <label className="label">Name</label>
            <input className="input" value={form.name} onChange={set("name")} required />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input" value={user?.email || ""} disabled />
          </div>
          <div>
            <label className="label">Phone</label>
            <input className="input" value={form.phone} onChange={set("phone")} />
          </div>
          <div>
            <label className="label">Default address</label>
            <textarea className="textarea" value={form.address} onChange={set("address")} />
          </div>
          <button className="btn lg" disabled={saving}>{saving ? "Saving..." : "Save changes"}</button>
        </div>
      </form>
    </div>
  );
}
