import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";
import { toast } from "react-toastify";

const AppContext = React.createContext();

const defaultState = {
  loading: true,
  movies: {},
  moviesByGenre: [],
  genres: [],
  selectedGenre: [],
  searchTerm: "",
  searchResult: [],
  movie: {},
  watchList: JSON.parse(localStorage.getItem("watchlist")) || [],
  isAlertVisible: true,
  alertMsg: ""
};


// set auth headers
axios.defaults.headers.common['Authorization'] = import.meta.env.VITE_AUTH_TOKEN


// app provider
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

  const mainURL = `https://api.themoviedb.org/3/movie/`;
  const popularUrl = `popular`;
  const upcomingUrl = `upcoming`;

  const trendingUrl = `https://api.themoviedb.org/3/trending/all/week`;

  const searchUrl = `https://api.themoviedb.org/3/search/movie?language=en-US&query=`;

  const recomendationUrl = `https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=`;

  const singleMovieUrl = `?language=en-US`;

  const fetchMovies = async () => {
    await Promise.allSettled([
      axios(`${mainURL}${popularUrl}`),
      axios(`${mainURL}${upcomingUrl}`),
      axios(`${trendingUrl}`),
    ]).then((results) => {
      const [popular, upcoming, trending] = results;
      if (popular.status === "fulfilled" && upcoming.status === "fulfilled") {
        const popularResult = popular.value.data.results;
        const upcomingResult = upcoming.value.data.results;
        const trendingResult = trending.value.data.results;
        dispatch({
          type: "MAIN_MOVIES",
          payload: {
            popular: popularResult,
            upcoming: upcomingResult,
            trending: trendingResult,
          },
        });
      }
    });
  };

  const getMoviesByGenre = async (ids) => {
    const genreMoviesUrl = `https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${ids}&with_watch_monetization_types=flatrate`;
    const response = await axios(genreMoviesUrl);
    const { results } = await response.data;

    dispatch({ type: "GENRE_MOVIES", payload: results });
  };
  
  const fetchSearch = async (searchTerm) => {
    if (searchTerm) {
      const response = await axios(`${searchUrl}${searchTerm}`);
      const data = await response.data;
      const { results } = data;
      dispatch({ type: "UPDATE_SEARCH_RESULT", payload: results });
    }
  };

  const handleSearch = (term) => {
    dispatch({ type: "UPDATE_SEARCH_TERM", payload: term });
  };
  const fetchGenres = async (url) => {
    const response = await axios(url);
    const data = await response.data.genres;
    dispatch({ type: "GET_GENRES", payload: data });
  };

  const addToGenre = (item) => {
    dispatch({ type: "ADD_GENRE", payload: item });
  };
  const removeGenre = (genre) => {
    dispatch({ type: "REMOVE_GENRE", payload: genre });
  };
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
        id,
        backdrop_path,
        poster_path,
        genres,
        original_title,
        overview,
        release_date,
        runtime,
        vote_average,
      };
      return newMovie;
    }
  };

  const addToWatchList = async (id) => {
    const movie = await fetchSingleMovie(id);

    if(JSON.parse(localStorage.getItem("watchlist"))) {
      const watchListStorage = JSON.parse(localStorage.getItem("watchlist"));
      localStorage.setItem('watchlist', JSON.stringify([movie, ...watchListStorage]))
    } else {
      localStorage.setItem("watchlist", JSON.stringify([movie]))
    }

    dispatch({ type: "ADD_WATCHLIST", payload: movie });
  };

  const removeFromWatchList = (id) => {
    const watchListArr = JSON.parse(localStorage.getItem("watchlist"));
    const newArr = watchListArr.filter(item => item.id !== id);
    localStorage.setItem("watchlist", JSON.stringify(newArr))
    dispatch({ type: "REMOVE_WATCHLIST", payload: id });
  };

  const notify = (type, message) => {
    toast[type](message)
  }


  useEffect(() => {
    fetchMovies();
  }, []);
  
  return (
    <AppContext.Provider
      value={{
        ...state,
        handleSearch,
        fetchSearch,
        addToGenre,
        removeGenre,
        IMG_PATH,
        getMoviesByGenre,
        fetchGenres,
        fetchSingleMovie,
        addToWatchList,
        removeFromWatchList,
        notify
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useContextGlobal = () => {
  return useContext(AppContext);
};

export const useGenre = (genreArr) => {
  if (genreArr.length < 1) return "";
  const genreIds = genreArr.map((genre) => genre.id);
  return genreIds.reduce((acc, curr) => acc + "," + curr);
};
export default AppProvider;
