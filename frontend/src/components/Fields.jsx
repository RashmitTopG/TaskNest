import { useState } from "react";
import axios from "axios";

export function Fields({ onTodoAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const clickHere = async () => {
    setError(null);
    setSuccessMessage(null);

    if (!title || !description) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/user/addTodo",
        {
          title: title,
          description: description,
          completed: false,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      // Clear the fields after successful submission
      setTitle("");
      setDescription("");
      setSuccessMessage("Todo added successfully!");

      // Notify parent to refresh the list and hide form
      onTodoAdded();
    } catch (error) {
      console.error(error);
      setError("Error adding todo, please try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Add a New Todo</h2>
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-gray-300 rounded p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={clickHere}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Add Todo
      </button>

      {/* Show success or error messages */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mt-2">{successMessage}</p>
      )}
    </div>
  );
}
