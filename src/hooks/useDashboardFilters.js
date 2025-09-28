import { useState, useCallback } from "react";

export function useDashboardFilters() {
  const [filters, setFilters] = useState({
    dateRange: "7days",
    category: "all",
    priority: "all",
  });

  const updateFilter = useCallback((k, v) => setFilters(f => ({ ...f, [k]: v })), []);
  const resetFilters = useCallback(() => setFilters({ dateRange: "7days", category: "all", priority: "all" }), []);

  return { filters, updateFilter, resetFilters };
}
