// src/components/EmptyState.jsx
import React from "react";

const EmptyTable = ({ title, message, action }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-b-lg py-32 px-12 text-center text-neutral-cool-800 bg-neutral-cool-100">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm font-medium text-neutral-cool-600">{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyTable;
