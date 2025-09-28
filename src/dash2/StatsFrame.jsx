import React from "react";
import * as HeroIcons from "@heroicons/react/24/outline";

// Color mapping for different stats
const COLOR_MAP = {
  blue: { bg: "bg-blue-500", text: "text-blue-600" },
  green: { bg: "bg-green-500", text: "text-green-600" },
  red: { bg: "bg-red-500", text: "text-red-600" },
  yellow: { bg: "bg-yellow-500", text: "text-yellow-600" },
  purple: { bg: "bg-purple-500", text: "text-purple-600" },
  orange: { bg: "bg-orange-500", text: "text-orange-600" },
};

// Individual stat card
function StatCard({ title, value, change, icon, color = "blue" }) {
  const Icon = HeroIcons[icon] || HeroIcons.UserGroupIcon;
  const isNegative = typeof change === "string" && change.includes("-");
  const bg = COLOR_MAP[color]?.bg || COLOR_MAP.blue.bg;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-full ${bg} text-white`}>
          <Icon className="w-6 h-6" />
        </div>
        {change && (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 
              ${isNegative ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
          >
            {change}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold dark:text-white">{value}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
    </div>
  );
}

// Stats frame container
export default function StatsFrame({ stats = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
}
