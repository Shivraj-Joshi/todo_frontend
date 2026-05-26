import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Todos from "./pages/todos";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </>
  );
}

export default App;
