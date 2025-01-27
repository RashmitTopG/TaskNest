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
    <div className="flex flex-col items-center">
      <button
        onClick={toggleFields}
        className={`px-6 py-2 mt-4 rounded-lg shadow-md text-white ${
          showFields ? "bg-red-500" : "bg-green-500"
        } hover:opacity-90 transition-all duration-300`}
      >
        {showFields ? "Hide Fields" : "Add Todo"}
      </button>
      {showFields && (
        <div className="mt-4 w-full max-w-md p-4 bg-gray-100 rounded-lg shadow-lg">
          <Fields onTodoAdded={handleTodoAdded} />
        </div>
      )}
    </div>
  );
}
