import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context";
import { CompleteButton } from "./CompleteButton";
import { DeleteButton } from "./DeleteButton";
import axios from "axios";
import { AddTodo } from "./AddTodo";
import { EditTodo } from "./EditTodo"; // Import the new EditTodos component

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
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Your Todos</h1>
      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo._id}
            className="bg-white p-4 rounded shadow-md flex items-center justify-between"
          >
            <div className="flex-1">
              <EditTodo todo={todo} onEditComplete={handleEditComplete} />
              <div
                className={`text-sm ${
                  todo.completed ? "text-green-600" : "text-red-600"
                }`}
              >
                {todo.completed ? "Completed" : "Not Completed"}
              </div>
              <CompleteButton todoId={todo._id} />
              <DeleteButton todoId={todo._id} />
            </div>
          </div>
        ))}
      </div>
      <AddTodo />
    </div>
  );
}
