import React from "react";
import { useContextGlobal } from "../context/context";
import MovieList from "./MovieList";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
const Upcoming = () => {
  const { movies, loading, IMG_PATH, upcomingMovies } = useContextGlobal();
  if (loading) {
    return (
      <section className="main-section">
        <Loading />
      </section>
    );
  }
  return (
    <section className="section">
      <header className="flex-header">
        <h3>Upcoming</h3>
        <Link to={`/all-movies/upcoming`} className="see-all-link">
          See All &nbsp;
          <BsArrowRight />
        </Link>
      </header>
      <div className="movies">
        {movies.upcoming.slice(0, 7).map((movie) => {
          return <MovieList {...movie} IMG_PATH={IMG_PATH} />;
        })}
      </div>
    </section>
  );
};

export default Upcoming;
