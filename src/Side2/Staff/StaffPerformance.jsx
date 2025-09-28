import React, { useState, useMemo } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const staffData = {
  "Teaching Staff": [
    { id: 1, name: "Mr. John Smith", attendance: 95, rating: 4.8, tasksCompleted: 24, department: "Mathematics" },
    { id: 2, name: "Ms. Emily Johnson", attendance: 92, rating: 4.6, tasksCompleted: 22, department: "English" },
    { id: 3, name: "Mr. David Lee", attendance: 88, rating: 4.2, tasksCompleted: 20, department: "Science" },
    { id: 4, name: "Ms. Sarah Wilson", attendance: 97, rating: 4.9, tasksCompleted: 26, department: "History" },
    { id: 5, name: "Mr. Robert Brown", attendance: 90, rating: 4.4, tasksCompleted: 23, department: "Physical Education" },
  ],
  "Admin Staff": [
    { id: 6, name: "Ms. Lisa Anderson", attendance: 98, rating: 4.7, tasksCompleted: 30, department: "Administration" },
    { id: 7, name: "Mr. James Miller", attendance: 94, rating: 4.5, tasksCompleted: 28, department: "Finance" },
    { id: 8, name: "Ms. Jennifer Davis", attendance: 96, rating: 4.8, tasksCompleted: 29, department: "HR" },
    { id: 9, name: "Mr. Michael Garcia", attendance: 91, rating: 4.3, tasksCompleted: 27, department: "IT Support" },
  ],
  "Support Staff": [
    { id: 10, name: "Ms. Maria Rodriguez", attendance: 89, rating: 4.2, tasksCompleted: 25, department: "Library" },
    { id: 11, name: "Mr. Thomas Martinez", attendance: 92, rating: 4.4, tasksCompleted: 22, department: "Lab Assistant" },
    { id: 12, name: "Ms. Nancy Taylor", attendance: 95, rating: 4.6, tasksCompleted: 24, department: "Counseling" },
    { id: 13, name: "Mr. Paul Jackson", attendance: 87, rating: 4.1, tasksCompleted: 21, department: "Transport" },
  ],
  "Security": [
    { id: 14, name: "Mr. Carlos Hernandez", attendance: 96, rating: 4.5, tasksCompleted: 28, department: "Main Gate" },
    { id: 15, name: "Mr. Antonio Lopez", attendance: 94, rating: 4.3, tasksCompleted: 26, department: "Campus Patrol" },
    { id: 16, name: "Mr. Luis Gonzalez", attendance: 98, rating: 4.7, tasksCompleted: 30, department: "Night Shift" },
  ],
  "Maintenance": [
    { id: 17, name: "Mr. Frank Williams", attendance: 91, rating: 4.2, tasksCompleted: 23, department: "Electrical" },
    { id: 18, name: "Mr. Kevin Johnson", attendance: 88, rating: 4.0, tasksCompleted: 20, department: "Plumbing" },
    { id: 19, name: "Mr. Steven Davis", attendance: 93, rating: 4.4, tasksCompleted: 25, department: "General Maintenance" },
    { id: 20, name: "Mr. Richard Miller", attendance: 90, rating: 4.1, tasksCompleted: 22, department: "Grounds Keeping" },
  ],
};

