import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MyForm } from "../myForm/MyForm";
import { Graph } from "../graph/Graph";
import { MyTable } from "../myTable/MyTable";
import { RootState, AppDispatch } from "../../app/store";
import { logoutRequest } from "../auth/authSlice";
import styles from "./MainPage.module.css";

export function MainPage() {
  // TODO: resize front
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { username, token, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("app/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    if (token) {
      dispatch(logoutRequest(token));
    }
    navigate("app/login");
  };

  return (
    <div>
      <header className={styles.mainHeader}>
        <div className={styles.headerInfo}>
          <h1>Web Lab 4 - вариант 300000</h1>
          <h2>Линейский Аким Евгеньевич, группа P3215</h2>
        </div>
        <div className={styles.controls}>
          <h3>Welcome, {username}!</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="main-container">
        <div className="main-row">
          <MyForm />
          <Graph />
        </div>
        <div className="main-row">
          <MyTable />
        </div>
      </div>
    </div>
  );
}
