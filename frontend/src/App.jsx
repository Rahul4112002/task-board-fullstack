import { useState, useEffect } from "react";
import TaskBoard from "./components/TaskBoard";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen py-8 px-4">
      <TaskBoard />
    </div>
  );
}

export default App;
