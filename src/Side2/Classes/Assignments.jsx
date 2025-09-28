import React, { useState, useMemo } from "react";

// All class levels from LKG to 12
const allClasses = [
  "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
];

// Initial assignments data with more variety
const initialAssignmentsData = [
  {
    id: 1,
    class: "10",
    title: "Math Homework Ch. 5",
    dueDate: "2025-09-29",
    status: "Pending",
    assignedBy: "Mr. John",
    description: "Complete all exercises from Chapter 5 in your notebooks.",
    subject: "Mathematics"
  },
  {
    id: 2,
    class: "10",
    title: "English Essay",
    dueDate: "2025-09-30",
    status: "Completed",
    assignedBy: "Ms. Smith",
    description: "Write an essay on the topic 'Future of AI in Education'.",
    subject: "English"
  },
  {
    id: 3,
    class: "9",
    title: "Science Project",
    dueDate: "2025-10-02",
    status: "Pending",
    assignedBy: "Mr. Lee",
    description: "Prepare a working model on renewable energy sources.",
    subject: "Science"
  },
  {
    id: 4,
    class: "11",
    title: "History Assignment",
    dueDate: "2025-09-28",
    status: "Late",
    assignedBy: "Ms. Jane",
    description: "Submit a file on World War II events.",
    subject: "History"
  },
  {
    id: 5,
    class: "LKG",
    title: "Coloring Activity",
    dueDate: "2025-09-30",
    status: "Pending",
    assignedBy: "Ms. Mary",
    description: "Color the animals worksheet and bring it tomorrow.",
    subject: "Activity"
  },
  {
    id: 6,
    class: "UKG",
    title: "Number Practice",
    dueDate: "2025-10-01",
    status: "Pending",
    assignedBy: "Ms. Sarah",
    description: "Practice writing numbers 1-20 in your notebook.",
    subject: "Numbers"
  }
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Completed: "bg-green-100 text-green-800 border-green-200",
  Late: "bg-red-100 text-red-800 border-red-200",
};

const subjectColors = {
  Mathematics: "bg-blue-50 border-blue-200",
  English: "bg-purple-50 border-purple-200",
  Science: "bg-green-50 border-green-200",
  History: "bg-orange-50 border-orange-200",
  Activity: "bg-pink-50 border-pink-200",
  Numbers: "bg-indigo-50 border-indigo-200",
  Default: "bg-gray-50 border-gray-200"
};

