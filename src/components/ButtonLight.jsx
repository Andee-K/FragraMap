import React from 'react'

const ButtonLight = ({ onClick, children }) => {
  return (
    <button
      className="flex justify-center items-center text-sm text-primary-900 text-nowrap font-bold px-4 py-3 bg-primary-50 rounded-md shadow-md hover:bg-primary-100 hover:shadow-none hover:cursor-pointer hover:scale-103 transition-transform"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonLight;
