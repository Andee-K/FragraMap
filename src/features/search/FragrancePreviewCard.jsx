import React from "react";
import Button from "../../components/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FragrancePreviewSkeleton from "./FragrancePreviewSkeleton";

const FragrancePreviewCard = ({ fragranceInfo, onAddClick, loading }) => {
  if (loading) {
    return <FragrancePreviewSkeleton></FragrancePreviewSkeleton>;
  }

  return (
    <button
      onClick={() => onAddClick(fragranceInfo)}
      className="flex flex-col p-8 px-10 border-neutral-cool-400 border-t-primary-900 border-t-8 bg-neutral-cool-200 border rounded-lg shadow-sm max-w-[400px] m-auto hover:scale-102 transition hover:cursor-pointer hover:border-t-primary-800 group"
    >
      <h2 className="text-xl font-semibold text-left">{fragranceInfo.Name}</h2>
      <h3 className="fragrance-brand text-lg text-left font-semibold text-neutral-cool-700">
        {fragranceInfo.Brand}
      </h3>
      <div className="my-6">
        <img
          src={fragranceInfo["Image URL"]}
          alt={`${fragranceInfo.Name} by ${fragranceInfo.Brand} Image`}
          className="w-full object-contain rounded-md aspect-square"
          onError={(e) =>
            (e.currentTarget.src = fragranceInfo["Image Fallbacks"][0])
          }
        />
      </div>
      <span className="flex justify-center items-center text-md text-primary-50 text-nowrap font-semibold px-4 py-4 bg-primary-900 rounded-md shadow-md group-hover:bg-primary-800 group-hover:shadow-none transition-transform hover:cursor-pointer hover:scale-103">
        <span className="flex items-center gap-1">
          See More Details <AddRoundedIcon></AddRoundedIcon>
        </span>
      </span>
    </button>
  );
};

export default FragrancePreviewCard;
