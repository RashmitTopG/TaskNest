import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context";
import { CompleteButton } from "./CompleteButton";
import { DeleteButton } from "./DeleteButton";
import axios from "axios";
import { AddTodo } from "./AddTodo";
import { EditTodo } from "./EditTodo";

export function Todos() {
  const { render, setRender } = useContext(TodoContext);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/todos", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setTodos(response.data.todos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, [render]);

  const handleEditComplete = () => {
    setRender((prev) => !prev); // Trigger re-fetching todos on edit completion
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Todos
      </h1>
      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
          >
            <div className="flex-1">
              <EditTodo todo={todo} onEditComplete={handleEditComplete} />
              <div
                className={`text-sm font-semibold mt-1 ${
                  todo.completed ? "text-green-600" : "text-red-600"
                }`}
              >
                {todo.completed ? "Completed" : "Not Completed"}
              </div>
            </div>
            <div className="flex space-x-2">
              <CompleteButton todoId={todo._id} isCompleted={todo.completed} />
              <DeleteButton todoId={todo._id} />
            </div>
          </div>
        ))}
      </div>
      <AddTodo />
    </div>
  );
}
