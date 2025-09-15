// src/hooks/useFragranceSearch.js
import { useState, useEffect } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase/config";

export function useFragranceSearch(query) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cacheKey = `fragrance-search-${query.toLowerCase()}`;

  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    // Check local cache
    const cachedResults = localStorage.getItem(cacheKey);
    if (cachedResults) {
      try {
        setSearchResults(JSON.parse(cachedResults));
        return;
      } catch {
        localStorage.removeItem(cacheKey);
      }
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const searchFragrance = httpsCallable(functions, "searchFragrance");
        const response = await searchFragrance({ q: query });

        const results = response.data.results || [];
        localStorage.setItem(cacheKey, JSON.stringify(results));
        setSearchResults(results);
      } catch (err) {
        console.error("Error calling searchFragrance:", err);
        setError("Failed to search fragrances. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return { searchResults, loading, error };
}
