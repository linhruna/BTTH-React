function ResultTable({ keyword, user, onAdded }) {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState(null);

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => { setUsers(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    if (user) {
      setUsers(prev => [...prev, { ...user, id: prev.length ? Math.max(...prev.map(u => u.id)) + 1 : 1 }]);
      onAdded();
    }
  }, [user]);

  const lowerKw = (keyword || "").toLowerCase();
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(lowerKw) || u.username.toLowerCase().includes(lowerKw)
  );

  const editUser = (u) => {
    setEditing({ ...u, address: { ...u.address } });
  };

  const handleEditChange = (id, value) => {
    if (["street", "suite", "city"].includes(id)) {
      setEditing(prev => ({ ...prev, address: { ...prev.address, [id]: value } }));
    } else {
      setEditing(prev => ({ ...prev, [id]: value }));
    }
  };

  const saveUser = () => {
    setUsers(prev => prev.map(u => (u.id === editing.id ? editing : u)));
    setEditing(null);
  };

  const removeUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div className="card">
      {loading ? (
        <div className="muted">Đang tải dữ liệu...</div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.address?.city}</td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-secondary" onClick={() => editUser(u)}>Sửa</button>
                      <button className="btn btn-danger" onClick={() => removeUser(u.id)}>Xóa</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {editing && (
            <div className="modal-overlay" role="dialog" aria-modal="true">
              <div className="modal-content">
                <div className="modal-header">
                  <strong>Sửa người dùng (ID: {editing.id})</strong>
                  <button className="btn btn-secondary" onClick={() => setEditing(null)}>Đóng</button>
                </div>
                <div className="grid">
                  <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" value={editing.name} onChange={(e) => handleEditChange("name", e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" value={editing.username} onChange={(e) => handleEditChange("username", e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" value={editing.email} onChange={(e) => handleEditChange("email", e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" type="tel" value={editing.phone} onChange={(e) => handleEditChange("phone", e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="website">Website</label>
                    <input id="website" type="url" value={editing.website} onChange={(e) => handleEditChange("website", e.target.value)} />
                  </div>
                </div>
                <div className="section-title">Địa chỉ</div>
                <div className="grid">
                  <div>
                    <label htmlFor="street">Street</label>
                    <input id="street" type="text" value={editing.address?.street || ""} onChange={(e) => handleEditChange("street", e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="suite">Suite</label>
                    <input id="suite" type="text" value={editing.address?.suite || ""} onChange={(e) => handleEditChange("suite", e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="city">City</label>
                    <input id="city" type="text" value={editing.address?.city || ""} onChange={(e) => handleEditChange("city", e.target.value)} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setEditing(null)}>Hủy</button>
                  <button className="btn" onClick={saveUser}>Lưu</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


