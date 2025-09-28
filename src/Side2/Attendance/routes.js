// src/Side2/Attendance/routes.js
import MarkAttendance from "./MarkAttendance";
import ViewAttendance from "./ViewAttendance";
import AttendanceReports from "./AttendanceReports";
import AbsenteeList from "./AbsenteeList";

const attendanceRoutes = [
  { path: "/attendance/mark", element: <MarkAttendance /> },
  { path: "/attendance/view", element: <ViewAttendance /> },
  { path: "/attendance/reports", element: <AttendanceReports /> },
  { path: "/attendance/absentees", element: <AbsenteeList /> },
];

export default attendanceRoutes;
