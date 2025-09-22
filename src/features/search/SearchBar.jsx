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
    if (!searchItem) {
      console.log("Search is empty");
    }
    if (searchItem.trim()) {
      onSearch(searchItem);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4 max-w-[768px] my-4 justify-center w-full"
    >
      <div className="relative w-full hover:scale-101 transition-all duration-200">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-900" />
        <input
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Search for a name or brand"
          className="shadow-sm border border-primary-200 p-3 pl-12 rounded-full w-full focus:outline-none focus:bg-neutral-cool-100 focus:ring-1 focus:ring-primary-300 hover:cursor-pointer hover:bg-neutral-cool-100 hover:ring-1 hover:ring-primary-200"
        />
      </div>

      <button
        className="flex justify-center items-center text-sm text-primary-50 text-nowrap font-semibold px-6 py-3 bg-primary-900 rounded-md shadow-md hover:bg-primary-950 hover:shadow-none hover:cursor-pointer hover:scale-103 transition-transform"
        type="submit"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;
