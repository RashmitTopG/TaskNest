import axios from "axios";
import { useContext } from "react";
import { TodoContext } from "../context";

export function DeleteButton({ todoId }) {
  const { render, setRender } = useContext(TodoContext);

  const onDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/user/delete/${todoId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setRender((prev) => !prev);
    } catch (error) {
      console.error("Some Error Occurred " + error);
    }
  };

  return (
    <div>
      <button
        onClick={onDelete}
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        Delete
      </button>
    </div>
  );
}
