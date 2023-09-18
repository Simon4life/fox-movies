import React from "react";
import { FiMenu } from "react-icons/fi";
import Logo from "./Logo";
import DarkModeToggle from "./DarkModeToggle";
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