const StaffPerformance = () => {
  const [selectedCategory, setSelectedCategory] = useState("Teaching Staff");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [viewMode, setViewMode] = useState("overview");

  const categories = Object.keys(staffData);
  const currentCategoryData = staffData[selectedCategory] || [];

  const categoryStats = useMemo(() => {
    if (currentCategoryData.length === 0) return {};

    const totalStaff = currentCategoryData.length;
    const avgAttendance = Math.round(
      currentCategoryData.reduce((sum, staff) => sum + staff.attendance, 0) / totalStaff
    );
    const avgRating = (
      currentCategoryData.reduce((sum, staff) => sum + staff.rating, 0) / totalStaff
    ).toFixed(1);
    const totalTasks = currentCategoryData.reduce((sum, staff) => sum + staff.tasksCompleted, 0);
    const topPerformer = currentCategoryData.reduce((best, current) =>
      current.rating > best.rating ? current : best
    );

    return { totalStaff, avgAttendance, avgRating, totalTasks, topPerformer };
  }, [currentCategoryData]);

  const attendanceChartData = {
    labels: currentCategoryData.map(staff => staff.name.split(' ').slice(0, 2).join(' ')),
    datasets: [
      {
        label: "Attendance %",
        data: currentCategoryData.map(staff => staff.attendance),
        backgroundColor: currentCategoryData.map(staff =>
          staff.attendance >= 95 ? "rgba(34,197,94,0.8)" :
            staff.attendance >= 90 ? "rgba(59,130,246,0.8)" :
              "rgba(239,68,68,0.8)"
        ),
        borderColor: currentCategoryData.map(staff =>
          staff.attendance >= 95 ? "rgba(34,197,94,1)" :
            staff.attendance >= 90 ? "rgba(59,130,246,1)" :
              "rgba(239,68,68,1)"
        ),
        borderWidth: 2,
      },
    ],
  };

  const performanceDistributionData = {
    labels: ['Excellent (4.5+)', 'Good (4.0-4.4)', 'Average (3.5-3.9)', 'Below Average (<3.5)'],
    datasets: [
      {
        data: [
          currentCategoryData.filter(s => s.rating >= 4.5).length,
          currentCategoryData.filter(s => s.rating >= 4.0 && s.rating < 4.5).length,
          currentCategoryData.filter(s => s.rating >= 3.5 && s.rating < 4.0).length,
          currentCategoryData.filter(s => s.rating < 3.5).length,
        ],
        backgroundColor: [
          'rgba(34,197,94,0.8)',
          'rgba(59,130,246,0.8)',
          'rgba(245,158,11,0.8)',
          'rgba(239,68,68,0.8)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `${selectedCategory} - Performance Metrics`,
      },
    },
    scales: {
      y: { beginAtZero: true, max: 100 },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: true,
        text: "Performance Rating Distribution",
      },
    },
  };

  const filteredStaffData = selectedStaff
    ? currentCategoryData.filter(staff => staff.name === selectedStaff)
    : currentCategoryData;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Staff Performance Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive performance overview across all staff categories
          </p>
        </div>
        {/* View Mode Toggle */}
        <div className="flex gap-2 mt-4 sm:mt-0">
          <button
            onClick={() => setViewMode("overview")}
            className={`px-4 py-2 rounded-lg transition ${
              viewMode === "overview"
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-400 hover:text-white"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setViewMode("detailed")}
            className={`px-4 py-2 rounded-lg transition ${
              viewMode === "detailed"
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-400 hover:text-white"
            }`}
          >
            Detailed View
          </button>
        </div>
      </div>
      {/* Category Selection */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setSelectedStaff(""); // Reset staff selection when category changes
            }}
            className={`px-4 py-2 rounded-lg shadow transition transform hover:scale-105 ${
              selectedCategory === category
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
            }`}
          >
            {category}
            <span className="ml-2 text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
              {staffData[category]?.length || 0}
            </span>
          </button>
        ))}
      </div>
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border border-blue-200 dark:border-blue-700">
          <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Staff</h3>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100 mt-1">
            {categoryStats.totalStaff}
          </p>
        </div>
        <div className="p-4 rounded-xl shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border border-green-200 dark:border-green-700">
          <h3 className="text-sm font-medium text-green-700 dark:text-green-300">Avg Attendance</h3>
          <p className={`text-2xl font-bold mt-1 ${
            categoryStats.avgAttendance >= 95 ? "text-green-900 dark:text-green-100" :
              categoryStats.avgAttendance >= 90 ? "text-yellow-700 dark:text-yellow-300" :
                "text-red-700 dark:text-red-300"
          }`}>
            {categoryStats.avgAttendance}%
          </p>
        </div>
        <div className="p-4 rounded-xl shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 border border-purple-200 dark:border-purple-700">
          <h3 className="text-sm font-medium text-purple-700 dark:text-purple-300">Avg Rating</h3>
          <p className="text-2xl font-bold text-purple-900 dark:text-purple-100 mt-1">
            {categoryStats.avgRating} ⭐
          </p>
        </div>
        <div className="p-4 rounded-xl shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 border border-orange-200 dark:border-orange-700">
          <h3 className="text-sm font-medium text-orange-700 dark:text-orange-300">Total Tasks</h3>
          <p className="text-2xl font-bold text-orange-900 dark:text-orange-100 mt-1">
            {categoryStats.totalTasks}
          </p>
        </div>
        <div className="p-4 rounded-xl shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800 border border-indigo-200 dark:border-indigo-700">
          <h3 className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Top Performer</h3>
          <p className="text-sm font-bold text-indigo-900 dark:text-indigo-100 mt-1">
            {categoryStats.topPerformer?.name?.split(' ').slice(0, 2).join(' ') || 'N/A'}
          </p>
          <p className="text-xs text-indigo-600 dark:text-indigo-400">
            {categoryStats.topPerformer?.rating} ⭐
          </p>
        </div>
      </div>
      {/* Charts Section */}
      {viewMode === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Chart */}
          <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Attendance Overview
            </h3>
            <div className="h-80">
              <Bar data={attendanceChartData} options={chartOptions} />
            </div>
          </div>
          {/* Performance Distribution */}
          <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Performance Distribution
            </h3>
            <div className="h-80">
              <Doughnut data={performanceDistributionData} options={doughnutOptions} />
            </div>
          </div>
        </div>
      )}
      {/* Detailed View */}
      {viewMode === "detailed" && (
        <div className="space-y-6">
          {/* Staff Selector */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Staff Member for Detailed View:
              </label>
              <select
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">-- View All {selectedCategory} --</option>
                {currentCategoryData.map((staff) => (
                  <option key={staff.id} value={staff.name}>
                    {staff.name}
                  </option>
                ))}
              </select>
            </div>
            {selectedStaff && (
              <button
                onClick={() => setSelectedStaff("")}
                className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition self-end"
              >
                Clear Selection
              </button>
            )}
          </div>
          {/* Staff Details Table */}
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Attendance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tasks Completed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredStaffData.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {staff.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {staff.department}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-semibold ${
                        staff.attendance >= 95 ? "text-green-600 dark:text-green-400" :
                          staff.attendance >= 90 ? "text-blue-600 dark:text-blue-400" :
                            "text-red-600 dark:text-red-400"
                      }`}>
                        {staff.attendance}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {staff.rating} ⭐
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {staff.tasksCompleted}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        staff.rating >= 4.5 && staff.attendance >= 95
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : staff.rating >= 4.0 && staff.attendance >= 90
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}>
                        {staff.rating >= 4.5 && staff.attendance >= 95
                          ? "Excellent"
                          : staff.rating >= 4.0 && staff.attendance >= 90
                            ? "Good"
                            : "Needs Improvement"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffPerformance;
