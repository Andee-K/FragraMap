import { useEffect, useState } from "react";
import { getUserFragrance } from "../services/fragranceService";
import { useFragranceActions } from "../hooks/useFragranceActions";
import dayjs from "dayjs";
import { useToast } from "../context/ToastContext";

export function useFragranceTest(
  uid,
  fragranceId,
  navigate,
  isEditing,
  newFragranceInfo
) {
  const { addFragrance, testFragrance } = useFragranceActions(uid);
  const [userFragranceData, setUserFragranceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    setLoading(true);

    async function initFragranceData() {
      try {
        if (newFragranceInfo) {
          // --- New fragrance: normalize + set defaults ---
          setUserFragranceData({
            name: newFragranceInfo.Name || newFragranceInfo.name,
            brand: newFragranceInfo.Brand || newFragranceInfo.brand,
            id: newFragranceInfo.id,
            status: "testing",
            rating: 0,
            personalNotes: "",
            testDate: dayjs(),
          });
        } else {
          // --- Editing: fetch user’s existing test data ---
          const data = await getUserFragrance(uid, fragranceId);
          if (data) {
            setUserFragranceData({
              ...data,
              testDate: data.testDate ? dayjs(data.testDate.toDate()) : dayjs(),
            });
          }
        }
      } catch (err) {
        console.error("Failed to load fragrance:", err);
      } finally {
        setLoading(false);
      }
    }

    initFragranceData();
  }, [uid, fragranceId, newFragranceInfo]);

  const handleChange = (field, value) => {
    setUserFragranceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validating user test entry
    if (
      !userFragranceData.rating ||
      !userFragranceData.personalNotes?.trim() ||
      !userFragranceData.testDate
    ) {
      showToast("Please fill in all fields before saving.", "error");
      return;
    }

    try {
      // Add fragrance to database if new
      if (newFragranceInfo) {
        await addFragrance(newFragranceInfo);
      }

      // Apply test status to current fragrance
      await testFragrance(fragranceId, userFragranceData);

      // --- Success toast + navigation ---
      const message = isEditing
        ? `Successfully updated test for ${userFragranceData.name}!`
        : `Successfully added ${
            userFragranceData.name || userFragranceData.Name
          } to testing!`;

      showToast(message, "success");
      navigate(-1);
      return;
    } catch (err) {
      console.error("Error with saving test:", err);
      showToast("Something went wrong :/", "error");
    }
  };

  return {
    userFragranceData,
    loading,
    handleChange,
    handleSubmit,
  };
}
