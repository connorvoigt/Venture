import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../stayIn.css';
import semiCircleImage from '../semiCircle.png';

const StayIn = () => {
  const [genre, setGenre] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [results, setResults] = useState(null);

  const handleSearch = () => {
    fetch('http://127.0.0.1:5000/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        genre,
        location,
        startDate,
        endDate,
      }),
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      setResults(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="go-out-container">
      <img src={semiCircleImage} className="semiCircle"/>
      <Link to="/" className="home-button">Home</Link>
      <div className="venture-box">
        <h1 className="title">Venture In!</h1>
        <div className="dropdown-container">
          <div>
            <label htmlFor="genre">Genre</label>
            <input list="genres" id="genre" name="genre" placeholder="Select or type" value={genre} onChange={(e) => setGenre(e.target.value)} className="centered-dropdown"/>
            <datalist id="genres">
              <option value="Rock" />
              <option value="Jazz" />
              <option value="Pop" />
              <option value="Electronic" />
              <option value="Hip Hop" />
            </datalist>
          </div>
          <div>
            <label htmlFor="range">Location</label>
            <input list="locations" id="location" name="location" placeholder="Select or type" value={location} onChange={(e) => setLocation(e.target.value)} className="centered-dropdown"/>
          </div>
          <div>
            <label htmlFor="price">Start Date</label>
            <input list="startDates" id="startDate" name="startDates" placeholder="YYYY-MM-DD" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="centered-dropdown" />
          </div>
          <div>
            <label htmlFor="time">End Date</label>
            <input list="endDates" id="endDate" name="endDate" placeholder="YYYY-MM-DD" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="centered-dropdown"/>
          </div>
        </div>
        <button className="search-button" onClick={handleSearch}>Search!</button>
      </div>
      {results && results.length > 0 && results[0].Name && (
        <div className="results-container">
          <h2 className="results-title">Results</h2>
          <div className="header">
            <div className="filter"><button className="filter-button">FILTER ≡</button></div>
            <div>Name</div>
            <div>Date</div>
            <div>Place</div>
            <div>Price</div>
            <div>Link</div>
          </div>
          <table>
            <tbody>
            {results.map((result, index) => (
              <tr key={index} onClick={() => window.open(result.EventURL, '_blank')}>
                <td><div className="cell-content"><img src={result.ImageURL} className="image"/></div></td>
                <td><div className="cell-content">{result.Name}</div></td>
                <td><div className="cell-content">{result.Date}</div></td>
                <td><div className="cell-content">{result.Place}</div></td>
                <td><div className="cell-content">{result.Price}</div></td>
                <td><div className="cell-content"><button className="buy-button" onClick={(e) => {e.stopPropagation(); window.open(result.EventURL, '_blank');}}>Venture On!</button></div></td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StayIn;
