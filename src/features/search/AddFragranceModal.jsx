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

  const { bookmarkFragrance, loading } = useFragranceActions(user.uid);

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
        console.error("Failed to load fragrance data:", err);
        showToast("Failed to load fragrance data.", "error");
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
      navigate(`/dashboard/test/${fragranceId}`, {
        state: { isEditing: true },
      });
      return;
    }

    onClose();
    navigate(`/dashboard/test/${fragranceId}`, {
      state: {
        isEditing: false,
        newFragranceInfo: fragranceInfo,
      },
    });
  };

  return (
    // User status for fragrance
    <div className="relative border-neutral-cool-400 bg-neutral-cool-100 rounded-lg shadow-xl w-full max-w-lg p-8 py-12 sm:p-12 overflow-y-auto max-h-[90vh]">
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
          <span className="text-neutral-cool-600 bg-neutral-cool-300 border-neutral-cool-600 font-bold text-md border-2 p-2 px-3 rounded-md">
            Not in collection
          </span>
        )}
      </div>

      <FragranceCard fragranceInfo={fragranceInfo} />

      <div className="mt-10 flex gap-3 justify-end">
        <Button onClick={onClose}>Close</Button>
        {fragranceStatus === null && (
          <Button onClick={handleBookmarkClick} disabled={loading}>
            Bookmark
          </Button>
        )}
        {/* Status is finished */}
        {fragranceStatus === "finished" ? (
          <Button onClick={() => navigate(`/dashboard/test/${fragranceId}`)}>
            See Test Details
          </Button>
        ) : (
          // Status is either testing or bookmarked
          <Button onClick={handleTestClick} disabled={loading}>
            {fragranceStatus === "testing" ? "Edit Test" : "Start Test"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddFragranceModal;
