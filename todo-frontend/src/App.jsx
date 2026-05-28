import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Todos from "./pages/todos";
import Register from "./pages/Register";
import "./App.css";

function App() {
  return (
    <>
      {/* <h1 className="text-3xl font-bold text-blue-500">Todo App</h1> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </>
  );
}

export default App;
