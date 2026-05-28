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
    // <div>
    //   <h1>Register</h1>
    //   <input
    //     type="email"
    //     placeholder="Enter email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <input
    //     type="password"
    //     placeholder="Enter password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   {error && <p>{error}</p>}
    //   <button onClick={handleRegister}>Register</button>
    //   <p>
    //     Already have an account?{" "}
    //     <button onClick={() => navigate("/")}>Login</button>
    //   </p>
    // </div>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
            <svg
              className="w-5 h-5 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-lg font-medium text-gray-900">
            Create an account
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Start managing your todos
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-300"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-300"
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            onClick={handleRegister}
            className="w-full py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Create account
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-5">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
