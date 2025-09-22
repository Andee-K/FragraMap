// src/components/EmptyState.jsx
import React from "react";
import { motion } from "framer-motion";

const EmptyTable = ({ title, message, action }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center shadow-sm rounded-b-lg h-table-empty-h px-12 text-center text-neutral-cool-800 bg-neutral-cool-100"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm font-medium text-neutral-cool-600">{message}</p>
      {action && <div>{action}</div>}
    </motion.div>
  );
};

export default EmptyTable;
