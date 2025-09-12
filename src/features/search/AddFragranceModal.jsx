import React from "react";
import FragranceCard from "./FragranceCard";
import Button from "../../components/Button";
import { useFragranceActions } from "../../hooks/useFragranceActions";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddFragranceModal = ({ fragranceInfo, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { bookmarkFragrance, testFragrance, loading, error } = useFragranceActions(
    user?.uid
  );

  const handleBookmarkClick = async () => {
    try {
      const result = await bookmarkFragrance(fragranceInfo);
      if (!result?.success) {
        throw new Error(result?.error || "Failed to bookmark");
      }
      alert("Fragrance bookmarked successfully!");
      onClose();
    } catch (err) {
      console.error("Failed to bookmark fragrance:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleTestClick = async () => {
    try {
      const result = await testFragrance(fragranceInfo);
      if (!result?.success || !result?.id) {
        throw new Error(result?.error || "Failed to start test");
      }
      onClose();
      navigate(`/dashboard/test/${result.id}`);
    } catch (err) {
      console.error("Failed to start test:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg p-6 overflow-y-auto max-h-[90vh]">
      <FragranceCard fragranceInfo={fragranceInfo} />

      {error ? (
        <div className="text-red-600 text-sm mt-2" role="alert">
          {error}
        </div>
      ) : null}

      <div className="mt-6 flex gap-3 justify-end">
        <Button type="button" onClick={onClose}>
          Close
        </Button>
        <Button type="button" onClick={handleBookmarkClick} disabled={loading}>
          {loading ? "Working..." : "Bookmark"}
        </Button>
        <Button type="button" onClick={handleTestClick} disabled={loading}>
          {loading ? "Working..." : "Start Test"}
        </Button>
      </div>
    </div>
  );
};

export default AddFragranceModal;