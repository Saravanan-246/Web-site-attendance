import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

// Predefined classes & sections
const classes = ["LKG", "UKG", ...Array.from({ length: 12 }, (_, i) => (i + 1).toString())];
const defaultSections = ["A", "B", "C"];

const Admissions = ({ addStudentCallback }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [extraSectionsByClass, setExtraSectionsByClass] = useState({});
  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
    section: "",
    rollNo: "",
    status: "Active",
  });

  const allSections = selectedClass
    ? [...defaultSections, ...(extraSectionsByClass[selectedClass] || [])]
    : [];

  const addExtraSection = () => {
    if (!selectedClass) return alert("Select a class first!");
    const newSec = prompt("Enter new section name (D, E ...):");
    if (!newSec) return;
    const sec = newSec.toUpperCase();
    const existing = extraSectionsByClass[selectedClass] || [];
    if (defaultSections.includes(sec) || existing.includes(sec)) return alert("Section already exists!");
    setExtraSectionsByClass({ ...extraSectionsByClass, [selectedClass]: [...existing, sec] });
  };

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.class || !newStudent.section || !newStudent.rollNo) {
      return alert("Please fill all required fields!");
    }
    addStudentCallback({ ...newStudent, id: Date.now(), rollNo: Number(newStudent.rollNo) });
    setNewStudent({ name: "", class: "", section: "", rollNo: "", status: "Active" });
    setSelectedClass("");
    setShowModal(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
        Admissions
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-center">
        Add new students to the school system.
      </p>

      {/* Centered Add Student Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium shadow-md hover:scale-[1.02] active:scale-95 transition"
        >
          Add Student
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            {/* Add Student Form */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              />

              <select
                value={newStudent.class}
                onChange={(e) => {
                  setNewStudent({ ...newStudent, class: e.target.value, section: "" });
                  setSelectedClass(e.target.value);
                }}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select Class</option>
                {classes.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              {selectedClass && (
                <div className="flex gap-2 items-center flex-wrap">
                  {allSections.map((sec) => (
                    <button
                      key={sec}
                      onClick={() => setNewStudent({ ...newStudent, section: sec })}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        newStudent.section === sec
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      } hover:scale-105 transition`}
                    >
                      Section {sec}
                    </button>
                  ))}
                  <button
                    onClick={addExtraSection}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition"
                  >
                    + Add Section
                  </button>
                </div>
              )}

              <input
                type="number"
                placeholder="Roll No"
                value={newStudent.rollNo}
                onChange={(e) => setNewStudent({ ...newStudent, rollNo: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              />

              <select
                value={newStudent.status}
                onChange={(e) => setNewStudent({ ...newStudent, status: e.target.value })}
                className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddStudent}
                  className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 transition"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admissions;
