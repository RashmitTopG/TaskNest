import { useEffect, useState } from "react";
import axios from "axios";

export function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const result = await axios.get("http://localhost:3000/user/todos", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        // Destructure todos from result.data
        console.log(result.data);
        setTodos(result.data.todos);
        console.log(todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Your Todos
        </h1>
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li key={todo._id} className="border-b pb-4">
              <h2 className="text-xl font-bold text-gray-700">{todo.title}</h2>
              <p className="text-gray-600">{todo.description}</p>
              <p
                className={`mt-2 ${
                  todo.completed
                    ? "text-green-600 font-medium"
                    : "text-red-600 font-medium"
                }`}
              >
                {todo.completed ? "Completed" : "Not Completed"}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
