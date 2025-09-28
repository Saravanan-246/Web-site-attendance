// src/Side2/Teachers/Performance.jsx
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import StaffPerformance from "../Staff/StaffPerformance"; // import staff component

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dummy teacher performance data
const teachersData = [
  { name: "Mr. John", classes: 25, attendance: 95, pendingLeaves: 2 },
  { name: "Ms. Smith", classes: 20, attendance: 92, pendingLeaves: 0 },
  { name: "Mr. Lee", classes: 22, attendance: 88, pendingLeaves: 1 },
  { name: "Ms. Jane", classes: 18, attendance: 97, pendingLeaves: 3 },
  { name: "Mr. Brown", classes: 24, attendance: 90, pendingLeaves: 1 },
];

const Performance = () => {
  const [view, setView] = useState("teachers"); // 'teachers' or 'staff'
  const [selectedTeacher, setSelectedTeacher] = useState("");

  if (view === "staff") {
    // If viewing staff, render StaffPerformance component directly
    return <StaffPerformance />;
  }

  // Filter data by selected teacher
  const filteredData = selectedTeacher
    ? teachersData.filter((t) => t.name === selectedTeacher)
    : teachersData;

  // Chart data
  const chartData = {
    labels: filteredData.map((t) => t.name),
    datasets: [
      {
        label: "Attendance %",
        data: filteredData.map((t) => t.attendance),
        backgroundColor: filteredData.map((t) =>
          t.attendance < 90 ? "rgba(239,68,68,0.7)" : "rgba(34,197,94,0.7)"
        ),
        barPercentage: 0.5,
        categoryPercentage: 0.6,
      },
      {
        label: "Pending Leaves",
        data: filteredData.map((t) => t.pendingLeaves),
        backgroundColor: "rgba(59,130,246,0.7)",
        barPercentage: 0.5,
        categoryPercentage: 0.6,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: selectedTeacher
          ? `${selectedTeacher} Performance`
          : "Teacher Performance Overview",
      },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  // Reset teacher selection
  const resetSelection = () => setSelectedTeacher("");

  // Summary values
  const totalAttendance = Math.round(
    teachersData.reduce((a, t) => a + t.attendance, 0) / teachersData.length
  );
  const totalPendingLeaves = teachersData.reduce((a, t) => a + t.pendingLeaves, 0);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Teacher Performance
      </h1>
      <p className="text-gray-600 dark:text-gray-400">
        Overview of teacher performance including classes handled, attendance, and pending leaves.
      </p>

      {/* Toggle Buttons for Teachers / Staff */}
      <div className="flex gap-2 mt-4">
        <button
          className={`px-4 py-2 rounded ${
            view === "teachers"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
          onClick={() => setView("teachers")}
        >
          Teachers
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "staff"
              ? "bg-green-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white"
          }`}
          onClick={() => setView("staff")}
        >
          Staff
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-800">
          <h2 className="text-gray-700 dark:text-gray-200 font-semibold">Total Teachers</h2>
          <p className="text-2xl font-bold mt-2">{teachersData.length}</p>
        </div>
        <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-800">
          <h2 className="text-gray-700 dark:text-gray-200 font-semibold">Average Attendance</h2>
          <p
            className={`text-2xl font-bold mt-2 ${
              totalAttendance < 90 ? "text-red-600" : "text-green-600"
            }`}
          >
            {totalAttendance}%
          </p>
        </div>
        <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-800">
          <h2 className="text-gray-700 dark:text-gray-200 font-semibold">Total Pending Leaves</h2>
          <p className="text-2xl font-bold mt-2">{totalPendingLeaves}</p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="mt-6 p-4 rounded-lg shadow bg-white dark:bg-gray-800 h-96">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Teacher Selector */}
      <div className="mt-6">
        <label className="block text-gray-700 dark:text-gray-200 mb-2">
          Select Teacher for Details:
        </label>
        <div className="flex gap-2 flex-wrap">
          <select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white w-full sm:w-1/3"
          >
            <option value="">-- Select Teacher --</option>
            {teachersData.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
          {selectedTeacher && (
            <button
              onClick={resetSelection}
              className="px-3 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500 transition"
            >
              Reset
            </button>
          )}
        </div>

        {selectedTeacher && (
          <div className="mt-4 p-4 rounded-lg shadow bg-white dark:bg-gray-800">
            <h2 className="font-semibold text-gray-700 dark:text-gray-200">
              {selectedTeacher} Details
            </h2>
            <p>Classes Handled: {filteredData[0].classes}</p>
            <p>Attendance: {filteredData[0].attendance}%</p>
            <p>Pending Leaves: {filteredData[0].pendingLeaves}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Performance;
