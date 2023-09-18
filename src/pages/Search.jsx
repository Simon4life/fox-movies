import React from "react";
import { SearchForm, Loading, MovieList } from "../components";
import { useContextGlobal } from "../context/context";
const Search = () => {
  const { searchResult, IMG_PATH, loading } = useContextGlobal();
  return (
    <section className="section">
      <header>
        <SearchForm />
      </header>
      {loading ? (
        <Loading />
      ) : (
        <div className="movies-container">
          {searchResult.map((item) => {
            return (
              <MovieList {...item} IMG_PATH={IMG_PATH} className="list" />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Search;
