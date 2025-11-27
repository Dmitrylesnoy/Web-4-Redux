import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { MyForm } from "./features/myForm/MyForm";
import { Graph } from "./features/graph/Graph";
import styles from "./App.css";

function App() {
  return (
    <div className="main-container">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      {/* <Counter /> */}
      <div className="main-row">
        <MyForm />
        <Graph />
      </div>
    </div>
  );
}

export default App;
