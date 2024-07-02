import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';

const GoOut = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/go-out-results');
  };

  return (
    <div className="go-out-container">
      <Link to="/" className="home-button">Home</Link>
      <div className="venture-box">
        <h1>Venture Out!</h1>
        <div className="dropdown-container">
          <div>
            <label htmlFor="genre">Genre</label>
            <select id="genre">
              <option value="">Select Genre</option>
              {/* Add options here */}
            </select>
          </div>
          <div>
            <label htmlFor="range">Range</label>
            <select id="range">
              <option value="">Select Range</option>
              {/* Add options here */}
            </select>
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <select id="price">
              <option value="">Select Price</option>
              {/* Add options here */}
            </select>
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <select id="time">
              <option value="">Select Time</option>
              {/* Add options here */}
            </select>
          </div>
        </div>
        <button className="search-button" onClick={handleSearch}>Search!</button>
      </div>
    </div>
  );
};

export default GoOut;
