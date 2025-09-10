import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import SearchBar from "../features/search/SearchBar";
import FragrancePreviewCard from "../features/search/FragrancePreviewCard";
import AddFragranceModal from "../features/search/AddFragranceModal";
import { functions } from "../firebase/config";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get("q") || "";

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fragranceModal, setFragranceModal] = useState(null);

  const cacheKey = `fragrance-search-${currentQuery.toLowerCase()}`;

  useEffect(() => {
    if (!currentQuery) {
      setSearchResults([]);
      return;
    }

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
        // Call Firebase Function
        const searchFragrance = httpsCallable(functions, "searchFragrance");
        const response = await searchFragrance({ q: currentQuery });

        const results = response.data.results;
        console.log(results);

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
  }, [currentQuery]);

  const handleSearch = (query) => {
    setSearchParams({ q: query });
  };

  return (
    <div>
      <SearchBar
        onSearch={handleSearch}
        loading={loading}
        initialQuery={currentQuery}
      />

      {error && <p className="text-red-500">{error}</p>}

      <h2 className="mt-4 mb-2 text-lg font-semibold">Search Results:</h2>
      {searchResults.length > 0 && (
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {searchResults.map((fragrance) => (
            <li key={`${fragrance.Name}-${fragrance.Brand}`}>
              <FragrancePreviewCard
                fragranceInfo={fragrance}
                onAddClick={() => setFragranceModal(fragrance)}
              />
            </li>
          ))}
        </ul>
      )}

      {fragranceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setFragranceModal(null)}
          />
          <AddFragranceModal
            fragranceInfo={fragranceModal}
            onClose={() => setFragranceModal(null)}
          />
        </div>
      )}
    </div>
  );
}

export default Search;
