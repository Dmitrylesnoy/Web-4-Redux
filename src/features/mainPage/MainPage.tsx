import React from "react";
import { useNavigate } from "react-router-dom";
import { MyForm } from "../myForm/MyForm";
import { Graph } from "../graph/Graph";
import { MyTable } from "../myTable/MyTable";

export function MainPage() {
  // TODO: resize front
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate("/");
  };

  return (
    <div>
      <header className="main-header">
        <h1>Web Lab 4 - вариант 300000</h1>
        <h2>Линейский Аким Евгеньевич, группа P3215</h2>
        <button onClick={handleNavigateToLogin}>Logout</button>
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
