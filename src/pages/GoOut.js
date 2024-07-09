import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';

const GoOut = () => {
  const navigate = useNavigate();
  const [genre, setGenre] = useState('');
  const [range, setRange] = useState('');
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');

  const handleSearch = () => {
    navigate('/go-out-results');
  };

  const selectedCount = [genre, range, price, time].filter(Boolean).length;

  return (
    <div className="go-out-container">
      <Link to="/" className="home-button">Home</Link>
      <div className="venture-box">
        <h1>Venture Out!</h1>
        <div className={`gradient-box selected-${selectedCount}`}>
          {selectedCount > 0 && <div className="gradient-fill" style={{ height: `${(selectedCount / 4) * 100}%` }} />}
        </div>
        <div className="dropdown-container">
          <div>
            <label htmlFor="genre">Genre</label>
            <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="">Select Genre</option>
              <option value="rock">Rock</option>
              <option value="jazz">Jazz</option>
              <option value="pop">Pop</option>
              <option value="classical">Classical</option>
            </select>
          </div>
          <div>
            <label htmlFor="range">Range</label>
            <select id="range" value={range} onChange={(e) => setRange(e.target.value)}>
              <option value="">Select Range</option>
              <option value="1">1 mile</option>
              <option value="5">5 miles</option>
              <option value="10">10 miles</option>
              <option value="20">20 miles</option>
            </select>
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <select id="price" value={price} onChange={(e) => setPrice(e.target.value)}>
              <option value="">Select Price</option>
              <option value="free">Free</option>
              <option value="10">$10</option>
              <option value="20">$20</option>
              <option value="50">$50</option>
            </select>
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <select id="time" value={time} onChange={(e) => setTime(e.target.value)}>
              <option value="">Select Time</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
              <option value="night">Night</option>
            </select>
          </div>
        </div>
        <button className={`search-button ${selectedCount === 4 ? 'pulse' : ''}`} onClick={handleSearch}>Search!</button>
      </div>
    </div>
  );
};

export default GoOut;
