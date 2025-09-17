import { useCallback, useState } from "react";
import {
  addUserFragrance,
  updateUserFragrance,
  deleteUserFragrance,
  getUserFragrance, // optional in case you need it elsewhere
  toFragranceId,
} from "../services/fragranceService";
import { Timestamp } from "firebase/firestore";

/**
 * useFragranceActions encapsulates async calls for the current user.
 * - addFragrance: pure add (no category)
 * - updateFragrance: patch fields on an existing fragrance
 * - deleteFragrance: remove from user's collection
 * - bookmarkFragrance / testFragrance: ensure existence, then set status
 */
export function useFragranceActions(uid) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = useCallback(
    async (fn) => {
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
    async (fragranceInfo) => {
      const fragrance = await run(() => addUserFragrance(uid, fragranceInfo));
      return fragrance.name;
    },
    [run, uid]
  );

  // Accepts a patch object. Converts dayjs->Timestamp for testDate if provided.
  const handleUpdateFragrance = useCallback(
    (fragranceId, patch) =>
      run(() =>
        updateUserFragrance(uid, fragranceId, {
          ...patch,
          testDate: patch?.testDate
            ? Timestamp.fromDate(patch.testDate.toDate())
            : patch?.testDate === null
            ? null
            : undefined,
        })
      ),
    [run, uid]
  );

  const handleDeleteFragrance = useCallback(
    async (fragranceId) => {
      const fragrance = await run(() => deleteUserFragrance(uid, fragranceId));
      return fragrance.name;
    },
    [run, uid]
  );
  
  // Ensure exists, then set status="bookmarked"
  const bookmarkFragrance = useCallback(
    async (fragranceInfo) =>
      run(async () => {
        const fragranceId =
          fragranceInfo.id ||
          toFragranceId(fragranceInfo.Name, fragranceInfo.Brand);

        // Ensure the doc exists (transaction will be a no-op if it already does)
        const ensure = await addUserFragrance(uid, fragranceInfo);
        const update = await updateUserFragrance(uid, fragranceId, {
          status: "bookmarked",
        });

        return {
          ...update,
          id: fragranceId,
          name: fragranceInfo.Name,
          ensuredCreated: ensure.created,
        };
      }),
    [run, uid]
  );

  // Ensure exists, then set status="testing" and testDate=now
  const testFragrance = useCallback(
    async (fragranceInfo) =>
      run(async () => {
        const fragranceId =
          fragranceInfo.id ||
          toFragranceId(fragranceInfo.Name, fragranceInfo.Brand);

        // Ensure the doc exists
        const ensure = await addUserFragrance(uid, fragranceInfo);
        const update = await updateUserFragrance(uid, fragranceId, {
          status: "testing",
          testDate: Timestamp.now(),
        });

        return {
          ...update,
          id: fragranceId,
          name: fragranceInfo.Name,
          ensuredCreated: ensure.created,
        };
      }),
    [run, uid]
  );

  // Ensure exists, then set status="testing" and testDate=now
  const finishFragrance = useCallback(
    async (fragranceId) =>
      run(async () => {
        console.log({ fragranceId });

        // Ensure the doc exists
        const update = await updateUserFragrance(uid, fragranceId, {
          status: "finished",
          testDate: Timestamp.now(),
        });

        return { ...update, id: fragranceId };
      }),
    [run, uid]
  );

  return {
    loading,
    error,
    addFragrance: handleAddFragrance,
    updateFragrance: handleUpdateFragrance,
    deleteFragrance: handleDeleteFragrance,
    bookmarkFragrance,
    testFragrance,
    finishFragrance,
  };
}
