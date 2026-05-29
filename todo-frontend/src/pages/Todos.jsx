import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState([]);
  const navigate = useNavigate();

  //fetching all the todos

  useEffect(() => {
    async function fetchTodo() {
      const token = localStorage.getItem("token"); // fetching jwt token from localStorage to use it in authorization

      if (!token) {
        navigate("/"); // if there is no token navigate user to login page
        return;
      }

      try {
        // fetching user's todos
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/todos`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const result = await response.json();

        setTodos(result.data);
      } catch (error) {
        console.log(err.message);
      }
    }

    fetchTodo();
  }, []);

  //adding a new todo

  async function addTodo() {
    const token = localStorage.getItem("token");

    if (!newTodo.trim()) return; // don't add empty todos

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/todos`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: newTodo }),
        },
      );
      const result = await response.json();

      setTodos([...todos, result]); //adding a new todo to an existing list
      setNewTodo(""); //clearing the input
    } catch (error) {
      console.log(err.message);
    }
  }

  // deleting a todo

  async function deleteTodo(id) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/todos/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const result = await response.json();
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.log(err.message);
    }
  }

  //updating the todo status

  async function toggleComplete(id, completed) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/todos/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ completed: !completed }),
        },
      );
      const result = await response.json();
      setTodos(todos.map((todo) => (todo.id === id ? result : todo)));
    } catch (err) {
      console.log(err.message);
    }
  }

  //logout function
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <div>
            <h1 className="text-lg font-medium text-gray-900">My todos</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {completedCount} of {todos.length} completed
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors "
          >
            Logout
          </button>
        </div>

        {/* Add todo input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:border-blue-300"
          />
          <button
            onClick={addTodo}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        {/* Todo list */}
        <div className="flex flex-col gap-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-gray-100"
            >
              {/* Complete button */}
              <button
                onClick={() => toggleComplete(todo.id, todo.completed)}
                className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                  todo.completed
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-300 hover:border-blue-300"
                }`}
              >
                {todo.completed && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>

              {/* Title */}
              <span
                className={`flex-1 text-sm ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
              >
                {todo.title}
              </span>

              {/* Delete button */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-300 hover:text-red-400 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))}

          {/* Empty state */}
          {todos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-gray-400">
                No todos yet. Add one above!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todos;
