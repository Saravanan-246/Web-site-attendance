// src/components/Card.jsx
import React from "react";

const Card = ({ title, value }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default Card;
