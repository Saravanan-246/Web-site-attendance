import React, { useState, useEffect } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";

export default function HeaderFrame() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
      {/* Left */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-100">
          👋 Welcome back, <span className="font-bold">Admin</span>
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Here’s your school overview dashboard
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center px-4 py-2 rounded-xl 
                      bg-gradient-to-r from-gray-100 to-white 
                      dark:from-gray-700 dark:to-gray-800 
                      shadow-sm border border-gray-200 dark:border-gray-700 
                      gap-2">
        <ClockIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {dateStr} • {timeStr}
        </span>
      </div>
    </div>
  );
}
