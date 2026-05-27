import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Todos() {
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState([]);
  const navigate = useNavigate();

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
        // console.log(result);
        setTodo(result.data);
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
      console.log(result);
      setTodo([...todo, result]); //adding a new todo to an existing list
      setNewTodo(""); //clearing the input
    } catch (error) {
      console.log(err.message);
    }
  }

  return (
    <div>
      <h1>RCB into the 2nd finals</h1>

      <input
        type="text"
        placeholder="Enter task"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />

      <button onClick={addTodo}>Add Task</button>
      {todo.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </div>
  );
}

export default Todos;
