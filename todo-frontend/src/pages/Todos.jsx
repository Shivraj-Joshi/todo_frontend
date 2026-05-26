import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Todos() {
  const [todo, setTodo] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTodo() {
      const token = localStorage.getItem("token"); // fetching jwt token from localStorage to use it in authorization

      if (!token) {
        navigate("/"); // if there is no token navigate user to login page
        return;
      }

      try {
        const response = await fetch(
          "https://todo-api-ksd1.onrender.com/todos",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const result = await response.json();
        setTodo(result.data);
      } catch (error) {
        console.log(err.message);
      }
    }
    fetchTodo();
  }, []);

  return (
    <div>
      <h1>My Todos</h1>
      {todo.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </div>
  );
}

export default Todos;
