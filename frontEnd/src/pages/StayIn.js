import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import '../styles.css';
import '../stayIn.css';

const StayIn = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/stay-in-results');
  };

  return (
    <div className="stay-in-container">
      <Link to="/" className="home-button">Home</Link>
      <h1 className="title">Venture On... line!</h1>
      <div className="venture-box">
        <div className="dropdown-container">
          <div className="dropdown">
            <label htmlFor="setting">Setting</label>
            <select id="setting" className="centered-dropdown">
              <option value="">Select</option>
              <option value="home">Home</option>
              <option value="apartment">Apartment</option>
              <option value="dorm">Dorm</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="dropdown">
            <label htmlFor="current-mood">Current Mood</label>
            <select id="current-mood" className="centered-dropdown">
              <option value="">Select</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="relaxed">Relaxed</option>
              <option value="anxious">Anxious</option>
            </select>
          </div>
          <div className="dropdown">
            <label htmlFor="desired-mood">Desired Mood</label>
            <select id="desired-mood" className="centered-dropdown">
              <option value="">Select</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="relaxed">Relaxed</option>
              <option value="anxious">Anxious</option>
            </select>
          </div>
          <div className="dropdown">
            <label htmlFor="duration">Duration</label>
            <select id="duration" className="centered-dropdown">
              <option value="">Select</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </select>
          </div>
        </div>
        <button className="search-button" onClick={handleSearch}>Search!</button>
      </div>
      <div className="results-container">
        <h2 className='results-title'>Results-</h2>
        {/* <Result />
        <Result />
        <Result /> */}
      </div>
    </div>
  );
};

export default StayIn;
