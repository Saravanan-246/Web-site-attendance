import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import StudentProfile from "./StudentProfile";

const classes = ["LKG", "UKG", ...Array.from({ length: 12 }, (_, i) => (i + 1).toString())];
const defaultSections = ["A", "B", "C"];

const AllStudents = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", class: "10", section: "A", rollNo: 12, status: "Active", dob: "2008-05-12", parent: "Mr. & Mrs. Doe", contact: "9876543210", attendance: "95", photo: "/avatar-placeholder.png" },
    { id: 2, name: "Jane Smith", class: "9", section: "B", rollNo: 5, status: "Active", dob: "2009-08-21", parent: "Mr. & Mrs. Smith", contact: "9123456780", attendance: "90", photo: "/avatar-placeholder.png" },
    { id: 3, name: "Alice Johnson", class: "10", section: "C", rollNo: 18, status: "Inactive", dob: "2008-03-15", parent: "Mr. & Mrs. Johnson", contact: "9988776655", attendance: "85", photo: "/avatar-placeholder.png" },
    { id: 4, name: "Bob Brown", class: "11", section: "A", rollNo: 22, status: "Active", dob: "2007-07-12", parent: "Mr. & Mrs. Brown", contact: "9871234560", attendance: "88", photo: "/avatar-placeholder.png" },
    { id: 5, name: "Emma Wilson", class: "10", section: "B", rollNo: 9, status: "Inactive", dob: "2008-09-18", parent: "Mr. & Mrs. Wilson", contact: "9876543211", attendance: "92", photo: "/avatar-placeholder.png" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [extraSectionsByClass, setExtraSectionsByClass] = useState({});
  const [pendingRemove, setPendingRemove] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", class: "", section: "", rollNo: "", status: "Active" });
  const [selectedStudent, setSelectedStudent] = useState(null);

  const addExtraSection = () => {
    if (!selectedClass) return alert("Select a class first!");
    const newSection = prompt("Enter new section name (D, E ...):");
    if (!newSection) return;
    const sec = newSection.toUpperCase();
    const existingExtra = extraSectionsByClass[selectedClass] || [];
    if (defaultSections.includes(sec) || existingExtra.includes(sec)) return alert("Section already exists!");
    setExtraSectionsByClass({ ...extraSectionsByClass, [selectedClass]: [...existingExtra, sec] });
  };

  const requestRemoveSection = (sec) => setPendingRemove({ class: selectedClass, section: sec });
  const confirmRemoveSection = () => {
    if (!pendingRemove) return;
    const { class: cls, section: sec } = pendingRemove;
    const updatedSections = (extraSectionsByClass[cls] || []).filter((s) => s !== sec);
    setExtraSectionsByClass({ ...extraSectionsByClass, [cls]: updatedSections });
    if (selectedSection === sec) setSelectedSection("");
    setPendingRemove(null);
  };
  const cancelRemoveSection = () => setPendingRemove(null);

  const extraSections = extraSectionsByClass[selectedClass] || [];
  const allSections = [...defaultSections, ...extraSections];

  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || String(s.rollNo).includes(searchTerm);
    const matchesClass = selectedClass ? s.class === selectedClass : true;
    const matchesSection = selectedSection ? s.section === selectedSection : true;
    return matchesSearch && matchesClass && matchesSection;
  });

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.class || !newStudent.section || !newStudent.rollNo) {
      return alert("Please fill all fields!");
    }
    const studentObj = { ...newStudent, id: Date.now(), rollNo: Number(newStudent.rollNo) };
    setStudents([...students, studentObj]);
    setNewStudent({ name: "", class: "", section: "", rollNo: "", status: "Active" });
    setShowModal(false);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">All Students</h1>
        <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition">
          Add Student
        </button>
      </div>

      {/* Search */}
      <div className="flex justify-end">
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search students..." />
      </div>

      {/* Class & Section Filters */}
      <div className="flex gap-2 overflow-x-auto py-2">
        {classes.map((c) => (
          <button key={c} onClick={() => { setSelectedClass(c); setSelectedSection(""); }} className={`px-3 py-1 rounded-full text-sm font-medium ${selectedClass === c ? "bg-teal-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"} hover:scale-105 transition`}>{c}</button>
        ))}
      </div>
      {selectedClass && (
        <div className="flex gap-2 items-center flex-wrap">
          {allSections.map((sec) => (
            <div key={sec} className="flex items-center gap-1 relative">
              <button onClick={() => setSelectedSection(sec)} className={`px-3 py-1 rounded-full text-sm font-medium ${selectedSection === sec ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"} hover:scale-105 transition`}>
                Section {sec}
              </button>
              {extraSections.includes(sec) && (
                <button onClick={() => requestRemoveSection(sec)} className="text-red-500 hover:text-red-700 text-sm font-bold px-1" title="Remove section">✕</button>
              )}
            </div>
          ))}
          <button onClick={addExtraSection} className="px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition">
            + Add Section
          </button>
        </div>
      )}

      {/* Remove Confirmation Modal */}
      {pendingRemove && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Remove Section {pendingRemove.section}?</h2>
            <div className="flex justify-center gap-4">
              <button onClick={confirmRemoveSection} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition">Remove</button>
              <button onClick={cancelRemoveSection} className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Add New Student</h2>
            <div className="space-y-3">
              <input type="text" placeholder="Name" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white" />
              <select value={newStudent.class} onChange={e => setNewStudent({...newStudent, class: e.target.value})} className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white">
                <option value="">Select Class</option>
                {classes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={newStudent.section} onChange={e => setNewStudent({...newStudent, section: e.target.value})} className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white">
                <option value="">Select Section</option>
                {allSections.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <input type="number" placeholder="Roll No" value={newStudent.rollNo} onChange={e => setNewStudent({...newStudent, rollNo: e.target.value})} className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white" />
              <select value={newStudent.status} onChange={e => setNewStudent({...newStudent, status: e.target.value})} className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500 transition">Cancel</button>
              <button onClick={handleAddStudent} className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 transition">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Students Table */}
      <div className="overflow-x-auto rounded-lg shadow bg-white dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              {["#", "Name", "Class", "Section", "Roll No", "Status"].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredStudents.map((student, idx) => (
              <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer" onClick={() => setSelectedStudent(student)}>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">{idx + 1}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-100">{student.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">{student.class}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">{student.section}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">{student.rollNo}</td>
                <td className={`px-6 py-4 text-sm font-semibold ${student.status === "Active" ? "text-green-600" : "text-red-600"}`}>{student.status}</td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Selected Student Profile */}
      {selectedStudent && <StudentProfile student={selectedStudent} />}

    </div>
  );
};

export default AllStudents;
