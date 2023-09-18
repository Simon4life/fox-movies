import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Logo from "./Logo";
import { useContextGlobal } from "../context/context";
import Loading from "./Loading";
const Header = () => {
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const { loading, movies } = useContextGlobal();
  if (loading) {
    return <Loading />;
  }
  const { backdrop_path } = movies.popular[0];
  return (
    <header className="hero">
      <div
        style={{ backgroundImage: `url(${IMG_PATH + backdrop_path})` }}
        className="hero-section"
      >
        <div className="hero-container">
          <Navbar />
          <Hero />
        </div>
      </div>
    </header>
  );
};

export default Header;
