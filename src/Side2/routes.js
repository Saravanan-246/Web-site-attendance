// src/Side2/routes.js
import studentRoutes from "./Students/routes";
import teacherRoutes from "./Teachers/routes";
import classRoutes from "./Classes/routes";
import attendanceRoutes from "./Attendance/routes";

// Combine all module routes
const side2Routes = [
  ...studentRoutes,
  ...teacherRoutes,
  ...classRoutes,
  ...attendanceRoutes,
];

export default side2Routes;
