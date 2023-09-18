import React from "react";
import MovieList from "./MovieList";
import { useContextGlobal } from "../context/context";
const GenreMovies = () => {
  const { loading, moviesByGenre, IMG_PATH } = useContextGlobal();
  return (
    <section className="movies-container">
      {moviesByGenre.map((item, index) => {
        return (
          <MovieList
            key={index}
            {...item}
            className="list"
            IMG_PATH={IMG_PATH}
          />
        );
      })}
    </section>
  );
};

export default GenreMovies;
