import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const StayInResults = () => {
  return (
    <div className="results-container">
      <Link to="/" className="home-button">Home</Link>
      <div className="filters">
        <div>
          <label htmlFor="setting">Setting</label>
          <select id="setting">
            <option value="">Select Setting</option>
            <option value="friends">With Friends</option>
            <option value="family">With Family</option>
            <option value="partner">With A Partner</option>
            <option value="solo">Solo Viewing</option>
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
      <div className="results">
        {/* Display search results here */}
      </div>
    </div>
  );
};

export default StayInResults;
