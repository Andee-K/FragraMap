import React, { useState, useEffect } from "react";
import Button from "../../components/Button";

function SearchBar({ onSearch, loading = false, initialQuery = "" }) {
  const [searchItem, setSearchItem] = useState(initialQuery);

  // Sync input with external query changes
  useEffect(() => {
    setSearchItem(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchItem.trim()) {
      onSearch(searchItem);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 justify-center">
      <input
        type="text"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        placeholder="Search for fragrance"
        className="border p-2 rounded"
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </Button>
    </form>
  );
}

export default SearchBar;
