import { Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "./features/mainPage/MainPage";
import { LoginPage } from "./features/LoginPage/LoginPage";
import "./App.css";
import { selectAuth } from "./features/auth/authSlice";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector(selectAuth);
  let page = "/login";
  if (isAuthenticated) {
    page = "/main";
  }
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/app/login" element={<LoginPage />} /> */}
      <Route path="/main" element={<MainPage />} />
      {/* <Route path="/app/main" element={<MainPage />} /> */}

      <Route path="/app" element={<Navigate to={page} replace />} />
      <Route path="/*" element={<Navigate to={page} replace />} />
    </Routes>
  );
}

export default App;
