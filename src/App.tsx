import React from "react";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./features/loginPage/LoginPage";
import { MainPage } from "./features/mainPage/MainPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="*" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
}

export default App;
