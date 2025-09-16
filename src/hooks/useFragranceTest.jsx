import { useEffect, useState } from "react";
import { getUserFragrance } from "../services/fragranceService";
import { useFragranceActions } from "../hooks/useFragranceActions";
import dayjs from "dayjs";

export function useFragranceTest(uid, fragranceId, navigate) {
  const { updateFragrance, deleteFragrance } = useFragranceActions(uid);

  const [userFragranceData, setUserFragranceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // fetch fragrance
  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      setLoading(true);
      setLoadError(null);

      try {
        const data = await getUserFragrance(uid, fragranceId);
        if (!mounted) return;

        if (!data) {
          setLoadError("Fragrance not found in your collection.");
          setUserFragranceData(null);
        } else {
          setUserFragranceData({
            ...data,
            testDate:
              data.testDate && typeof data.testDate.toDate === "function"
                ? dayjs(data.testDate.toDate())
                : data.testDate
                ? dayjs(data.testDate)
                : null,
          });
        }
      } catch (err) {
        if (!mounted) return;
        console.error("Failed to fetch fragrance:", err);
        setLoadError("Failed to load fragrance.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      mounted = false;
    };
  }, [uid, fragranceId]);

  // local state updates
  const handleChange = (field, value) => {
    setUserFragranceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // save fragrance test changes
  const handleSubmit = async () => {
    if (!userFragranceData) return;
    const patch = {
      rating: userFragranceData.rating ?? null,
      personalNotes: userFragranceData.personalNotes ?? "",
      testDate: userFragranceData.testDate ?? null,
    };
    const result = await updateFragrance(fragranceId, patch);
    if (result?.success) {
      alert("Fragrance updated!");
      navigate("/dashboard");
    } else {
      alert("Failed to update fragrance: " + (result?.error || "Unknown error"));
    }
  };

  // delete fragrance
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this fragrance from your collection?"
    );
    if (!confirmDelete) return;

    const result = await deleteFragrance(fragranceId);
    if (result?.success && result?.deleted) {
      alert("Fragrance deleted!");
      navigate("/dashboard");
    } else if (result?.success && !result?.deleted) {
      alert("Fragrance not found. It may have already been removed.");
      navigate("/dashboard");
    } else {
      alert("Failed to delete fragrance: " + (result?.error || "Unknown error"));
    }
  };

  return {
    userFragranceData,
    loading,
    loadError,
    handleChange,
    handleSubmit,
    handleDelete,
  };
}
