import React, { useState, useEffect } from "react";
import "../components/loader.css";

const Loader = ({ 
  isVisible = true, 
  darkMode = false, 
  loadingText = "Loading dashboard...",
  subtitle = "Please wait while we prepare your content"
}) => {
  const [progress, setProgress] = useState(0);

  // Simulate progress animation
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0; // Reset for continuous animation
          return prev + Math.random() * 12;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Don't render if not visible
  if (!isVisible) return null;

  return (
    <div className={`loader-overlay ${darkMode ? 'dark' : ''}`}>
      <div className={`loader ${darkMode ? 'dark' : ''}`}>
        <div className="wrapper">
          <div className="circle"></div>
          <div className="line-1"></div>
          <div className="line-2"></div>
          <div className="line-3"></div>
          <div className="line-4"></div>
          <div className="line-5"></div>
        </div>
      </div>
      
      <div className="loader-text">{loadingText}</div>
      <div className="loader-subtitle">{subtitle}</div>
      
      <div className="loader-progress">
        <div className="loader-progress-bar"></div>
      </div>
    </div>
  );
};

export default Loader;
