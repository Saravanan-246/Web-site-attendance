// src/Side2/Students/routes.js
import AllStudents from "./AllStudents";
import Admissions from "./Admissions";
import Enrollments from "./Enrollments";
import StudentProfile from "./StudentProfile";

const studentRoutes = [
  { path: "/students/all", element: <AllStudents /> },
  { path: "/students/admissions", element: <Admissions /> },
  { path: "/students/enrollments", element: <Enrollments /> },
  { path: "/students/profile", element: <StudentProfile /> },
];

export default studentRoutes;
