import React from "react";
import "../Search /SearchResultsList.css";
import SearchResult from "./SearchResult";

const SearchResultsList = ({ results }) => {
  return (
    <div className='results-list'>
      {results.map((result) => {
        return <SearchResult result={result} />;
      })}
    </div>
  );
};

export default SearchResultsList;
