import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';

const StayIn = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/stay-in-results');
  };

  return (
    <div className="stay-in-container">
      <Link to="/" className="home-button">Home</Link>
      <div className="venture-box">
        <h1>Venture On(line)!</h1>
        <div className="dropdown-container">
          <div>
            <label htmlFor="setting">Setting</label>
            <select id="setting">
              <option value="">Select Setting</option>
              <option value="home">Home</option>
              <option value="apartment">Apartment</option>
              <option value="dorm">Dorm</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="current-mood">Current Mood</label>
            <select id="current-mood">
              <option value="">Select Current Mood</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="relaxed">Relaxed</option>
              <option value="anxious">Anxious</option>
            </select>
          </div>
          <div>
            <label htmlFor="desired-mood">Desired Mood</label>
            <select id="desired-mood">
              <option value="">Select Desired Mood</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="relaxed">Relaxed</option>
              <option value="anxious">Anxious</option>
            </select>
          </div>
          <div>
            <label htmlFor="duration">Duration</label>
            <select id="duration">
              <option value="">Select Duration</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </select>
          </div>
        </div>
        <button className="search-button" onClick={handleSearch}>Search!</button>
      </div>
    </div>
  );
};

export default StayIn;
