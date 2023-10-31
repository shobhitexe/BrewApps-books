import { useState } from "react";
import { BooksDisplay, Navbar } from "./components";
import AddForm from "./components/AddForm";

function App() {
  const [showAddForm, SetShowAddForm] = useState<boolean>(false);

  return (
    <div className="w-full mx-auto relative">
      <Navbar showAddForm={showAddForm} SetShowAddForm={SetShowAddForm} />
      <BooksDisplay />
      {showAddForm && <AddForm />}
    </div>
  );
}

export default App;
