import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";
import "../../css/Reports.css"; // Ensure CSS is updated
import Navbar from "../common/Navbar";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Reports = () => {
  // Dummy Data
  const barData = {
    labels: ["ABC", "DEF", "GHI", "JKL"],
    datasets: [{ label: "Hours Worked", data: [23, 29, 13, 16], backgroundColor: "rgb(54, 162, 235)" }],
  };

  const pieData = {
    labels: ["Todo", "In Progress", "Completed"],
    datasets: [{ data: [30, 15, 55], backgroundColor: ["#36A2EB", "#4CAF50", "#FF9800"] }],
  };

  const weeklyProgressData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      { label: "Planned", data: [8, 8, 8, 8, 8], backgroundColor: "rgb(54, 162, 235)" },
      { label: "Actual", data: [6, 7, 5, 9, 6], backgroundColor: "rgb(200, 200, 200)" },
    ],
  };

  return (
    <>
      <Navbar />
    <div className="reports-container">
      <h2 className="reports-title">Reports</h2>

      {/* Time per Developer */}
      <div className="report-chart">
        <h3>Time per Developer</h3>
        <Bar data={barData} />
      </div>

      {/* Task Status Distribution */}
      <div className="report-chart">
        <h3>Task Status Distribution</h3>
        <Pie data={pieData} />
      </div>

      {/* Weekly Progress */}
      <div className="report-chart">
        <h3>Weekly Progress</h3>
        <Bar data={weeklyProgressData} />
      </div>
    </div>
    </>
  );
};

export default Reports;
