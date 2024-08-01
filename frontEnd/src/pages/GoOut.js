import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../go_Out.css';
import semiCircleImage from '../semiCircle.png';
import Modal from './modal.js';
import './modal.css';

const GoOut = () => {
  const [genre, setGenre] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [results, setResults] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalStyle, setModalStyle] = useState({});
  const [sortBy, setSortBy] = useState('date');
  const filterButtonRef = useRef(null);

  useEffect(() => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      if (input.value === '') {
        input.classList.add('input-error');
      } else {
        input.classList.remove('input-error');
      }
    });
  }, [genre, location, startDate, endDate]);

  const handleSearch = () => {
    if (genre && location && startDate && endDate) {
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
    }
  };

  const updateModalPosition = () => {
    if (filterButtonRef.current) {
      const buttonRect = filterButtonRef.current.getBoundingClientRect();
      setModalStyle({
        position: 'absolute',
        top: `${buttonRect.top}px`,
        left: `${buttonRect.left - 400}px`,
      });
    }
  };

  const handleFilter = () => {
    if (filterButtonRef.current) {
      updateModalPosition();
      setShowModal(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', updateModalPosition);
    return () => {
      window.removeEventListener('scroll', updateModalPosition);
    };
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const applySorting = () => {
    if (results) {
      let sortedResults = [...results];
      if (sortBy === 'date') {
        sortedResults.sort((a, b) => {
          const parseDate = (dateString) => {
            const today = new Date();
            const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            
            if (dateString.toLowerCase().includes("tomorrow")) {
              const tmw = new Date(today);
              tmw.setDate(today.getDate() + 1);
              return tmw;
            } 
            const dayIndex = weekDays.findIndex(day => dateString.toLowerCase().includes(day.toLowerCase()));
            if (dayIndex !== -1) {
              const diff = (dayIndex - today.getDay() + 7) % 7;
              const targetDate = new Date(today);
              targetDate.setDate(today.getDate() + diff);
              return targetDate;
            } 
            const datePart = dateString.split('•').map(part => part.trim());
            const date = new Date(datePart);
            return date;
          };
          const dateA = parseDate(a.Date);
          const dateB = parseDate(b.Date);
          if (dateA.getDate() === dateB.getDate()) {
            if (dateA.getMonth() === dateB.getMonth()) {
              return dateA.getFullYear() - dateB.getFullYear();
            }
            else {
              return dateA.getMonth() - dateB.getMonth();
            }
          }
          if (dateA.getDate() === 'To') {
            return -1;
          }
          if (dateB.getDate() === 'To') {
            return 1;
          }
          return dateA.getDate() - dateB.getDate();
        });
      } 
      else if (sortBy === 'price') {
        const numberPresent = (str) => /\d/.test(str);

        const notValue = sortedResults.filter(result => !numberPresent(result.Price));
        const priceVal = sortedResults.filter(result => numberPresent(result.Price));

        priceVal.sort((a, b) => {
          const numA = parseFloat(a.Price.replace(/[^0-9.]/g, ''));
          const numB = parseFloat(b.Price.replace(/[^0-9.]/g, ''));
          return numA - numB;
        });

        sortedResults = [...notValue, ...priceVal];
      } 
      else if (sortBy === 'name') {
        sortedResults.sort((a, b) => a.Name.localeCompare(b.Name));
      }
      setResults(sortedResults);
    }
  };

  return (
    <div className="go-out-container">
      <img src={semiCircleImage} className="semiCircle"/>
      <Link to="/" className="home-button">Home</Link>
      <div className="venture-box">
        <h1 className="title">Venture Out!</h1>
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
            <label htmlFor="startDate">Start Date</label>
            <input type="date" id="startDate" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="centered-dropdown" />          </div>
          <div>
            <label htmlFor="endDate">End Date</label>
            <input type="date" id="endDate" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="centered-dropdown"/>
          </div>
        </div>
        <button className="search-button" onClick={handleSearch}>Search!</button>
      </div>
      {results && results.length > 0 && results[0].Name && (
        <div className="results-container">
          <h2 className="results-title">Results</h2>
          <div className="header">
            <div className="filter">
              <button ref={filterButtonRef} onClick={handleFilter} className="filter-button">FILTER ≡</button>
              <Modal showModal={showModal} style={modalStyle} onClose={handleModalClose}>
                <h2 className="sort-by-title">Sort By:</h2>
                <div className="radio" onChange={handleSortChange}>
                  <label className="radio-label" htmlFor="date">Date</label>
                  <input type="radio" value="date" name="sortBy" id="date" />
                  <label className="radio-label" htmlFor="price">Price</label>
                  <input type="radio" value="price" name="sortBy" id="price" />
                  <label className="radio-label" htmlFor="name">Name</label>
                  <input type="radio" value="name" name="sortBy" id="name" />
                </div>
                <button className="apply-button" onClick={applySorting}>Apply</button>
              </Modal>
            </div>
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

export default GoOut;