import React from "react";
import { useContextGlobal } from "../context/context";

const SearchForm = () => {
  const { handleSearch, searchTerm, fetchSearch } = useContextGlobal();
  return (
    <header>
      <form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
          fetchSearch(searchTerm);
        }}
      >
        <input
          type="text"
          className="form-input"
          id=""
          placeholder="Search Movies"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <button type="submit" className="btn search-btn">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchForm;
