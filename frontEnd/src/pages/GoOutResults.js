import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const GoOutResults = () => {
  const [starred, setStarred] = useState([]);

  const toggleStar = (index) => {
    setStarred((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  // Sample data
  const results = [
    { title: 'Event 1', info: 'Details about Event 1' },
    { title: 'Event 2', info: 'Details about Event 2' },
    { title: 'Event 3', info: 'Details about Event 3' },
  ];

  return (
    <div className="results-container">
      <Link to="/" className="home-button">Home</Link>
      <div className="filters">
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
      <div className="results">
        {results.map((result, index) => (
          <div key={index} className="result-row">
            <div className="title-section">{result.title}</div>
            <div className="info-section">{result.info}</div>
            <div className="star-section" onClick={() => toggleStar(index)}>
              {starred.includes(index) ? '★' : '☆'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoOutResults;
