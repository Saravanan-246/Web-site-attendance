// Side2/Teachers/LeaveRequests.jsx
import React, { useState } from "react";

const initialRequests = [
  { id: 1, teacher: "Mr. John", date: "2025-10-01", reason: "Medical", status: "Pending" },
  { id: 2, teacher: "Ms. Smith", date: "2025-10-03", reason: "Personal", status: "Pending" },
  { id: 3, teacher: "Mr. Lee", date: "2025-10-05", reason: "Conference", status: "Pending" },
];

const LeaveRequests = () => {
  const [requests, setRequests] = useState(initialRequests);

  const updateStatus = (id, status) => {
    setRequests(prev =>
      prev.map(req => (req.id === id ? { ...req, status } : req))
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Leave Requests</h1>
      <p className="text-gray-600 dark:text-gray-400">
        Admin can review, approve, reject, or re-approve leave requests from teachers.
      </p>

      <div className="overflow-x-auto mt-4 rounded-lg shadow bg-white dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              {["#", "Teacher", "Date", "Reason", "Status", "Actions"].map(header => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {requests.map((req, idx) => (
              <tr
                key={req.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">{idx + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-100">{req.teacher}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">{req.date}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">{req.reason}</td>
                <td
                  className={`px-6 py-4 text-sm font-semibold ${
                    req.status === "Approved"
                      ? "text-green-600"
                      : req.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {req.status}
                </td>
                <td className="px-6 py-4 text-sm flex gap-2">
                  {req.status === "Pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(req.id, "Approved")}
                        className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(req.id, "Rejected")}
                        className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {req.status === "Approved" && (
                    <button
                      onClick={() => updateStatus(req.id, "Pending")}
                      className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition"
                    >
                      Revoke Approval
                    </button>
                  )}
                  {req.status === "Rejected" && (
                    <button
                      onClick={() => updateStatus(req.id, "Pending")}
                      className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                      Reconsider
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No leave requests.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveRequests;
