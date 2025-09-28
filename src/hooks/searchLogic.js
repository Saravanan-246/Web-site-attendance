import { useState, useEffect } from "react";

export function useSchoolSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [schoolResults, setSchoolResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSchoolResults([]);
      setSearchError("");
      return;
    }

    setSearchLoading(true);
    setSearchError("");

    fetch(`http://localhost:5000/api/schools?query=${searchTerm}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch schools");
        return res.json();
      })
      .then((data) => setSchoolResults(data))
      .catch(() => setSearchError("Could not load schools. Please try again."))
      .finally(() => setSearchLoading(false));
  }, [searchTerm]);

  return { searchTerm, setSearchTerm, schoolResults, searchLoading, searchError };
}