const Assignments = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [assignmentsData, setAssignmentsData] = useState(initialAssignmentsData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    class: "",
    title: "",
    dueDate: "",
    assignedBy: "",
    description: "",
    subject: ""
  });

  const filteredAssignments = useMemo(() => {
    return selectedClass
      ? assignmentsData.filter((a) => a.class === selectedClass)
      : assignmentsData;
  }, [selectedClass, assignmentsData]);

  const classStats = useMemo(() => {
    const stats = {};
    allClasses.forEach(cls => {
      const classAssignments = assignmentsData.filter(a => a.class === cls);
      stats[cls] = {
        total: classAssignments.length,
        pending: classAssignments.filter(a => a.status === "Pending").length,
        completed: classAssignments.filter(a => a.status === "Completed").length,
        late: classAssignments.filter(a => a.status === "Late").length
      };
    });
    return stats;
  }, [assignmentsData]);

  const handleAddAssignment = (e) => {
    e.preventDefault();
    if (!newAssignment.title || !newAssignment.class || !newAssignment.dueDate) return;

    const assignment = {
      ...newAssignment,
      id: Date.now(),
      status: "Pending"
    };

    setAssignmentsData([...assignmentsData, assignment]);
    setNewAssignment({
      class: "",
      title: "",
      dueDate: "",
      assignedBy: "",
      description: "",
      subject: ""
    });
    setShowAddForm(false);
  };

  const handleInputChange = (field, value) => {
    setNewAssignment(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Set assignment due date (with status update)
  const updateDueDate = (id, newDueDate) => {
    setAssignmentsData(prev =>
      prev.map(a => {
        if (a.id === id) {
          const status = new Date(newDueDate) < new Date() ? "Late" : "Pending";
          return { ...a, dueDate: newDueDate, status };
        }
        return a;
      })
    );
  };

  // Remove assignment with confirmation
  const removeAssignment = (id, title) => {
    const confirmed = window.confirm(`Are you sure you want to remove the assignment "${title}"?`);
    if (confirmed) {
      setAssignmentsData(prev => prev.filter(a => a.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Class Assignments Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage assignments across all classes from LKG to 12th grade
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 font-semibold"
        >
          + Add New Assignment
        </button>
      </div>

      {/* Animated Class Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Select Class Level
        </h2>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedClass("")}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
              selectedClass === ""
                ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-600"
            }`}
          >
            All Classes
            <span className="ml-2 text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
              {assignmentsData.length}
            </span>
          </button>

          {allClasses.map((cls, index) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 animate-fadeInUp ${
                selectedClass === cls
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
              }`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {cls === "LKG" || cls === "UKG" ? cls : `Class ${cls}`}
              {classStats[cls] && classStats[cls].total > 0 && (
                <span className="ml-2 text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                  {classStats[cls].total}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Class Statistics */}
        {selectedClass && classStats[selectedClass] && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
              <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300">Total</h3>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {classStats[selectedClass].total}
              </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
              <h3 className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Pending</h3>
              <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                {classStats[selectedClass].pending}
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg border border-green-200 dark:border-green-700">
              <h3 className="text-sm font-medium text-green-700 dark:text-green-300">Completed</h3>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                {classStats[selectedClass].completed}
              </p>
            </div>
            <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg border border-red-200 dark:border-red-700">
              <h3 className="text-sm font-medium text-red-700 dark:text-red-300">Late</h3>
              <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                {classStats[selectedClass].late}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add Assignment Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Add New Assignment
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddAssignment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Class *
                  </label>
                  <select
                    value={newAssignment.class}
                    onChange={(e) => handleInputChange("class", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Class</option>
                    {allClasses.map(cls => (
                      <option key={cls} value={cls}>
                        {cls === "LKG" || cls === "UKG" ? cls : `Class ${cls}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Assignment Title *
                  </label>
                  <input
                    type="text"
                    value={newAssignment.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter assignment title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={newAssignment.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Mathematics, English"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) => handleInputChange("dueDate", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Assigned By
                  </label>
                  <input
                    type="text"
                    value={newAssignment.assignedBy}
                    onChange={(e) => handleInputChange("assignedBy", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Teacher name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newAssignment.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Assignment description and instructions"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                  >
                    Add Assignment
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment, index) => (
            <div
              key={assignment.id}
              className={`rounded-xl shadow-lg p-6 bg-white dark:bg-gray-800 border-2 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 animate-slideInUp ${
                subjectColors[assignment.subject] || subjectColors.Default
              }`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {assignment.title}
                    </h3>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusColors[assignment.status]}`}
                    >
                      {assignment.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
                    <div>
                      <span className="font-semibold">Class:</span> {assignment.class === "LKG" || assignment.class === "UKG" ? assignment.class : `Class ${assignment.class}`}
                    </div>
                    <div>
                      <span className="font-semibold">Subject:</span> {assignment.subject || "N/A"}
                    </div>
                    <div>
                      <span className="font-semibold">By:</span> {assignment.assignedBy || "Unknown"}
                    </div>
                    <div>
                      <span className="font-semibold">Due Date:</span>
                      <input
                        type="date"
                        value={assignment.dueDate}
                        onChange={(e) => updateDueDate(assignment.id, e.target.value)}
                        className="ml-2 px-2 py-1 border rounded-md text-sm dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-200 mb-2">
                    {assignment.description}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className={`text-lg font-bold ${
                    new Date(assignment.dueDate) < new Date()
                      ? "text-red-600 dark:text-red-400"
                      : "text-blue-600 dark:text-blue-400"
                  }`}>
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </div>
                  {new Date(assignment.dueDate) < new Date() && (
                    <div className="text-xs text-red-500 mt-1">Overdue</div>
                  )}
                  <button
                    onClick={() => removeAssignment(assignment.id, assignment.title)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No assignments found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {selectedClass 
                ? `No assignments for ${selectedClass === "LKG" || selectedClass === "UKG" ? selectedClass : `Class ${selectedClass}`} yet.`
                : "No assignments available. Start by adding some assignments."
              }
            </p>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Assignments;
