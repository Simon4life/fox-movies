import React from "react";
import { Link } from "react-router-dom";
import MovieList from "./MovieList";
import Loading from "./Loading";
import { BsArrowRight } from "react-icons/bs";

import { useContextGlobal } from "../context/context";
const Popular = () => {
  const { movies, loading, IMG_PATH } = useContextGlobal();
  if (loading) {
    return <Loading />;
  }

  return (
    <section className="section">
      <header className="flex-header">
        <h3>Popular</h3>
        <Link to="/all-movies/popular" className="see-all-link">
          See All &nbsp;
          <BsArrowRight />
        </Link>
      </header>
      <div className="movies">
        {movies.popular.slice(0, 7).map((movie) => {
          return <MovieList {...movie} IMG_PATH={IMG_PATH} />;
        })}
      </div>
    </section>
  );
};
export default Popular;
