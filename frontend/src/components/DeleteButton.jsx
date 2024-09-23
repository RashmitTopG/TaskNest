import axios from "axios";

export function DeleteButton({ todoId }) {
  const onDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/user/delete/${todoId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
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
