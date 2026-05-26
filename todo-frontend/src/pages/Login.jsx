import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //async function to handle login

  async function handleLogin() {
    try {
      const response = await fetch(
        "https://todo-api-ksd1.onrender.com/auth/login",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        setError(result.error);
        return;
      }
      localStorage.setItem("token", result.token);
      //   console.log(result.token);

      navigate("/todos");
    } catch (error) {
      setError("Something went wrong . Try again. ");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
