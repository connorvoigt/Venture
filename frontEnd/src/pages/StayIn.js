import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../go_Out.css';
import semiCircleImage from '../semiCircle.png';

const hostingSiteUrls = {
  'Amazon Prime': 'https://www.amazon.com/gp/video/storefront',
  'Netflix': 'https://www.netflix.com',
  'Hulu': 'https://www.hulu.com',
  'Disney+': 'https://www.disneyplus.com',
  'HBO Max': 'https://www.hbomax.com',
  'Apple TV+': 'https://tv.apple.com'
};

const presets = [
  {
    currentMood: 'happy',
    duration: '90',
    genre: 'comedy',
    actors: 'Will Ferrell'
  },
  {
    currentMood: 'sad',
    duration: '120',
    genre: 'drama',
    actors: 'Meryl Streep'
  },
  {
    currentMood: 'relaxed',
    duration: '60',
    genre: 'documentary',
    actors: 'David Attenborough'
  },
  {
    currentMood: 'anxious',
    duration: '30',
    genre: 'thriller',
    actors: 'Emily Blunt'
  },
  {
    currentMood: 'happy',
    duration: '110',
    genre: 'action',
    actors: 'Chris Hemsworth'
  }
];

const StayIn = () => {
  const [preferences, setPreferences] = useState({
    currentMood: 'happy',
    duration: '120',
    genre: 'comedy',
    actors: 'Tom Hanks'
  });

  const [results, setResults] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);

  useEffect(() => {
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
      if (input.value === '') {
        input.classList.add('input-error');
      } else {
        input.classList.remove('input-error');
      }
    });
  }, [preferences]);

  const handleChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.id]: e.target.value
    });
  };

  const handleRandomPreset = () => {
    const randomPreset = presets[Math.floor(Math.random() * presets.length)];
    setPreferences(randomPreset);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:5001/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(preferences)
      });

      const data = await response.json();
      const recommendationsArray = data.recommendations.split('###').map(rec => rec.trim()).filter(rec => rec);
      setResults(recommendationsArray.map((recommendation) => {
        const lines = recommendation.split('\n').map(l => l.trim()).filter(l => l);
        const titleLine = lines.find(l => l.startsWith('Title:'));
        const genreLine = lines.find(l => l.startsWith('Genre:'));
        const descriptionLine = lines.find(l => l.startsWith('Description:'));
        const hostingLine = lines.find(l => l.includes("Available on:"));

        return {
          title: titleLine ? titleLine.split('Title:')[1].trim() : '',
          genre: genreLine ? genreLine.split('Genre:')[1].trim() : '',
          description: descriptionLine ? descriptionLine.split('Description:')[1].trim() : '',
          hostingSite: hostingLine ? hostingLine.split("Available on:")[1].trim() : '',
        };
      }));
      setShowRecommendations(true);
    } catch (error) {
      console.error("Error fetching recommendations", error);
    }
  };

  const handleBackToSearch = () => {
    setShowRecommendations(false);
    setResults(null);
  };

  return (
    <div className="go-out-container">
      <img src={semiCircleImage} className="semiCircle" alt="Decorative semicircle"/>
      <Link to="/" className="home-button">Home</Link>
      {showRecommendations ? (
        <div className="results-container">
          <h2 className="results-title">Recommendations</h2>
          <div className="header">
            <div>Title</div>
            <div>Genre</div>
            <div>Description</div>
            <div>Hosting Site</div>
            <div>Link</div>
          </div>
          <table>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td><div className="cell-content">{result.title}</div></td>
                  <td><div className="cell-content">{result.genre}</div></td>
                  <td><div className="cell-content">{result.description}</div></td>
                  <td><div className="cell-content">{result.hostingSite}</div></td>
                  <td>
                    {result.hostingSite && (
                      <div className="cell-content">
                        <a href={hostingSiteUrls[result.hostingSite]} target="_blank" rel="noopener noreferrer">
                          <button className="search-button">Watch on {result.hostingSite}</button>
                        </a>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="search-button-2" onClick={handleBackToSearch}>Back to Search</button>
        </div>
      ) : (
        <div className="venture-box">
          <h1 className="title">Venture On... line!</h1>
          <div className="dropdown-container">
            <div className="dropdown-item">
              <label htmlFor="currentMood">Mood</label>
              <select id="currentMood" className="centered-dropdown" value={preferences.currentMood} onChange={handleChange}>
                <option value="">Select</option>
                <option value="happy">Happy</option>
                <option value="sad">Sad</option>
                <option value="relaxed">Relaxed</option>
                <option value="anxious">Anxious</option>
              </select>
            </div>
            <div className="dropdown-item">
              <label htmlFor="duration">Length in Minutes</label>
              <input type="number" id="duration" className="centered-dropdown" value={preferences.duration} onChange={handleChange} />
            </div>
            <div className="dropdown-item">
              <label htmlFor="genre">Favorite Genre</label>
              <input type="text" id="genre" className="centered-dropdown" value={preferences.genre} onChange={handleChange} />
            </div>
            <div className="dropdown-item">
              <label htmlFor="actors">Actors/Actresses</label>
              <input type="text" id="actors" className="centered-dropdown" value={preferences.actors} onChange={handleChange} />
            </div>
          </div>
          <div className="button-container">
            <button className="search-button-2" onClick={handleRandomPreset}>Random Preset</button>
            <button className="search-button" onClick={handleSearch}>Search!</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StayIn;