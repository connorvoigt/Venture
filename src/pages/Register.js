import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { register } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordVerify) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
      register(email, password);
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={passwordVerify}
            onChange={(e) => setPasswordVerify(e.target.value)}
            placeholder="Verify Password"
            required
          />
        </div>
        {passwordError && <p className="error">{passwordError}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
