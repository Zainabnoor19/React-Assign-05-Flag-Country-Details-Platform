import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container">
      <div className="notfound-content">
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-heading">Archive Not Found</h2>
        <p className="notfound-description">
          The records you are looking for have been moved or do not exist in our current collection.
        </p>
        <Link to="/" className="notfound-link">
          Return to Atlas
        </Link>
      </div>
    </div>
  );
};

export default NotFound;