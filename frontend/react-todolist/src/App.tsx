import React from "react";
import TaskList from "./components/TaskList";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1>To Do List</h1>
      <TaskList />
    </div>
  );
};

export default App;
