import { useState } from "react";
import axios from "axios";

export function EditTodo({ todo, onEditComplete }) {
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [isCompleted, setIsCompleted] = useState(todo.completed); // Track completed state

  const handleEditClick = () => {
    setEditMode(true); // Enable editing mode
  };

  const handleCancelClick = () => {
    setEditMode(false); // Disable editing mode
    setEditTitle(todo.title); // Reset title to original
    setEditDescription(todo.description); // Reset description to original
    setIsCompleted(todo.completed); // Reset completed state to original
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(
        `http://localhost:3000/user/updateTodo/${todo._id}`,
        {
          title: editTitle,
          description: editDescription,
          completed: isCompleted, // Include completed state in the update
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setEditMode(false); // Disable editing mode after save
      onEditComplete(); // Trigger re-render of todos after saving
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md flex items-center justify-between">
      <div className="flex-1">
        <input
          disabled={!editMode}
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className={`border ${
            editMode ? "border-blue-300" : "border-gray-300"
          } rounded p-2 w-full mb-2`}
        />
        <input
          disabled={!editMode}
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className={`border ${
            editMode ? "border-blue-300" : "border-gray-300"
          } rounded p-2 w-full mb-2`}
        />
        {editMode && ( // Only show the checkbox when in edit mode
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)} // Update completed state
              disabled={!editMode} // Disable checkbox when not in edit mode
            />
            <label className="ml-2">Completed</label>
          </div>
        )}
        {editMode ? (
          <div className="flex space-x-2 mt-2">
            <button
              onClick={handleSaveClick}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleEditClick}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
