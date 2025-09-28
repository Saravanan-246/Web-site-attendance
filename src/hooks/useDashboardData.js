import { useState, useEffect, useCallback } from "react";

export function useDashboardData() {
  const [data, setData] = useState({ stats: [], activities: [], events: [], quickActions: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // fake API
  const fetchMockData = useCallback(async () => {
    await new Promise(res => setTimeout(res, 300));
    return {
      stats: [
        { title: "Total Students", value: "1,234", change: "+12%" },
        { title: "Total Teachers", value: "89", change: "+3" },
        { title: "Classes Today", value: "24", change: "+8" },
        { title: "Attendance Rate", value: "94.2%", change: "-1.5%" },
      ],
      activities: [],
      events: [],
      quickActions: [],
    };
  }, []);

  const fetchData = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh && data.stats.length && lastUpdated && Date.now() - lastUpdated < 5 * 60 * 1000) return;

    setLoading(true);
    setError(null);
    try {
      const result = await fetchMockData();
      setData(result);
      setLastUpdated(Date.now());
    } catch (err) {
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, [data.stats.length, lastUpdated, fetchMockData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...data, loading, error, lastUpdated, refreshData: () => fetchData(true) };
}
