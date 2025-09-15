import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import Rating from "@mui/material/Rating";
import StyledRating from "../components/StyledRating";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFragranceTest } from "../hooks/useFragranceTest";

function FragranceTest() {
  const { fragranceId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    userFragranceData,
    loading,
    loadError,
    handleChange,
    handleSubmit,
    handleDelete,
  } = useFragranceTest(user?.uid, fragranceId, navigate);

  if (loading) return <div className="p-6">Loading fragrance...</div>;
  if (loadError) return <div className="p-6 text-red-600">{loadError}</div>;
  if (!userFragranceData)
    return <div className="p-6">No data available for this fragrance.</div>;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col gap-6 p-6 max-w-[720px] m-auto">
        <div className="">
          <h1 className="text-lg font-semibold">Fragrance Test</h1>
          <div className="mt-1">
            <div className="text-xl font-medium">{userFragranceData.name}</div>
            <div className="text-md font-medium">{userFragranceData.brand}</div>
          </div>
        </div>

        <div>
          <label className="block text-md font-semibold mb-1">Test Date</label>
          <DatePicker
            value={userFragranceData.testDate}
            onChange={(newValue) => handleChange("testDate", newValue)}
          />
        </div>

        <div>
          <label className="block text-md font-semibold mb-1">
            Your Rating
          </label>
          <StyledRating
            name="fragrance-rating-styled"
            value={userFragranceData.rating || 0}
            onChange={(_, newValue) => handleChange("rating", newValue)}
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-md font-semibold mb-1">
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
