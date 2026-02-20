import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,region,capital,cca3")
      .then(res => res.json())
      .then(data => { setCountries(data); setLoading(false); });
  }, []);

  const filtered = countries.filter(c => 
    c.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const currentItems = filtered.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  if (loading) return <Loader />;

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar countries={countries} />
      <div className="container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 20px'}}>
        <input 
          type="text" 
          className="search" 
          placeholder="Search for a country..." 
          onChange={(e) => {setSearch(e.target.value); setCurrentPage(1);}}
        />

        <div className="grid">
          {currentItems.map(c => (
            <div key={c.cca3} className="modern-card">
              <img src={c.flags.png} alt="flag" />
              <div className="card-content">
                <h3>{c.name.common}</h3>
                <p><b>Capital:</b> {c.capital?.[0] || "N/A"}</p>
                <p><b>Region:</b> {c.region}</p>
                <Link to={`/country/${c.name.common}`} className="detail-btn">View Archive →</Link>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
          <span style={{color: 'var(--text-muted)', fontSize: '0.85rem'}}>Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Home;