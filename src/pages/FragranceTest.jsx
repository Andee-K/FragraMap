// src/pages/FragranceTest.js
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import StyledRating from "../components/StyledRating";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFragranceTest } from "../hooks/useFragranceTest";
import BackButton from "../components/BackButton";
import { motion } from "framer-motion";

function FragranceTest() {
  const { fragranceId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  // Use the useLocation hook to get the state
  const location = useLocation();
  const { isEditing, newFragranceInfo } = location.state || {};

  const { userFragranceData, loading, handleChange, handleSubmit } =
    useFragranceTest(
      user.uid,
      fragranceId,
      navigate,
      isEditing,
      newFragranceInfo
    );

  if (loading) return <div className="p-6">Loading fragrance...</div>;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <motion.div
        className="flex flex-col gap-6 p-3 max-w-[720px] m-auto"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div>
          <BackButton navigateBack={() => navigate(-1)}></BackButton>
          {/* Dynamic heading based on state */}
          <h1 className="text-md font-bold mb-3">
            {isEditing ? "Edit Test Notes" : "Fragrance Test"}
          </h1>
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
      </motion.div>
    </LocalizationProvider>
  );
}

export default FragranceTest;
