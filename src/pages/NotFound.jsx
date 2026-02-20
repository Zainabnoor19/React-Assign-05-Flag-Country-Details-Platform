import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="container">
    <div className="notfound-content">
      <h1 className="notfound-code">404</h1>
      <h2 className="notfound-heading">Page Not Found</h2>
      <p className="notfound-description">
        The destination you are looking for does not exist in our global directory. 
        Please verify the URL or return to the main atlas.
      </p>
      <Link to="/" className="notfound-link">
        Return to Directory
      </Link>
    </div>
  </div>
);

export default NotFound;