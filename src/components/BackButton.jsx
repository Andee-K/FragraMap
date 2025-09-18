import React from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
const BackButton = ( {navigateBack} ) => {
  return (
    <button
      className="text-left text-sm font-bold flex items-center gap-1 mb-4 transition-transform hover:scale-105 hover:cursor-pointer"
      onClick={navigateBack}
    >
      <ArrowBackRoundedIcon fontSize="medium" />
      Back
    </button>
  );
};

export default BackButton;
