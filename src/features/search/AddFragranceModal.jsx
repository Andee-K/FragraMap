import React from "react";
import FragranceCard from "./FragranceCard";
import Button from "../../components/Button";

const AddFragranceModal = ({ fragranceInfo, onClose }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg p-6 overflow-y-auto max-h-[90vh]">
      <FragranceCard fragranceInfo={fragranceInfo} />
      <Button onClick={onClose}>Close</Button>
      <Button>Start Test</Button>
      <Button>Bookmark</Button>
    </div>
  );
};

export default AddFragranceModal;
