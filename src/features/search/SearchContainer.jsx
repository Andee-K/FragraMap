import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { useSearchParams } from "react-router-dom";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase/config";
import FragrancePreviewCard from "./FragrancePreviewCard";
import AddFragranceModal from "./AddFragranceModal";

function SearchContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [fragranceModal, setFragranceModal] = useState(null);

  const currentQuery = searchParams.get("q") || "";
  const cacheKey = `fragrance-search-${currentQuery.toLowerCase()}`;

  useEffect(() => {
    if (currentQuery) {
      const cachedResults = localStorage.getItem(cacheKey);

      if (cachedResults) {
        try {
          setSearchResults(JSON.parse(cachedResults));
          setLoading(false);
          return;
        } catch {
          localStorage.removeItem(cacheKey);
        }
      }

      // Results not found in cache
      const fetchResults = async () => {
        setLoading(true);
        setError(null);
        try {
          const searchFragrance = httpsCallable(functions, "searchFragrance");
          const result = await searchFragrance({ q: currentQuery });

          localStorage.setItem(cacheKey, JSON.stringify(result.data.results));
          setSearchResults(result.data.results);
        } catch {
          setError("Failed to search fragrances. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      fetchResults();
    } else {
      setSearchResults([]);
    }
  }, [currentQuery]);

  const handleSearch = (query) => {
    setSearchParams({ q: query });
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} loading={loading} />
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Search Results:</h2>
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
          ></div>
          
          <AddFragranceModal
            fragranceInfo={fragranceModal}
            onClose={() => setFragranceModal(null)}
          />
        </div>
      )}
    </div>
  );
}

export default SearchContainer;
