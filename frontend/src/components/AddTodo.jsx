import { useState, useContext } from "react";
import { Fields } from "./Fields";
import { TodoContext } from "../context";

export function AddTodo() {
  const [showFields, setShowFields] = useState(false);
  const { setRender } = useContext(TodoContext); // Get setRender from context

  const toggleFields = () => {
    setShowFields(!showFields);
  };

  const handleTodoAdded = () => {
    setShowFields(false); // Hide the form after adding a todo
    setRender((prev) => !prev); // Re-fetch todos after adding a new one
  };

  return (
    <div>
      <button onClick={toggleFields} style={{ background: "green" }}>
        {showFields ? "Hide Fields" : "Add Todo"}
      </button>
      {showFields && <Fields onTodoAdded={handleTodoAdded} />}
    </div>
  );
}
