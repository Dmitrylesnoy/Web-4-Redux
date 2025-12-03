import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./features/mainPage/MainPage";
import "./App.css";
import { LoginPage } from "./features/LoginPage/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
