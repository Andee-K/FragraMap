import React, { useState, useEffect } from "react";
import FragranceCard from "./FragranceCard";
import Button from "../../components/Button";
import { useFragranceActions } from "../../hooks/useFragranceActions";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import {
  toFragranceId,
  getUserFragrance,
} from "../../services/fragranceService";

const AddFragranceModal = ({ fragranceInfo, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { bookmarkFragrance, loading } = useFragranceActions(
    user.uid
  );

  // Status variables
  const [fragranceStatus, setFragranceStatus] = useState(null);
  const [loadStatus, setLoadStatus] = useState(true);
  
  const fragranceId = toFragranceId(fragranceInfo.Name, fragranceInfo.Brand);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserFragrance(user.uid, fragranceId);
        setFragranceStatus(data?.status || null);
      } catch (err) {
        setError("Failed to load fragrance data.");
      } finally {
        setLoadStatus(false);
      }
    }
    fetchData();
  }, [user.uid, fragranceId]);

  if (loadStatus) {
    return <span>Loading status...</span>;
  }

  const handleBookmarkClick = async () => {
    try {
      const result = await bookmarkFragrance(fragranceInfo);
      if (!result.success) {
        throw new Error(result.error || "Failed to bookmark");
      }
      showToast(`Successfully bookmarked ${result.name}!`, "success");
      onClose();
    } catch (err) {
      console.error("Failed to bookmark fragrance:", err);
      showToast(`Something went wrong. Please try again.`, "error");
    }
  };

  const handleTestClick = async () => {
    if (fragranceStatus === "testing") {
      // Already testing → go directly to test page
      navigate(`/dashboard/test/${fragranceId}`, {state: {isEditing: true}});
      return;
    }

    // Not testing yet → start a new test
    try {
      onClose();
      navigate(`/dashboard/test/${fragranceId}`, {
        state: {
          isEditing: false,
          newFragranceInfo: fragranceInfo,
        },
      });
    } catch (err) {
      console.error("Failed to start test:", err);
      showToast("Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div className="relative bg-neutral-50 rounded-lg shadow-xl w-full max-w-lg p-8 md:p-10 overflow-y-auto max-h-[90vh]">
      <div className="mb-6 ">
        {fragranceStatus === "testing" ? (
          <span className="text-primary-800 bg-primary-100 font-bold text-md border-2 border-primary-800 p-2 px-3 rounded-md">
            In Testing
          </span>
        ) : fragranceStatus === "bookmarked" ? (
          <span className="bg-yellow-100 text-yellow-700 border-yellow-700 font-bold text-md border-2 p-2 px-3 rounded-md">
            Bookmarked
          </span>
        ) : fragranceStatus === "finished" ? (
          <span className="bg-green-100 text-green-700 border-green-700 font-bold text-md border-2 p-2 px-3 rounded-md">
            Finished
          </span>
        ) : (
          <span className="text-neutral-cool-600 bg-neutral-cool-100 border-neutral-cool-600 font-bold text-md border-2 p-2 px-3 rounded-md">
            Not in collection
          </span>
        )}
      </div>

      <FragranceCard fragranceInfo={fragranceInfo} />

      <div className="mt-6 flex gap-3 justify-end">
        <Button onClick={onClose}>Close</Button>
        {fragranceStatus === null && (
          <Button onClick={handleBookmarkClick} disabled={loading}>
            Bookmark
          </Button>
        )}
        {/* Only render test button if fragrance status is not "finished" */}
        {fragranceStatus === "finished" ? (
          <Button onClick={() => navigate(`/dashboard/test/${fragranceId}`)}>
            See Test Details
          </Button>
        ) : (
          <Button onClick={handleTestClick} disabled={loading}>
            {fragranceStatus === "testing" ? "Edit Test" : "Start Test"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddFragranceModal;
