import React from "react";
import { Link } from "react-router-dom";
import { useContextGlobal } from "../context/context";


const WatchList = () => {

  const { watchList, IMG_PATH, removeFromWatchList, notify } = useContextGlobal();

  if (watchList.length < 1) {
    return (
      <div className="section-center">
        <div>
          <h3 className="text-center">You have {watchList.length} movies in watchList</h3>
          <Link to="/discover" className="watchlist-btn">
            Discover Movies
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <section className="section">
      <div className="watchlist-container section-center">
        <h3>{`You have ${watchList.length} items in your watchlist`}</h3>
        {watchList.map((item, index) => {
          const { poster_path, original_title, genres, vote_average, id } =
            item;
          return (
            <article key={index} className="watchlist-item">
              <img src={IMG_PATH + poster_path} className="watchlist-img" />
              <div>
                <h3>{original_title}</h3>
                <p>
                  Genres:{" "}
                  {genres.map((genre, index) => {
                    if (genres.length - 1 > index) {
                      return `${genre.name}, `;
                    } else if (index === genres.length - 1) {
                      return `${genre.name}`;
                    }
                  })}
                </p>
                <p>Vote average: {vote_average.toFixed(1)}</p>
                <button
                  className="btn watchlist-remove-btn"
                  onClick={() => {
                    removeFromWatchList(id)
                    notify("warn", `${original_title} has been removed from watchlist`)
                  }}
                >
                  remove
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default WatchList;
