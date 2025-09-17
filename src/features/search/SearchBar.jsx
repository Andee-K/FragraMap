import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import SearchIcon from "@mui/icons-material/Search";

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
    <form
      onSubmit={handleSubmit}
      className="flex gap-4 max-w-xl justify-center my-4 mb-8 w-full"
    >
      <div className="relative w-full">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-900"/>
        <input
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Search for fragrance"
          className="shadow-sm border border-neutral-cool-200 p-3 pl-12 rounded-full w-full focus:outline-none focus:bg-primary-50 focus:ring-1 focus:ring-primary-100 transition-all duration-200"
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </Button>
    </form>
  );
}

export default SearchBar;
