import React, { useState, useEffect } from "react";
import FragranceCard from "./FragranceCard";
import ButtonLight from "../../components/ButtonLight";
import CloseIcon from "@mui/icons-material/Close";
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
    <div className="relative rounded-lg shadow-xl w-full max-w-lg sm:px-6 overflow-y-auto max-h-[90vh] bg-primary-900">
      <div className="flex justify-between items-center py-6 px-4 sm:px-0">
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
        <button onClick={onClose}>
          <CloseIcon
            fontSize="large"
            sx={{
              color: "var(--color-primary-100)",
              "&:hover": {
                transform: "scale(1.04)",
                color: "var(--color-primary-50)",
                cursor: "pointer",
              },
              transition: "transform 0.3s ease-in-out, color 0.3s ease-in-out",
            }}
          ></CloseIcon>
        </button>
      </div>

      <FragranceCard fragranceInfo={fragranceInfo} />

      <div className="my-6 mr-3 sm:mr-0 flex gap-3 justify-end">
        <ButtonLight onClick={onClose}>Close</ButtonLight>
        {fragranceStatus === null && (
          <ButtonLight onClick={handleBookmarkClick} disabled={loading}>
            Bookmark
          </ButtonLight>
        )}
        {/* Status is finished */}
        {fragranceStatus === "finished" ? (
          <ButtonLight
            onClick={() => navigate(`/dashboard/test/${fragranceId}`)}
          >
            See Test Details
          </ButtonLight>
        ) : (
          // Status is either testing or bookmarked
          <ButtonLight onClick={handleTestClick} disabled={loading}>
            {fragranceStatus === "testing" ? "Edit Test" : "Start Test"}
          </ButtonLight>
        )}
      </div>
    </div>
  );
};

export default AddFragranceModal;
