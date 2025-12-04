import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "./features/mainPage/MainPage";
import { LoginPage } from "./features/LoginPage/LoginPage";
import "./App.css";

function App() {
  return (
    <Routes>
      {/* Handle both root and app context paths */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/app/login" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/app/main" element={<MainPage />} />
      {/* Default redirects */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/app" element={<Navigate to="/app/login" replace />} />
      {/* Catch-all route for SPA - redirect to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
