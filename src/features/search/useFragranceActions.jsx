import { useState, useCallback } from "react";
import { addUserFragrance } from "../../services/fragranceService";

export function useFragranceActions(uid) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddFragrance = useCallback(
    async (fragranceInfo, status) => {
      if (!uid) throw new Error("User not authenticated");
      setLoading(true);
      setError(null);

      try {
        const result = await addUserFragrance(uid, fragranceInfo, status);
        return result; // { id: string, created: boolean }
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [uid]
  );

  return {
    loading,
    error,
    bookmarkFragrance: (fragranceInfo) =>
      handleAddFragrance(fragranceInfo, "bookmarked"),
    testFragrance: (fragranceInfo) =>
      handleAddFragrance(fragranceInfo, "testing"),
  };
}
