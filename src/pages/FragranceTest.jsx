// React & core libs
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Auth & services
import { useAuth } from "../context/AuthContext";
import { getUserFragrance } from "../services/fragranceService";
import { useFragranceActions } from "../features/search/useFragranceActions";

// UI components
import Button from "../components/Button";
import Rating from "@mui/material/Rating";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Utils
import dayjs from "dayjs";

function FragranceTest() {
  const { fragranceId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { updateFragrance, deleteFragrance } = useFragranceActions(user.uid);

  const [userFragranceData, setUserFragranceData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserFragrance(user.uid, fragranceId);
        console.log("Fetched fragrance data:", data);

        setUserFragranceData({
          ...data,
          testDate: data.testDate
            ? dayjs(data.testDate.toDate()) // convert Firestore Timestamp → JS Date → dayjs
            : null,
        });
      } catch (error) {
        console.error("Failed to fetch fragrance:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [fragranceId, user?.uid]);

  const handleChange = (field, value) => {
    console.log("Updating field:", field, "to value:", value);
    setUserFragranceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const result = await updateFragrance(fragranceId, userFragranceData);

    if (result?.success) {
      alert("Fragrance updated!");
      navigate("/dashboard");
    } else {
      alert("Failed to update fragrance: " + result?.error);
    }
  };

  const handleDelete = async () => {
    const result = await deleteFragrance(userFragranceData.id);

    if (result?.success) {
      alert("Fragrance deleted!");
      navigate("/dashboard");
    } else {
      alert("Failed to delete fragrance: " + result?.error);
    }
  };

  if (loading) return <div>Loading fragrance...</div>;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="test-container">
        <h1>Fragrance Test Page</h1>
        <div className="fragrance-header">
          <h2>{userFragranceData.name}</h2>
          <h3>{userFragranceData.brand}</h3>
        </div>

        {/* Date Picker */}
        <div className="fragrance-date">
          <DatePicker
            label="Test Date"
            value={userFragranceData.testDate}
            onChange={(newValue) => handleChange("testDate", newValue)}
          />
        </div>

        {/* Rating */}
        <div className="fragrance-rating">
          <label>Your Rating</label>
          <Rating
            name="simple-controlled"
            value={userFragranceData.rating || 0}
            onChange={(event, newValue) => {
              handleChange("rating", newValue);
            }}
          />
        </div>

        {/* Notes */}
        <div className="fragrance-notes">
          <textarea
            placeholder="Write your notes here..."
            value={userFragranceData.personalNotes || ""}
            onChange={(e) => handleChange("personalNotes", e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="actions">
          <Button onClick={() => navigate(-1)}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default FragranceTest;
