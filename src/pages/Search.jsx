import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../features/search/SearchBar";
import FragrancePreviewCard from "../features/search/FragrancePreviewCard";
import AddFragranceModal from "../features/search/AddFragranceModal";
import SearchIcon from "@mui/icons-material/Search";
import { useFragranceSearch } from "../hooks/useFragranceSearch";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fragranceModal, setFragranceModal] = useState(null);

  const currentQuery = searchParams.get("q") || "";

  const { searchResults, loading, error } = useFragranceSearch(currentQuery);

  const handleSearch = (query) => {
    setSearchParams({ q: query });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Search for a Fragrance</h1>
      <SearchBar
        onSearch={handleSearch}
        loading={loading}
        initialQuery={currentQuery}
      />

      <h2 className="text-xl font-semibold mt-8 mb-4">Search Results:</h2>
      {error ? (
        // Renders if there is an error
        <div className="flex flex-col justify-center items-center gap-3 p-6 bg-neutral-cool-200 rounded-md h-search-empty-h shadow-sm">
          <SearchIcon
            fontSize="large"
            className="text-primary-900"
          ></SearchIcon>
          <p className="font-semibold text-xl text-center">
            No results found for "{currentQuery}".
          </p>
          <p className="font-medium text-neutral-cool-500 max-w-[20em] text-center">
            Try searching with a different term or check for typos.
          </p>
        </div>
      ) : (
        // Renders if there is no error
        searchResults.length > 0 && (
          <ul className="grid grid-cols-1 auto-rows-auto gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {searchResults.map((fragrance) => (
              <li key={`${fragrance.Name}-${fragrance.Brand}`}>
                <FragrancePreviewCard
                  fragranceInfo={fragrance}
                  loading={loading}
                  onAddClick={() => setFragranceModal(fragrance)}
                />
              </li>
            ))}
          </ul>
        )
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
