import { useEffect, useState } from "react";
import axios from "axios";
import { CompleteButton } from "./CompleteButton";
import { DeleteButton } from "./DeleteButton";

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

        setTodos(result.data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [todos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-10">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Your Todos
        </h1>
        <ul className="space-y-6">
          {todos.map((todo) => (
            <li key={todo._id} className="border-b border-gray-300 pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    {todo.title}
                  </h2>
                  <p className="text-gray-600 text-lg">{todo.description}</p>
                </div>
                <CompleteButton todoId={todo._id} />
                <DeleteButton todoId={todo._id}></DeleteButton>
              </div>
              <p
                className={`mt-2 text-lg ${
                  todo.completed
                    ? "text-green-500 font-medium"
                    : "text-red-500 font-medium"
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
