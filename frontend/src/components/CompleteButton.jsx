// components/CompleteButton.jsx

import axios from "axios";
import { useContext } from "react";
import { TodoContext } from "../context";

// CompleteButton component to mark a todo as complete
export function CompleteButton({ todoId, isCompleted }) {
  // Pass isCompleted as a prop
  const { render, setRender } = useContext(TodoContext);

  const onClick = async () => {
    try {
      // Send todoId in the URL and toggle the 'completed' state
      await axios.put(
        `http://localhost:3000/user/completeTodo/${todoId}`,
        { completed: !isCompleted }, // Toggle the completed state
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log(
        isCompleted ? "Todo marked as incomplete" : "Todo marked as complete"
      );
      setRender((prev) => !prev); // Re-render the todo list
    } catch (error) {
      console.log("Error While Completing Todo: " + error);
    }
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${
        isCompleted ? "bg-gray-500" : "bg-red-500"
      } text-white`}
    >
      {isCompleted ? "Undo" : "Complete"}
    </button>
  );
}
