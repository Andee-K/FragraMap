import { useParams } from "react-router";
import { getGlobalFragrance } from "../services/fragranceService";
import { useState, useEffect } from "react";
import FragranceCard from "../features/search/FragranceCard";

export default function FragranceInfo() {
  const { fragranceId } = useParams();
  const [loading, setLoading] = useState(true);
  const [fragrance, setFragrance] = useState(null);

  useEffect(() => {
    const fetchFragrance = async () => {
      try {
        const data = await getGlobalFragrance(fragranceId);
        console.log("Fetched global fragrance data:", data);
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

  if (!fragrance) {
    return <div>No fragrance data found.</div>;
  }

  console.log(fragrance);

  return (
    <div>
      <FragranceCard fragranceInfo={fragrance} />
    </div>
  );
}
