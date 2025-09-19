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

        let message = "Failed to search fragrances. Please try again.";
        if (err.code === "invalid-argument") {
          message = "Search term must be at least 3 characters.";
        } else if (err.code === "not-found") {
          message = `No fragrances found for "${query}".`;
        } else if (err.code === "unauthenticated") {
          message = "Authentication error. Please try again later.";
        } else if (err.code === "resource-exhausted") {
          message =
            "Too many searches. Please wait a moment before trying again.";
        } else if (err.code === "internal") {
          message = "Something went wrong on our end. Please try again later.";
        }

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return { searchResults, loading, error };
}
