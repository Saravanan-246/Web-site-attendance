import React from "react";
import "../components/searchbar.css"; // Uiverse search bar

export default function SearchFrame({ searchTerm, setSearchTerm }) {
  return (
    <div className="form mb-6">
      <input
        type="text"
        placeholder="Search school by NRP..."
        className="input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="button">
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27
            A6.471 6.471 0 0016 9.5
            6.5 6.5 0 109.5 16
            c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      </button>
      <button
        className="reset"
        type="button"
        onClick={() => setSearchTerm("")}
      >
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M18.3 5.71L12 12l6.3 6.29-1.42 1.42L10.59 13.4 4.3 19.7 2.88 18.3 9.17 12 2.88 5.71 4.3 4.29l6.29 6.3 6.29-6.3z"
          />
        </svg>
      </button>
    </div>
  );
}
