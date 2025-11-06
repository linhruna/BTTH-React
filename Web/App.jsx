function App() {
  const [kw, setKeyword] = React.useState("");
  const [newUser, setNewUser] = React.useState(null);

  return (
    <div>
      <SearchForm onChangeValue={setKeyword} />
      <AddUser onAdd={setNewUser} />
      <ResultTable keyword={kw} user={newUser} onAdded={() => setNewUser(null)} />
    </div>
  );
}


