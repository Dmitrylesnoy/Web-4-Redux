import { Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "./features/mainPage/MainPage";
import { LoginPage } from "./features/LoginPage/LoginPage";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/*" element={isAuthenticated ? <Navigate to="/main" replace /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
