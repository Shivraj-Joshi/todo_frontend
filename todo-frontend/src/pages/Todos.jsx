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
          "https://todo-api-ksd1.onrender.com/todos",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const result = await response.json();
        console.log(" GET result :", result);
        console.log(" GET result:", result.data);
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
      const response = await fetch("https://todo-api-ksd1.onrender.com/todos", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTodo }),
      });
      const result = await response.json();
      //   console.log(result);
      //   console.log(result.data.completed);
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
        `https://todo-api-ksd1.onrender.com/todos/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const result = await response.json();
      //   console.log("delete result : ", result);
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
        `https://todo-api-ksd1.onrender.com/todos/${id}`,
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
      console.log("PUT result: ", result);
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

  return (
    <div>
      <h1>My Todos</h1>
      <button onClick={handleLogout}>Logout</button>

      <input
        type="text"
        placeholder="Enter task"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />

      <button onClick={addTodo}>Add Task</button>

      {todos.map((todo) => (
        <div key={todo.id}>
          <span
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.title}
          </span>
          <button onClick={() => toggleComplete(todo.id, todo.completed)}>
            {todo.completed ? "Undo" : "Done"}
          </button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Todos;
