import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function Customers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/users").then((r) => setUsers(r.data || [])).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="skeleton" style={{ height: 300 }} />;

  return (
    <div>
      <h1>Customers</h1>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {users.length === 0 ? (
          <div className="empty">No customers yet.</div>
        ) : (
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Joined</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.phone || <span className="muted">—</span>}</td>
                  <td className="muted">{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
