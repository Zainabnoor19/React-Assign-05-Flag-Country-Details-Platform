import React from "react";

const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search country..."
      className="search"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;