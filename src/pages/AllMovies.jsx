import React from "react";
import { MovieList } from "../components";
import { useContextGlobal } from "../context/context";
import { useParams } from "react-router-dom";

const AllMovies = () => {
  const { movies, IMG_PATH } = useContextGlobal();
  const { section } = useParams();
  if (section === "popular") {
    return (
      <section className="section">
        <h2>Popular Movies</h2>
        <div className="movies-container">
          {movies.popular.map((movie) => {
            return <MovieList {...movie} IMG_PATH={IMG_PATH} />;
          })}
        </div>
      </section>
    );
  } else if (section === "trending") {
    return (
      <section className="section">
        <h2>Trending Movies</h2>
        <div className="movies-container">
          {movies.trending.map((movie) => {
            return <MovieList {...movie} IMG_PATH={IMG_PATH} />;
          })}
        </div>
      </section>
    );
  } else {
    return (
      <section className="section">
        <h2>Upcoming Movies</h2>
        <div className="movies-container">
          {movies.upcoming.map((movie) => {
            return <MovieList {...movie} IMG_PATH={IMG_PATH} />;
          })}
        </div>
      </section>
    );
  }
  return <h3>Hello</h3>;
};
export default AllMovies;
