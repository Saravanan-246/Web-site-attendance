import React, { useState } from "react";
import { motion } from "framer-motion";

const classes = ["LKG", "UKG", ...Array.from({ length: 12 }, (_, i) => (i + 1).toString())];
const sections = ["A", "B", "C"];

// Sample absent data
const absenteeData = {
  "LKG-A": [
    { student: "John Doe", date: "2025-09-28" },
    { student: "Jane Smith", date: "2025-09-28" },
  ],
  "1-B": [
    { student: "Alice Johnson", date: "2025-09-28" },
  ],
};

const AbsenteeList = () => {
  const [selectedClass, setSelectedClass] = useState("LKG");
  const [selectedSection, setSelectedSection] = useState("A");

  const key = `${selectedClass}-${selectedSection}`;
  const data = absenteeData[key] || [];

  return (
    <div className="p-6 space-y-8">
      <motion.h1
        className="text-3xl font-bold text-gray-800 dark:text-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Absentee List
      </motion.h1>

      {/* Filters */}
      <div className="flex space-x-4 items-center">
        <select
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          {classes.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>

        <select
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          {sections.map((sec) => (
            <option key={sec} value={sec}>{sec}</option>
          ))}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-gray-500">Total Absent</p>
          <p className="text-2xl font-bold">{data.length}</p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-2xl transition-shadow duration-300"
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-gray-500">Percentage</p>
          <p className="text-2xl font-bold">
            {data.length > 0 ? ((data.length / 30) * 100).toFixed(1) : 0}%
          </p>
        </motion.div>
      </div>

      {/* Absentee Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Student</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((row, idx) => (
              <motion.tr
                key={idx}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <td className="px-6 py-4">{row.student}</td>
                <td className="px-6 py-4">{row.date}</td>
              </motion.tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={2} className="px-6 py-4 text-center text-gray-500 dark:text-gray-300">
                  No absentees for {selectedClass} - {selectedSection}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AbsenteeList;
