import { useParams } from "react-router";
import { getGlobalFragrance } from "../services/fragranceService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import FragranceCard from "../features/search/FragranceCard";

export default function FragranceInfo() {
  const { fragranceId } = useParams();
  const [loading, setLoading] = useState(true);
  const [fragrance, setFragrance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFragrance = async () => {
      try {
        const data = await getGlobalFragrance(fragranceId);
        setFragrance(data);
      } catch (err) {
        console.error("Error fetching fragrance:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFragrance();
  }, [fragranceId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl m-auto p-6 sm:p-12 border-2">
      <button
        className="text-left text-sm font-bold flex items-center gap-1 mb-4 transition-transform hover:scale-105 hover:cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <ArrowBackRoundedIcon fontSize="medium" />
        Back
      </button>
      <FragranceCard fragranceInfo={fragrance} />
    </div>
  );
}
