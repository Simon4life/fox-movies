const reducer = (state, action) => {
  if (action.type === "MAIN_MOVIES") {
    return {
      ...state,
      movies: {
        ...state.movies,
        popular: action.payload.popular,
        upcoming: action.payload.upcoming,
        trending: action.payload.trending,
      },
      loading: false,
    };
  }
  if (action.type === "UPDATE_SEARCH_RESULT") {
    return {
      ...state,
      searchResult: action.payload,
    };
  }
  if (action.type === "GET_GENRES") {
    return {
      ...state,
      genres: action.payload,
    };
  }
  if (action.type === "ADD_GENRE") {
    const newGenre = state.genres.filter(
      (genre) => genre.id !== action.payload.id
    );
    return {
      ...state,
      genres: newGenre,
      selectedGenre: [action.payload, ...state.selectedGenre],
    };
  }
  if (action.type === "REMOVE_GENRE") {
    const newArr = state.selectedGenre.filter(
      (genre) => genre.id !== action.payload.id
    );
    return {
      ...state,
      genres: [...state.genres, action.payload],
      selectedGenre: newArr,
    };
  }
  if (action.type === "UPDATE_SEARCH_TERM") {
    return {
      ...state,
      searchTerm: action.payload,
    };
  }
  if (action.type === "UPDATE_SINGLE_MOVIE") {
    return {
      ...state,
      movie: action.payload,
      loading: false,
    };
  }
  if (action.type === "GENRE_MOVIES") {
    return {
      ...state,
      moviesByGenre: action.payload,
      loading: false,
    };
  }
  if (action.type === "ADD_WATCHLIST") {
    return {
      ...state,
      watchList: [action.payload, ...state.watchList],
    };
  }
  if (action.type === "REMOVE_WATCHLIST") {
    const newList = state.watchList.filter((list) => {
      return list.id !== action.payload;
    });
    return {
      ...state,
      watchList: newList,
    };
  }
  return {};
};
export default reducer;
