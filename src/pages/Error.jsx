import React from "react";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <section className="section">
      <div className="error-content">
        <h2>404</h2>
        <h4>Page Not Found</h4>
        <Link to="/">Back Home</Link>
      </div>
    </section>
  );
};

export default Error;
