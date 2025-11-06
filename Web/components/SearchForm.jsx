function SearchForm({ onChangeValue }) {
  const handleChange = (e) => {
    onChangeValue(e.target.value);
  };
  return (
    <div className="card toolbar">
      <input
        type="text"
        placeholder="Tìm theo name, username"
        onChange={handleChange}
        aria-label="Từ khóa tìm kiếm"
      />
    </div>
  );
}


