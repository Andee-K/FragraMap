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
      className="flex flex-col p-8 border-neutral-cool-200 border-2 bg-white rounded-lg shadow-sm max-w-[400px] m-auto hover:scale-102 transition hover:cursor-pointer hover:border-primary-800 group"
    >
      <h2 className="text-xl font-semibold text-left text-neutral-cool-800 line-clamp-2">
        {fragranceInfo.Name}
      </h2>
      <h3 className="text-lg text-left font-semibold text-neutral-cool-600 line-clamp-2">
        {fragranceInfo.Brand}
      </h3>

      <div className="my-6">
        <img
          src={fragranceInfo["Image URL"]}
          alt={`${fragranceInfo.Name} by ${fragranceInfo.Brand} Image`}
          className="w-full object-cover rounded-md aspect-square"
          onError={(e) =>
            (e.currentTarget.src = fragranceInfo["Image Fallbacks"][0])
          }
        />
      </div>
      <span className="flex justify-center items-center text-md text-primary-50 text-nowrap font-semibold px-4 py-4 bg-primary-900 rounded-md shadow-md group-hover:bg-primary-950 group-hover:shadow-none transition-transform hover:cursor-pointer hover:scale-103">
        <span className="flex items-center gap-1">
          See More <AddRoundedIcon></AddRoundedIcon>
        </span>
      </span>
    </button>
  );
};

export default FragrancePreviewCard;
