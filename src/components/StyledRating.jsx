import React from "react";
import { styled } from "@mui/material/styles";
import { Rating } from "@mui/material";

const RatingIcon = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#18296c",
  },
  "& .MuiRating-iconEmpty": {
    color: "#c7d2fe",
  },
  "& .MuiRating-icon": {
    margin: "0 4px",
  },
});

// ✅ Don’t hardcode readOnly, let parent decide
const StyledRating = ({
  value,
  icon,
  emptyIcon,
  readOnly = false,
  onChange,
}) => {
  return (
    <RatingIcon
      value={value}
      max={5}
      readOnly={readOnly}
      icon={icon}
      emptyIcon={emptyIcon}
      onChange={onChange}
    />
  );
};

export default StyledRating;
