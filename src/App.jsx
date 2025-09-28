import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Pages
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";

// Students
import AllStudents from "./Side2/Students/AllStudents";
import Admissions from "./Side2/Students/Admissions";
import Enrollments from "./Side2/Students/Enrollments";
import StudentProfile from "./Side2/Students/StudentProfile";

// Teachers
import AllTeachers from "./Side2/Teachers/AllTeachers";
import Schedule from "./Side2/Teachers/Schedule";
import LeaveRequests from "./Side2/Teachers/LeaveRequests";
import Performance from "./Side2/Teachers/Performance";

// Classes
import ClassList from "./Side2/Classes/ClassList";
import Timetable from "./Side2/Classes/Timetable";
import Assignments from "./Side2/Classes/Assignments";
import ClassRooms from "./Side2/Classes/ClassRooms";

// Attendance
import MarkAttendance from "./Side2/Attendance/MarkAttendance";
import ViewAttendance from "./Side2/Attendance/ViewAttendance";
import AttendanceReports from "./Side2/Attendance/AttendanceReports";
import AbsenteeList from "./Side2/Attendance/AbsenteeList";

import { useState } from "react";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="p-6 flex-1 bg-gray-100 dark:bg-gray-900 transition-all duration-300">
          <Routes>
            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* Students */}
            <Route path="/students/all" element={<AllStudents />} />
            <Route path="/students/admissions" element={<Admissions />} />
            <Route path="/students/enrollments" element={<Enrollments />} />
            <Route path="/students/profile" element={<StudentProfile />} />

            {/* Teachers */}
            <Route path="/teachers/all" element={<AllTeachers />} />
            <Route path="/teachers/schedule" element={<Schedule />} />
            <Route path="/teachers/leaves" element={<LeaveRequests />} />
            <Route path="/teachers/performance" element={<Performance />} />

            {/* Classes */}
            <Route path="/classes/list" element={<ClassList />} />
            <Route path="/classes/timetable" element={<Timetable />} />
            <Route path="/classes/assignments" element={<Assignments />} />
            <Route path="/classes/rooms" element={<ClassRooms />} />

            {/* Attendance */}
            <Route path="/attendance/mark" element={<MarkAttendance />} />
            <Route path="/attendance/view" element={<ViewAttendance />} />
            <Route path="/attendance/reports" element={<AttendanceReports />} />
            <Route path="/attendance/absentees" element={<AbsenteeList />} />

            {/* Reports */}
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
