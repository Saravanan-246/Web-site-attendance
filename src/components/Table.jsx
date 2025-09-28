import React from 'react';

const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto bg-white shadow rounded p-4">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-left">
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-2">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-t">
              {columns.map((col, i) => (
                <td key={i} className="px-4 py-2">{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
