// Side2/Classes/ClassList.jsx
import React, { useState, useMemo } from "react";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaClock,
  FaClipboardList,
  FaCalendarAlt,
  FaBullseye,
  FaUsers,
  FaBookOpen,
  FaTasks,
  FaChartLine
} from "react-icons/fa";

// All class levels LKG–12
const allClasses = [
  "LKG","UKG","1","2","3","4","5","6","7","8","9","10","11","12"
];

// Comprehensive class data with detailed information
const classData = {
  LKG: { 
    assignments: 2, students: 25, teacher: "Ms. Mary Johnson", 
    subjects: ["Drawing","Play Time","Story Telling"], 
    classRoom: "Room A-101", timing: "9:00 AM - 12:00 PM",
    recentActivity: "Art Competition", nextEvent: "Parent Meeting",
    attendance: 96, performance: 85, behavior: 92,
    assignmentDetails: [
      { title: "Color the Animals", dueDate: "2025-09-30", status: "Active" },
      { title: "Number Practice 1-10", dueDate: "2025-10-02", status: "Active" }
    ]
  },
  UKG: { 
    assignments: 1, students: 30, teacher: "Ms. Sarah Williams", 
    subjects: ["Numbers","Alphabets","Basic Math"], 
    classRoom: "Room A-102", timing: "9:00 AM - 1:00 PM",
    recentActivity: "Alphabet Quiz", nextEvent: "Sports Day",
    attendance: 94, performance: 88, behavior: 90,
    assignmentDetails: [
      { title: "Write A-Z", dueDate: "2025-10-01", status: "Active" }
    ]
  },
  1: { 
    assignments: 3, students: 35, teacher: "Ms. Jennifer Davis", 
    subjects: ["Math","English","Environmental Studies"], 
    classRoom: "Room B-201", timing: "9:00 AM - 2:00 PM",
    recentActivity: "Math Test", nextEvent: "Field Trip",
    attendance: 92, performance: 82, behavior: 88,
    assignmentDetails: [
      { title: "Addition Worksheet", dueDate: "2025-09-29", status: "Due Soon" },
      { title: "Reading Exercise", dueDate: "2025-10-03", status: "Active" },
      { title: "Nature Drawing", dueDate: "2025-10-05", status: "Active" }
    ]
  },
  10: { 
    assignments: 5, students: 26, teacher: "Mr. John Smith", 
    subjects: ["Math","English","Physics","Chemistry","Biology","Computer Science"], 
    classRoom: "Room C-301", timing: "8:00 AM - 3:30 PM",
    recentActivity: "Science Exhibition", nextEvent: "Board Exam Prep",
    attendance: 89, performance: 91, behavior: 87,
    assignmentDetails: [
      { title: "Quadratic Equations", dueDate: "2025-09-28", status: "Overdue" },
      { title: "Physics Lab Report", dueDate: "2025-09-30", status: "Due Soon" },
      { title: "Chemistry Project", dueDate: "2025-10-05", status: "Active" },
      { title: "Biology Diagram", dueDate: "2025-10-07", status: "Active" },
      { title: "English Essay", dueDate: "2025-10-10", status: "Active" }
    ]
  }
};

// Fill remaining classes with sample data
["2","3","4","5","6","7","8","9","11","12"].forEach(cls => {
  if (!classData[cls]) {
    classData[cls] = {
      assignments: Math.floor(Math.random() * 6),
      students: 20 + Math.floor(Math.random() * 15),
      teacher: `Teacher ${cls}`,
      subjects: ["Math","English","Science"],
      classRoom: `Room ${cls}-${100 + Math.floor(Math.random() * 200)}`,
      timing: "9:00 AM - 3:00 PM",
      recentActivity: "Recent Activity",
      nextEvent: "Upcoming Event",
      attendance: 85 + Math.floor(Math.random() * 15),
      performance: 80 + Math.floor(Math.random() * 20),
      behavior: 85 + Math.floor(Math.random() * 15),
      assignmentDetails: []
    };
  }
});

