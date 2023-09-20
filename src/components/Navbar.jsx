import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-center">
        <div className="nav-container">
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
