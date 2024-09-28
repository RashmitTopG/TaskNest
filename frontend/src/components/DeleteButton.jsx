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
      console.error("Some Error Occured " + error);
    }
  };
  return (
    <div>
      <button onClick={onDelete} style={{ background: "yellow" }}>
        Delete
      </button>
    </div>
  );
}
