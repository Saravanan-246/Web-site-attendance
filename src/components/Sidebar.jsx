import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          />
        </svg>
      ),
    },

    {
      name: "Students",
      path: "/students",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
      subItems: [
        { name: "All Students", path: "/students/all" },
        { name: "Admissions", path: "/students/admissions" },
        { name: "Enrollments", path: "/students/enrollments" },
        { name: "Student Profile", path: "/students/profile" },
      ],
    },

    {
      name: "Teachers",
      path: "/teachers",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      subItems: [
        { name: "All Teachers", path: "/teachers/all" },
        { name: "Schedule", path: "/teachers/schedule" },
        { name: "Leave Requests", path: "/teachers/leaves" },
        { name: "Performance", path: "/teachers/performance" },
      ],
    },

    {
      name: "Classes",
      path: "/classes",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      subItems: [
        { name: "Class List", path: "/classes/list" },
        { name: "Timetable", path: "/classes/timetable" },
        { name: "Assignments", path: "/classes/assignments" },
        { name: "Class Rooms", path: "/classes/rooms" },
      ],
    },

    {
      name: "Attendance",
      path: "/attendance",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
      subItems: [
        { name: "View Attendance", path: "/attendance/view" },
        { name: "Attendance Reports", path: "/attendance/reports" },
        { name: "Absentee List", path: "/attendance/absentees" },
      ],
    },

    // Add more sections here as needed (Exams, Finance, etc.)
  ];

  // Toggle submenu open/close
  const handleToggleSubmenu = (name) => {
    if (openSubmenu === name) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(name);
    }
  };

  return (
    <>
      {/* Sidebar Container */}
      <div
        className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg z-40 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Admin Portal
            </h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                isCollapsed ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                {/* If has submenu */}
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => handleToggleSubmenu(item.name)}
                      className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group ${
                        openSubmenu === item.name
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600"
                          : ""
                      }`}
                      title={isCollapsed ? item.name : ""}
                    >
                      <span className="flex items-center space-x-3">
                        <span className="flex-shrink-0">{item.icon}</span>
                        {!isCollapsed && <span>{item.name}</span>}
                      </span>
                      {!isCollapsed && (
                        <svg
                          className={`w-4 h-4 transform transition-transform duration-200 ${
                            openSubmenu === item.name ? "rotate-90" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </button>
                    {/* Submenu items */}
                    {openSubmenu === item.name && !isCollapsed && (
                      <ul className="ml-8 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.path}>
                            <NavLink
                              to={subItem.path}
                              className={({ isActive }) =>
                                `block px-3 py-2 rounded-md text-sm font-normal transition-colors duration-150 ${
                                  isActive
                                    ? "bg-blue-200 dark:bg-blue-700 text-blue-900 dark:text-blue-300"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                                }`
                              }
                              title={subItem.name}
                            >
                              {subItem.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                        isActive
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                      }`
                    }
                    title={isCollapsed ? item.name : ""}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!isCollapsed && <span className="ml-3">{item.name}</span>}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Section */}
{!isCollapsed && (
  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
      <div
        className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
        aria-label="User initials"
      >
        <span className="text-xs font-semibold text-white select-none">AD</span>
      </div>
      <div className="flex-1 min-w-0 overflow-hidden">
        <p
          className="text-sm font-medium text-gray-900 dark:text-white truncate"
          title="Admin User"
        >
          Admin User
        </p>
        <a
          href="mailto:admin@school.com"
          className="text-xs text-gray-500 dark:text-gray-400 truncate hover:underline"
          title="Send email to Admin User"
        >
          admin@school.com
        </a>
      </div>
    </div>
  </div>
)}
      </div>

      {/* Main Content Spacer */}
<div className={`transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-64"}`}>
  {/* Your main content goes here */}
      </div>
    </>
  );
};

export default Sidebar;
