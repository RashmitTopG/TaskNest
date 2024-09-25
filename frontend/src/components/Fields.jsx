import { useState } from "react";
import axios from "axios";

export function Fields() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const clickHere = async () => {
    try {
      const response = await axios.post(
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
    } catch (error) {
      console.error(error);
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
      <button onClick={clickHere}>Click Me</button>
    </div>
  );
}
