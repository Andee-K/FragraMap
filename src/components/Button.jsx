import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button
      className="flex justify-center items-center text-sm text-primary-50 text-nowrap font-semibold px-4 py-3 bg-primary-900 rounded-md shadow-md hover:bg-primary-800 hover:shadow-none hover:cursor-pointer hover:scale-105 transition-transform"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
