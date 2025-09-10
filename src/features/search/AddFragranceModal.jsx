import React from "react";
import FragranceCard from "./FragranceCard";
import Button from "../../components/Button";
import { useFragranceActions } from "../../hooks/useFragranceActions";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddFragranceModal = ({ fragranceInfo, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { bookmarkFragrance, testFragrance, loading } = useFragranceActions(
    user.uid
  );

  const handleBookmarkClick = async () => {
    try {
      await bookmarkFragrance(fragranceInfo);
      onClose();
      alert("Fragrance bookmarked successfully!");
    } catch (err) {
      console.error("Failed to bookmark fragrance:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleTestClick = async () => {
    try {
      const result = await testFragrance(fragranceInfo);
      onClose();
      navigate(`/dashboard/fragrances/${result.id}`);
    } catch (err) {
      console.error("Failed to start test:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg p-6 overflow-y-auto max-h-[90vh]">
      <FragranceCard fragranceInfo={fragranceInfo} />
      <Button onClick={onClose}>Close</Button>
      <Button onClick={handleBookmarkClick} disabled={loading}>
        Bookmark
      </Button>
      <Button onClick={handleTestClick} disabled={loading}>
        Start Test
      </Button>
    </div>
  );
};

export default AddFragranceModal;
