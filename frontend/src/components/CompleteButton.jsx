import axios from "axios";

// CompleteButton component to mark a todo as complete
export function CompleteButton({ todoId }) {
  const onClick = async () => {
    try {
      // Send todoId in the URL as a parameter
      await axios.put(
        `http://localhost:3000/user/completeTodo/${todoId}`, // Pass todoId in the URL
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Todo Completed");
    } catch (error) {
      console.log("Error While Completing Todo: " + error);
    }
  };

  return (
    <button onClick={onClick} style={{ background: "red" }}>
      Complete
    </button>
  );
}
