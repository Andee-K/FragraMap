import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserFragrance } from "../services/fragranceService";
import { useFragranceActions } from "../hooks/useFragranceActions";
import Button from "../components/Button";
import Rating from "@mui/material/Rating";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function FragranceTest() {
  const { fragranceId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { updateFragrance, deleteFragrance } = useFragranceActions(user?.uid);

  const [userFragranceData, setUserFragranceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      if (!user?.uid || !fragranceId) return;
      setLoading(true);
      setLoadError(null);
      try {
        const data = await getUserFragrance(user.uid, fragranceId);
        if (!mounted) return;
        if (!data) {
          setLoadError("Fragrance not found in your collection.");
          setUserFragranceData(null);
        } else {
          setUserFragranceData({
            ...data,
            // ensure dayjs value for DatePicker
            testDate:
              data.testDate && typeof data.testDate.toDate === "function"
                ? dayjs(data.testDate.toDate())
                : data.testDate
                ? dayjs(data.testDate)
                : null,
          });
        }
      } catch (error) {
        if (!mounted) return;
        console.error("Failed to fetch fragrance:", error);
        setLoadError("Failed to load fragrance.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      mounted = false;
    };
  }, [fragranceId, user?.uid]);

  const handleChange = (field, value) => {
    setUserFragranceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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

  if (loading) return <div className="p-6">Loading fragrance...</div>;
  if (loadError) return <div className="p-6 text-red-600">{loadError}</div>;
  if (!userFragranceData)
    return <div className="p-6">No data available for this fragrance.</div>;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="p-6 space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-2xl font-semibold">Fragrance Test</h1>
          <div className="mt-1 text-slate-600">
            <div className="text-lg">{userFragranceData.name}</div>
            <div className="text-sm">{userFragranceData.brand}</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="fragrance-date">
            <DatePicker
              label="Test Date"
              value={userFragranceData.testDate}
              onChange={(newValue) => handleChange("testDate", newValue)}
            />
          </div>

          <div className="fragrance-rating">
            <label className="block text-sm font-medium mb-1">Your Rating</label>
            <Rating
              name="fragrance-rating"
              value={userFragranceData.rating || 0}
              onChange={(event, newValue) => handleChange("rating", newValue)}
            />
          </div>

          <div className="fragrance-notes">
            <label htmlFor="notes" className="block text-sm font-medium mb-1">
              Notes
            </label>
            <textarea
              id="notes"
              placeholder="Write your notes here..."
              className="w-full min-h-[120px] border rounded-md p-2"
              value={userFragranceData.personalNotes || ""}
              onChange={(e) => handleChange("personalNotes", e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button type="button" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Save
          </Button>
          <Button type="button" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default FragranceTest;