import React from "react";
import Button from "../../components/Button";

const FragrancePreviewCard = ({ fragranceInfo, onAddClick }) => {
  return (
    <div className="fragrance-preview-container flex flex-col">
      <h3 className="fragrance-name text-xl font-medium text-left">
        {fragranceInfo.Name}
      </h3>
      <h4 className="fragrance-brand text-sm text-left">
        {fragranceInfo.Brand}
      </h4>
      <img
        src={fragranceInfo["Image URL"]}
        alt={`${fragranceInfo.Name} by ${fragranceInfo.Brand} Image`}
        onError={(e) => {
          e.currentTarget.src =
            fragranceInfo["Image Fallbacks"]?.[0] || "/default-image.jpg";
        }}
      />

      <Button onClick={() => onAddClick(fragranceInfo)}>
        Add to Collection
      </Button>
    </div>
  );
};

export default FragrancePreviewCard;
