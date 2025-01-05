import React, { useState } from "react";
import "./LogIn.css";
import Footer from "../../Layout/Footer";
import { Link } from "react-router-dom";

function Register() {
  const [firstname, setFirstName] = useState('');
  const[lastname, setLastName] = useState('');
  const[phone, setPhone] = useState('');
  const[address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const backendUrl = process.env.REACT_APP_BACKEND_URL; 

  async function handleSignUp(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          firstname,
          lastname,
          phone,
          password 
        }),
      });

      if (response.ok) {
        // Handle successful registration, e.g., redirect to login page
        window.location.href = '/';
      } else {
        // Handle sign-up failure, show an error message
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      // Handle network errors, request failures, etc.
      setError('An error occurred');
      console.error('An error occurred', error);
    }
  }

  return (
    <div>
      <div className="login">
        <div className="login-container1">
          <div className="login__container2">
            <h1 className="login__title">Register</h1>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSignUp}>
              <div className="login__inputs">
                <div className="form-group">
                  <input 
                  type="text" 
                  name="customer[first_name]"
                   placeholder="First name" 
                   id="input-email"
                   value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                   />
                </div>
                <div className="form-group">
                  <input 
                  type="text" 
                  name="customer[last_name]"
                   placeholder="Last name" 
                   id="input-lastname"
                   value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                   />
                </div>
                <div className="form-group">
                  <input 
                  type="text" 
                  name="customer[phone]"
                   placeholder="Phone" 
                   id="input-phone"
                   value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                   />
                </div>
                <div className="form-group">
                  <input 
                  type="text" 
                  name="customer[address]"
                   placeholder="Address" 
                   id="input-address"
                   value={address}
                    onChange={(e) => setAddress(e.target.value)}
                   />
                </div>
                <div className="form-group required">
                  <input
                    type="email"
                    required="required"
                    name="customer[email]"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group required">
                  <input
                    type="password"
                    required="required"
                    name="customer[password]"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="login__button">
                <button type="submit" className="button">Register</button>
              </div>
            </form>
            <div className="login__forgot-password">
              By creating your account, you agree to our<br />
              <a href="/pages/terms">Terms & conditions</a> and <a href="/pages/privacy">Privacy policy</a>
            </div>
            <div className="login__register">
              <Link to="/">
                <a>I already have an account</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 footer">
        <Footer />
      </div>
    </div>
  );
}

export default Register;
