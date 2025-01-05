import React, { useState } from "react";
import "./LogIn.css";
import Footer from "../../Layout/Footer";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        localStorage.setItem("User", JSON.stringify(data));
        toast.success("Login successful! Redirecting...", {
          autoClose: 3000,
          onClose: () => {
            const userRole = data.accounts.role;
            if (userRole === "admin") {
              window.location.href = "/home-admin";
            } else {
              window.location.href = "/home";
            }
          },
        });
      } else {
        setError(
          data.message || "Login Failed: username or password is not correct"
        );
        setMessage(
          data.message || "Login Failed: username or password is not correct"
        );
      }
    } catch (error) {
      setError("An error occurred");
      setMessage("An error occurred: " + error.message);
    }
  }
  return (
    <div>
      <ToastContainer /> {/* Add this to initialize toast notifications */}
      <div className="login js-login">
        <div className="login-container1">
          <div className="login__container2">
            <h1 className="login__title">Sign in</h1>
            {error && <div className="error-message">{error}</div>}
            <form
              onSubmit={handleLogin}
              method="post"
              action="/account/login"
              id="customer_login"
              acceptCharset="UTF-8"
              data-login-with-shop-sign-in="true"
            >
              <input type="hidden" name="form_type" value="customer_login" />
              <input type="hidden" name="utf8" value="✓" />
              <div className="login__inputs">
                <div className="form-group required">
                  <input
                    type="email"
                    required="required"
                    name="customer[email]"
                    placeholder="Email address"
                    id="input-email"
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
                    id="input-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="login__button">
                <input className="button" type="submit" value="SIGN IN" />
              </div>

              <div className="login__forgot-password" id="forgot-password">
                <a href="#recover" className="js-go-to-forgotten-password">
                  Forgotten your password?
                </a>
              </div>
              <div className="login__register">
                <Link to="/register">
                  <a>I don’t have an account</a>
                </Link>
              </div>
              <input type="hidden" name="return_url" value="/account" />
            </form>
          </div>
        </div>
      </div>
      <div className="p-2 footer">
        <Footer />
      </div>
    </div>
  );
}

export default LogIn;
