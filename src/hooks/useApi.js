import { useRef, useCallback, useEffect } from "react";

export default function useApi() {
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
    } catch (err) {
      if (err.name === "AbortError") return null;
      throw err;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  return makeRequest;
}
