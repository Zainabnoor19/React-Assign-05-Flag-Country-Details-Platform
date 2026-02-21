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
      .then(data => { 
        setCountries(data); 
        setLoading(false); 
      });
  }, []);

  // Search logic: User jo type karega uske mutabiq list filter hogi
  const filtered = countries.filter(c => 
    c.name.common.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  if (loading) return <Loader />;

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar countries={countries} />
      
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <input 
          type="text" 
          className="search" 
          placeholder="Search for a country..." 
          value={search}
          onChange={(e) => {
            setSearch(e.target.value); 
            setCurrentPage(1); // Search karte waqt page 1 par wapis le jayein
          }}
        />

        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {/* Conditional Rendering Yahan Shuru Hoti Hai */}
          {filtered.length > 0 ? (
            currentItems.map(c => (
              <div key={c.cca3} className="modern-card">
                <img src={c.flags.png} alt="flag" style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <div className="card-content">
                  <h3>{c.name.common}</h3>
                  <p><b>Capital:</b> {c.capital?.[0] || "N/A"}</p>
                  <p><b>Region:</b> {c.region}</p>
                  <Link to={`/country/${c.name.common}`} className="detail-btn">View Archive →</Link>
                </div>
              </div>
            ))
          ) : (
            /* Search Result Khali Hone Par Ye Nazar Aayega */
            <div className="not-found-search" style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '80px 20px',
              background: '#f9f9f9',
              borderRadius: '15px',
              marginTop: '20px'
            }}>
              <h1 style={{ fontSize: '5rem', color: 'var(--accent-teal)', margin: '0' }}>404</h1>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Archive Not Found</h2>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                Sorry, we couldn't find any country matching "<strong>{search}</strong>".
              </p>
              <button 
                onClick={() => setSearch("")} 
                className="detail-btn"
                style={{ cursor: 'pointer', padding: '10px 20px', border: 'none', background: 'var(--accent-teal)', color: 'white', borderRadius: '5px' }}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Pagination tabhi dikhayein jab search results milein */}
        {filtered.length > 0 && (
          <div className="pagination" style={{ marginTop: '40px', textAlign: 'center' }}>
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
            <span style={{ margin: '0 15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Page {currentPage} of {totalPages}
            </span>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;