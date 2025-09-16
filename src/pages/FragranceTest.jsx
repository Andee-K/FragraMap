import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import StyledRating from "../components/StyledRating";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import TextField from "@mui/material/TextField";
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
  } = useFragranceTest(user.uid, fragranceId, navigate);

  if (loading) return <div className="p-6">Loading fragrance...</div>;
  if (loadError) return <div className="p-6 text-red-600">{loadError}</div>;
  if (!userFragranceData)
    return <div className="p-6">No data available for this fragrance.</div>;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col gap-6 p-6 max-w-[720px] m-auto">
        <div className="">
          <button
            className="text-left text-sm font-bold flex items-center gap-1 mb-4 transition-transform hover:scale-105 hover:cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <ArrowBackRoundedIcon fontSize="medium" />
            Back
          </button>
          <h1 className="text-md font-bold">Fragrance Test</h1>
          <div className="mt-2">
            <div className="text-xl font-semibold">
              {userFragranceData.name}
            </div>
            <div className="text-md font-medium">{userFragranceData.brand}</div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Test Date</label>
          <DatePicker
            value={userFragranceData.testDate}
            onChange={(newValue) => handleChange("testDate", newValue)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Your Rating
          </label>
          <StyledRating
            name="fragrance-rating-styled"
            value={userFragranceData.rating || 0}
            onChange={(_, newValue) => handleChange("rating", newValue)}
            size="large"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-semibold mb-2">
            Notes
          </label>
          <TextField
            id="notes"
            placeholder="Write your notes here..."
            value={userFragranceData.personalNotes || ""}
            onChange={(e) => handleChange("personalNotes", e.target.value)}
            fullWidth
            multiline
            minRows={5}
          />
        </div>

        <div className="flex gap-3 justify-end">
          <Button type="button" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default FragranceTest;
