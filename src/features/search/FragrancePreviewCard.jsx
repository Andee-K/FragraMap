import React from "react";
import Button from "../../components/Button";
import FragrancePreviewSkeleton from "./FragrancePreviewSkeleton";

const FragrancePreviewCard = ({ fragranceInfo, onAddClick, loading }) => {
  if (loading) {
    return <FragrancePreviewSkeleton></FragrancePreviewSkeleton>
  }
  
  return (
    <div className="flex flex-col p-6 px-8 border-primary-100 border rounded-lg shadow-sm max-w-[400px] m-auto">
      <h2 className="text-xl font-semibold text-left">
        {fragranceInfo.Name}
      </h2>
      <h3 className="fragrance-brand text-md text-left font-medium">
        {fragranceInfo.Brand}
      </h3>
      <div className="my-6">
        <img
          src={
            fragranceInfo["Image URL"]
          }
          alt={`${fragranceInfo.Name} by ${fragranceInfo.Brand} Image`}
          className="w-full object-contain rounded-md aspect-square"
          onError={(e) => e.currentTarget.src = fragranceInfo["Image Fallbacks"][0]}
        />
      </div>

      <Button onClick={() => onAddClick(fragranceInfo)}>
        See More Details
      </Button>
    </div>
  );
};

export default FragrancePreviewCard;
