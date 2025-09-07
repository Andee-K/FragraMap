import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button
      className="text-base font-semibold px-4 py-2 rounded-md border-2 border-solid hover:cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
