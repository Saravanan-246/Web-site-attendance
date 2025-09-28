// src/Side2/Classes/routes.js
import ClassList from "./ClassList";
import Timetable from "./Timetable";
import Assignments from "./Assignments";
import ClassRooms from "./ClassRooms";

const classRoutes = [
  { path: "/classes/list", element: <ClassList /> },
  { path: "/classes/timetable", element: <Timetable /> },
  { path: "/classes/assignments", element: <Assignments /> },
  { path: "/classes/rooms", element: <ClassRooms /> },
];

export default classRoutes;
