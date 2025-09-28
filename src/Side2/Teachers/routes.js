// src/Side2/Teachers/routes.js
import AllTeachers from "./AllTeachers";
import Schedule from "./Schedule";
import LeaveRequests from "./LeaveRequests";
import Performance from "./Performance";

const teacherRoutes = [
  { path: "/teachers/all", element: <AllTeachers /> },
  { path: "/teachers/schedule", element: <Schedule /> },
  { path: "/teachers/leaves", element: <LeaveRequests /> },
  { path: "/teachers/performance", element: <Performance /> },
];

export default teacherRoutes;
