import React, { useState } from "react";
import SearchBar from "../features/search/SearchBar";
import SearchResults from "../features/search/SearchResults";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase/config";

function FragranceSearch() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);

    try {
      // Use Firebase callable function
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
      <SearchResults results={searchResults} />
    </div>
  );
}

export default FragranceSearch;
