// Side2/Attendance/AttendanceReports.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CSVLink } from "react-csv";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Sample attendance data
const attendanceData = {
  "LKG-A": [
    { student: "John Doe", present: 20, absent: 2, date: "2025-09-25" },
    { student: "Jane Smith", present: 19, absent: 3, date: "2025-09-25" },
  ],
  "1-B": [
    { student: "Alice Johnson", present: 22, absent: 0, date: "2025-09-25" },
    { student: "Bob Brown", present: 21, absent: 1, date: "2025-09-25" },
  ],
};

// Classes & Sections
const classes = ["LKG","UKG", ...Array.from({ length: 12 }, (_, i) => (i + 1).toString())];
const sections = ["A","B","C"];
const COLORS = ["#34D399", "#F87171"]; // green=present, red=absent

const AttendanceReports = () => {
  const [selectedClass, setSelectedClass] = useState("LKG");
  const [selectedSection, setSelectedSection] = useState("A");
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const key = `${selectedClass}-${selectedSection}`;
  const data = attendanceData[key] || [];

  // Filter data by search and date
  const filteredData = data.filter(d => {
    const matchSearch = d.student.toLowerCase().includes(searchText.toLowerCase());
    const matchStart = startDate ? new Date(d.date) >= startDate : true;
    const matchEnd = endDate ? new Date(d.date) <= endDate : true;
    return matchSearch && matchStart && matchEnd;
  });

  // Summary
  const totalPresent = filteredData.reduce((sum, d) => sum + d.present, 0);
  const totalAbsent = filteredData.reduce((sum, d) => sum + d.absent, 0);
  const totalStudents = filteredData.length;
  const presentPercent = totalStudents ? ((totalPresent / (totalPresent + totalAbsent)) * 100).toFixed(1) : 0;

  return (
    <div className="p-6 space-y-8">
      <motion.h1
        className="text-3xl font-bold text-gray-800 dark:text-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Attendance Reports
      </motion.h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <select
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          {classes.map(cls => <option key={cls} value={cls}>{cls}</option>)}
        </select>

        <select
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          {sections.map(sec => <option key={sec} value={sec}>{sec}</option>)}
        </select>

        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          placeholderText="Start Date"
          className="p-2 border rounded"
        />
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          placeholderText="End Date"
          className="p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Search student"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="p-2 border rounded"
        />

        <CSVLink data={filteredData} filename={`Attendance_${selectedClass}-${selectedSection}.csv`}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Export CSV</button>
        </CSVLink>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300" whileHover={{ scale: 1.02 }}>
          <p className="text-gray-500">Total Students</p>
          <p className="text-2xl font-bold">{totalStudents}</p>
        </motion.div>
        <motion.div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300" whileHover={{ scale: 1.02 }}>
          <p className="text-gray-500">Total Present</p>
          <p className="text-2xl font-bold">{totalPresent}</p>
        </motion.div>
        <motion.div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300" whileHover={{ scale: 1.02 }}>
          <p className="text-gray-500">Total Absent</p>
          <p className="text-2xl font-bold">{totalAbsent}</p>
        </motion.div>
        <motion.div className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300 ${presentPercent < 75 ? "border-l-4 border-red-500" : ""}`} whileHover={{ scale: 1.02 }}>
          <p className="text-gray-500">Present %</p>
          <p className="text-2xl font-bold">{presentPercent}%</p>
        </motion.div>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Student</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Present</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Absent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredData.map((row, idx) => (
              <motion.tr key={idx} className={`hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 ${row.absent > 0 ? "bg-red-50 dark:bg-red-900" : "bg-green-50 dark:bg-green-900"}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                <td className="px-6 py-4">{row.student}</td>
                <td className="px-6 py-4">{row.present}</td>
                <td className="px-6 py-4">{row.absent}</td>
              </motion.tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500 dark:text-gray-300">
                  No data available for {selectedClass} - {selectedSection}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Attendance Charts */}
      {filteredData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Attendance Bar Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData}>
                <XAxis dataKey="student" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#34D399" />
                <Bar dataKey="absent" fill="#F87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">Attendance Pie Chart</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Present", value: totalPresent },
                    { name: "Absent", value: totalAbsent }
                  ]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {[
                    { name: "Present", value: totalPresent },
                    { name: "Absent", value: totalAbsent }
                  ].map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceReports;
