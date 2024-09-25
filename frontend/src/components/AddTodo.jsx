import { useState } from "react";
import { Fields } from "./Fields";

export function AddTodo() {
  const [showFields, setShowFields] = useState(false);

  const toggleFields = () => {
    setShowFields(true); // Toggle visibility of Fields
  };

  return (
    <div>
      <button onClick={toggleFields} style={{ background: "green" }}>
        {showFields ? "Hide Fields" : "Show Fields"}{" "}
      </button>
      {showFields && <Fields />} {/* Conditionally render Fields */}
    </div>
  );
}