const ClassList = () => {
  const [selected, setSelected] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list" | "detail"
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterType, setFilterType] = useState("all");
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Filtered and sorted classes
  const processedClasses = useMemo(() => {
    return allClasses
      .filter(cls => {
        const term = searchTerm.trim().toLowerCase();
        const matches =
          cls.toLowerCase().includes(term) ||
          classData[cls].teacher.toLowerCase().includes(term);
        if (!matches) return false;
        if (filterType === "with") return classData[cls].assignments > 0;
        if (filterType === "without") return classData[cls].assignments === 0;
        if (filterType === "high-performance") return classData[cls].performance >= 90;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "assignments") return classData[b].assignments - classData[a].assignments;
        if (sortBy === "students")    return classData[b].students    - classData[a].students;
        if (sortBy === "performance") return classData[b].performance - classData[a].performance;
        if (sortBy === "attendance")  return classData[b].attendance  - classData[a].attendance;
        return a.localeCompare(b, undefined, { numeric: true });
      });
  }, [searchTerm, sortBy, filterType]);

  // Enhanced stats
  const stats = useMemo(() => {
    const totalClasses = allClasses.length;
    const withAssign = allClasses.filter(c => classData[c].assignments > 0).length;
    const totalStudents = allClasses.reduce((sum, c) => sum + classData[c].students, 0);
    const totalAssignments = allClasses.reduce((sum, c) => sum + classData[c].assignments, 0);
    const avgAttendance = Math.round(allClasses.reduce((sum, c) => sum + classData[c].attendance, 0) / totalClasses);
    const avgPerformance = Math.round(allClasses.reduce((sum, c) => sum + classData[c].performance, 0) / totalClasses);

    return {
      totalClasses,
      withAssign,
      withoutAssign: totalClasses - withAssign,
      totalStudents,
      totalAssignments,
      avgAttendance,
      avgPerformance
    };
  }, []);

  const formatClassName = cls => (/\D/.test(cls) ? cls : `Class ${cls}`);
  const openDetailModal = cls => { setSelected(cls); setShowDetailModal(true); };
  const getStatusColor = status =>
    status === "Overdue"
      ? "bg-red-100 text-red-800 border-red-200"
      : status === "Due Soon"
      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
      : "bg-green-100 text-green-800 border-green-200";
  const getPerformanceColor = score =>
    score >= 90
      ? "text-green-600"
      : score >= 75
      ? "text-blue-600"
      : score >= 60
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <h1 className="text-4xl font-bold text-gradient">
          Advanced Class Management
        </h1>
        <div className="flex gap-2">
          {["grid","list","detail"].map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 rounded transition ${
                viewMode === mode
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white p-6 rounded shadow grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search classes or teachers..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 p-3 border rounded"
          />
          <FaChalkboardTeacher className="absolute left-3 top-3 text-gray-400" />
        </div>

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="p-3 border rounded"
        >
          <option value="name">Name</option>
          <option value="assignments">Assignments</option>
          <option value="students">Students</option>
          <option value="performance">Performance</option>
          <option value="attendance">Attendance</option>
        </select>

        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="p-3 border rounded"
        >
          <option value="all">All Classes</option>
          <option value="with">With Assignments</option>
          <option value="without">No Assignments</option>
          <option value="high-performance">High Performance (90%+)</option>
        </select>

        <button
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 p-3 bg-green-600 text-white rounded"
        >
          <FaClipboardList /> Export Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        <StatCard icon={<FaUsers />}       label="Total Classes"     value={stats.totalClasses}    />
        <StatCard icon={<FaBookOpen />}    label="With Assignments"  value={stats.withAssign}      />
        <StatCard icon={<FaTasks />}       label="No Assignments"    value={stats.withoutAssign}   />
        <StatCard icon={<FaUserGraduate />}label="Total Students"    value={stats.totalStudents}   />
        <StatCard icon={<FaTasks />}       label="Total Assignments" value={stats.totalAssignments}/>
        <StatCard icon={<FaChartLine />}   label="Avg Attendance"    value={`${stats.avgAttendance}%`}/>
        <StatCard icon={<FaBullseye />}    label="Avg Performance"   value={`${stats.avgPerformance}%`}/>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {processedClasses.map((cls,i) => (
            <div
              key={cls}
              className="bg-white rounded-xl shadow p-4 transform transition hover:-translate-y-2"
              style={{ animation: `fadeIn 0.3s ease ${i*0.1}s both` }}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold">{formatClassName(cls)}</h3>
                {classData[cls].assignments > 0 && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                    {classData[cls].assignments}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <FaClock /> {classData[cls].timing}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <FaChalkboardTeacher /> {classData[cls].teacher}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-1">
                <FaUserGraduate /> {classData[cls].students} students
              </p>
              <div className="grid grid-cols-3 gap-2 mt-3 text-sm">
                <MetricCard label="Attendance"   value={classData[cls].attendance}   color={getPerformanceColor(classData[cls].attendance)} />
                <MetricCard label="Performance"  value={classData[cls].performance}  color={getPerformanceColor(classData[cls].performance)} />
                <MetricCard label="Behavior"     value={classData[cls].behavior}     color={getPerformanceColor(classData[cls].behavior)} />
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => openDetailModal(cls)}
                  className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white p-2 rounded"
                >
                  <FaCalendarAlt /> Details
                </button>
                <button
                  onClick={() => alert(`Quick actions for ${cls}`)}
                  className="p-2 bg-gray-300 rounded"
                >
                  ⚡
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Class
                </th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Teacher
                </th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Students
                </th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Assignments
                </th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Performance
                </th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {processedClasses.map(cls => (
                <tr key={cls} className="hover:bg-gray-50">
                  <td className="p-4 text-sm">{formatClassName(cls)}</td>
                  <td className="p-4 text-sm">{classData[cls].teacher}</td>
                  <td className="p-4 text-sm">{classData[cls].students}</td>
                  <td className="p-4 text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      classData[cls].assignments > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {classData[cls].assignments} Tasks
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${classData[cls].performance}%` }}
                        />
                      </div>
                      {classData[cls].performance}%
                    </div>
                  </td>
                  <td className="p-4 text-sm">
                    <button
                      onClick={() => openDetailModal(cls)}
                      className="text-blue-600 hover:underline mr-4"
                    >
                      View
                    </button>
                    <button
                      onClick={() => alert(`Edit ${cls}`)}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detailed Modal */}
      {showDetailModal && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold">{formatClassName(selected)}</h2>
                <p className="opacity-80">Comprehensive Class Overview</p>
              </div>
              <button onClick={() => setShowDetailModal(false)} className="text-2xl">
                ✕
              </button>
            </div>
            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InfoCard icon={<FaChalkboardTeacher />} label="Class Teacher"  value={classData[selected].teacher} />
                <InfoCard icon={<FaUserGraduate />}   label="Total Students" value={classData[selected].students} />
                <InfoCard icon={<FaCalendarAlt />}    label="Class Timing"   value={classData[selected].timing} />
                <InfoCard icon={<FaBullseye />}       label="Recent Activity" value={classData[selected].recentActivity} />
                <InfoCard icon={<FaClipboardList />}  label="Next Event"     value={classData[selected].nextEvent} />
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4">Performance Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <PerformanceCard label="Attendance Rate"    value={classData[selected].attendance}  color="blue"   />
                  <PerformanceCard label="Academic Performance"value={classData[selected].performance} color="green"  />
                  <PerformanceCard label="Behavior Score"      value={classData[selected].behavior}    color="purple" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Subjects Taught</h3>
                <div className="flex flex-wrap gap-3">
                  {classData[selected].subjects.map((sub,i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium border"
                    >
                      📚 {sub}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Active Assignments</h3>
                {classData[selected].assignmentDetails.length > 0 ? (
                  <div className="space-y-3">
                    {classData[selected].assignmentDetails.map((a,i) => (
                      <div key={i} className="p-4 bg-white rounded-lg border">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold">{a.title}</h4>
                            <p className="text-sm opacity-70">Due: {a.dueDate}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(a.status)}`}>
                            {a.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center opacity-70 py-8">No active assignments</p>
                )}
              </div>

              <div className="flex flex-wrap gap-3 pt-6 border-t">
                <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded">
                  <FaClipboardList /> Manage Assignments
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-green-600 text-white rounded">
                  <FaUsers /> View Students
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-purple-600 text-white rounded">
                  <FaChartLine /> Analytics Report
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-orange-600 text-white rounded">
                  <FaCalendarAlt /> Schedule Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// StatCard Component
const StatCard = ({ icon, label, value }) => (
  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs opacity-80">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  </div>
);

// MetricCard Component
const MetricCard = ({ label, value, color }) => (
  <div className="text-center p-2 bg-gray-100 rounded">
    <p className="text-sm">{label}</p>
    <p className={`font-semibold ${color}`}>{value}%</p>
  </div>
);

// InfoCard Component
const InfoCard = ({ icon, label, value }) => (
  <div className="bg-white p-4 rounded-lg border shadow-sm flex items-center gap-3">
    <div className="text-2xl">{icon}</div>
    <div>
      <p className="text-sm opacity-70">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

// PerformanceCard Component
const PerformanceCard = ({ label, value, color }) => {
  const colorMap = {
    blue:   ["from-blue-500","to-blue-600","bg-blue-100","text-blue-800"],
    green:  ["from-green-500","to-green-600","bg-green-100","text-green-800"],
    purple: ["from-purple-500","to-purple-600","bg-purple-100","text-purple-800"]
  };
  const [from,to,bg,text] = colorMap[color] || colorMap.blue;

  return (
    <div className="text-center">
      <div className="relative w-24 h-24 mx-auto mb-3">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="40"
            className="text-gray-300"
            stroke="currentColor" strokeWidth="8" fill="transparent"
          />
          <circle
            cx="50" cy="50" r="40"
            stroke="currentColor" strokeWidth="8" fill="transparent"
            strokeDasharray={`${value * 2.51},251`}
            className={`text-${color}-500`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold">{value}%</span>
        </div>
      </div>
      <p className="font-semibold">{label}</p>
    </div>
  );
};

export default ClassList;
