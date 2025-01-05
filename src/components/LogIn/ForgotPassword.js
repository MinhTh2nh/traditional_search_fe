import React, { useState } from "react";
import "./LogIn"; // Create a new CSS file for styling this page
import Footer from "../../Layout/Footer";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function handleForgotPassword(event) {
    event.preventDefault();
    // Implement the logic for handling forgot password functionality
    // This function will send a reset link to the provided email
    // Add your fetch logic or API calls here
    // Example:
    // try {
    //   // Call API to send reset link
    //   // Update state variables based on API response
    // } catch (error) {
    //   // Handle errors and update state variables accordingly
    // }
  }

  return (
    <div className="login js-login">
      <div className="login-container1">
        <div className="login__container2">
          <h1 className="login__title">Forgot Password</h1>
          <p className="login__message">
            Enter your email address below to reset your password.
          </p>
          {error && <div className="error-message">{error}</div>}
          {message && <div className="info-message">{message}</div>}
          <form onSubmit={handleForgotPassword}>
            <div className="login__inputs">
              <div className="form-group required">
                <input
                  type="email"
                  required
                  className="login__input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="login__button">
              <input className="button" type="submit" value="Reset Password" />
            </div>
          </form>
          <div className="login__forgot-password">
            <Link to="/">Remembered your password? Sign in</Link>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default ForgotPassword;
