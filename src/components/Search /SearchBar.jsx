import React, { useState, useEffect, useRef } from "react";
import { FaSistrix } from "react-icons/fa";
import "../Search /SearchBar.css";
import axios from "axios";
import SearchResultsList from "./SearchResultsList";

function SearchBar() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const wrapperRef = useRef(null);

  const fetchData = async (value) => {
    try {
      await axios
        .get("https://e-commerce-back-end-production.up.railway.app/api/category/allcategories")
        .then((res) => res.data.data)
        .then((json) => {
          const result = json.filter((result) => {
            return (
              value &&
              result &&
              result.name &&
              result.name.toLowerCase().includes(value)
            );
          });
          setResults(result);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  const handleBlur = () => {
    setResults([]);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        handleBlur();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, handleBlur]);

  return (
    <div className='input-wrapper' ref={wrapperRef}>
      <FaSistrix id='search-icon' />
      <input
        placeholder='Type to search ...'
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      {results.length > 0 && <SearchResultsList results={results} />}
    </div>
  );
}

export default SearchBar;
