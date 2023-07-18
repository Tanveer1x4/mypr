import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/images/background.jpg';
import { loginUser } from '../app/features/userSlice';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dispatch the loginUser action
    dispatch(loginUser({ email, password }));

    // Reset the form
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    const handleAuthentication = async () => {
      // Wait for the authentication status to change
      while (!isAuthenticated) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      // Navigate to another page after authentication is successful
      navigate('/');
    };

    handleAuthentication();
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="login-input"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="login-form-group">
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="login-input"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="login-footer">
          <span className="login-footer-text">Don't have an account?</span>{' '}
          <Link to="/register" className="login-footer-link">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
