import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loading, Footer } from "../components";
import { useContextGlobal } from "../context/context";
import axios from "axios";

const SingleMovie = () => {
  console.log(process.env.API_KEY);
  const mainURL = `https://api.themoviedb.org/3/movie/`;
  const singleMovieUrl = `?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const { watchList } = useContextGlobal();
  const [loading, setLoading] = useState(true);
  const [pageId, setPageId] = useState(id);
  const [recommendations, setRecommendations] = useState([]);
  const fetchRecomendations = async (id) => {
    const response = await axios(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const { results } = response.data;
    setRecommendations(results);
  };
  useEffect(() => {
    const fetchSingleMovie = async (id) => {
      const response = await axios(`${mainURL}${id}${singleMovieUrl}`);
      const data = await response.data;
      if (data) {
        const {
          backdrop_path,
          poster_path,
          genres,
          original_title,
          overview,
          release_date,
          runtime,
          vote_average,
        } = data;
        const newMovie = {
          backdrop_path,
          poster_path,
          genres,
          original_title,
          overview,
          release_date,
          runtime,
          vote_average,
        };
        setMovie(newMovie);
        setLoading(false);
      }
    };

    fetchSingleMovie(id);
    fetchRecomendations(id);
  }, [pageId]);
  if (loading) {
    return (
      <section className="section">
        <Loading />
      </section>
    );
  }
  if (!movie) {
    return (
      <div className="section">
        <h2>No content</h2>
      </div>
    );
  }

  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const {
    original_title,
    overview,
    backdrop_path,
    release_date,
    runtime,
    vote_average,
    genres,
  } = movie;

  return (
    <section>
      <header
        style={{ backgroundImage: `url(${IMG_PATH + backdrop_path})` }}
        className="hero-section"
      >
        <div className="hero-container">
          <article className="hero-content hero-content-single-page">
            <h3 className="hero-content-title">{original_title}</h3>
          </article>
        </div>
      </header>

      <div className="section">
        <article className="overview-section">
          <h2>Overview</h2>
          <p>{overview}</p>
        </article>

        <div className="card-container">
          <div className="card">
            <h4>Release date</h4>
            <h5>{release_date}</h5>
          </div>
          <div className="card">
            <h4>Run time</h4>
            <h5>
              {`${Math.floor(parseInt(runtime) / 60)}`}hr{" "}
              {parseInt(runtime % 60)}min
            </h5>
          </div>
          <div className="card">
            <h4>Rating</h4>
            <h5>{vote_average.toFixed(1)}</h5>
          </div>
          <div className="card">
            <h4>Genres</h4>
            <ul>
              {genres.map((genre) => {
                return <li key={genre.id}>{genre.name}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
      <section className="recommendations">
        <h3>More Movies like {original_title}</h3>
        <div className="movies-container">
          {recommendations.map((item, index) => {
            const { poster_path, id } = item;
            return (
              <div className="recommendation" key={index}>
                <Link
                  to={`/single-movie/${id}`}
                  onClick={() => {
                    setPageId(id);
                  }}
                >
                  <img src={IMG_PATH + poster_path} className="rec-movie" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default SingleMovie;
