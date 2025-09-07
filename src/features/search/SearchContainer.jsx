import React, { useState } from "react";
import SearchBar from "./SearchBar";
import FragranceCard from "./FragranceCard";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase/config";
import FragrancePreviewCard from "./FragrancePreviewCard";

function SearchContainer() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const searchFragrance = httpsCallable(functions, "searchFragrance");
      const result = await searchFragrance({ q: query });
      setSearchResults(result.data.results);
      console.log("Search results:", result.data.results);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search fragrances. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (value) => {
    // Clear results whenever user types in the search bar
    setSearchResults([]);
    setError(null);
  };

  return (
    <div>
      <SearchBar 
        onSearch={handleSearch} 
        onInputChange={handleInputChange}
        loading={loading} 
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {/* Search Results - Combined directly into SearchContainer */}
      {searchResults.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((fragrance) => (
              <li key={`${fragrance.Name}-${fragrance.Brand}`}>
                <FragrancePreviewCard fragranceInfo={fragrance} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchContainer;
