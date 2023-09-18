import React, { useState } from "react";
import data from "../context/Data";
import { Link } from "react-router-dom";

const Navigations = () => {
  const [value, setValue] = useState(0);
  return (
    <nav className="navigations">
      <div className="navigations-container">
        {data.map((item, index) => {
          return (
            <Link
              to={item.url}
              onClick={() => setValue(index)}
              className={`nav-icon ${index === value ? "active" : ""}`}
            >
              {item.icon}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigations;
