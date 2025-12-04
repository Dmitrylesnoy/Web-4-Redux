import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "./features/mainPage/MainPage";
import { LoginPage } from "./features/LoginPage/LoginPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/app/login" element={<LoginPage />} /> */}
      <Route path="/main" element={<MainPage />} />
      {/* <Route path="/app/main" element={<MainPage />} /> */}

      <Route path="/app" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
