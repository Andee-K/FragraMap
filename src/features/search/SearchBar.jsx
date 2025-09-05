import React from "react";
import { useState } from "react";

function SearchBar({ onSearch, onInputChange, loading }) {
  const [searchItem, setSearchItem] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchItem(value);
    // Call the parent's input change handler to clear results
    if (onInputChange) {
      onInputChange(value);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder="Search for fragrance"
        onKeyPress={(e) => e.key === "Enter" && onSearch(searchItem)}
      />
      <button 
        onClick={() => onSearch(searchItem)} 
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}

export default SearchBar;
