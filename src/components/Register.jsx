import React, { useState } from 'react';
import backgroundImage from '../assets/images/background.jpg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../app/features/userSlice';
import { useNavigate } from "react-router-dom";
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform registration logic using email and password
    // Example: You can use Firebase Authentication or your own backend API
    dispatch(registerUser({ email, password }));

    // Reset the form
    navigate('/login');
    setEmail('');
    setPassword('');
  };

  return (
    <div
      className="register-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="register-form">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label htmlFor="email" className="register-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="register-input"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="password" className="register-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="register-input"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <div className="register-footer">
          <span className="register-footer-text">Already have an account?</span>
          <Link to="/login" className="register-footer-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
