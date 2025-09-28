import React, { useState } from "react";
import { UserIcon, CalendarIcon, PhoneIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

const sampleStudent = {
  name: "John Doe",
  class: "10",
  section: "A",
  rollNo: 12,
  status: "Active",
  dob: "2008-05-12",
  parent: "Mr. & Mrs. Doe",
  contact: "9876543210",
  attendance: "95",
  grades: { Math: "A", English: "B+", Science: "A-" },
  // Schoolboy avatar
  photo: "https://i.ibb.co/4fHq3Nk/school-boy.png", // schoolboy avatar
};

const StudentProfile = ({ student = sampleStudent }) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!student) {
    return (
      <div className="p-6 flex flex-col items-center justify-center space-y-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 h-64">
        <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-500 text-xl">?</div>
        <p className="text-gray-500 dark:text-gray-400 text-center">Select a student to view profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-gray-200 dark:border-gray-700">
          <img src={student.photo} alt={student.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{student.name}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Class {student.class} - Section {student.section} • Roll No: {student.rollNo}
          </p>
          <div className="mt-2 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${student.status === "Active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
              {student.status}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-200 text-blue-800">{student.attendance}% Attendance</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {["overview", "attendance", "grades"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 -mb-px font-medium text-sm border-b-2 ${
              activeTab === tab
                ? "border-teal-600 text-teal-600 bg-gray-100 dark:bg-gray-700 rounded-t-md"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-teal-600 transition"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-800 space-y-2">
            <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Personal Info</h2>
            <p><CalendarIcon className="w-5 h-5 inline mr-2 text-gray-500" /><strong>DOB:</strong> {student.dob}</p>
            <p><UserIcon className="w-5 h-5 inline mr-2 text-gray-500" /><strong>Parent:</strong> {student.parent}</p>
            <p><PhoneIcon className="w-5 h-5 inline mr-2 text-gray-500" /><strong>Contact:</strong> {student.contact}</p>
          </div>
          <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-800 space-y-2">
            <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Academic Info</h2>
            <p><AcademicCapIcon className="w-5 h-5 inline mr-2 text-gray-500" /><strong>Class:</strong> {student.class}</p>
            <p><strong>Section:</strong> {student.section}</p>
            <p><strong>Roll No:</strong> {student.rollNo}</p>
          </div>
        </div>
      )}

      {activeTab === "attendance" && (
        <div className="p-4 rounded-lg shadow bg-white dark:bg-gray-800">
          <h2 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Attendance</h2>
          <p>Attendance chart or table goes here.</p>
        </div>
      )}

      {activeTab === "grades" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {student.grades ? Object.entries(student.grades).map(([subject, grade]) => (
            <div key={subject} className="p-4 rounded-lg shadow bg-white dark:bg-gray-800 text-center">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200">{subject}</h3>
              <p className="text-teal-600 font-bold text-xl">{grade}</p>
            </div>
          )) : <p>No grades available.</p>}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 justify-end mt-4">
        <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">Edit Profile</button>
        <button className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700 transition">Promote/Transfer</button>
        <button className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition">Deactivate</button>
      </div>
    </div>
  );
};

export default StudentProfile;
