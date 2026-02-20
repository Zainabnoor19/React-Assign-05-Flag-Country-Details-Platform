import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

const CountryDetails = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then(res => res.json())
      .then(data => { setCountry(data[0]); setLoading(false); });

    fetch("https://restcountries.com/v3.1/all?fields=name,cca3")
      .then(res => res.json())
      .then(data => setAllCountries(data));
  }, [name]);

  if (loading) return <Loader />;

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar countries={allCountries} />
      <div className="container" style={{maxWidth: '1000px', margin: '50px auto', padding: '0 20px'}}>
        <Link to="/" style={{color: 'var(--accent-teal)', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem'}}>
          ← BACK TO EXPLORER
        </Link>
        
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '50px', marginTop: '40px', alignItems: 'center'}}>
          <img src={country.flags.png} alt="flag" style={{
            width: '100%', maxWidth: '450px', borderRadius: '15px', border: '5px solid white', boxShadow: '0 15px 35px rgba(0,0,0,0.08)'
          }} />
          
          <div style={{flex: '1', minWidth: '320px'}}>
            <h1 style={{fontFamily: 'Playfair Display', color: 'var(--nav-bg)', fontSize: '3rem', margin: '0 0 10px 0'}}>
              {country.name.common}
            </h1>
            <p style={{color: 'var(--accent-teal)', fontSize: '1.1rem', margin: '0 0 30px 0', fontStyle: 'italic'}}>{country.name.official}</p>
            
            <div style={{lineHeight: '2.2', fontSize: '0.95rem', color: 'var(--text-main)'}}>
              <p><b style={{color: 'var(--accent-teal)'}}>Region:</b> {country.region}</p>
              <p><b style={{color: 'var(--accent-teal)'}}>Capital:</b> {country.capital?.[0]}</p>
              <p><b style={{color: 'var(--accent-teal)'}}>Population:</b> {country.population.toLocaleString()}</p>
              <p><b style={{color: 'var(--accent-teal)'}}>Languages:</b> {Object.values(country.languages || {}).join(", ")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;