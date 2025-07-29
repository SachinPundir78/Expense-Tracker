import React from 'react'

const CustomLegend = ({ payload }) => {
  return (
    <ul className="flex flex-wrap justify-center mt-4">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center mr-7">
          <span
            className="inline-block w-5 h-5 rounded-full mr-2"
            style={{ backgroundColor: entry.color }}
          ></span>
          <span className="text-lg font-medium text-gray-700">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

export default CustomLegend