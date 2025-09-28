import React, { useEffect, useState } from "react";
import "../components/theme-toggle.css";

const ThemeToggleFrame = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={() => setDarkMode((prev) => !prev)}
      />
      <span className="slider">
        {/* Entire knob = sun or moon */}
        <span className={`knob ${darkMode ? "moon" : "sun"}`}>
          {!darkMode && (
            <span className="rays">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className={`ray r${i}`} />
              ))}
            </span>
          )}
          {darkMode && (
            <span className="stars">
              <span className="star s1" />
              <span className="star s2" />
              <span className="star s3" />
            </span>
          )}
        </span>
      </span>
    </label>
  );
};

export default ThemeToggleFrame;
