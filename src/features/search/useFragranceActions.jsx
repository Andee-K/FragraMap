import { useCallback, useState } from "react";
import {
  addUserFragrance,
  getUserFragrance as getUserFragranceService,
  updateUserFragrance,
} from "../../services/fragranceService";

/**
 * Orchestrates user fragrance actions with consistent loading/error handling.
 * Keep Firestore calls in the service layer.
 */
export function useFragranceActions(uid) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // generic function to wrap async calls with loading/error handling
  const run = useCallback(
    async (fn) => {
      if (!uid) throw new Error("User not authenticated");
      setLoading(true);
      setError(null);
      try {
        return await fn();
      } catch (err) {
        const message = err?.message || "Unexpected error";
        setError(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    [uid]
  );

  const handleAddFragrance = useCallback(
    (fragranceInfo, status) =>
      run(async () => {
        const result = await addUserFragrance(uid, fragranceInfo, status);
        return result; // { id, created: true }
      }),
    [run, uid]
  );

  const handleUpdateFragrance = useCallback(
    (fragranceId, userFragranceData) =>
      run(async () => {
        const patch = {
          rating: userFragranceData.rating,
          personalNotes: userFragranceData.personalNotes,
          status: userFragranceData.status,
          testDate: userFragranceData.testDate
            ? Timestamp.fromDate(userFragranceData.testDate.toDate())
            : null,
        };

        const result = await updateUserFragrance(uid, fragranceId, patch);
        return result;
      }),
    [run, uid]
  );

  return {
    loading,
    error,
    bookmarkFragrance: (fragranceInfo) =>
      handleAddFragrance(fragranceInfo, "bookmarked"),
    testFragrance: (fragranceInfo) =>
      handleAddFragrance(fragranceInfo, "testing"),
    updateFragrance: handleUpdateFragrance,
  };
}
