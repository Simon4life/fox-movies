import React from "react";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <article className="hero-content">
      <h3 className="hero-content-title">HOME TO WORLD'S BEST MOVIES</h3>
      <p className="desc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quis
      </p>
      <Link to="/discover" className="discover-link">
        Discover Movies
      </Link>
    </article>
  );
};
export default Hero;
