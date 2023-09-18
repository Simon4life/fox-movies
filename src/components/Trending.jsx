import React from "react";
import { useContextGlobal } from "../context/context";
import MovieList from "./MovieList";
import { Loading } from ".";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
const Trending = () => {
  const { movies, loading, IMG_PATH } = useContextGlobal();
  if (loading) {
    return <Loading />;
  }

  return (
    <section className="section">
      <header className="flex-header">
        <h3>Trending</h3>
        <Link to="/all-movies/trending" className="see-all-link">
          See All &nbsp;
          <BsArrowRight />
        </Link>
      </header>
      <div className="movies">
        {movies.trending.slice(0, 7).map((movie) => {
          return <MovieList {...movie} IMG_PATH={IMG_PATH} />;
        })}
      </div>
    </section>
  );
};

export default Trending;
