import { useState, useEffect, useRef, useCallback } from "react";
import useApi from "./useApi";

export function useSchoolSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cacheRef = useRef(new Map());
  const makeRequest = useApi();

  const performSearch = useCallback(async (term) => {
    if (!term.trim()) return setResults([]);
    const key = term.toLowerCase().trim();
    if (cacheRef.current.has(key)) {
      setResults(cacheRef.current.get(key));
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await makeRequest(`/api/schools?q=${encodeURIComponent(term)}`);
      const schools = data?.schools || [];
      setResults(schools);
      cacheRef.current.set(key, schools);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [makeRequest]);

  useEffect(() => {
    const timeout = setTimeout(() => performSearch(searchTerm), 300);
    return () => clearTimeout(timeout);
  }, [searchTerm, performSearch]);

  return { searchTerm, setSearchTerm, results, loading, error };
}
import { useState, useEffect, useRef, useCallback } from "react";
import useApi from "./useApi";

export function useSchoolSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cacheRef = useRef(new Map());
  const makeRequest = useApi();

  const performSearch = useCallback(async (term) => {
    if (!term.trim()) return setResults([]);
    const key = term.toLowerCase().trim();
    if (cacheRef.current.has(key)) {
      setResults(cacheRef.current.get(key));
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await makeRequest(`/api/schools?q=${encodeURIComponent(term)}`);
      const schools = data?.schools || [];
      setResults(schools);
      cacheRef.current.set(key, schools);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [makeRequest]);

  useEffect(() => {
    const timeout = setTimeout(() => performSearch(searchTerm), 300);
    return () => clearTimeout(timeout);
  }, [searchTerm, performSearch]);

  return { searchTerm, setSearchTerm, results, loading, error };
}
