import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";

const sampleTeachers = [
  { id: 1, name: "Mr. John Smith", subject: "Math", class: "10", status: "Active" },
  { id: 2, name: "Ms. Emily Johnson", subject: "English", class: "9", status: "Active" },
  { id: 3, name: "Mr. Robert Brown", subject: "Science", class: "10", status: "Inactive" },
  { id: 4, name: "Ms. Sarah Wilson", subject: "History", class: "11", status: "Active" },
  { id: 5, name: "Mr. David Lee", subject: "Physics", class: "12", status: "Inactive" },
];

const AllTeachers = () => {
  const [teachers, setTeachers] = useState(sampleTeachers);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ name: "", subject: "", class: "", status: "Active" });

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.class.includes(searchTerm)
  );

  const handleAddTeacher = () => {
    if (!newTeacher.name || !newTeacher.subject || !newTeacher.class) {
      return alert("Please fill all fields!");
    }
    setTeachers([...teachers, { ...newTeacher, id: Date.now() }]);
    setNewTeacher({ name: "", subject: "", class: "", status: "Active" });
    setShowModal(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">All Teachers</h1>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition"
        >
          Add Teacher
        </button>
      </div>

      {/* Search */}
      <div className="flex justify-end">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search teachers..." />
      </div>

      {/* Teachers Table */}
      <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800 mt-4">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              {["#", "Name", "Subject", "Class", "Status"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTeachers.map((t, idx) => (
              <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">{idx + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-100">{t.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">{t.subject}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">{t.class}</td>
                <td
                  className={`px-6 py-4 text-sm font-semibold ${
                    t.status === "Active" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.status}
                </td>
              </tr>
            ))}
            {filteredTeachers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No teachers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Teacher Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Add New Teacher</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              />
              <input
                type="text"
                placeholder="Subject"
                value={newTeacher.subject}
                onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              />
              <input
                type="text"
                placeholder="Class"
                value={newTeacher.class}
                onChange={(e) => setNewTeacher({ ...newTeacher, class: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              />
              <select
                value={newTeacher.status}
                onChange={(e) => setNewTeacher({ ...newTeacher, status: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTeacher}
                className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTeachers;
