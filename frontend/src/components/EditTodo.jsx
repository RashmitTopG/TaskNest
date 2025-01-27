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
    <div className="bg-white p-6 rounded-lg shadow-md flex items-start">
      <div className="flex-1">
        <input
          disabled={!editMode}
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className={`border ${
            editMode ? "border-blue-300" : "border-gray-300"
          } rounded p-3 w-full mb-3 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <input
          disabled={!editMode}
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className={`border ${
            editMode ? "border-blue-300" : "border-gray-300"
          } rounded p-3 w-full mb-3 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {editMode && ( // Only show the checkbox when in edit mode
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)} // Update completed state
              disabled={!editMode} // Disable checkbox when not in edit mode
              className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-gray-700">Completed</label>
          </div>
        )}
        <div className="flex space-x-3 mt-2">
          {editMode ? (
            <>
              <button
                onClick={handleSaveClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleEditClick}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
