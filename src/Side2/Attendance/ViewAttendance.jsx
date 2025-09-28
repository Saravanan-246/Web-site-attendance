import React, { useState } from "react";

const classList = [
  "LKG",
  "UKG",
  ...Array.from({ length: 12 }, (_, i) => (i + 1).toString()),
];
const sectionList = ["A", "B"];
const sampleAttendance = {
  LKG: {
    A: [
      {
        date: "2025-09-27",
        records: [
          { id: 1, name: "Anuj Kumar", status: "Present" },
          { id: 2, name: "Sara Thomas", status: "Absent" },
        ],
      },
    ],
    B: [
      {
        date: "2025-09-27",
        records: [{ id: 3, name: "Pooja Patel", status: "Present" }],
      },
    ],
  },
  "1": {
    A: [
      {
        date: "2025-09-27",
        records: [{ id: 3, name: "Pooja Patel", status: "Leave" }],
      },
    ],
  },
};

function getStatusColor(status) {
  switch (status) {
    case "Present":
      return "bg-green-100 text-green-800";
    case "Absent":
      return "bg-red-100 text-red-800";
    case "Leave":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

const ViewAttendance = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when clicking outside on overlay
  const handleOverlayClick = () => setSidebarOpen(false);

  return (
    <>
      {/* Sidebar toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 md:hidden"
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? "×" : "☰"}
      </button>

      {/* Sidebar and overlay wrapper */}
      <div className="flex min-h-screen bg-gray-50">
        {/* Overlay */}
        {sidebarOpen && (
          <div
            onClick={handleOverlayClick}
            className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          />
        )}

        {/* Sidebar */}
        <nav
          className={`bg-white shadow-lg p-4 overflow-y-auto sticky top-0 h-screen z-40 transition-transform transform fixed md:relative md:w-64 w-64 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Classes & Sections</h2>
          {classList.map((cl) => (
            <div key={cl} className="mb-4">
              <button
                onClick={() => {
                  setSelectedClass(cl);
                  setSelectedSection(null);
                  if (!sidebarOpen) setSidebarOpen(true); // auto open on desktop
                }}
                className={`w-full text-left font-semibold px-3 py-2 rounded-md transition-colors ${
                  selectedClass === cl
                    ? "bg-indigo-600 text-white shadow-md"
                    : "hover:bg-indigo-100 text-gray-800"
                }`}
              >
                {cl}
              </button>
              {selectedClass === cl && (
                <div className="mt-2 ml-4 space-y-2">
                  {sectionList.map((sec) => (
                    <button
                      key={sec}
                      onClick={() => {
                        setSelectedSection(sec);
                        if (!sidebarOpen) setSidebarOpen(true);
                      }}
                      className={`w-full text-left px-2 py-1 rounded-md transition-colors ${
                        selectedSection === sec
                          ? "bg-blue-500 text-white shadow-xs"
                          : "hover:bg-blue-100 text-blue-700"
                      }`}
                    >
                      Section {sec}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Main content */}
        <main className="flex-1 p-8 overflow-auto ml-0 md:ml-64">
          <h1 className="text-3xl font-bold mb-8 text-indigo-900">View Attendance</h1>
          {!selectedClass && (
            <p className="text-gray-600 text-lg">Select a class from the left to start.</p>
          )}
          {selectedClass && !selectedSection && (
            <p className="text-gray-600 text-lg">
              Select a section for class {selectedClass} to view attendance.
            </p>
          )}
          {selectedClass && selectedSection && (
            <>
              {sampleAttendance[selectedClass]?.[selectedSection] ? (
                sampleAttendance[selectedClass][selectedSection].map((day) => (
                  <section
                    key={day.date}
                    className="mb-8 bg-white rounded-lg shadow-md p-6 max-w-4xl"
                  >
                    <h2 className="text-xl font-semibold mb-4 text-indigo-700 border-b pb-2">
                      Date: {new Date(day.date).toLocaleDateString()}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {day.records.map((rec) => (
                        <div
                          key={rec.id}
                          className="p-4 rounded-md border border-gray-200 flex justify-between items-center"
                        >
                          <span className="font-medium text-gray-900">{rec.name}</span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                              rec.status
                            )}`}
                          >
                            {rec.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                ))
              ) : (
                <p className="text-gray-600 text-lg">
                  No attendance records found for this class/section.
                </p>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default ViewAttendance;
