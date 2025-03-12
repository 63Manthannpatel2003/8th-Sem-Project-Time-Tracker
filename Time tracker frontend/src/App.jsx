import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";
import { AdminDashboard } from "./components/Admin/AdminDashboard";
import { DeveloperDashboard } from "./components/Developer/DeveloperDashboard";
import { ProjectManagerDashboard } from "./components/ProjectManager/ProjectManagerDashboard";
import { AddProject } from "./components/Admin/AddProject";
import ProjectPage from "./components/Admin/Project";
import Tasks from "./components/Admin/Tasks";
import Reports from "./components/Admin/Reports";
import TaskManager from "./components/Admin/TaskManager";
import PrivateRoute from "./utils/PrivateRoute"; // For role-based access
import "./css/styles.css";

axios.defaults.baseURL = "http://localhost:8000";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes - Admin */}
          <Route element={<PrivateRoute role="admin" />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/addProject" element={<AddProject />} />
            <Route path="/admin/projects" element={<ProjectPage />} />
            <Route path="/admin/tasks" element={<Tasks />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/taskManager" element={<TaskManager />} />
          </Route>

          {/* Protected Routes - Developer */}
          <Route element={<PrivateRoute role="developer" />}>
            <Route path="/developer/dashboard" element={<DeveloperDashboard />} />
          </Route>

          {/* Protected Routes - Project Manager */}
          <Route element={<PrivateRoute role="manager" />}>
            <Route path="/ProjectManager/dashboard" element={<ProjectManagerDashboard />} />
          </Route>
        </Routes>
      </div>

      {/* Task Manager should be placed only where needed */}
      
    </Router>
  );
}

export default App;
