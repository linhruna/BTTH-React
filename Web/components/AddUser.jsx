function AddUser({ onAdd }) {
  const [adding, setAdding] = React.useState(false);
  const [user, setUser] = React.useState({
    name: "", username: "", email: "",
    address: { street: "", suite: "", city: "" },
    phone: "", website: ""
  });

  const open = () => setAdding(true);
  const close = () => setAdding(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (["street", "suite", "city"].includes(id)) {
      setUser(prev => ({ ...prev, address: { ...prev.address, [id]: value } }));
    } else {
      setUser(prev => ({ ...prev, [id]: value }));
    }
  };

  const resetForm = () => {
    setUser({ name: "", username: "", email: "", address: { street: "", suite: "", city: "" }, phone: "", website: "" });
  };

  const handleAdd = () => {
    if (user.name.trim() === "" || user.username.trim() === "") {
      alert("Vui lòng nhập Name và Username!");
      return;
    }
    onAdd(user);
    resetForm();
    close();
  };

  return (
    <div className="card" style={{ marginBottom: 12 }}>
      <button className="btn" onClick={open}>Thêm người dùng</button>
      {adding && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content">
            <div className="modal-header">
              <strong>Thêm người dùng</strong>
              <button className="btn btn-secondary" onClick={close}>Đóng</button>
            </div>
            <div className="grid">
              <div>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" value={user.name} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" value={user.username} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={user.email} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input id="phone" type="tel" value={user.phone} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="website">Website</label>
                <input id="website" type="url" value={user.website} onChange={handleChange} />
              </div>
            </div>

            <div className="section-title">Địa chỉ</div>
            <div className="grid">
              <div>
                <label htmlFor="street">Street</label>
                <input id="street" type="text" value={user.address.street} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="suite">Suite</label>
                <input id="suite" type="text" value={user.address.suite} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="city">City</label>
                <input id="city" type="text" value={user.address.city} onChange={handleChange} />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => { resetForm(); close(); }}>Hủy</button>
              <button className="btn" onClick={handleAdd}>Thêm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


