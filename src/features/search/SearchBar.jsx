import React, { useState } from "react";
import Button from "../../components/Button";

function SearchBar({ onSearch, loading }) {
  const [searchItem, setSearchItem] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(searchItem);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search for fragrance"
      />
      <Button onClick={() => onSearch(searchItem)}>
        {loading ? "Searching..." : "Search"}
      </Button>
    </div>
  );
}

export default SearchBar;
