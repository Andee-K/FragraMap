// src/hooks/useFragranceTest.js
import { useEffect, useState } from "react";
import { getUserFragrance } from "../services/fragranceService";
import { useFragranceActions } from "../hooks/useFragranceActions";
import dayjs from "dayjs";
import { useToast } from "../context/ToastContext";

export function useFragranceTest(uid, fragranceId, navigate, isEditing) {
  const { updateFragrance, deleteFragrance } = useFragranceActions(uid);
  const [userFragranceData, setUserFragranceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const { showToast } = useToast();

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

    // Input validation
    if (
      userFragranceData.rating == null ||
      !userFragranceData.personalNotes.trim() ||
      !userFragranceData.testDate
    ) {
      showToast("Please fill in all fields before saving.", "error");
      return;
    }

    const patch = {
      rating: userFragranceData.rating,
      personalNotes: userFragranceData.personalNotes,
      testDate: userFragranceData.testDate,
    };

    const result = await updateFragrance(fragranceId, patch);
    console.log({result})
    if (result.success) {
      if (isEditing) {
        showToast(
          `Successfully updated test for ${userFragranceData.name}!`, // Assuming result.name is returned
          "success"
        );
      } else {
        showToast(
          `Successfully added ${userFragranceData.name} to testing!`, // Assuming result.name is returned
          "success"
        );
      }
      navigate("/dashboard");
    } else {
      alert(
        "Failed to update fragrance: " + (result?.error || "Unknown error")
      );
    }
  };

  return {
    userFragranceData,
    loading,
    loadError,
    handleChange,
    handleSubmit,
  };
}