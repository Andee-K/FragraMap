// src/components/fragrance/FragrancePreviewSkeleton.jsx
import React from "react";
import Skeleton from "@mui/material/Skeleton";

const FragrancePreviewSkeleton = () => {
  return (
    <div className="flex flex-col p-6 px-8 border border-neutral-200 rounded-lg shadow-sm max-w-[400px] m-auto">
      {/* Title */}
      <Skeleton variant="text" width="60%" height={28} />

      {/* Brand */}
      <Skeleton variant="text" width="40%" height={22} />

      {/* Image */}
      <div className="my-6">
        <Skeleton
          variant="rounded"
          width="100%"
          height={200}
          sx={{ borderRadius: "0.375rem" }}
        />
      </div>

      {/* Button */}
      <Skeleton variant="rounded" width="60%" height={40} />
    </div>
  );
};

export default FragrancePreviewSkeleton;
