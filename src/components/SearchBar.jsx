import React from "react";
import "./searchbar.css"; // import your CSS

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="form">
      <input
        type="text"
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button className="reset" onClick={() => onChange("")}>×</button>
    </div>
  );
};

export default SearchBar;
