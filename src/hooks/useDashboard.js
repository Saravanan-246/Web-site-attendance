import { useState, useEffect, useCallback, useRef } from "react";

// 🔹 Generic API hook
function useApi() {
  const abortControllerRef = useRef(null);

  const makeRequest = useCallback(async (url, options = {}) => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(url, {
        ...options,
        signal: abortControllerRef.current.signal,
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (error.name === "AbortError") return null;
      throw error;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  return makeRequest;
}

// 🔹 Dashboard Data Hook
export function useDashboardData() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock API
  const fetchMockData = useCallback(async () => {
    await new Promise(res => setTimeout(res, 500));
    return [
      { title: "Total Students", value: 1234, change: "+12%" },
      { title: "Total Teachers", value: 89, change: "+3" },
      { title: "Classes Today", value: 24, change: "+8" },
      { title: "Attendance Rate", value: 94.2, suffix: "%", change: "-1.5%" },
    ];
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMockData();
        setStats(data);
      } catch (err) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [fetchMockData]);

  return { stats, loading, error };
}

// 🔹 School Search Hook
export function useSchoolSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [schoolResults, setSchoolResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const makeRequest = useApi();

  const performSearch = useCallback(async term => {
    if (!term.trim()) {
      setSchoolResults([]);
      return;
    }
    setSearchLoading(true);
    setSearchError(null);
    try {
      // replace with your API
      const data = await makeRequest(`/api/schools?q=${encodeURIComponent(term)}`);
      setSchoolResults(data?.schools || []);
    } catch (err) {
      setSearchError(err.message || "Failed to search schools");
      setSchoolResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, [makeRequest]);

  useEffect(() => {
    const timeout = setTimeout(() => performSearch(searchTerm), 300);
    return () => clearTimeout(timeout);
  }, [searchTerm, performSearch]);

  return { searchTerm, setSearchTerm, schoolResults, searchLoading, searchError };
}
