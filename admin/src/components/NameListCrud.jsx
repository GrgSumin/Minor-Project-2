import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { api } from "../api/client";

export default function NameListCrud({ title, endpoint }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  const load = () => {
    setLoading(true);
    api.get(endpoint).then((r) => setItems(r.data || [])).finally(() => setLoading(false));
  };
  useEffect(load, [endpoint]);

  const add = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    try {
      await api.post(endpoint, { name: newName.trim() });
      setNewName("");
      toast.success("Added");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const save = async (id) => {
    try {
      await api.put(`${endpoint}/${id}`, { name: editName.trim() });
      setEditId(null);
      toast.success("Saved");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete?")) return;
    try {
      await api.delete(`${endpoint}/${id}`);
      toast.success("Deleted");
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  return (
    <div>
      <h1>{title}</h1>
      <form className="card" onSubmit={add} style={{ marginBottom: 16 }}>
        <div className="row">
          <input
            className="input"
            placeholder={`Add a ${title.toLowerCase().replace(/s$/, "")}...`}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button type="submit" className="btn"><FiPlus /> Add</button>
        </div>
      </form>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div className="skeleton" style={{ height: 200 }} />
        ) : items.length === 0 ? (
          <div className="empty">Nothing here yet.</div>
        ) : (
          <table>
            <thead><tr><th>Name</th><th></th></tr></thead>
            <tbody>
              {items.map((it) => (
                <tr key={it._id}>
                  <td>
                    {editId === it._id ? (
                      <input className="input" value={editName} onChange={(e) => setEditName(e.target.value)} />
                    ) : (
                      it.name
                    )}
                  </td>
                  <td>
                    <div className="row" style={{ justifyContent: "flex-end" }}>
                      {editId === it._id ? (
                        <>
                          <button className="icon-btn" onClick={() => save(it._id)} title="Save"><FiCheck /></button>
                          <button className="icon-btn" onClick={() => setEditId(null)} title="Cancel"><FiX /></button>
                        </>
                      ) : (
                        <>
                          <button className="icon-btn" onClick={() => { setEditId(it._id); setEditName(it.name); }}><FiEdit2 /></button>
                          <button className="icon-btn danger" onClick={() => remove(it._id)}><FiTrash2 /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
