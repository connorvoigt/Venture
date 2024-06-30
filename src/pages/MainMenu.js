import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const MainMenu = () => (
  <div>
    <nav>
      <ul>
        <li><Link to="/">Main Menu</Link></li>
        <li><Link to="/stay-in">Stay In</Link></li>
        <li><Link to="/go-out">Go Out</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
    <div className="container">
      <h1 className="main-menu">Venture</h1>
      <div className="button-container">
        <Link to="/stay-in">Stay In</Link>
        <Link to="/go-out">Go Out</Link>
      </div>
    </div>
  </div>
);

export default MainMenu;
