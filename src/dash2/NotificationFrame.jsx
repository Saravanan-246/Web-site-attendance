import React from "react";
import { BellAlertIcon } from "@heroicons/react/24/outline";

export default function NotificationFrame({ notifications }) {
  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
        <BellAlertIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        Notifications
      </h2>
      <ul className="mt-2 space-y-2">
        {notifications.map((n, idx) => (
          <li
            key={idx}
            className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          >
            {n.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
