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
    <div>
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={clickHere}>Add Todo</button>

      {/* Show success or error messages */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}
