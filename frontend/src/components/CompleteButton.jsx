import axios from "axios";
import { useContext } from "react";
import { TodoContext } from "../context";

// CompleteButton component to mark a todo as complete
export function CompleteButton({ todoId, isCompleted }) {
  const { render, setRender } = useContext(TodoContext);

  const onClick = async () => {
    try {
      await axios.put(
        `http://localhost:3000/user/completeTodo/${todoId}`,
        { completed: !isCompleted },
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
      setRender((prev) => !prev);
    } catch (error) {
      console.log("Error While Completing Todo: " + error);
    }
  };

  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-lg shadow-md text-white font-semibold ${
        isCompleted
          ? "bg-gray-500 hover:bg-gray-600"
          : "bg-red-500 hover:bg-red-600"
      } transition duration-300 ease-in-out transform hover:scale-105`}
    >
      {isCompleted ? "Undo" : "Complete"}
    </button>
  );
}
