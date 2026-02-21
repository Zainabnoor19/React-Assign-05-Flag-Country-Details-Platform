import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ countries }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleGo = (name) => {
    navigate(`/country/${name}`);
    setShow(false);
  };

  const dropdownList = [...countries]
    .sort((a, b) => a.name.common.localeCompare(b.name.common))
    .slice(0, 40);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="navbar-logo">
          <Link to="/">🌍 CountryAtlas</Link>
        </div>
<div className="navbar-dropdown">
  <button className="dropdown-btn" onClick={() => setShow(!show)}>
    Quick Select <span>⬇</span>
  </button>
  
  {show && (
    <ul className="search-dropdown">
      {dropdownList.map(c => (
        <li key={c.cca3} onClick={() => handleGo(c.name.common)}>
          {c.name.common}
        </li>
      ))}
    </ul>
  )}
</div>
      </div>
    </nav>
  );
};

export default Navbar;