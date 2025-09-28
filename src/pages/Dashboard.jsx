import React from "react";
import HeaderFrame from "../dash2/HeaderFrame";
import SearchFrame from "../dash2/SearchFrame";
import ResultsFrame from "../dash2/ResultsFrame";
import StatsFrame from "../dash2/StatsFrame";
import NotificationFrame from "../dash2/NotificationFrame";
import Loader from "../components/Loader";

import { useDashboardData, useSchoolSearch } from "../hooks/useDashboard";

export default function Dashboard() {
  const { stats, loading } = useDashboardData();
  const { searchTerm, setSearchTerm, schoolResults, searchLoading, searchError } = useSchoolSearch();
  const notifications = [];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* Header */}
      <HeaderFrame />

      {/* Search */}
      <SearchFrame searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Search Results */}
      <ResultsFrame
        schoolResults={schoolResults}
        searchLoading={searchLoading}
        searchError={searchError}
      />

      {/* Stats */}
      <StatsFrame stats={stats} />

      {/* Notifications */}
      <NotificationFrame notifications={notifications} />
    </div>
  );
}
