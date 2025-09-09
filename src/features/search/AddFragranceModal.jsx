import React from "react";
import FragranceCard from "./FragranceCard";
import Button from "../../components/Button";
import { useFragranceActions } from "./useFragranceActions";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddFragranceModal = ({ fragranceInfo, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    bookmarkFragrance,
    testFragrance,
    loading,
  } = useFragranceActions(user.uid);

  const handleTestClick = async () => {
    const result = await testFragrance(fragranceInfo);
    console.log(result);
    onClose();
    navigate(`/dashboard/fragrances/${result.id}`);
  }

  return (
    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg p-6 overflow-y-auto max-h-[90vh]">
      <FragranceCard fragranceInfo={fragranceInfo} />
      <Button onClick={onClose}>Close</Button>
      <Button
        onClick={() => bookmarkFragrance(fragranceInfo)}
        disabled={loading}
      >
        Bookmark
      </Button>
      <Button
        onClick={handleTestClick}
        disabled={loading}
      >
        Start Test
      </Button>
    </div>
  );
};

export default AddFragranceModal;
