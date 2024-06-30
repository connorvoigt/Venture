import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import StayIn from './pages/StayIn';
import GoOut from './pages/GoOut';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
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
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/stay-in" element={<StayIn />} />
          <Route path="/go-out" element={<GoOut />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
