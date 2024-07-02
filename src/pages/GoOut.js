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
                <option value="rock">Rock</option>
                <option value="jazz">Jazz</option>
                <option value="pop">Pop</option>
                <option value="classical">Electronic</option>
                <option value="hiphop">Hip Hop</option>
            </select>
          </div>
          <div>
            <label htmlFor="range">Range</label>
            <select id="range">
                <option value="">Select Range</option>
                <option value="">Select Range</option>
                <option value="5">5 miles</option>
                <option value="10">10 miles</option>
                <option value="20">20 miles</option>
                <option value="50">50 miles</option>
            </select>
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <select id="price">
                <option value="">Select Price</option>
                <option value="free">Free</option>
                <option value="under20">Under $20</option>
                <option value="under50">Under $50</option>
                <option value="above50">Above $50</option>
            </select>
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <select id="time">
                <option value="">Select Time</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
            </select>
          </div>
        </div>
        <button className="search-button" onClick={handleSearch}>Search!</button>
      </div>
    </div>
  );
};

export default GoOut;
