import React from "react";
import FragranceCard from "./FragranceCard";

const SearchResults = ({ results }) => {
  return (
    <div>
      <h3>Search Results:</h3>
      <ul>
        {results.map((fragrance) => (
          <li key={`${fragrance.Name}-${fragrance.Brand}`}>
            <FragranceCard fragranceInfo={fragrance} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
