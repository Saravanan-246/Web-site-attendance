import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";

const classes = ["LKG", "UKG", ...Array.from({ length: 12 }, (_, i) => (i + 1).toString())];
const sampleEnrollments = [
  { id: 1, name: "John Doe", class: "10", section: "A", status: "Active" },
  { id: 2, name: "Jane Smith", class: "9", section: "B", status: "Active" },
  { id: 3, name: "Alice Johnson", class: "10", section: "C", status: "Inactive" },
];

const Enrollments = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEnrollments = sampleEnrollments.filter((s) => {
    const matchesClass = selectedClass ? s.class === selectedClass : true;
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(s.id).includes(searchTerm);
    return matchesClass && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
        Enrollments
      </h1>

      {/* Class Buttons */}
      <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
        {classes.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedClass(c)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedClass === c
                ? "bg-teal-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            } hover:scale-105 transition`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex justify-center">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search student..." />
      </div>

      {/* Enrollment Table */}
      <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800 mt-4">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">#</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Class</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Section</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredEnrollments.length ? (
              filteredEnrollments.map((student, idx) => (
                <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">{idx + 1}</td>
                  <td className="px-6 py-4">{student.name}</td>
                  <td className="px-6 py-4">{student.class}</td>
                  <td className="px-6 py-4">{student.section}</td>
                  <td className={`px-6 py-4 font-semibold ${student.status === "Active" ? "text-green-600" : "text-red-600"}`}>
                    {student.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No enrollments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Enrollments;
