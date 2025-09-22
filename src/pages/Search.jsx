import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../features/search/SearchBar";
import FragrancePreviewCard from "../features/search/FragrancePreviewCard";
import AddFragranceModal from "../features/search/AddFragranceModal";
import SearchIcon from "@mui/icons-material/Search";
import { useFragranceSearch } from "../hooks/useFragranceSearch";
import { motion } from "framer-motion";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fragranceModal, setFragranceModal] = useState(null);

  const currentQuery = searchParams.get("q") || "";

  const { searchResults, loading, error } = useFragranceSearch(currentQuery);

  const handleSearch = (query) => {
    setSearchParams({ q: query });
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <h1 className="text-2xl font-bold">Search for a Fragrance</h1>
      <SearchBar
        onSearch={handleSearch}
        loading={loading}
        initialQuery={currentQuery}
      />

      <h2 className="text-xl font-semibold mt-8 mb-4">Search Results:</h2>
      {error ? (
        // Renders if there is an error
        <motion.div
          className="flex flex-col justify-center items-center gap-3 p-6 bg-neutral-cool-200 rounded-md h-search-empty-h shadow-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
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
        </motion.div>
      ) : (
        // Renders if there is no error
        searchResults.length > 0 && (
          <motion.ul
            className="grid grid-cols-1 auto-rows-auto gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {searchResults.map((fragrance) => (
              <motion.li
                key={`${fragrance.Name}-${fragrance.Brand}`}
                variants={item}
              >
                <FragrancePreviewCard
                  fragranceInfo={fragrance}
                  loading={loading}
                  onAddClick={() => setFragranceModal(fragrance)}
                />
              </motion.li>
            ))}
          </motion.ul>
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
    </motion.div>
  );
}

export default Search;
