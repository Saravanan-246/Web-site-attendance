import React from "react";
import CountUp from "react-countup";

export default function StatsFrame({ stats }) {
  const defaultStats = [
    { title: "Total Students", value: 1234, change: "+12%" },
    { title: "Total Teachers", value: 89, change: "+3" },
    { title: "Classes Today", value: 24, change: "+8" },
    { title: "Attendance Rate", value: 94.2, suffix: "%", change: "-1.5%" },
  ];

  const items = stats?.length ? stats : defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 flex flex-col items-center text-center"
        >
          <p className="text-gray-500 dark:text-gray-300 text-sm font-medium">
            {item.title}
          </p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            <CountUp
              start={0}
              end={parseFloat(item.value)}
              duration={2}
              decimals={item.suffix ? 1 : 0}
            />
            {item.suffix && item.suffix}
          </h2>
          <span
            className={`mt-1 text-sm font-medium ${
              item.change?.startsWith("-") ? "text-red-500" : "text-green-500"
            }`}
          >
            {item.change}
          </span>
        </div>
      ))}
    </div>
  );
}
