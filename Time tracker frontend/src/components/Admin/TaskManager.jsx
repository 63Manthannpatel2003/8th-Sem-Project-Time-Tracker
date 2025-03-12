import React, { useState } from "react";

const TaskManager = () => {
  // Step 1: Define states
  const [tasks, setTasks] = useState([]); // Store task list
  const [taskInput, setTaskInput] = useState(""); // Store user input

  // Step 2: Handle input changes
  const handleChange = (e) => {
    setTaskInput(e.target.value); // Update input field state
  };

  // Step 3: Add a new task
  const handleAddTask = () => {
    if (taskInput.trim() === "") return; // Prevent empty tasks

    setTasks([...tasks, taskInput]); // Add new task to list
    setTaskInput(""); // Clear input field after adding
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Task Manager</h2>

      {/* Step 4: Input field to enter task */}
      <input
        type="text"
        placeholder="Enter task..."
        value={taskInput}
        onChange={handleChange}
        style={{
          padding: "8px",
          width: "80%",
          marginRight: "10px",
          borderRadius: "5px",
          border: "1px solid #ddd",
        }}
      />

      {/* Step 5: Button to add task */}
      <button
        onClick={handleAddTask}
        style={{
          padding: "8px 12px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Task
      </button>

      {/* Step 6: Display task list */}
      <ul style={{ marginTop: "20px", listStyle: "none", padding: 0 }}>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              padding: "10px",
              marginTop: "5px",
              background: "#f5f5f5",
              borderRadius: "5px",
            }}
          >
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
