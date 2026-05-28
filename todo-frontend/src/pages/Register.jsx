import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const response = await fetch(
        "https://todo-api-ksd1.onrender.com/auth/register",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );

      const result = await response.json();
      console.log(result);

      //if registration failed
      if (!response.ok) {
        setError(response.error);
        return;
      }

      //save the jwt token in localstorage
      localStorage.setItem("token", result.token);
      navigate("/");

      console.log(result);
    } catch (error) {
      setError("Something went wrong . Try again. ");
    }
  }

  return (
    <div>
      <h1>Register</h1>
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
      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account?{" "}
        <button onClick={() => navigate("/")}>Login</button>
      </p>
    </div>
  );
}

export default Register;
