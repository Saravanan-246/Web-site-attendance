import React from "react";

export default function ResultsFrame({ schoolResults, searchLoading, searchError }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow mb-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
        Search Results
      </h2>
      {searchLoading ? (
        <p className="text-gray-600 dark:text-gray-400">Searching...</p>
      ) : searchError ? (
        <p className="text-red-500">{searchError}</p>
      ) : schoolResults.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-sm">No schools found</p>
      ) : (
        <ul className="space-y-2">
          {schoolResults.map((sch, idx) => (
            <li
              key={idx}
              className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              <p className="font-medium text-gray-700 dark:text-gray-200">{sch.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">NRP: {sch.nrp}</p>
              {sch.address && (
                <p className="text-xs text-gray-500 dark:text-gray-400">Address: {sch.address}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
