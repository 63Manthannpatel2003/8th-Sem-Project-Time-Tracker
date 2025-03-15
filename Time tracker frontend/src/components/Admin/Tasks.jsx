import React, { useState, useEffect } from "react";
import Navbar from "../common/Navbar";
import "../../css/tasks.css";
import TaskManager from "./TaskManager";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/getTask") // API endpoint
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="tasks-container">
        <h1>Tasks</h1>
        <TaskManager />
        <div className="tasks-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-details">
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p className="estimated-time">
                  ⏳ {task.totalMinutes} minutes estimated
                </p>
              </div>
              <div className="task-actions">
                {task.status_id && (
                  <span className={`status ${task.status_id.name}`}>
                    {task.status_id.name}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
