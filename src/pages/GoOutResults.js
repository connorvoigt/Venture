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

  // Sample data for results
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
